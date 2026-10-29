/**
 * Hero visual: a slowly turning globe of points drawn with plain WebGL
 * (no three.js, about 2 KB). Pauses when off screen or when the tab is hidden,
 * and renders a single still frame for visitors who prefer reduced motion.
 */

const VERT = `
attribute vec3 p;
attribute float r;
uniform float t;
uniform float s;
varying float a;
varying float h;
void main() {
  float c = cos(t), sn = sin(t);
  vec3 q = vec3(p.x * c - p.z * sn, p.y, p.x * sn + p.z * c);
  float tilt = 0.38;
  q = vec3(q.x, q.y * cos(tilt) - q.z * sin(tilt), q.y * sin(tilt) + q.z * cos(tilt));
  float depth = (q.z + 1.0) * 0.5;
  gl_Position = vec4(q.xy * 0.86, 0.0, 1.0);
  gl_PointSize = s * (0.6 + depth * 0.9);
  a = 0.12 + depth * 0.7;
  h = r;
}`;

const FRAG = `
precision mediump float;
varying float a;
varying float h;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  if (dot(d, d) > 0.25) discard;
  vec3 bone = vec3(0.91, 0.90, 0.87);
  vec3 green = vec3(0.50, 0.68, 0.58);
  vec3 red = vec3(0.88, 0.28, 0.18);
  vec3 col = h > 0.985 ? red : (h > 0.7 ? green : bone);
  gl_FragColor = vec4(col, a);
}`;

export function createHeroScene(container: HTMLElement): { destroy: () => void } {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
  if (!gl) throw new Error('WebGL unavailable');
  container.appendChild(canvas);

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Points on latitude rings, like a map globe.
  const pts: number[] = [];
  const rnd: number[] = [];
  const rings = 26;
  for (let i = 1; i < rings; i++) {
    const lat = (i / rings) * Math.PI - Math.PI / 2;
    const n = Math.max(6, Math.round(Math.cos(lat) * 72));
    for (let j = 0; j < n; j++) {
      const lon = (j / n) * Math.PI * 2;
      pts.push(Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon));
      rnd.push(Math.random());
    }
  }
  const count = rnd.length;

  const bind = (name: string, data: number[], size: number) => {
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  bind('p', pts, 3);
  bind('r', rnd, 1);

  const uT = gl.getUniformLocation(prog, 't');
  const uS = gl.getUniformLocation(prog, 's');
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    const w = container.clientWidth;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(w * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uS, 3.2 * dpr);
  };
  resize();
  window.addEventListener('resize', resize);

  const draw = (time: number) => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uT, time);
    gl.drawArrays(gl.POINTS, 0, count);
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(container);

  let raf = 0;
  const start = performance.now();
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    draw(((now - start) / 1000) * 0.12);
  };
  if (reduce) draw(0.6);
  else raf = requestAnimationFrame(loop);
  requestAnimationFrame(() => container.classList.add('ready'));

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    },
  };
}
