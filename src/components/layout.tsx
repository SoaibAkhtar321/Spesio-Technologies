import { useEffect, useState, type CSSProperties } from 'react';
import { Link, useRouter } from '../router';
import { NAV, SITE, SERVICES, PROJECTS } from '../content/site';
import { Btn } from './ui';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { path } = useRouter();

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last && !open);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={`hdr${scrolled ? ' scrolled' : ''}${hidden ? ' hide' : ''}`}>
        <div className="wrap hdr__in">
          <Link href="/" className="brand" aria-label={`${SITE.name} — home`}>
            <img src="/brand/spesio-mark-96.png" alt="" width="36" height="36" />
            <span>
              Spesio
              <small>TECHNOLOGIES</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hdr__cta">
            <Btn href="/#contact" size="sm">
              Start a project
            </Btn>
          </div>
          <button
            className={`burger${open ? ' open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-nav" className={`mnav${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav className="mnav__links" aria-label="Mobile">
          {[...NAV, { label: 'Contact', href: '/#contact' }].map((n, i) => (
            <Link key={n.href} href={n.href} style={{ '--i': i } as CSSProperties} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span className="mono">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'grid', gap: 8 }}>
          <a className="dim" href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1}>
            {SITE.email}
          </a>
          <a className="dim" href={SITE.phoneHref} tabIndex={open ? 0 : -1}>
            {SITE.phone}
          </a>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div className="ftr-intro">
            <p className="h3" style={{ marginBottom: 20 }}>
              Websites, apps &amp; AI — <span className="serif ember">engineered</span> in Greater Noida.
            </p>
            <Btn href="/#contact" size="sm">
              Start a project
            </Btn>
          </div>
          <div>
            <h4 className="mono mute">Services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link className="link-u" href={`/services/${s.slug}`}>
                    {s.seoTitle.split(/[,&]/)[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mono mute">Work</h4>
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link className="link-u" href={`/work/${p.slug}`}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mono mute">Contact</h4>
            <ul>
              <li>
                <a className="link-u" href={`mailto:${SITE.email}`}>
                  Email
                </a>
              </li>
              <li>
                <a className="link-u" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a className="link-u" href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="link-u" href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="wordmark" data-observe="" aria-hidden="true">
          {'SPESIO'.split('').map((c, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {c}
            </span>
          ))}
        </div>

        <div className="ftr__base">
          <span className="mono mute">
            © {year} {SITE.name}
          </span>
          <span className="mono mute">{SITE.location}</span>
          <button className="mono mute link-u" onClick={() => (window as any).__lenis?.scrollTo(0, { duration: 2 }) ?? window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`wa${show ? '' : ' hidden'}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.3z" />
      </svg>
    </a>
  );
}

