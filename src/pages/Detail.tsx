import { useState, type CSSProperties } from 'react';
import { Link, scrollToTarget } from '../router';
import {
  ABOUT,
  DELIVERY,
  PACKAGE_COMPARISON,
  PACKAGES,
  PHASED_NOTE,
  PRINCIPLES,
  PROCESS_STEPS,
  PROJECTS,
  SERVICE_PILLARS,
  SERVICES,
  SITE,
  getLegal,
  getProject,
  getService,
  isPlaceholder,
} from '../content/site';
import { AREAS, AREA_GROUPS } from '../content/guides';
import { Arrow, Breadcrumbs, Btn } from '../components/ui';
import { CoverArt } from '../components/CoverArt';
import { LiveShot, ProjectScreen, ServiceArt } from '../components/Mockups';
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
          <div className={`cs-gallery${p.secondaryScreenshot ? ' cs-gallery--dual' : ''}`} data-rv="">
            <figure className="cs-gallery__item">
              <LiveShot
                src={p.screenshot}
                url={p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                alt={`Homepage screenshot of the ${p.name} website`}
              />
              <figcaption className="cs-gallery__cap">Screen 01 · Homepage</figcaption>
            </figure>
            {p.secondaryScreenshot && (
              <figure className="cs-gallery__item">
                <LiveShot
                  src={p.secondaryScreenshot.src}
                  url={p.secondaryScreenshot.url}
                  alt={p.secondaryScreenshot.alt}
                />
                <figcaption className="cs-gallery__cap">Screen 02 · {p.secondaryScreenshot.label}</figcaption>
              </figure>
            )}
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

export function ServicesPage() {
  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Services']]} />
          <span className="label label--accent">Services</span>
          <h1 className="h1">Websites, Android apps, custom software, ERP &amp; AI.</h1>
          <p className="lead">
            End-to-end engineering for growing businesses across Uttar Pradesh, Delhi NCR and all over India. Scoped in writing, built directly with the engineer, and handed over with full source code.
          </p>
          <div className="phero__ctas">
            <Btn href="#contact">Start a Project</Btn>
            <Btn href="/packages" variant="outline">
              View packages
            </Btn>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="svc-pillars">
            {SERVICE_PILLARS.map((pillar) => {
              const linkedProject = pillar.projectSlug ? getProject(pillar.projectSlug) : undefined;
              const isLiveShot = Boolean(
                pillar.visualType === 'screenshot' && linkedProject?.screenshot && linkedProject?.liveUrl,
              );

              return (
                <article key={pillar.id} className="svc-pillar" data-rv="">
                  <div className="svc-pillar__content">
                    <span className="label label--accent">Service {pillar.number}</span>
                    <h2 className="h2">{pillar.title}</h2>
                    <p className="lead">{pillar.summary}</p>
                    <p className="muted">{pillar.details}</p>
                    <ul className="ticks">
                      {pillar.useCases.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="svc-pillar__actions">
                      <Link className="tlink" href={`/services/${pillar.slug}`}>
                        Service details <Arrow />
                      </Link>
                      {linkedProject && (
                        <Link className="tlink" href={`/work/${linkedProject.slug}`}>
                          View {linkedProject.name} case study <Arrow />
                        </Link>
                      )}
                      <a
                        className="tlink"
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToTarget('contact');
                        }}
                      >
                        Discuss your project <Arrow />
                      </a>
                    </div>
                  </div>

                  <figure className="svc-pillar__media">
                    {isLiveShot && linkedProject?.screenshot && linkedProject.liveUrl ? (
                      <LiveShot
                        src={linkedProject.screenshot}
                        url={linkedProject.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        alt={`Live screenshot of ${linkedProject.name}`}
                      />
                    ) : pillar.id === 'android-applications' ? (
                      <div className="svc-pillar__mockup">
                        <ProjectScreen slug="campusbite" />
                      </div>
                    ) : pillar.image ? (
                      <div className="svc-pillar__photo-wrap">
                        <img
                          className="svc-pillar__photo"
                          src={pillar.image}
                          alt={`${pillar.title} preview`}
                          width={1200}
                          height={900}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="svc-pillar__art">
                        <ServiceArt kind={pillar.id} />
                      </div>
                    )}
                    <figcaption className="svc-pillar__caption">
                      {isLiveShot && linkedProject
                        ? `Live client project: ${linkedProject.name}`
                        : pillar.id === 'android-applications'
                          ? 'Illustrative Android UI preview (CampusBite workflow)'
                          : `Illustrative ${pillar.title.toLowerCase()} preview`}
                    </figcaption>
                  </figure>
                </article>
              );
            })}
          </div>

          <div className="svc-deep-links">
            <h2 className="label" style={{ marginBottom: 12 }}>
              Detailed service guides
            </h2>
            <div className="more-links">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <span>
                    <span className="label" style={{ marginRight: 10 }}>
                      {s.number}
                    </span>
                    {s.seoTitle}
                  </span>
                  <Arrow size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </article>
  );
}

