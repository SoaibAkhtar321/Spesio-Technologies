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

/** Arched window with a drawn landscape, placed behind the hero composite. */
export function HeroArch() {
  return (
    <svg className="hero-arch" viewBox="0 0 400 520" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d9ad" />
          <stop offset="0.55" stopColor="#e9b46e" />
          <stop offset="1" stopColor="#d5851f" />
        </linearGradient>
        <clipPath id="archclip">
          <path d="M0 520V200C0 90 90 0 200 0s200 90 200 200v320z" />
        </clipPath>
      </defs>
      <g clipPath="url(#archclip)">
        <rect width="400" height="520" fill="url(#sky)" />
        <circle cx="250" cy="250" r="54" fill="#fbe7c4" opacity="0.9" />
        <path d="M0 330 C80 280 150 300 220 270 S340 250 400 280 V520 H0z" fill="#a7bb8e" />
        <path d="M0 380 C90 340 170 370 250 340 S360 330 400 350 V520 H0z" fill="#87a96b" />
        <path d="M0 430 C110 400 200 430 290 410 S370 400 400 410 V520 H0z" fill="#5f7d4a" />
        <path d="M0 470 C120 455 240 480 400 460 V520 H0z" fill="#4f6b3c" />
      </g>
      <path d="M1 520V200C1 90.6 90.6 1 200 1s199 89.6 199 199v320" fill="none" stroke="rgba(58,42,30,0.18)" strokeWidth="2" />
    </svg>
  );
}

/** Detailed mini screens of each real project for the work section. */
export function ProjectScreen({ slug }: { slug: string }) {
  if (slug === 'property-planet')
    return (
      <BrowserFrame url="propertyplanet.vercel.app" className="pscreen">
        <div className="pp">
          <div className="pp__nav">
            <b>Property Planet</b>
            <span>Buy</span>
            <span>Sell</span>
            <span>Agents</span>
            <em>List a plot</em>
          </div>
          <div className="pp__body">
            <aside className="pp__filters">
              <p>Filters</p>
              {['Residential', 'Farm land', 'Commercial'].map((f, i) => (
                <label key={f}>
                  <i className={i === 0 ? 'on' : ''} />
                  {f}
                </label>
              ))}
              <p>Area</p>
              <span className="pp__range">
                <i />
              </span>
            </aside>
            <div className="pp__map">
              {[
                [20, 28],
                [44, 52],
                [66, 30],
                [78, 68],
                [32, 74],
              ].map(([x, y], i) => (
                <i key={i} className={i === 2 ? 'hot' : ''} style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
              <div className="pp__pop">
                <b>Residential plot</b>
                <small>Approved listing · Enquire</small>
              </div>
            </div>
          </div>
          <div className="pp__list">
            {['Residential plot', 'Farm land', 'Corner plot', 'Commercial plot'].map((t, i) => (
              <div key={t}>
                <span className={`pp__thumb t${i}`} />
                <b>{t}</b>
                <small>Greater Noida</small>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    );
  if (slug === 'eifa-couture')
    return (
      <BrowserFrame url="eifa-couture-ds3d-theta.vercel.app" className="pscreen">
        <div className="ec">
          <div className="ec__nav">
            <span>New in</span>
            <span>Kurtas</span>
            <b>EIFA COUTURE</b>
            <span>Sarees</span>
            <span>Cart (2)</span>
          </div>
          <div className="ec__hero">
            <div>
              <small>Hand embroidered in Lucknow</small>
              <p>The Chikankari edit</p>
              <em>Shop the collection</em>
            </div>
            <span className="ec__motif" />
          </div>
          <div className="ec__grid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <span className={`ec__tile t${i}`} />
                <i />
                <i className="short" />
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    );
  return (
    <div className="cb pscreen" aria-hidden="true">
      <div className="phone cb__phone">
        <div className="phone__notch" />
        <p className="phone__title">Menu</p>
        {['Masala dosa', 'Veg thali', 'Cold coffee'].map((t, i) => (
          <div key={t} className="cb__item">
            <span className={`cb__img t${i}`} />
            <span>{t}</span>
            <em>+</em>
          </div>
        ))}
        <div className="phone__cta">View cart</div>
      </div>
      <div className="phone cb__phone is-mid">
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
      <div className="phone cb__phone">
        <div className="phone__notch" />
        <p className="phone__title">Order status</p>
        {['Order placed', 'Being prepared', 'Ready for pickup'].map((t, i) => (
          <div key={t} className={`cb__step${i < 2 ? ' done' : ''}`}>
            <i />
            <span>{t}</span>
          </div>
        ))}
        <div className="cb__note">Pickup at 12:15</div>
      </div>
    </div>
  );
}
