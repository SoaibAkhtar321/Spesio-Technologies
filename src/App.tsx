import { useEffect, useRef } from 'react';
import { Router, useRoute, useRouter } from './router';
import { applyMeta, getRouteMeta } from './seo';
import { Header, Footer, WhatsAppFloat } from './components/layout';
import { useReveals } from './components/effects';
import Home from './pages/Home';
import { CaseStudy, LegalPage, NotFound, ServicePage } from './pages/Detail';

function Shell() {
  const route = useRoute();
  const { path } = useRouter();
  const first = useRef(true);

  useReveals(path);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    applyMeta(getRouteMeta(route.name === 'not-found' ? '/404' : path));
  }, [path, route.name]);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <main id="main" key={path} className="page">
        {route.name === 'home' && <Home />}
        {route.name === 'case-study' && <CaseStudy key={route.slug} slug={route.slug} />}
        {route.name === 'service' && <ServicePage key={route.slug} slug={route.slug} />}
        {route.name === 'legal' && <LegalPage key={route.slug} slug={route.slug} />}
        {route.name === 'not-found' && <NotFound />}
      </main>
      <Footer />
      <WhatsAppFloat />
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
