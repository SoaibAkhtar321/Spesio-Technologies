import { useEffect, useRef, useState } from 'react';
import { SITE } from '../content/site';

const REVEAL_SELECTOR = '[data-rv], [data-split], [data-line], [data-observe]';

/** Adds `.in` to reveal targets as they enter the viewport. Re-scans whenever `key` changes. */
export function useReveals(key: string) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const scan = () => document.querySelectorAll(`${REVEAL_SELECTOR}`).forEach((el) => !el.classList.contains('in') && io.observe(el));
    scan();
    // Lazy content (e.g. tab switches) gets picked up too.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [key]);
}

/** Smooth inertial scrolling (desktop + touch-friendly defaults). */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lenis: any;
    let raf = 0;
    let cancelled = false;
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      (window as any).__lenis = lenis;
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      (window as any).__lenis = null;
    };
  }, []);
}

/** Custom cursor: dot + trailing ring that grows over links and shows "View" over work. */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('View');

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const p = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    let raf = 0;
    const move = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button');
      const el = root.current!;
      const mode = t?.dataset.cursor ?? (t ? 'link' : '');
      el.classList.toggle('is-view', mode === 'view');
      el.classList.toggle('is-link', mode === 'link');
      if (mode === 'view') setLabel(t?.dataset.cursorLabel || 'View');
    };
    const loop = () => {
      r.x += (p.x - r.x) * 0.16;
      r.y += (p.y - r.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span>{label}</span>
      </div>
      <div className="cursor__dot" ref={dot} />
    </div>
  );
}

/** First-visit preloader. Counts to 100 while fonts settle, then lifts away. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // html.intro is set by an inline script in index.html on the first visit of a session.
    const intro = document.documentElement.classList.contains('intro');
    if (!intro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      onDone();
      return;
    }
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setN(Math.round(eased * 100));
      if (k < 1) raf = requestAnimationFrame(step);
      else {
        setDone(true);
        onDone();
        window.setTimeout(() => {
          setGone(true);
          document.documentElement.classList.remove('intro');
        }, 1150);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="mono">{SITE.name}</span>
        <span className="mono dim">{SITE.location}</span>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <span className="mono dim">Loading the studio</span>
          <span className="loader__count">
            {n}
            <span className="ember">%</span>
          </span>
        </div>
        <div className="loader__bar">
          <i style={{ transform: `scaleX(${n / 100})` }} />
        </div>
      </div>
    </div>
  );
}
