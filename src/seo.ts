import { SITE, HOME_META, FAQS, SERVICES, PROJECTS, getProject, getService } from './content/site';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article';
  noindex: boolean;
  jsonLd: Record<string, unknown>[];
}

const U = SITE.url;
const OG_IMAGE = `${U}/og.png`;
const ORG_ID = `${U}/#organization`;
const SITE_ID = `${U}/#website`;
const FOUNDER_ID = `${U}/#founder`;

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: `${U}/`,
  logo: { '@type': 'ImageObject', url: `${U}/brand/spesio-mark.png`, width: 512, height: 512 },
  image: OG_IMAGE,
  description: HOME_META.description,
  slogan: 'We turn ambitious ideas into digital products.',
  foundingDate: SITE.foundingYear,
  founder: { '@id': FOUNDER_ID },
  email: SITE.email,
  telephone: SITE.phoneE164,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: [
    { '@type': 'City', name: 'Greater Noida' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'New Delhi' },
    { '@type': 'Country', name: 'India' },
    'Worldwide',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '20:00',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phoneE164,
    email: SITE.email,
    contactType: 'sales',
    availableLanguage: ['English', 'Hindi'],
  },
  knowsAbout: [
    'Web development', 'Web application development', 'Android app development', 'Kotlin', 'Next.js',
    'React', 'E-commerce development', 'AI integration', 'Chatbot development', 'Workflow automation',
    'ERP development', 'Technical SEO',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital product services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.seoTitle, url: `${U}/services/${s.slug}` },
    })),
  },
  sameAs: [SITE.socials.instagram, SITE.socials.youtube],
};

const founder = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: SITE.founder.name,
  jobTitle: SITE.founder.role,
  worksFor: { '@id': ORG_ID },
  url: `${U}/#studio`,
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${U}/`,
  name: SITE.name,
  inLanguage: SITE.lang,
  publisher: { '@id': ORG_ID },
};

const crumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

const graph = (...nodes: Record<string, unknown>[]) => [{ '@context': 'https://schema.org', '@graph': nodes }];

/** Pure function: safe to call from Node (prerender) and the browser. */
export function getRouteMeta(rawPath: string): RouteMeta {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  const canonical = `${U}${path === '/' ? '/' : path}`;

  if (path === '/') {
    return {
      path,
      title: HOME_META.title,
      description: HOME_META.description,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'website',
      noindex: false,
      jsonLd: graph(
        organization,
        founder,
        website,
        {
          '@type': 'WebPage',
          '@id': `${U}/#webpage`,
          url: `${U}/`,
          name: HOME_META.title,
          description: HOME_META.description,
          isPartOf: { '@id': SITE_ID },
          about: { '@id': ORG_ID },
          primaryImageOfPage: OG_IMAGE,
          inLanguage: SITE.lang,
        },
        {
          '@type': 'ItemList',
          name: 'Selected work',
          itemListElement: PROJECTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${U}/work/${p.slug}`,
            name: p.name,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': `${U}/#faq`,
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        },
      ),
    };
  }

  const pm = path.match(/^\/work\/([^/]+)$/);
  const project = pm ? getProject(pm[1]) : undefined;
  if (project) {
    const title = `${project.name} — ${project.category} Case Study | ${SITE.name}`;
    return {
      path,
      title,
      description: `${project.summary} Built by ${SITE.name} with ${project.stack.join(', ')}.`,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'article',
      noindex: false,
      jsonLd: graph(
        organization,
        website,
        {
          '@type': 'CreativeWork',
          '@id': `${canonical}#work`,
          name: project.name,
          headline: title,
          description: project.overview,
          genre: project.category,
          keywords: project.stack.join(', '),
          creator: { '@id': ORG_ID },
          url: canonical,
          ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
        },
        crumbs([['Home', `${U}/`], ['Work', `${U}/#work`], [project.name, canonical]]),
      ),
    };
  }

  const sm = path.match(/^\/services\/([^/]+)$/);
  const service = sm ? getService(sm[1]) : undefined;
  if (service) {
    const title = `${service.seoTitle} in Greater Noida & India | ${SITE.name}`;
    return {
      path,
      title,
      description: `${service.line} ${service.description.split('. ')[0]}.`,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'website',
      noindex: false,
      jsonLd: graph(
        organization,
        website,
        {
          '@type': 'Service',
          '@id': `${canonical}#service`,
          name: service.seoTitle,
          serviceType: service.title,
          description: service.description,
          provider: { '@id': ORG_ID },
          areaServed: ['India', 'Worldwide'],
          url: canonical,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: service.title,
            itemListElement: service.capabilities.map((c) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: c },
            })),
          },
        },
        crumbs([['Home', `${U}/`], ['Services', `${U}/#services`], [service.seoTitle, canonical]]),
      ),
    };
  }

  return {
    path,
    title: `Page not found | ${SITE.name}`,
    description: 'This page does not exist.',
    canonical: `${U}/`,
    ogImage: OG_IMAGE,
    ogType: 'website',
    noindex: true,
    jsonLd: [],
  };
}

// ---- Browser side -------------------------------------------------------

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Keeps <head> in sync after client-side navigation. */
export function applyMeta(meta: RouteMeta) {
  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:url', meta.canonical);
  upsertMeta('property', 'og:type', meta.ogType);
  upsertMeta('property', 'og:image', meta.ogImage);
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertMeta('name', 'twitter:image', meta.ogImage);

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = meta.canonical;

  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove());
  meta.jsonLd.forEach((data) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  });
}
