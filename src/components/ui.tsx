import type { CSSProperties, ReactNode } from 'react';
import { Link } from '../router';

export const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ArrowUpRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

interface BtnProps {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'md' | 'sm';
  external?: boolean;
  onClick?: () => void;
}

export function Btn({ href, children, variant = 'solid', size = 'md', external, onClick }: BtnProps) {
  const cls = `btn${variant === 'outline' ? ' btn--outline' : ''}${size === 'sm' ? ' btn--sm' : ''}`;
  if (external)
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
        <ArrowUpRight />
      </a>
    );
  return (
    <Link className={cls} href={href} onClick={onClick}>
      {children}
      <Arrow />
    </Link>
  );
}

export function SectionHead({ label, title, intro, id }: { label: string; title: ReactNode; intro?: string; id: string }) {
  return (
    <div className="sec-head">
      <span className="label label--accent">{label}</span>
      <h2 className="h2" id={id} data-rv="">
        {title}
      </h2>
      {intro && (
        <p className="lead" data-rv="" style={{ '--d': '80ms' } as CSSProperties}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: [string, string?][] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([label, href], i) => (
          <li key={label}>
            {href ? (
              <Link href={href}>{label}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined} className="muted">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
