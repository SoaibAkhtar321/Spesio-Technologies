import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Link } from '../router';
import {
  HERO, MANIFESTO, TICKER, SERVICES, PROJECTS, PROCESS, PRINCIPLES, STACK, PACKAGES, FAQS, CONTACT, SITE,
} from '../content/site';
import { Btn, Arrow, ArrowUpRight, Spark, SectionHead } from '../components/ui';
import { CoverArt } from '../components/CoverArt';

/* ------------------------------------------------------------------ Hero */

function useClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: SITE.timezone });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

function Hero({ ready }: { ready: boolean }) {
  const gl = useRef<HTMLDivElement>(null);
  const time = useClock();

  useEffect(() => {
    let handle: { destroy: () => void } | undefined;
    let cancelled = false;
    const el = gl.current;
    if (!el) return;
    // Defer three.js until the browser is idle so it never competes with first paint.
    const start = () =>
      import('../three/heroScene').then(({ createHeroScene }) => {
        if (cancelled) return;
        try {
          handle = createHeroScene(el);
        } catch {
          /* WebGL unavailable: the gradient glow remains */
        }
      });
    const ric = (window as any).requestIdleCallback as ((cb: () => void, o?: object) => number) | undefined;
    const id = ric ? ric(start, { timeout: 1200 }) : window.setTimeout(start, 300);
    return () => {
      cancelled = true;
      if (!ric) window.clearTimeout(id);
      handle?.destroy();
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" />
      <div className="hero__gl" ref={gl} aria-hidden="true" />
      <div className="hero__fade" />
      <div className={`wrap hero__content${ready ? ' go' : ''}`}>
        <div className="hero__top">
          <span className="mono eyebrow" data-hero-fade="">
            {HERO.eyebrow}
          </span>
          <span className="mono dim hero__meta" data-hero-fade="" style={{ '--d': '150ms' } as CSSProperties}>
            <span className="live">Taking projects</span>
            <span suppressHydrationWarning>
              {SITE.city} {time && `— ${time} IST`}
            </span>
          </span>
        </div>

        <h1 id="hero-title" className={`display${ready ? ' go' : ''}`} data-hero="" style={{ '--d': '100ms' } as CSSProperties}>
          {HERO.lines.map((l, i) => (
            <span className="ln" key={i} style={{ '--i': i } as CSSProperties}>
              <span>
                {i === 2 ? (
                  <>
                    <span className="serif">digital</span> products.
                  </>
                ) : (
                  l
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__bottom">
          <p className="lead" data-hero-fade="" style={{ '--d': '550ms' } as CSSProperties}>
            {HERO.sub}
          </p>
          <div className="hero__ctas" data-hero-fade="" style={{ '--d': '700ms' } as CSSProperties}>
            <Btn href="/#contact">{HERO.primaryCta}</Btn>
            <Btn href="/#work" variant="ghost">
              {HERO.secondaryCta}
            </Btn>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }} data-hero-fade="" className="mono mute">
          <span className="scroll-cue">
            <i /> Scroll to explore
          </span>
          <span className="scroll-cue">Web · Android · AI</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Marquee */

export function Marquee({ items, className = 'marquee' }: { items: string[]; className?: string }) {
  const row = (aria: boolean) => (
    <div className="marquee__item" aria-hidden={aria}>
      {items.map((t) => (
        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 34 }}>
          {t}
          <Spark size={16} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={className}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Manifesto */

const HIGHLIGHT = new Set(['system', 'yours', 'own.']);

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = MANIFESTO.split(' ');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans: HTMLElement[] = Array.from(el.querySelectorAll<HTMLElement>('.w'));
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < lit));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="manifesto" aria-label="About the studio">
      <div className="wrap">
        <span className="mono eyebrow" style={{ marginBottom: 36, display: 'inline-flex' }}>
          The studio
        </span>
        <p ref={ref}>
          {words.map((w, i) => (
            <span key={i} className={`w${HIGHLIGHT.has(w) ? ' hl' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </p>
        <Stats />
      </div>
    </section>
  );
}

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const s = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - s) / 1600);
        setN(Math.round((1 - Math.pow(1 - k, 4)) * to));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <b ref={ref}>
      {n}
      {suffix && <sup>{suffix}</sup>}
    </b>
  );
}

function Stats() {
  const stats = [
    { n: 3, s: '+', l: 'Products shipped to production' },
    { n: 4, s: '', l: 'Disciplines under one roof' },
    { n: 6, s: 'mo', l: 'Free maintenance, every package' },
    { n: 100, s: '%', l: 'Code & data ownership' },
  ];
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div className="stat" key={s.l} data-rv="" style={{ '--d': `${i * 90}ms` } as CSSProperties}>
          <Counter to={s.n} suffix={s.s} />
          <span className="mono dim">{s.l}</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- Services */

function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead
          index="(01)"
          label="Services"
          title={
            <span id="services-title">
              Four disciplines. <span className="serif dim">One</span> accountable team.
            </span>
          }
        />
        <div>
          {SERVICES.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="svc" style={{ display: 'block' }} data-cursor="view" data-cursor-label="Explore">
              <div className="svc__row" data-rv="" style={{ '--d': `${i * 70}ms` } as CSSProperties}>
                <span className="mono mute">{s.number}</span>
                <h3 className="svc__title">{s.title}</h3>
                <span className="svc__arrow">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="svc__body">
                <p className="dim">{s.line}</p>
                <div className="tags">
                  {s.capabilities.map((c) => (
                    <span className="tag" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Work */

function Work() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const p = pin.current;
    const t = track.current;
    if (!p || !t) return;
    const mq = window.matchMedia('(min-width: 1000px)');
    let dist = 0;
    let raf = 0;

    const measure = () => {
      if (!mq.matches) {
        p.style.removeProperty('--pin-h');
        t.style.transform = '';
        return;
      }
      dist = t.scrollWidth - window.innerWidth;
      p.style.setProperty('--pin-h', `${dist + window.innerHeight}px`);
      update();
    };
    const update = () => {
      if (!mq.matches) return;
      const r = p.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      t.style.transform = `translate3d(${-prog * dist}px, 0, 0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${prog})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" style={{ paddingTop: 'clamp(40px,6vw,80px)' }}>
      <div className="work-pin" ref={pin}>
        <div className="work-sticky">
          <div className="work-track" ref={track}>
            <div className="work-intro wrap" style={{ paddingInline: 0 }}>
              <div>
                <span className="mono ember">(02) — Selected work</span>
                <h2 id="work-title" className="h2" style={{ marginTop: 24 }} data-rv="">
                  Shipped, live <span className="serif dim">&amp;</span> in use.
                </h2>
                <p className="lead" style={{ marginTop: 24 }} data-rv="">
                  A few products we have designed, engineered and launched — from marketplaces to native apps.
                </p>
              </div>
              <div className="progress" aria-hidden="true">
                <i ref={bar} />
              </div>
            </div>
            {PROJECTS.map((p, i) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="card" data-cursor="view" data-cursor-label="Case study" data-rv="" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
                <div className="card__media">
                  <CoverArt project={p} />
                  {p.liveUrl && <span className="card__live mono">Live</span>}
                </div>
                <div className="card__info">
                  <h3 className="card__name">{p.name}</h3>
                  <span className="mono mute">{p.number}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 10 }}>
                  <p className="dim" style={{ margin: 0, maxWidth: '30em' }}>
                    {p.summary}
                  </p>
                  <span className="mono dim" style={{ whiteSpace: 'nowrap' }}>
                    {p.category.split('·')[0].trim()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Process */

function Process() {
  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHead
          index="(03)"
          label="Process"
          title={
            <span id="process-title">
              From first call to launch, <span className="serif dim">without</span> the mystery.
            </span>
          }
          intro="A clear, three-stage rhythm. You always know what is being built, what it costs and when you will see it."
        />
        <div className="proc">
          {PROCESS.map((s) => (
            <div className="step" key={s.number} data-observe="">
              <span className="step__n">{s.number}</span>
              <div>
                <h3 className="h3">{s.title}</h3>
                <span className="mono ember" style={{ display: 'block', marginTop: 10 }}>
                  {s.duration}
                </span>
              </div>
              <p className="lead" style={{ margin: 0 }}>
                {s.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Studio */

function Studio() {
  return (
    <section className="studio" id="studio" aria-labelledby="studio-title">
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <SectionHead index="(04)" label="Studio" title={<span id="studio-title">Founder-led. Built to be owned.</span>} />
          <div className="founder">
            <div className="portrait" data-rv="scale">
              <div className="portrait__mono" aria-hidden="true">
                <span>S</span>
                <span>A</span>
              </div>
              <div className="portrait__cap mono">
                <span>{SITE.founder.name}</span>
                <span className="ember">Founder</span>
              </div>
            </div>
            <div>
              <blockquote className="quote" data-rv="">
                “{SITE.founder.quote.split('No hand-offs')[0]}
                <span className="serif">No hand-offs</span>
                {SITE.founder.quote.split('No hand-offs')[1]}”
              </blockquote>
              <p className="mono dim" style={{ marginBottom: 48 }}>
                — {SITE.founder.name}, {SITE.founder.role}
              </p>
              <div className="principles">
                {PRINCIPLES.map((p, i) => (
                  <div className="principle" key={p.title} data-rv="" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
                    <span className="mono" style={{ color: '#c24a0a' }}>
                      0{i + 1}
                    </span>
                    <h3>{p.title}</h3>
                    <p className="dim">{p.line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 'clamp(70px,9vw,120px)' }}>
        <div className="wrap">
          <span className="mono mute">Tools we build with</span>
        </div>
        <Marquee items={STACK} className="stack-row" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Packages */

function Packages() {
  const [kind, setKind] = useState<'website' | 'android'>('website');
  const tabs = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 5, width: 0 });
  useEffect(() => {
    const btn = tabs.current?.querySelector<HTMLButtonElement>(`[data-k="${kind}"]`);
    if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [kind]);

  return (
    <section className="section" id="packages" aria-labelledby="packages-title">
      <div className="wrap">
        <SectionHead
          index="(05)"
          label="Packages"
          title={
            <span id="packages-title">
              Start where you are. <span className="serif dim">Scale</span> when you're ready.
            </span>
          }
          intro="Clear packages for websites and Android apps. Every tier includes six months of free maintenance, and you can upgrade at any time."
        />
        <div className="tabs" role="tablist" ref={tabs} aria-label="Package type">
          <span className="tabs__pill" style={{ left: pill.left, width: pill.width }} aria-hidden="true" />
          {(['website', 'android'] as const).map((k) => (
            <button key={k} data-k={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)}>
              {k === 'website' ? 'Websites' : 'Android apps'}
            </button>
          ))}
        </div>
        <div className="tiers" role="tabpanel" key={kind}>
          {PACKAGES[kind].map((t, i) => (
            <article key={t.id} className={`tier tier-swap${t.highlight ? ' tier--hl' : ''}`} style={{ '--i': i } as CSSProperties}>
              {t.highlight && <span className="tier__badge mono">Most chosen</span>}
              <div>
                <span className="mono mute">0{i + 1}</span>
                <h3 style={{ marginTop: 14 }}>{t.name}</h3>
                <p className="dim" style={{ margin: '6px 0 0' }}>
                  {t.tagline}
                </p>
              </div>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                className="link-u mono"
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('spesio:package', { detail: `${t.name} ${kind === 'website' ? 'Website' : 'Android app'}` }));
                  const c = document.getElementById('contact');
                  if (c) ((window as any).__lenis?.scrollTo(c, { offset: -40 }) ?? c.scrollIntoView({ behavior: 'smooth' }));
                }}
              >
                Enquire about {t.name} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div>
          <span className="mono ember">(06) — FAQ</span>
          <h2 id="faq-title" className="h2" style={{ marginTop: 24 }} data-rv="">
            Questions, <span className="serif dim">answered.</span>
          </h2>
          <p className="lead" style={{ marginTop: 24 }}>
            Anything else? Message us on{' '}
            <a className="ember link-u" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            and you will hear back from the founder directly.
          </p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div className={`qa${open === i ? ' open' : ''}`} key={f.question}>
              <h3 style={{ margin: 0 }}>
                <button aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  {f.question}
                  <span className="qa__plus" aria-hidden="true" />
                </button>
              </h3>
              <div className="qa__a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div>
                  <p>{f.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */

export function Contact() {
  const [service, setService] = useState(CONTACT.services[0]);
  const [budget, setBudget] = useState(CONTACT.budgets[4]);
  const [pkg, setPkg] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<string>).detail;
      setPkg(d);
      setService(d.includes('Android') ? 'Android app' : 'Website');
    };
    window.addEventListener('spesio:package', on);
    return () => window.removeEventListener('spesio:package', on);
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('company')) return; // honeypot
    setStatus('sending');
    const body = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      service: pkg ? `${service} — ${pkg}` : service,
      budget,
      message: String(fd.get('message') || ''),
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('ok');
        setMsg(data.message || 'Thank you — your brief is with Soaib. Expect a reply within one working day.');
        (e.target as HTMLFormElement).reset();
      } else throw new Error(data.message);
    } catch (err: any) {
      setStatus('err');
      setMsg(err?.message || `Something went wrong. Please WhatsApp us on ${SITE.phone}.`);
    }
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <span className="mono ember">(07) — Contact</span>
        <h2 id="contact-title" className="contact__big" style={{ marginTop: 28 }} data-split="">
          <span className="ln">
            <span>Have an idea?</span>
          </span>
          <span className="ln" style={{ '--i': 1 } as CSSProperties}>
            <span>
              Let's <span className="serif">build</span> it.
            </span>
          </span>
        </h2>
        <div className="contact__grid">
          <div className="channels">
            <a className="channel" href={`mailto:${SITE.email}`}>
              <span>
                <span className="mono mute" style={{ display: 'block', marginBottom: 6 }}>
                  Email
                </span>
                <b>{SITE.email}</b>
              </span>
              <ArrowUpRight size={20} />
            </a>
            <a className="channel" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span>
                <span className="mono mute" style={{ display: 'block', marginBottom: 6 }}>
                  WhatsApp / Call
                </span>
                <b>{SITE.phone}</b>
              </span>
              <ArrowUpRight size={20} />
            </a>
            <div className="channel" style={{ pointerEvents: 'none' }}>
              <span>
                <span className="mono mute" style={{ display: 'block', marginBottom: 6 }}>
                  Studio
                </span>
                <b>{SITE.location}</b>
                <span className="dim" style={{ display: 'block', marginTop: 4, fontSize: 15 }}>
                  {SITE.hours}
                </span>
              </span>
            </div>
          </div>

          <form className="form" onSubmit={submit} noValidate={false}>
            <div className="form__row">
              <div className="field">
                <input id="f-name" name="name" required placeholder=" " autoComplete="name" />
                <label htmlFor="f-name">Your name</label>
              </div>
              <div className="field">
                <input id="f-email" name="email" type="email" required placeholder=" " autoComplete="email" />
                <label htmlFor="f-email">Email</label>
              </div>
            </div>
            <div className="field">
              <input id="f-phone" name="phone" type="tel" required placeholder=" " autoComplete="tel" />
              <label htmlFor="f-phone">Phone / WhatsApp</label>
            </div>
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999 }} />

            <div className="fgroup">
              <span className="mono mute">I need</span>
              <div className="chips" role="group" aria-label="Service">
                {CONTACT.services.map((s) => (
                  <button type="button" key={s} className="chip" aria-pressed={service === s} onClick={() => setService(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="fgroup">
              <span className="mono mute">Budget</span>
              <div className="chips" role="group" aria-label="Budget">
                {CONTACT.budgets.map((b) => (
                  <button type="button" key={b} className="chip" aria-pressed={budget === b} onClick={() => setBudget(b)}>
                    {b}
                  </button>
                ))}
              </div>
              {pkg && (
                <p className="mono ember" style={{ marginTop: 14 }}>
                  Package: {pkg}{' '}
                  <button type="button" className="mute link-u" onClick={() => setPkg('')}>
                    (clear)
                  </button>
                </p>
              )}
            </div>
            <div className="field">
              <textarea id="f-msg" name="message" placeholder=" " rows={4} />
              <label htmlFor="f-msg">Tell us about the project</label>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 28 }}>
              <button type="submit" className="btn" disabled={status === 'sending'} data-cursor="link">
                <span className="btn__txt">
                  <span>{status === 'sending' ? 'Sending…' : 'Send the brief'}</span>
                  <span aria-hidden="true">{status === 'sending' ? 'Sending…' : 'Send the brief'}</span>
                </span>
                <span className="btn__ico">
                  <Arrow />
                </span>
              </button>
              <span className="mono mute">Reply within one working day</span>
            </div>
            {status === 'ok' && (
              <p className="fmsg ok" role="status">
                {msg}
              </p>
            )}
            {status === 'err' && (
              <p className="fmsg err" role="alert">
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Page */

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      <Marquee items={TICKER} />
      <Manifesto />
      <Services />
      <Work />
      <Process />
      <Studio />
      <Packages />
      <FAQ />
      <Contact />
    </>
  );
}
