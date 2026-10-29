/**
 * Hero WebGL scene: a field of particles that breathes as a noisy sphere,
 * morphs into a torus knot as you scroll, and leans toward the pointer.
 * Loaded with a dynamic import so three.js never blocks first paint.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  TorusKnotGeometry,
  WebGLRenderer,
} from 'three';

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uScatter;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute vec3 aTarget;
  attribute float aRand;
  varying float vAlpha;
  varying float vHeat;

  // Simplex-ish 3D noise (Ashima / Stefan Gustavson, compact)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 sphere = position;
    float n = snoise(sphere * 1.1 + uTime * 0.18);
    sphere *= 1.0 + n * 0.22;

    vec3 p = mix(sphere, aTarget, smoothstep(0.0, 1.0, uMorph));
    p += normalize(p) * uScatter * (0.6 + aRand * 1.6);

    // Pointer lean
    p.x += uMouse.x * 0.25 * (0.5 + aRand);
    p.y += uMouse.y * 0.25 * (0.5 + aRand);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aRand * 0.9) * (1.0 / -mv.z);

    vHeat = smoothstep(0.15, 0.6, n + aRand * 0.3);
    vAlpha = (0.18 + aRand * 0.5) * (1.0 - uScatter * 0.5);
  }
`;

const frag = /* glsl */ `
  uniform vec3 uBone;
  uniform vec3 uEmber;
  varying float vAlpha;
  varying float vHeat;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uBone, uEmber, vHeat);
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

export interface HeroSceneHandle {
  destroy: () => void;
}

export function createHeroScene(container: HTMLElement): HeroSceneHandle {
  const isSmall = window.innerWidth < 768;
  const COUNT = isSmall ? 7000 : 16000;

  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, isSmall ? 7.4 : 6.2);

  // Sphere positions (Fibonacci distribution, a little volume)
  const pos = new Float32Array(COUNT * 3);
  const rnd = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    const shell = 1.55 + (Math.random() - 0.5) * 0.08;
    pos[i * 3] = Math.cos(t) * r * shell;
    pos[i * 3 + 1] = y * shell;
    pos[i * 3 + 2] = Math.sin(t) * r * shell;
    rnd[i] = Math.random();
  }

  // Morph target: torus knot surface samples
  const knot = new TorusKnotGeometry(1.15, 0.36, 400, 40, 2, 3);
  const kp = knot.attributes.position.array as Float32Array;
  const kCount = kp.length / 3;
  const target = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const k = Math.floor(Math.random() * kCount);
    target[i * 3] = kp[k * 3];
    target[i * 3 + 1] = kp[k * 3 + 1];
    target[i * 3 + 2] = kp[k * 3 + 2];
  }
  knot.dispose();

  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setAttribute('aTarget', new BufferAttribute(target, 3));
  geo.setAttribute('aRand', new BufferAttribute(rnd, 1));

  const mat = new ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uScatter: { value: 0 },
      uMouse: { value: [0, 0] },
      uSize: { value: (isSmall ? 26 : 30) * renderer.getPixelRatio() },
      uBone: { value: new Color('#efece6') },
      uEmber: { value: new Color('#ff6b1a') },
    },
  });

  const points = new Points(geo, mat);
  scene.add(points);

  // Desktop: sit to the right of the headline; mobile: centred behind it.
  const place = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    points.position.x = w > 1000 ? 2.1 : 0;
    points.position.y = w > 1000 ? 0.15 : 0.9;
    points.scale.setScalar(w > 1000 ? 1 : 0.85);
  };
  place();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('resize', place);

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
  io.observe(container);

  const clock = new Clock();
  let raf = 0;
  let morph = 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.9));

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    // Morph to the knot as the visitor starts scrolling; also slowly cycle on its own.
    const auto = (Math.sin(t * 0.22) * 0.5 + 0.5) * 0.35;
    morph += (Math.max(progress * 1.25, auto) - morph) * 0.06;

    mat.uniforms.uTime.value = reduce ? 0 : t;
    mat.uniforms.uMorph.value = Math.min(1, morph);
    mat.uniforms.uScatter.value = progress * 0.9;
    mat.uniforms.uMouse.value = [mouse.x, mouse.y];

    points.rotation.y = t * 0.08 + mouse.x * 0.35;
    points.rotation.x = -0.2 + mouse.y * 0.25 + progress * 0.5;
    renderer.render(scene, camera);
  };
  tick();

  // Fade the canvas in once the first frame is drawn
  requestAnimationFrame(() => container.classList.add('ready'));

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', place);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
