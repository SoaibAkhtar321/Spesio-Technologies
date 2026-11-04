import type { CSSProperties } from 'react';
import { Link } from '../router';
import { ABOUT, PRINCIPLES, PROJECTS, SERVICES, SITE, getLegal, getProject, getService } from '../content/site';
import { Arrow, Breadcrumbs, Btn } from '../components/ui';
import { CoverArt } from '../components/CoverArt';
import { LiveShot } from '../components/Mockups';
import { Contact } from './Home';

export function CaseStudy({ slug }: { slug: string }) {
  const p = getProject(slug)!;
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const service = getService(p.service)!;

  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Work', '/#work'], [p.name]]} />
          <span className="label label--accent">
            {p.type}, {p.category.toLowerCase()}
          </span>
          <h1 className="h1">{p.name}</h1>
          <p className="lead">{p.summary}</p>
          {p.liveUrl && (
            <div className="phero__ctas">
              <Btn href={p.liveUrl} external>
                Visit the live site
              </Btn>
            </div>
          )}
        </div>
      </header>

      <div className="wrap">
        {p.screenshot && p.liveUrl ? (
          <div className="cs-shot" data-rv="">
            <LiveShot src={p.screenshot} url={p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} alt={`Screenshot of the ${p.name} website`} />
          </div>
        ) : (
          <div className="cs-media" data-rv="">
            <CoverArt project={p} />
          </div>
        )}

        <div className="detail">
          <aside className="facts">
            <div>
              <span className="label">Industry</span>
              <span>{p.category}</span>
            </div>
            <div>
              <span className="label">Deliverable</span>
              <span>{p.type}</span>
            </div>
            <div>
              <span className="label">Technology</span>
              <span>{p.stack.join(', ')}</span>
            </div>
            <div>
              <span className="label">Service</span>
              <Link className="tlink" href={`/services/${service.slug}`} style={{ justifySelf: 'start' }}>
                {service.title}
              </Link>
            </div>
          </aside>
          <div>
            <h2>Overview</h2>
            <p className="lead">{p.overview}</p>
            <h2>The challenge</h2>
            <p className="lead">{p.challenge}</p>
            <h2>What we built</h2>
            <ul className="blist">
              {p.capabilities.map((c, i) => (
                <li key={c} data-rv="" style={{ '--d': `${i * 40}ms` } as CSSProperties}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="more-links" style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
          <Link href={`/work/${next.slug}`}>
            <span>
              <span className="label" style={{ display: 'block' }}>
                Next project
              </span>
              {next.name}
            </span>
            <Arrow size={16} />
          </Link>
        </div>
      </div>
      <Contact />
    </article>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const s = getService(slug)!;
  const others = SERVICES.filter((x) => x.slug !== slug);
  const related = PROJECTS.filter((p) => p.service === slug);

  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Services', '/#services'], [s.title]]} />
          <span className="label label--accent">Service {s.number}</span>
          <h1 className="h1">{s.seoTitle} in Greater Noida</h1>
          <p className="lead">{s.line}</p>
          <div className="phero__ctas">
            <Btn href="#contact">Discuss your project</Btn>
            <Btn href={SITE.whatsappHref} external variant="outline">
              WhatsApp us
            </Btn>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="detail" style={{ borderTop: '1px solid var(--line)' }}>
          <aside className="facts">
            <div>
              <span className="label">Includes</span>
              <span>{s.capabilities.join(', ')}</span>
            </div>
            <div>
              <span className="label">Technology</span>
              <span>{s.stack.join(', ')}</span>
            </div>
            <div>
              <span className="label">Location</span>
              <span>{SITE.city}, working with clients across India</span>
            </div>
          </aside>
          <div>
            <h2>What we do</h2>
            <p className="lead">{s.description}</p>
            <h2>What you get</h2>
            <ul className="blist">
              {s.deliverables.map((d, i) => (
                <li key={d}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {d}
                </li>
              ))}
            </ul>
            {related.length > 0 && (
              <>
                <h2>Related work</h2>
                <div className="related">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/work/${p.slug}`} className="card">
                      <div className="card__media">
                        <CoverArt project={p} />
                      </div>
                      <div className="card__meta">
                        <h3 className="card__title">{p.name}</h3>
                      </div>
                      <p>{p.summary}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <section className="svc-faq" aria-labelledby="svc-faq-title">
          <h2 className="h2" id="svc-faq-title">
            {s.title} questions
          </h2>
          <div>
            {s.faqs.map((f) => (
              <div className="svc-faq__item" key={f.question}>
                <h3>{f.question}</h3>
                <p className="muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
          <h2 className="label" style={{ marginBottom: 12 }}>
            Other services
          </h2>
          <div className="more-links">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`}>
                {o.title}
                <Arrow size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Contact />
    </article>
  );
}

export function LegalPage({ slug }: { slug: string }) {
  const l = getLegal(slug)!;
  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], [l.title]]} />
          <h1 className="h1">{l.title}</h1>
          <p className="lead">{l.description}</p>
          <p className="label" style={{ marginTop: 18 }}>
            Last updated {SITE.legalUpdated}
          </p>
        </div>
      </header>
      <div className="wrap">
        <div className="legal">
          {l.sections.map((sec) => (
            <section key={sec.heading}>
              <h2>{sec.heading}</h2>
              {sec.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

export function NotFound() {
  return (
    <section className="phero" style={{ minHeight: '60vh' }}>
      <div className="wrap">
        <span className="label label--accent">Error 404</span>
        <h1 className="h1">This page could not be found</h1>
        <p className="lead">The link may be out of date, or the page may have moved. These pages might help:</p>
        <div className="more-links" style={{ marginTop: 32, maxWidth: 560 }}>
          <Link href="/">
            Home <Arrow size={16} />
          </Link>
          <Link href="/#services">
            Services <Arrow size={16} />
          </Link>
          <Link href="/#work">
            Our work <Arrow size={16} />
          </Link>
          <Link href="/#contact">
            Contact us <Arrow size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const L = SITE.legal;
  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['About']]} />
          <span className="label label--accent">About us</span>
          <h1 className="h1">{ABOUT.title}</h1>
          <p className="lead">{ABOUT.intro}</p>
        </div>
      </header>
      <div className="wrap">
        <div className="about-grid">
          <div>
            <h2>Our story</h2>
            {ABOUT.story.map((p) => (
              <p className="lead" key={p}>
                {p}
              </p>
            ))}
            <h2>How our team works</h2>
            <p className="lead">{ABOUT.team}</p>
            <h2>What we stand for</h2>
            <ul className="blist">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{p.title}.</b> {p.line}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="info-card" aria-label="Company details">
            <div>
              <span className="label">Founder</span>
              <span>
                {SITE.founder.name}, {SITE.founder.role}
              </span>
            </div>
            <div>
              <span className="label">Founded</span>
              <span>{SITE.foundingYear}</span>
            </div>
            <div>
              <span className="label">Business type</span>
              <span>{L.entity}</span>
            </div>
            <div>
              <span className="label">Udyam registration</span>
              <span>{L.udyam}</span>
            </div>
            <div>
              <span className="label">Based in</span>
              <span>{SITE.city}, India. Working remotely with clients across India.</span>
            </div>
            <div>
              <span className="label">Contact</span>
              <a className="tlink" href={`mailto:${SITE.email}`} style={{ justifySelf: 'start' }}>
                {SITE.email}
              </a>
            </div>
          </aside>
        </div>
        <div className="more-links" style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
          <Link href="/#stack">
            Our technology stack <Arrow size={16} />
          </Link>
          <Link href="/#process">
            How we work <Arrow size={16} />
          </Link>
          <Link href="/#work">
            Our work <Arrow size={16} />
          </Link>
        </div>
      </div>
      <Contact />
    </article>
  );
}

export function ContactPage() {
  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Contact']]} />
          <span className="label label--accent">Contact</span>
          <h1 className="h1">Contact Spesio Technologies</h1>
          <p className="lead">
            Email, WhatsApp or the form below. We reply within one working day, {SITE.hours}.
          </p>
          <div className="phero__ctas">
            <Btn href={SITE.whatsappHref} external>
              WhatsApp us
            </Btn>
            <Btn href={`mailto:${SITE.email}`} external variant="outline">
              Email us
            </Btn>
          </div>
        </div>
      </header>
      <Contact />
    </article>
  );
}
