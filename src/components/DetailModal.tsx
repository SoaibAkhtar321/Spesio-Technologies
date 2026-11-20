import { useEffect, useState } from 'react';
import { X, ArrowRight, ExternalLink, Check, Layers } from 'lucide-react';
import { Link, scrollToTarget } from '../router';
import { LiveShot, ProjectScreen } from './Mockups';
import type { ProcessStepDetail, Project, Service, Tier } from '../content/site';

export type ModalState =
  | { type: 'service'; service: Service }
  | { type: 'project'; project: Project }
  | { type: 'package'; tier: Tier; kind: 'website' | 'android' }
  | { type: 'process'; step: ProcessStepDetail }
  | null;

interface DetailModalProps {
  modal: ModalState;
  onClose: () => void;
}

export function DetailModal({ modal, onClose }: DetailModalProps) {
  const [shotTab, setShotTab] = useState<'primary' | 'secondary'>('primary');

  useEffect(() => {
    setShotTab('primary');
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [modal, onClose]);

  if (!modal) return null;

  const titleId = 'spesio-detail-modal-title';

  const handleContactAction = (packageDetail?: { kind: 'website' | 'android'; name: string }) => {
    if (packageDetail) {
      window.dispatchEvent(new CustomEvent('spesio:package', { detail: packageDetail }));
    }
    onClose();
    requestAnimationFrame(() => scrollToTarget('contact'));
  };

  return (
    <div
      className="dmodal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`dmodal-sheet${modal.type === 'project' ? ' dmodal-sheet--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dmodal-handle" aria-hidden="true" />
        <div className="dmodal-head">
          <div className="dmodal-head__meta">
            {modal.type === 'service' && (
              <span className="label label--accent">Service {modal.service.number}</span>
            )}
            {modal.type === 'project' && (
              <span className="label label--accent">
                {modal.project.number} · {modal.project.type} · {modal.project.category}
              </span>
            )}
            {modal.type === 'package' && (
              <span className="label label--accent">
                {modal.kind === 'website' ? 'Website package' : 'Android app package'} · {modal.tier.name}
              </span>
            )}
            {modal.type === 'process' && (
              <span className="label label--accent">{modal.step.duration}</span>
            )}
            <h2 id={titleId} className="dmodal-title">
              {modal.type === 'service' && modal.service.title}
              {modal.type === 'project' && modal.project.name}
              {modal.type === 'package' && `${modal.tier.name}: ${modal.tier.tagline}`}
              {modal.type === 'process' && modal.step.title}
            </h2>
          </div>
          <button
            type="button"
            className="dmodal-close"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="dmodal-body">
          {modal.type === 'service' && (
            <div className="dmodal-stack">
              <div className="dmodal-media">
                <img
                  src={modal.service.image}
                  alt={modal.service.imageAlt}
                  width={1200}
                  height={900}
                  loading="eager"
                />
              </div>
              <p className="dmodal-lead">{modal.service.description}</p>

              <div className="dmodal-cols">
                <div>
                  <h3 className="label">Core capabilities</h3>
                  <ul className="dmodal-list">
                    {modal.service.capabilities.map((c) => (
                      <li key={c}>
                        <Check size={15} aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label">Key deliverables</h3>
                  <ul className="dmodal-list">
                    {modal.service.deliverables.slice(0, 4).map((d) => (
                      <li key={d}>
                        <Check size={15} aria-hidden="true" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="dmodal-tech">
                <span className="label">Technology stack</span>
                <p>{modal.service.stack.join(' · ')}</p>
              </div>
            </div>
          )}

          {modal.type === 'project' && (
            <div className="dmodal-stack">
              {modal.project.screenshot && modal.project.liveUrl ? (
                <div className="dmodal-gallery">
                  {modal.project.secondaryScreenshot && (
                    <div className="dmodal-shot-bar" role="tablist" aria-label="Project live screens">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={shotTab === 'primary'}
                        onClick={() => setShotTab('primary')}
                      >
                        <Layers size={14} aria-hidden="true" />
                        Screen 01 · Homepage
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={shotTab === 'secondary'}
                        onClick={() => setShotTab('secondary')}
                      >
                        <Layers size={14} aria-hidden="true" />
                        Screen 02 · {modal.project.secondaryScreenshot.label}
                      </button>
                    </div>
                  )}

                  <div className="dmodal-shot-main">
                    {shotTab === 'secondary' && modal.project.secondaryScreenshot ? (
                      <LiveShot
                        src={modal.project.secondaryScreenshot.src}
                        url={modal.project.secondaryScreenshot.url}
                        alt={modal.project.secondaryScreenshot.alt}
                      />
                    ) : (
                      <LiveShot
                        src={modal.project.screenshot}
                        url={modal.project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        alt={`Live homepage screenshot of ${modal.project.name}`}
                      />
                    )}
                  </div>

                  {modal.project.secondaryScreenshot && (
                    <div className="dmodal-thumbs" aria-label="All captured screens">
                      <button
                        type="button"
                        className={`dmodal-thumb${shotTab === 'primary' ? ' is-active' : ''}`}
                        onClick={() => setShotTab('primary')}
                      >
                        <img
                          src={modal.project.screenshot}
                          alt={`${modal.project.name} homepage preview`}
                          width={320}
                          height={200}
                        />
                        <span>Homepage</span>
                      </button>
                      <button
                        type="button"
                        className={`dmodal-thumb${shotTab === 'secondary' ? ' is-active' : ''}`}
                        onClick={() => setShotTab('secondary')}
                      >
                        <img
                          src={modal.project.secondaryScreenshot.src}
                          alt={modal.project.secondaryScreenshot.alt}
                          width={320}
                          height={200}
                        />
                        <span>{modal.project.secondaryScreenshot.label}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="dmodal-mockup">
                  <ProjectScreen slug={modal.project.slug} />
                </div>
              )}

              <p className="dmodal-lead">{modal.project.overview}</p>

              <div className="dmodal-note">
                <h3 className="label">The challenge solved</h3>
                <p>{modal.project.challenge}</p>
              </div>

              <div className="dmodal-cols">
                <div>
                  <h3 className="label">What we built</h3>
                  <ul className="dmodal-list">
                    {modal.project.capabilities.map((c) => (
                      <li key={c}>
                        <Check size={15} aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label">Technology</h3>
                  <p className="dmodal-mono">{modal.project.stack.join(' · ')}</p>
                </div>
              </div>
            </div>
          )}

          {modal.type === 'package' && (
            <div className="dmodal-stack">
              <p className="dmodal-lead">{modal.tier.suitableFor}</p>

              <div>
                <h3 className="label">Included deliverables</h3>
                <ul className="dmodal-list">
                  {modal.tier.deliverables.map((d) => (
                    <li key={d}>
                      <Check size={15} aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dmodal-cols">
                <div>
                  <h3 className="label">What Spesio handles</h3>
                  <ul className="dmodal-list">
                    {modal.tier.spesioHandles.map((s) => (
                      <li key={s}>
                        <Check size={15} aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label">What you provide</h3>
                  <ul className="dmodal-list">
                    {modal.tier.clientProvides.map((c) => (
                      <li key={c}>
                        <Check size={15} aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="dmodal-note">
                <p>
                  <strong>Handover &amp; support:</strong> {modal.tier.handoverSupport}
                </p>
                <p>
                  <strong>Third-party costs:</strong> {modal.tier.thirdPartyNotes}
                </p>
              </div>
            </div>
          )}

          {modal.type === 'process' && (
            <div className="dmodal-stack">
              <p className="dmodal-lead">{modal.step.summary}</p>
              <div className="dmodal-cols">
                <div>
                  <h3 className="label">What Spesio handles</h3>
                  <ul className="dmodal-list">
                    {modal.step.spesioHandles.map((item) => (
                      <li key={item}>
                        <Check size={15} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label">What you provide</h3>
                  <ul className="dmodal-list">
                    {modal.step.clientProvides.map((item) => (
                      <li key={item}>
                        <Check size={15} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="dmodal-note dmodal-note--accent">
                <span className="label label--accent">Stage outcome</span>
                <p>{modal.step.outcome}</p>
              </div>
            </div>
          )}
        </div>

        <div className="dmodal-foot">
          {modal.type === 'service' && (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => handleContactAction()}
              >
                Start a Project
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <Link
                href={`/services/${modal.service.slug}`}
                className="btn btn--outline"
                onClick={onClose}
              >
                Full service guide
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </>
          )}

          {modal.type === 'project' && (
            <>
              <Link
                href={`/work/${modal.project.slug}`}
                className="btn"
                onClick={onClose}
              >
                Full case study
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              {modal.project.liveUrl && (
                <a
                  href={modal.project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  Visit live site
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              )}
            </>
          )}

          {modal.type === 'package' && (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => handleContactAction({ kind: modal.kind, name: modal.tier.name })}
              >
                Ask about {modal.tier.name}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <Link href="/packages" className="btn btn--outline" onClick={onClose}>
                Compare all packages
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </>
          )}

          {modal.type === 'process' && (
            <>
              <button type="button" className="btn" onClick={() => handleContactAction()}>
                Start a Project
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <Link href="/process" className="btn btn--outline" onClick={onClose}>
                Full process guide
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
