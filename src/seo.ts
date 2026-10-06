import { SITE, HOME_META, getProject } from './content/site';

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

const OG_IMAGE = `${SITE.url}/og.png`;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/spesio-mark.png`,
  email: SITE.email,
  telephone: SITE.phone,
  founder: { '@type': 'Person', name: SITE.founder.name },
};

/** Pure function: safe to call from Node (prerender) and the browser. */
export function getRouteMeta(rawPath: string): RouteMeta {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  const canonical = `${SITE.url}${path === '/' ? '/' : path}`;

  if (path === '/') {
    return {
      path,
      title: HOME_META.title,
      description: HOME_META.description,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'website',
      noindex: false,
      jsonLd: [organization],
    };
  }

  const match = path.match(/^\/work\/([^/]+)$/);
  const project = match ? getProject(match[1]) : undefined;

  if (project) {
    const title = `${project.name}: ${project.category} | ${SITE.name}`;
    return {
      path,
      title,
      description: project.summary,
      canonical,
      ogImage: OG_IMAGE,
      ogType: 'article',
      noindex: false,
      jsonLd: [
        organization,
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
            { '@type': 'ListItem', position: 2, name: project.name, item: canonical },
          ],
        },
      ],
    };
  }

  return {
    path,
    title: `Page not found | ${SITE.name}`,
    description: 'This page does not exist.',
    canonical: `${SITE.url}/`,
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
  upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
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

  document.head.querySelectorAll('script[data-route-ld]').forEach((n) => n.remove());
  document.head.querySelectorAll('script[type="application/ld+json"]:not([data-route-ld])').forEach((n) => n.remove());
  meta.jsonLd.forEach((data) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-route-ld', '');
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  });
}
