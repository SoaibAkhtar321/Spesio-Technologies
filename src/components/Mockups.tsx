import type { ReactNode } from 'react';

/**
 * Hand-built UI illustrations. They show the kind of things we build
 * (a website, an Android app, an enquiry landing in your inbox) using
 * our own projects as subject matter. No stock or AI imagery.
 */

export function BrowserFrame({ url, children, className = '' }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser__url">{url}</span>
      </div>
      <div className="browser__body">{children}</div>
    </div>
  );
}

/** Hero composite: a property website, a food-ordering app and an enquiry notification. */
export function HeroComposite() {
  return (
    <div className="composite" role="img" aria-label="Illustration of a property website in a browser, an Android food ordering app on a phone, and a new enquiry notification">
      <BrowserFrame url="propertyplanet.vercel.app" className="composite__browser">
        <div className="mini-site">
          <div className="mini-site__nav">
            <b>Property Planet</b>
            <span />
            <span />
            <span />
            <em>List a plot</em>
          </div>
          <div className="mini-site__hero">
            <div>
              <p className="mini-site__h">Find land and plots near you</p>
              <div className="mini-site__search">
                <span>Greater Noida</span>
                <em>Search</em>
              </div>
            </div>
            <div className="mini-map">
              {[
                [22, 30],
                [58, 22],
                [70, 60],
                [36, 66],
              ].map(([x, y], i) => (
                <i key={i} style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
            </div>
          </div>
          <div className="mini-site__cards">
            {['Residential plot', 'Farm land', 'Commercial plot'].map((t) => (
              <div key={t}>
                <span className="mini-site__thumb" />
                <b>{t}</b>
                <span className="mini-site__line" />
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>

      <div className="phone composite__phone" aria-hidden="true">
        <div className="phone__notch" />
        <p className="phone__title">Pickup slots</p>
        {['12:00', '12:15', '12:30', '12:45'].map((t, i) => (
          <div key={t} className={`phone__slot${i === 1 ? ' is-active' : ''}`}>
            <span>{t}</span>
            <i style={{ width: `${[70, 100, 45, 20][i]}%` }} />
          </div>
        ))}
        <div className="phone__cta">Place order</div>
      </div>

      <div className="toast composite__toast" aria-hidden="true">
        <span className="toast__icon">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12v8H2zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
        <span>
          <b>New enquiry</b>
          <small>From your website contact form</small>
        </span>
      </div>
    </div>
  );
}

/** Small illustration for each service card. */
export function ServiceArt({ kind }: { kind: string }) {
  if (kind === 'website-development')
    return (
      <div className="sart" aria-hidden="true">
        <div className="sart__browser">
          <span className="sart__bar" />
          <span className="sart__h" />
          <span className="sart__p" />
          <span className="sart__btn" />
          <span className="sart__img" />
        </div>
      </div>
    );
  if (kind === 'web-app-development')
    return (
      <div className="sart" aria-hidden="true">
        <div className="sart__dash">
          <span className="sart__side" />
          <div className="sart__chart">
            {[40, 65, 50, 80, 70, 95].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <span className="sart__rows" />
        </div>
      </div>
    );
  if (kind === 'android-app-development')
    return (
      <div className="sart" aria-hidden="true">
        <div className="sart__phone">
          <span className="sart__tile" />
          <span className="sart__tile" />
          <span className="sart__tile is-amber" />
          <span className="sart__tile" />
          <span className="sart__nav" />
        </div>
      </div>
    );
  return (
    <div className="sart" aria-hidden="true">
      <div className="sart__chat">
        <span className="sart__msg">Do you deliver to Noida?</span>
        <span className="sart__msg is-bot">Yes, delivery to Noida takes 2 days.</span>
        <span className="sart__typing">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
