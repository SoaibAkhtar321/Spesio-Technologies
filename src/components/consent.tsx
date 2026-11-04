import { useEffect, useState } from 'react';
import { Link } from '../router';

/**
 * Cookie consent for Google Analytics 4.
 * Nothing is shown and nothing is loaded unless VITE_GA_MEASUREMENT_ID is set.
 * GA only loads after the visitor clicks Accept. The choice is stored locally and
 * can be changed from the "Cookie settings" link in the footer.
 */
export const GA_ID: string | undefined = import.meta.env.VITE_GA_MEASUREMENT_ID;
const KEY = 'spesio-cookie-consent';

function loadGA(id: string) {
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  if (document.getElementById('ga4')) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', id, { anonymize_ip: true });
  const s = document.createElement('script');
  s.id = 'ga4';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event('spesio:cookies'));
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {
      /* storage unavailable */
    }
    if (choice === 'accepted') loadGA(GA_ID);
    else if (choice !== 'declined') setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener('spesio:cookies', reopen);
    return () => window.removeEventListener('spesio:cookies', reopen);
  }, []);

  const decide = (accepted: boolean) => {
    try {
      localStorage.setItem(KEY, accepted ? 'accepted' : 'declined');
    } catch {
      /* storage unavailable */
    }
    if (accepted && GA_ID) loadGA(GA_ID);
    if (!accepted && document.getElementById('ga4')) window.location.reload();
    setShow(false);
  };

  if (!GA_ID || !show) return null;
  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p>
        We use analytics cookies (Google Analytics) to understand how visitors use this site. They are only set if you accept. See our{' '}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>
      <div className="cookie__btns">
        <button type="button" className="btn btn--sm" onClick={() => decide(true)}>
          Accept
        </button>
        <button type="button" className="btn btn--outline btn--sm" onClick={() => decide(false)}>
          Decline
        </button>
      </div>
    </div>
  );
}
