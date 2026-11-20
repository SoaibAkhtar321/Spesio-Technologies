import { useEffect, useState, type FormEvent } from 'react';
import { ChevronRight, Layers, Mail, MapPin, PhoneCall, Smartphone } from 'lucide-react';
import { Link, scrollToTarget } from '../router';
import {
  HERO,
  BUILD_LIST,
  SERVICES,
  PROJECTS,
  PROCESS_STEPS,
  PACKAGES,
  FAQS,
  CONTACT,
  SITE,
} from '../content/site';
import { Btn, Arrow, SectionHead } from '../components/ui';
import { BrowserFrame, HeroComposite, LiveShot, ProjectScreen } from '../components/Mockups';
import { DetailModal, type ModalState } from '../components/DetailModal';
import { CoverArt } from '../components/CoverArt';

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media-bg" aria-hidden="true">
        <img
          src={HERO.heroImage}
          alt=""
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
        />
        <div className="hero__scrim" />
      </div>

      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="label hero__eyebrow">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="h1">
            Websites, software and apps that <em>bring you</em> customers.
          </h1>
          <p className="lead">{HERO.sub}</p>
          <div className="hero__ctas">
            <Btn href="/#contact">{HERO.primaryCta}</Btn>
            <Btn href="/#work" variant="outline">
              {HERO.secondaryCta}
            </Btn>
          </div>
          <p className="hero__trust-line">{HERO.trustStatement}</p>
          <ul className="hero__note" aria-label="Key commitments">
            {HERO.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" data-rv="">
          <div className="hero__photo-card" aria-hidden="true">
            <img
              src={HERO.heroImage}
              alt="Spesio Technologies studio workspace"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
            <span className="hero__photo-cap">Built directly with the engineer · Full code handover</span>
          </div>
          <div className="hero__composite-wrap">
            <HeroComposite />
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="proof">
          <span className="label">What we build</span>
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

function Services({ onOpen }: { onOpen: (m: ModalState) => void }) {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="wrap split">
        <div className="split__aside">
          <div className="sticky">
            <span className="label label--accent">Services</span>
            <h2 className="h2" id="services-title">
              Everything you need to <em>build and launch.</em>
            </h2>
            <p className="lead">
              Tap any service card to view full deliverables, technology stack and timelines.
            </p>
            <div className="sticky__links">
              <Link className="tlink" href="/services">
                Explore all services <Arrow />
              </Link>
              <Link className="tlink" href="/#contact">
                Discuss Your Project <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s) => (
            <button
              key={s.slug}
              type="button"
              className="svc-card"
              onClick={() => onOpen({ type: 'service', service: s })}
              aria-label={`View details for ${s.title}`}
              data-rv=""
            >
              <div className="svc-card__media">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                <span className="svc-card__num">{s.number}</span>
              </div>
              <div className="svc-card__body">
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__line">{s.shortLine}</p>
                <span className="svc-card__cue">
                  View details
                  <ChevronRight size={15} aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Work */

export function WorkCard({ p, large = false }: { p: (typeof PROJECTS)[number]; large?: boolean }) {
  const url = p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${p.name} · Android app`;
  return (
    <Link href={`/work/${p.slug}`} className={`card${large ? ' card--large' : ''}`}>
      <BrowserFrame url={url}>
        <div className="card__media">
          {p.screenshot ? (
            <img
              className="liveshot"
              src={p.screenshot}
              alt={`Screenshot of the ${p.name} website`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <CoverArt project={p} />
          )}
        </div>
      </BrowserFrame>
      <div className="card__meta">
        <h3 className="card__title">{p.name}</h3>
        <span className="label">{p.type}</span>
      </div>
      <p>{p.summary}</p>
    </Link>
  );
}

function Work({ onOpen }: { onOpen: (m: ModalState) => void }) {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-row">
          <div className="sec-head">
            <span className="label label--accent">Selected work</span>
            <h2 className="h2" id="work-title">
              Products we have <em>built and launched.</em>
            </h2>
          </div>
          <p className="lead">
            Tap any project to inspect live homepage &amp; inner-page screens, architecture and technical scope.
          </p>
        </div>

        <div className="work-compact-grid">
          {PROJECTS.map((p) => (
            <button
              key={p.slug}
              type="button"
              className={`work-tap work-tap--${p.slug}`}
              onClick={() => onOpen({ type: 'project', project: p })}
              aria-label={`Open ${p.name} project details and screenshots`}
              data-rv=""
            >
              <div className="work-tap__media">
                {p.screenshot && p.liveUrl ? (
                  <LiveShot
                    src={p.screenshot}
                    url={p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    alt={`Live preview of ${p.name}`}
                  />
                ) : (
                  <div className="work-tap__android">
                    <ProjectScreen slug={p.slug} />
                  </div>
                )}
                {p.secondaryScreenshot && (
                  <span className="work-tap__screens">
                    <Layers size={12} aria-hidden="true" />
                    2 screens
                  </span>
                )}
                {!p.secondaryScreenshot && (
                  <span className="work-tap__screens">
                    <Smartphone size={12} aria-hidden="true" />
                    Android app
                  </span>
                )}
              </div>

              <div className="work-tap__body">
                <p className="work-tap__meta">
                  <span>{p.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.type}</span>
                </p>
                <h3 className="work-tap__title">{p.name}</h3>
                <p className="work-tap__summary">{p.summary}</p>
                <span className="work-tap__cue">
                  Open project <ChevronRight size={15} aria-hidden="true" />
                </span>
              </div>

              <span className="work-tap__mobile-chevron" aria-hidden="true">
                <ChevronRight size={18} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Packages */

function Packages({ onOpen }: { onOpen: (m: ModalState) => void }) {
  const [kind, setKind] = useState<'website' | 'android'>('website');
  return (
    <section className="section" id="packages" aria-labelledby="packages-title">
      <div className="wrap">
        <div className="sec-row">
          <SectionHead
            id="packages-title"
            label="Packages"
            title={
              <>
                Pick a package, <em>expand as you grow.</em>
              </>
            }
            intro="Tap any package to see complete deliverables. Free maintenance and support are included for up to 3 months."
          />
          <div style={{ justifySelf: 'start' }}>
            <Link className="tlink" href="/packages">
              Compare packages in detail <Arrow />
            </Link>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Package type">
          {(['website', 'android'] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`tab-${k}`}
              aria-controls="tier-panel"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
            >
              {k === 'website' ? 'Websites' : 'Android apps'}
            </button>
          ))}
        </div>

        <div className="tiers-compact" role="tabpanel" id="tier-panel" aria-labelledby={`tab-${kind}`}>
          {PACKAGES[kind].map((t, idx) => (
            <button
              key={t.id}
              type="button"
              className="tier-card"
              onClick={() => onOpen({ type: 'package', tier: t, kind })}
              aria-label={`View ${t.name} ${kind === 'website' ? 'website' : 'Android app'} package details`}
            >
              <div className="tier-card__head">
                <span className="tier-card__idx">0{idx + 1}</span>
                <h3 className="tier-card__name">{t.name}</h3>
              </div>
              <p className="tier-card__tagline">{t.tagline}</p>
              <ul className="tier-card__highlights">
                {t.features.slice(0, 2).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <span className="tier-card__cue">
                Deliverables <ChevronRight size={15} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>

        <p className="note">
          Share your requirements and we will send a written scope and quote within one working day.{' '}
          <Link className="tlink" href="/packages" style={{ fontSize: 14 }}>
            View full deliverables &amp; comparison
          </Link>
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Process */

function Process({ onOpen }: { onOpen: (m: ModalState) => void }) {
  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="sec-row">
          <div className="sec-head">
            <span className="label label--accent">How we work</span>
            <h2 className="h2" id="process-title">
              Four steps, <em>start to launch.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              A written scope first, staged preview links during build, and free maintenance and support for up to 3 months.
            </p>
            <div style={{ marginTop: 14 }}>
              <Link className="tlink" href="/process">
                See full process details <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <div className="proc-grid">
          {PROCESS_STEPS.map((s) => (
            <button
              key={s.number}
              type="button"
              className="proc-card"
              onClick={() => onOpen({ type: 'process', step: s })}
              aria-label={`View details for ${s.duration}: ${s.title}`}
              data-rv=""
            >
              <div className="proc-card__head">
                <span className="tstep__dot">{s.number}</span>
                <span className="label">{s.duration}</span>
              </div>
              <h3 className="h3">{s.title}</h3>
              <p className="proc-card__line muted">{s.line}</p>
              <span className="proc-card__cue">
                What happens here <ChevronRight size={15} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <span className="label label--accent">FAQ</span>
          <h2 id="faq-title" className="h2">
            Frequently asked <em>questions.</em>
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
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
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

export function Contact({ initialPackage }: { initialPackage?: { kind: string; name: string } | null }) {
  const [service, setService] = useState<string>(() =>
    initialPackage ? (initialPackage.kind === 'android' ? 'Android app' : 'Website') : CONTACT.services[0],
  );
  const [pkg, setPkg] = useState(() =>
    initialPackage ? `${initialPackage.name} ${initialPackage.kind === 'android' ? 'Android app' : 'website'} package` : '',
  );
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
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!name || !email || !phone) {
      setStatus('err');
      setMsg('Please fill in your name, email address and phone or WhatsApp number.');
      return;
    }

    setStatus('sending');
    setMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: pkg ? `${service} (${pkg})` : service,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message);
      setStatus('ok');
      setMsg('Thank you. Your message has been sent and we will reply within one working day.');
      form.reset();
    } catch (err) {
      setStatus('err');
      setMsg(
        (err as Error)?.message ||
          `Your message could not be sent. Please email ${SITE.email} or WhatsApp ${SITE.phone}.`,
      );
    }
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div>
          <span className="label label--accent">Get in touch</span>
          <h2 id="contact-title" className="h2" style={{ marginTop: 14 }}>
            Discuss your <em>project with us.</em>
          </h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Share what you are building. Based in Uttar Pradesh, we work with businesses across Delhi NCR and all over India, and reply within one working day.
          </p>
          <div className="channels">
            <a className="channel channel--email" href={`mailto:${SITE.email}`}>
              <span className="channel__icon" aria-hidden="true">
                <Mail size={18} />
              </span>
              <span className="channel__text">
                <span className="label">Email</span>
                <b>{SITE.email}</b>
              </span>
            </a>
            <a className="channel channel--phone" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="channel__icon" aria-hidden="true">
                <PhoneCall size={18} />
              </span>
              <span className="channel__text">
                <span className="label">Phone and WhatsApp</span>
                <b>{SITE.phone}</b>
              </span>
            </a>
            <div className="channel channel--loc">
              <span className="channel__icon" aria-hidden="true">
                <MapPin size={18} />
              </span>
              <span className="channel__text">
                <span className="label">Location and hours</span>
                <b>{SITE.location}</b>
                <span className="muted" style={{ fontSize: 14.5 }}>
                  {SITE.hours}
                </span>
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
            <legend className="fgroup__legend">What do you need?</legend>
            <div className="chips">
              {CONTACT.services.map((s) => (
                <button
                  type="button"
                  key={s}
                  className="chip"
                  aria-pressed={service === s}
                  onClick={() => setService(s)}
                >
                  {s}
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
            <label htmlFor="f-msg">Tell us about your project</label>
            <textarea id="f-msg" name="message" rows={4} />
          </div>
          <div className="form__foot">
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending' : 'Start a Project'}
              <Arrow />
            </button>
            <span className="faint" style={{ fontSize: 14 }}>
              See our{' '}
              <Link className="tlink" href="/privacy-policy" style={{ fontSize: 14 }}>
                privacy policy
              </Link>
              .
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
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <>
      <Hero />
      <Services onOpen={setModal} />
      <Work onOpen={setModal} />
      <Packages onOpen={setModal} />
      <Process onOpen={setModal} />
      <FAQ />
      <Contact />
      <DetailModal modal={modal} onClose={() => setModal(null)} />
    </>
  );
}
