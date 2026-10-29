import { useCallback, useEffect, useRef, useState } from 'react';
import { Router, useRoute, useRouter } from './router';
import { applyMeta, getRouteMeta } from './seo';
import { Header, Footer, WhatsAppFloat } from './components/layout';
import { Cursor, Preloader, useLenis, useReveals } from './components/effects';
import Home from './pages/Home';
import { CaseStudy, NotFound, ServicePage } from './pages/Detail';

function Shell() {
  const route = useRoute();
  const { path } = useRouter();
  const [ready, setReady] = useState(false);
  const [curtain, setCurtain] = useState(0);
  const first = useRef(true);

  useLenis();
  useReveals(path);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    applyMeta(getRouteMeta(path));
    setCurtain((c) => c + 1);
  }, [path]);

  const onLoaded = useCallback(() => setReady(true), []);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Preloader onDone={onLoaded} />
      {curtain > 0 && <div key={curtain} className="curtain go" aria-hidden="true" />}
      <Header />
      <main id="main">
        {route.name === 'home' && <Home ready={ready} />}
        {route.name === 'case-study' && <CaseStudy key={route.slug} slug={route.slug} />}
        {route.name === 'service' && <ServicePage key={route.slug} slug={route.slug} />}
        {route.name === 'not-found' && <NotFound />}
      </main>
      <Footer />
      <WhatsAppFloat />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <Router initialPath={initialPath}>
      <Shell />
    </Router>
  );
}
