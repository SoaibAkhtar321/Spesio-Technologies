import { SITE, HOME_META, FAQS, SERVICES, PROJECTS, ABOUT, STACK_GROUPS, getProject, getService, getLegal, isPlaceholder } from './content/site';

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
const OG_IMAGE = `${U}/og/home.png`;
const og = (name: string) => `${U}/og/${name}.png`;
const ORG_ID = `${U}/#organization`;
const SITE_ID = `${U}/#website`;
const FOUNDER_ID = `${U}/#founder`;

const organization = {
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: `${U}/`,
  logo: { '@type': 'ImageObject', url: `${U}/brand/spesio-mark.png`, width: 512, height: 512 },
  image: OG_IMAGE,
  description: HOME_META.description,
  slogan: 'Websites, web apps and Android apps for growing businesses.',
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
  hasMap: 'https://www.google.com/maps/search/?api=1&query=Greater+Noida%2C+Uttar+Pradesh',
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
    'Website development', 'Web design', 'Web application development', 'Android app development', 'E-commerce development',
    'AI integration', 'Chatbot development', 'Email and WhatsApp automation', 'Technical SEO', 'Core Web Vitals',
    ...STACK_GROUPS.flatMap((g) => g.items),
  ],
  ...(isPlaceholder(SITE.legal.udyam)
    ? {}
    : { identifier: { '@type': 'PropertyValue', propertyID: 'Udyam Registration Number', value: SITE.legal.udyam } }),
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
    const title = `${project.name} Case Study: ${project.type} | Spesio`;
    return {
      path,
      title,
      description: `${project.summary} Built by Spesio Technologies.`,
      canonical,
      ogImage: og(`work-${project.slug}`),
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
    const title = `${service.titleKey} in Greater Noida | Spesio`;
    return {
      path,
      title,
      description: `${service.line} Based in Greater Noida, working across India.`,
      canonical,
      ogImage: og(`service-${service.slug}`),
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
        {
          '@type': 'FAQPage',
          '@id': `${canonical}#faq`,
          mainEntity: service.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        },
      ),
    };
  }

  if (path === '/about') {
    const title = 'About Spesio Technologies | Founder-led Web & App Studio';
    return {
      path,
      title,
      description: 'Founded in 2023 by software engineer Soaib Akhtar. A remote, founder-led studio building websites, web apps and Android apps on a production grade stack.',
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'website',
      noindex: false,
      jsonLd: graph(
        organization,
        founder,
        website,
        { '@type': 'AboutPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description: ABOUT.intro, about: { '@id': ORG_ID }, isPartOf: { '@id': SITE_ID }, inLanguage: SITE.lang },
        crumbs([['Home', `${U}/`], ['About', canonical]]),
      ),
    };
  }

  if (path === '/contact') {
    const title = 'Contact Spesio Technologies | Email, WhatsApp, Enquiry Form';
    return {
      path,
      title,
      description: `Start a website, web app or Android app project. Email or WhatsApp ${SITE.phone}, or send the enquiry form. Reply within one working day.`,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'website',
      noindex: false,
      jsonLd: graph(
        organization,
        website,
        { '@type': 'ContactPage', '@id': `${canonical}#webpage`, url: canonical, name: title, about: { '@id': ORG_ID }, isPartOf: { '@id': SITE_ID }, inLanguage: SITE.lang },
        crumbs([['Home', `${U}/`], ['Contact', canonical]]),
      ),
    };
  }

  const legal = getLegal(path.slice(1));
  if (legal) {
    return {
      path,
      title: `${legal.title} | ${SITE.name}`,
      description: legal.description,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'website',
      noindex: false,
      jsonLd: graph(
        organization,
        website,
        { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: legal.title, description: legal.description, isPartOf: { '@id': SITE_ID }, inLanguage: SITE.lang },
        crumbs([['Home', `${U}/`], [legal.title, canonical]]),
      ),
    };
  }

  return {
    path,
    title: `Page not found | ${SITE.name}`,
    description: 'The page you are looking for could not be found. Visit the Spesio Technologies home page to see our services and work.',
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