export function PackagesPage() {
  const [kind, setKind] = useState<'website' | 'android'>('website');
  const tiers = PACKAGES[kind];
  const rows = PACKAGE_COMPARISON[kind];

  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Packages']]} />
          <span className="label label--accent">Packages</span>
          <h1 className="h1">Website &amp; Android app packages built around clear scope.</h1>
          <p className="lead">
            Every tier defines deliverables, what you provide, what Spesio handles, and full source code handover. Free maintenance and support are included for up to 3 months.
          </p>
          <div className="phero__ctas">
            <Btn href="#contact">Discuss Your Project</Btn>
            <Btn href="/process" variant="outline">
              See our 4-step process
            </Btn>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="pkg-toolbar">
            <div className="tabs" role="tablist" aria-label="Package type">
              {(['website', 'android'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  id={`pkg-tab-${k}`}
                  aria-controls="pkg-panel"
                  aria-selected={kind === k}
                  onClick={() => setKind(k)}
                >
                  {k === 'website' ? 'Websites' : 'Android apps'}
                </button>
              ))}
            </div>
            <p className="muted" style={{ fontSize: 15 }}>
              Need custom software, an ERP system or AI integration?{' '}
              <a
                className="tlink"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget('contact');
                }}
              >
                Request a custom scope
              </a>
              .
            </p>
          </div>

          <div id="pkg-panel" role="tabpanel" aria-labelledby={`pkg-tab-${kind}`}>
            <div className="pkg-detail-grid">
              {tiers.map((t) => (
                <article key={t.id} className="pkg-detail-card" data-rv="">
                  <div className="pkg-detail-card__head">
                    <div>
                      <span className="label label--accent">{kind === 'website' ? 'Website' : 'Android app'} package</span>
                      <h2 className="h3" style={{ marginTop: 6 }}>
                        {t.name}: {t.tagline}
                      </h2>
                    </div>
                    <p className="pkg-detail-card__tech">{t.tech.join(' · ')}</p>
                  </div>

                  <p className="muted">{t.suitableFor}</p>

                  <div className="pkg-detail-card__block">
                    <h3 className="label">Deliverables</h3>
                    <ul className="ticks">
                      {t.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pkg-resp">
                    <div>
                      <h3 className="label">What you provide</h3>
                      <ul className="pkg-resp__list">
                        {t.clientProvides.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="label">What Spesio handles</h3>
                      <ul className="pkg-resp__list">
                        {t.spesioHandles.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pkg-notes">
                    <p>
                      <b>Third-party costs:</b> {t.thirdPartyNotes}
                    </p>
                    <p>
                      <b>Handover &amp; support:</b> {t.handoverSupport}
                    </p>
                  </div>

                  <div className="pkg-detail-card__foot">
                    <a
                      className="btn btn--sm"
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('spesio:package', { detail: { kind, name: t.name } }));
                        scrollToTarget('contact');
                      }}
                    >
                      Ask about {t.name}
                      <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="pkg-cmp">
              <div className="sec-head" style={{ marginBottom: 20 }}>
                <span className="label label--accent">Comparison</span>
                <h2 className="h2">{kind === 'website' ? 'Website packages side by side' : 'Android app packages side by side'}</h2>
              </div>
              <div className="table-wrap">
                <table className="cmp-table">
                  <thead>
                    <tr>
                      <th scope="col">Capability</th>
                      {tiers.map((t) => (
                        <th key={t.id} scope="col">
                          {t.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        {tiers.map((t) => (
                          <td key={t.id}>{row.values[t.id]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pkg-guide">
            <div className="sec-head" style={{ marginBottom: 24 }}>
              <span className="label label--accent">Choosing a tier</span>
              <h2 className="h2">How to decide which package fits best</h2>
              <p className="lead">
                You do not have to guess. Share what you need today, and we recommend the right tier or phased roadmap before writing a proposal.
              </p>
            </div>
            <div className="pkg-guide__grid">
              <div>
                <h3>Bronze</h3>
                <p className="muted">Best when you need a credible digital presence quickly with core pages and direct contact channels.</p>
              </div>
              <div>
                <h3>Silver</h3>
                <p className="muted">Best when you showcase a structured service or product catalogue and take direct WhatsApp or email enquiries.</p>
              </div>
              <div>
                <h3>Gold</h3>
                <p className="muted">Best when your team wants to manage products, orders, users or enquiries directly inside an admin panel.</p>
              </div>
              <div>
                <h3>Diamond</h3>
                <p className="muted">Best when you run full online commerce with Razorpay checkout, inventory, finance reports or ERP workflows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </article>
  );
}

export function ProcessPage() {
  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Process']]} />
          <span className="label label--accent">How we work</span>
          <h1 className="h1">Four steps from written scope to launch &amp; support.</h1>
          <p className="lead">
            Every project follows the same structured workflow: clear written scope first, direct access to the engineer, shared preview builds, full handover, and up to 3 months of free support.
          </p>
          <div className="phero__ctas">
            <Btn href="#contact">Start a Project</Btn>
            <Btn href="/packages" variant="outline">
              Explore packages
            </Btn>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <ol className="proc-steps">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="proc-step" data-rv="">
                <div className="proc-step__head">
                  <span className="tstep__dot">{step.number}</span>
                  <div>
                    <span className="label">{step.duration}</span>
                    <h2 className="h2" style={{ marginTop: 4 }}>
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="lead">{step.summary}</p>

                <div className="proc-step__cols">
                  <div>
                    <h3 className="label">What Spesio handles</h3>
                    <ul className="ticks">
                      {step.spesioHandles.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="label">What you provide</h3>
                    <ul className="pkg-resp__list">
                      {step.clientProvides.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="proc-step__outcome">
                  <span className="label label--accent">Outcome</span>
                  <span>{step.outcome}</span>
                </p>
              </li>
            ))}
          </ol>

          <div className="support-box" data-rv="">
            <div>
              <span className="label label--accent">Post-launch policy</span>
              <h2 className="h3" style={{ marginTop: 6 }}>
                Up to 3 months of free maintenance &amp; support
              </h2>
              <p className="muted" style={{ marginTop: 8 }}>
                {PHASED_NOTE}
              </p>
              <div style={{ marginTop: 14 }}>
                <Link className="tlink" href="/support-and-maintenance-policy">
                  Read full support &amp; maintenance policy <Arrow />
                </Link>
              </div>
            </div>
          </div>

          <div className="handover" style={{ marginTop: 'clamp(36px, 4vw, 56px)' }}>
            <span className="label label--accent">Handover</span>
            <h2 className="h2" style={{ marginTop: 8 }}>
              {DELIVERY.heading}
            </h2>
            <ul className="handover__list">
              {DELIVERY.items.map((item) => (
                <li key={item.title}>
                  <b>{item.title}</b>
                  <span className="muted">{item.line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
          <Breadcrumbs items={[['Home', '/'], ['Services', '/services'], [s.title]]} />
          <span className="label label--accent">Service {s.number}</span>
          <h1 className="h1">{s.seoTitle}</h1>
          <p className="lead">{s.line}</p>
          <p className="answer">{s.answer}</p>
          <p className="label" style={{ marginTop: 18 }}>
            Last updated {SITE.updatedLabel}
          </p>
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
              <span>Based in {SITE.city}, Uttar Pradesh, serving clients across India</span>
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
                      {p.screenshot && p.liveUrl ? (
                        <div className="card__media card__media--shot">
                          <img
                            className="liveshot"
                            src={p.screenshot}
                            alt={`Live screenshot of ${p.name}`}
                            width={1440}
                            height={900}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div className="card__media">
                          <CoverArt project={p} />
                        </div>
                      )}
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
          <Link href="/services">
            Services <Arrow size={16} />
          </Link>
          <Link href="/packages">
            Packages <Arrow size={16} />
          </Link>
          <Link href="/process">
            Process <Arrow size={16} />
          </Link>
          <Link href="/#work">
            Our work <Arrow size={16} />
          </Link>
          <Link href="/contact">
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
          <p className="label" style={{ marginTop: 18 }}>
            Last updated {SITE.updatedLabel}
          </p>
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
            {!isPlaceholder(L.udyam) && (
              <div>
                <span className="label">Udyam registration</span>
                <span>{L.udyam}</span>
              </div>
            )}
            <div>
              <span className="label">Based in</span>
              <span>Based in {SITE.city}, {SITE.region}. Serving businesses across Delhi NCR and all over India remotely.</span>
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
          <Link href="/services">
            Services <Arrow size={16} />
          </Link>
          <Link href="/packages">
            Packages <Arrow size={16} />
          </Link>
          <Link href="/process">
            How we work <Arrow size={16} />
          </Link>
          <Link href="/areas-we-serve">
            Areas we serve <Arrow size={16} />
          </Link>
          <Link href="/#work">
            Selected work <Arrow size={16} />
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


function QA({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div>
      {items.map((f) => (
        <div className="svc-faq__item" key={f.question}>
          <h3>{f.question}</h3>
          <p className="muted">{f.answer}</p>
        </div>
      ))}
    </div>
  );
}

export function AreasPage() {
  return (
    <article>
      <header className="phero">
        <div className="wrap">
          <Breadcrumbs items={[['Home', '/'], ['Areas we serve']]} />
          <span className="label label--accent">Areas we serve</span>
          <h1 className="h1">{AREAS.title}</h1>
          <p className="answer">{AREAS.answer}</p>
          <p className="label" style={{ marginTop: 18 }}>
            Last updated {SITE.updatedLabel}
          </p>
        </div>
      </header>
      <div className="wrap">
        <div className="legal" style={{ maxWidth: 860 }}>
          <h2>How a project works when you are in another city</h2>
          <ol className="blist">
            {AREAS.steps.map((t, i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ol>
          <h2>Cities we work with</h2>
          <p>
            We are based in {SITE.city} and work remotely. These are some of the cities our clients can be in. If yours is not listed, we can still work with you.
          </p>
          <div className="areas">
            {AREA_GROUPS.map((g) => (
              <div key={g.region}>
                <h3>{g.region}</h3>
                <p>{g.cities.join(', ')}</p>
              </div>
            ))}
          </div>
          <h2>Services available in every city</h2>
          <div className="more-links">
            {SERVICES.map((sv) => (
              <Link key={sv.slug} href={`/services/${sv.slug}`}>
                {sv.title}
                <Arrow size={16} />
              </Link>
            ))}
          </div>
        </div>
        <section className="svc-faq" aria-labelledby="areas-faq-title">
          <h2 className="h2" id="areas-faq-title">
            Working with clients in other cities
          </h2>
          <QA items={AREAS.faqs} />
        </section>
      </div>
      <Contact />
    </article>
  );
}
