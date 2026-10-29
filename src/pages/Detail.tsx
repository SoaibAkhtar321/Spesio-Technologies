import type { CSSProperties } from 'react';
import { Link } from '../router';
import { PROJECTS, SERVICES, getProject, getService, SITE } from '../content/site';
import { Btn, SplitLines } from '../components/ui';
import { CoverArt } from '../components/CoverArt';
import { Contact } from './Home';

export function CaseStudy({ slug }: { slug: string }) {
  const p = getProject(slug)!;
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <nav className="crumbs mono mute" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#work">Work</Link>
            <span>/</span>
            <span className="dim" aria-current="page">
              {p.name}
            </span>
          </nav>
          <span className="mono ember" data-rv="">
            Case study {p.number} — {p.category}
          </span>
          <SplitLines as="h1" className="display" lines={[p.name]} />
          <p className="lead" style={{ marginTop: 28 }} data-rv="">
            {p.summary}
          </p>
          {p.liveUrl && (
            <div style={{ marginTop: 32 }} data-rv="">
              <Btn href={p.liveUrl} external icon="up">
                Visit the live site
              </Btn>
            </div>
          )}
        </div>
      </header>

      <div className="wrap">
        <div className="cs-media" data-rv="scale">
          <CoverArt project={p} label={false} />
        </div>

        <div className="cs-grid">
          <aside className="facts">
            <div>
              <span className="mono mute">Client sector</span>
              <span>{p.category.split('·')[0].trim()}</span>
            </div>
            <div>
              <span className="mono mute">Platform</span>
              <span>{p.category.split('·')[1]?.trim()}</span>
            </div>
            <div>
              <span className="mono mute">Stack</span>
              <span>{p.stack.join(', ')}</span>
            </div>
            <div>
              <span className="mono mute">Studio</span>
              <span>{SITE.name}</span>
            </div>
          </aside>
          <div>
            <h2 className="h3" data-rv="">
              Overview
            </h2>
            <p className="lead" style={{ marginTop: 16, maxWidth: '40em' }} data-rv="">
              {p.overview}
            </p>
            <h2 className="h3" style={{ marginTop: 56 }} data-rv="">
              The challenge
            </h2>
            <p className="lead" style={{ marginTop: 16, maxWidth: '40em' }} data-rv="">
              {p.challenge}
            </p>
            <h2 className="h3" style={{ marginTop: 56, marginBottom: 20 }} data-rv="">
              What we built
            </h2>
            <ul className="blist">
              {p.capabilities.map((c, i) => (
                <li key={c} data-rv="" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
                  <span className="mono ember">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link href={`/work/${next.slug}`} className="next" data-cursor="view" data-cursor-label="Next">
          <span className="mono mute">Next project</span>
          <h2 className="h2" style={{ marginTop: 16 }}>
            {next.name} →
          </h2>
        </Link>
      </div>
      <Contact />
    </article>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const s = getService(slug)!;
  const others = SERVICES.filter((x) => x.slug !== slug);
  const related = PROJECTS.filter((p) =>
    slug === 'android-app-development' ? p.motif === 'queue' : slug === 'web-development' ? p.motif !== 'queue' : true,
  ).slice(0, 2);

  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <nav className="crumbs mono mute" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#services">Services</Link>
            <span>/</span>
            <span className="dim" aria-current="page">
              {s.title}
            </span>
          </nav>
          <span className="mono ember" data-rv="">
            Service {s.number} — {s.title}
          </span>
          <h1 className="h2" style={{ marginTop: 20, maxWidth: '14em' }} data-rv="">
            {s.seoTitle}
          </h1>
          <p className="lead" style={{ marginTop: 28 }} data-rv="">
            {s.line}
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }} data-rv="">
            <Btn href="/#contact">Discuss your project</Btn>
            <Btn href={SITE.whatsappHref} external variant="ghost" icon="up">
              WhatsApp us
            </Btn>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="cs-grid" style={{ borderTop: '1px solid var(--line)' }}>
          <aside className="facts">
            <div>
              <span className="mono mute">Capabilities</span>
              <span>{s.capabilities.join(' · ')}</span>
            </div>
            <div>
              <span className="mono mute">Technology</span>
              <span>{s.stack.join(', ')}</span>
            </div>
            <div>
              <span className="mono mute">Location</span>
              <span>{SITE.location} — working worldwide</span>
            </div>
          </aside>
          <div>
            <p className="lead" style={{ maxWidth: '40em', fontSize: 'clamp(20px,1.9vw,28px)', color: 'var(--bone)' }} data-rv="">
              {s.description}
            </p>
            <h2 className="h3" style={{ marginTop: 56, marginBottom: 20 }} data-rv="">
              What you get
            </h2>
            <ul className="blist">
              {s.deliverables.map((d, i) => (
                <li key={d} data-rv="" style={{ '--d': `${i * 60}ms` } as CSSProperties}>
                  <span className="mono ember">0{i + 1}</span>
                  {d}
                </li>
              ))}
            </ul>
            {related.length > 0 && (
              <>
                <h2 className="h3" style={{ marginTop: 56, marginBottom: 20 }}>
                  Related work
                </h2>
                <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                  {related.map((p) => (
                    <Link key={p.slug} href={`/work/${p.slug}`} className="card" data-cursor="view">
                      <div className="card__media">
                        <CoverArt project={p} />
                      </div>
                      <div className="card__info">
                        <h3 className="card__name" style={{ fontSize: 24 }}>
                          {p.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 32 }}>
          <span className="mono mute">Other services</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`} className="svc" style={{ display: 'block' }}>
              <div className="svc__row">
                <span className="mono mute">{o.number}</span>
                <span className="svc__title" style={{ fontSize: 'clamp(26px,3.6vw,52px)' }}>
                  {o.title}
                </span>
                <span className="svc__arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Contact />
    </article>
  );
}

export function NotFound() {
  return (
    <section className="phero" style={{ minHeight: '80vh' }}>
      <div className="wrap">
        <span className="mono ember">Error 404</span>
        <SplitLines as="h1" className="display" lines={['Lost in', 'the build.']} />
        <p className="lead" style={{ marginTop: 28 }}>
          This page does not exist — but the one you are looking for is probably one click away.
        </p>
        <div style={{ marginTop: 32 }}>
          <Btn href="/">Back to home</Btn>
        </div>
      </div>
    </section>
  );
}
