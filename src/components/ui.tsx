import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { Link } from '../router';

export const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

export const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

export const Spark = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 0c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C5.4 9.4 9.4 5.4 10 0z" fill="currentColor" />
  </svg>
);

/** Pulls an element toward the pointer while hovered. */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => (el.style.transform = `translate3d(${x}px, ${y}px, 0)`));
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
}

interface BtnProps {
  href: string;
  children: string;
  variant?: 'solid' | 'ghost';
  size?: 'md' | 'sm';
  external?: boolean;
  icon?: 'right' | 'up';
  onClick?: () => void;
}

export function Btn({ href, children, variant = 'solid', size = 'md', external, icon = 'right', onClick }: BtnProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  const cls = `btn${variant === 'ghost' ? ' btn--ghost' : ''}${size === 'sm' ? ' btn--sm' : ''}`;
  const inner = (
    <>
      <span className="btn__txt">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span className="btn__ico">{icon === 'up' ? <ArrowUpRight /> : <Arrow />}</span>
    </>
  );
  if (external)
    return (
      <a ref={ref} className={cls} href={href} target="_blank" rel="noopener noreferrer" data-cursor="link" onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <Link ref={ref as any} className={cls} href={href} data-cursor="link" onClick={onClick}>
      {inner}
    </Link>
  );
}

/** Renders text as masked lines that rise into place when revealed. */
export function SplitLines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  render,
}: {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  delay?: number;
  render?: (line: string, i: number) => ReactNode;
}) {
  return (
    <Tag className={className} data-split="" data-rv-root="" style={{ '--d': `${delay}ms` } as CSSProperties}>
      {lines.map((l, i) => (
        <span className="ln" key={i} style={{ '--i': i } as CSSProperties}>
          <span>{render ? render(l, i) : l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function SectionHead({ index, label, title, intro }: { index: string; label: string; title: ReactNode; intro?: string }) {
  return (
    <div className="sec-head">
      <div className="idx">
        <span className="mono ember">{index}</span>
        <span className="mono dim">{label}</span>
      </div>
      <div>
        <h2 className="h2" data-rv="">
          {title}
        </h2>
        {intro && (
          <p className="lead" data-rv="" style={{ '--d': '120ms', marginTop: 24 } as CSSProperties}>
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
