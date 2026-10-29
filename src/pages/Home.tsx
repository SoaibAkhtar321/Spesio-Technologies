import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Link, scrollToTarget } from '../router';
import { HERO, BUILD_LIST, SERVICES, PROJECTS, PROCESS, PRINCIPLES, STACK, PACKAGES, FAQS, CONTACT, SITE, STUDIO } from '../content/site';
import { Btn, Arrow, SectionHead } from '../components/ui';
import { CoverArt } from '../components/CoverArt';

/* ------------------------------------------------------------------ Hero */

function Hero() {
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visual.current;
    if (!el || !window.matchMedia('(min-width: 960px)').matches) return;
    let handle: { destroy: () => void } | undefined;
    let cancelled = false;
    const start = () =>
      import('../visual/globe').then(({ createHeroScene }) => {
        if (cancelled) return;
        try {
          handle = createHeroScene(el);
        } catch {
          /* WebGL unavailable: the static rings remain */
        }
      });
    const t = window.setTimeout(start, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      handle?.destroy();
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__text">
            <span className="label status">{HERO.eyebrow}</span>
            <h1 id="hero-title" className="h1">
              {HERO.headline}
            </h1>
            <p className="lead">{HERO.sub}</p>
            <div className="hero__ctas">
              <Btn href="/#contact">{HERO.primaryCta}</Btn>
              <Btn href="/#work" variant="outline">
                {HERO.secondaryCta}
              </Btn>
            </div>
          </div>
          <div className="hero__visual" ref={visual} aria-hidden="true">
            <div className="hero__ring" />
          </div>
        </div>
        <div className="build-list" aria-label="What we build">
          <ul>
            {BUILD_LIST.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Services */

function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead
          id="services-title"
          label="Services"
          title="What we build for you"
          intro="Four services, one team. Most projects combine a website or app with an admin panel your staff can use every day."
        />
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article className="svc" key={s.slug}>
              <div className="svc__top">
                <span className="label">{s.number}</span>
              </div>
              <h3 className="h3">
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </h3>
              <p className="muted">{s.line}</p>
              <ul>
                {s.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <Link className="tlink" href={`/services/${s.slug}`} aria-label={`More about ${s.title.toLowerCase()}`}>
                Learn more <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Work */

function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead
          id="work-title"
          label="Selected work"
          title="Websites and apps we have launched"
          intro="Real products in use today, from a property marketplace to a fashion store and a campus food ordering app."
        />
        <div className="work-grid">
          {PROJECTS.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="card" data-rv="" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
              <div className="card__media">
                <CoverArt project={p} />
                {p.liveUrl && <span className="badge">Live</span>}
              </div>
              <div className="card__meta">
                <h3 className="card__title">{p.name}</h3>
                <span className="label">
                  {p.type}, {p.category.toLowerCase()}
                </span>
              </div>
              <p>{p.summary}</p>
            </Link>
          ))}
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
        <SectionHead id="process-title" label="Process" title="How a project runs" intro="Three stages, a written scope before we start, and a working link to review every week." />
        <div className="steps">
          {PROCESS.map((s) => (
            <div className="step" key={s.number}>
              <span className="step__n">
                {s.number} · {s.duration}
              </span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Studio */

function Studio() {
  return (
    <section className="section studio" id="studio" aria-labelledby="studio-title">
      <div className="wrap studio__grid">
        <div>
          <span className="label">About the studio</span>
          <h2 className="h2" id="studio-title" style={{ marginTop: 14 }}>
            {STUDIO.heading}
          </h2>
          <div className="prose muted" style={{ marginTop: 20 }}>
            {STUDIO.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="stack" aria-label="Technologies we use">
            {STACK.map((t) => (
              <span className="chip-static" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div className="principle" key={p.title}>
              <h3>{p.title}</h3>
              <p className="muted">{p.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Packages */

function Packages() {
  const [kind, setKind] = useState<'website' | 'android'>('website');
  return (
    <section className="section" id="packages" aria-labelledby="packages-title">
      <div className="wrap">
        <SectionHead
          id="packages-title"
          label="Packages"
          title="Packages for websites and Android apps"
          intro="Start with what you need today and upgrade later. Every package includes six months of free maintenance."
        />
        <div className="tabs" role="tablist" aria-label="Package type">
          {(['website', 'android'] as const).map((k) => (
            <button key={k} role="tab" id={`tab-${k}`} aria-controls="tier-panel" aria-selected={kind === k} onClick={() => setKind(k)}>
              {k === 'website' ? 'Websites' : 'Android apps'}
            </button>
          ))}
        </div>
        <div className="tiers" role="tabpanel" id="tier-panel" aria-labelledby={`tab-${kind}`}>
          {PACKAGES[kind].map((t) => (
            <article key={t.id} className="tier">
              <div>
                <h3 className="h3">{t.name}</h3>
                <p className="muted" style={{ fontSize: 15, marginTop: 4 }}>
                  {t.tagline}
                </p>
              </div>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                className="tlink"
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('spesio:package', { detail: { kind, name: t.name } }));
                  scrollToTarget('contact');
                }}
              >
                Ask about {t.name} <Arrow />
              </a>
            </article>
          ))}
        </div>
        <p className="note">Pricing depends on scope. Share your requirements and we will send a written quote within one working day.</p>
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
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <span className="label label--accent">FAQ</span>
          <h2 id="faq-title" className="h2">
            Frequently asked questions
          </h2>
          <p className="lead">
            Have another question? Message us on{' '}
            <a className="tlink" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div className={`qa${open === i ? ' open' : ''}`} key={f.question}>
              <h3 style={{ margin: 0 }}>
                <button aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  {f.question}
                  <span className="qa__icon" aria-hidden="true" />
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
  const [service, setService] = useState<string>(CONTACT.services[0]);
  const [budget, setBudget] = useState<string>(CONTACT.budgets[4]);
  const [pkg, setPkg] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ kind: string; name: string }>).detail;
      setPkg(`${d.name} ${d.kind === 'android' ? 'Android app' : 'website'} package`);
      setService(d.kind === 'android' ? 'Android app' : 'Website');
    };
    window.addEventListener('spesio:package', on);
    return () => window.removeEventListener('spesio:package', on);
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get('company')) return; // spam trap
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') || ''),
          email: String(fd.get('email') || ''),
          phone: String(fd.get('phone') || ''),
          service: pkg ? `${service} (${pkg})` : service,
          budget,
          message: String(fd.get('message') || ''),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message);
      setStatus('ok');
      setMsg('Thank you. Your message has been sent and we will reply within one working day.');
      form.reset();
    } catch (err) {
      setStatus('err');
      setMsg((err as Error)?.message || `Your message could not be sent. Please email ${SITE.email} or WhatsApp ${SITE.phone}.`);
    }
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div>
          <span className="label label--accent">Contact</span>
          <h2 id="contact-title" className="h2" style={{ marginTop: 14 }}>
            Tell us about your project
          </h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Share what you want to build. We reply within one working day with questions or a written quote.
          </p>
          <div className="channels">
            <a className="channel" href={`mailto:${SITE.email}`}>
              <span className="label">Email</span>
              <b>{SITE.email}</b>
            </a>
            <a className="channel" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="label">Phone and WhatsApp</span>
              <b>{SITE.phone}</b>
            </a>
            <div className="channel">
              <span className="label">Location and hours</span>
              <b>{SITE.location}</b>
              <span className="muted" style={{ fontSize: 15 }}>
                {SITE.hours}
              </span>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={submit}>
          <div className="form__row">
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input id="f-name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input id="f-email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-phone">Phone or WhatsApp</label>
            <input id="f-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-company">Company</label>
            <input id="f-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <fieldset className="fgroup">
            <span>What do you need?</span>
            <div className="chips">
              {CONTACT.services.map((s) => (
                <button type="button" key={s} className="chip" aria-pressed={service === s} onClick={() => setService(s)}>
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="fgroup">
            <span>Budget</span>
            <div className="chips">
              {CONTACT.budgets.map((b) => (
                <button type="button" key={b} className="chip" aria-pressed={budget === b} onClick={() => setBudget(b)}>
                  {b}
                </button>
              ))}
            </div>
          </fieldset>
          {pkg && (
            <p className="label">
              Selected: {pkg}.{' '}
              <button type="button" className="tlink" style={{ fontSize: 12 }} onClick={() => setPkg('')}>
                Remove
              </button>
            </p>
          )}
          <div className="field">
            <label htmlFor="f-msg">Project details</label>
            <textarea id="f-msg" name="message" rows={5} />
          </div>
          <div className="form__foot">
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending' : 'Send message'}
              <Arrow />
            </button>
            <span className="faint" style={{ fontSize: 14 }}>
              See our <Link className="tlink" href="/privacy-policy" style={{ fontSize: 14 }}>privacy policy</Link>.
            </span>
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
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
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
