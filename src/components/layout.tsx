import { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';
import { NAV, SITE, SERVICES, PROJECTS } from '../content/site';
import { Btn } from './ui';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { path } = useRouter();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`hdr${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap hdr__in">
        <Link href="/" className="brand">
          <img src="/brand/spesio-mark-96.png" alt="Spesio Technologies logo" width="30" height="30" />
          <span>Spesio Technologies</span>
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
        <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="mobile-nav" className={`mnav${open ? ' open' : ''}`}>
        <nav className="wrap" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Btn href="/#contact" onClick={() => setOpen(false)}>
            Start a project
          </Btn>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div className="ftr__intro">
            <Link href="/" className="brand">
              <img src="/brand/spesio-mark-96.png" alt="Spesio Technologies logo" width="30" height="30" loading="lazy" />
              <span>Spesio Technologies</span>
            </Link>
            <p className="muted">Websites, web apps and Android apps for growing businesses. Based in {SITE.city}, working across India.</p>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Work</h2>
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="ftr__mark" aria-hidden="true">
          Spesio Technologies
        </p>
        <div className="ftr__base">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.name}. {SITE.location}.
          </span>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-and-conditions">Terms and conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`wa${show ? '' : ' hidden'}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Spesio Technologies on WhatsApp">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.3z" />
      </svg>
    </a>
  );
}
