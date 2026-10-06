/**
 * Post-build step: writes one HTML file per route into dist/ so crawlers and
 * share-preview bots get the right <title>, description, canonical, Open Graph
 * tags and JSON-LD without running JavaScript. The React app still mounts on
 * top as normal. Also regenerates dist/sitemap.xml from the same route list.
 *
 * Run after `vite build`:  tsx scripts/prerender.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITE, PROJECTS, HERO, routes } from '../src/content/site';
import { getRouteMeta, type RouteMeta } from '../src/seo';

const dist = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(dist, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Tags this script owns. Anything else in <head> (verification tags, favicon, scripts) is left alone.
const OWNED = [
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\s+name="(?:title|description|robots|twitter:[^"]+)"[^>]*>\s*/gi,
  /<meta\s+property="(?:og:[^"]+)"[^>]*>\s*/gi,
  /<link\s+rel="canonical"[^>]*>\s*/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
];

function headBlock(m: RouteMeta): string {
  const lines = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    `<meta property="og:type" content="${m.ogType}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(m.canonical)}" />`,
    `<meta property="og:image" content="${esc(m.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.ogImage)}" />`,
    ...m.jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ];
  return lines.map((l) => `    ${l}`).join('\n') + '\n';
}

function noscriptBlock(m: RouteMeta): string {
  const links = PROJECTS.map((p) => `<li><a href="/work/${p.slug}">${esc(p.name)}</a>: ${esc(p.summary)}</li>`).join('');
  const heading = m.path === '/' ? HERO.headline : m.title;
  return `<noscript><h1>${esc(heading)}</h1><p>${esc(m.description)}</p><ul>${links}</ul><p>${esc(SITE.email)} · ${esc(SITE.phone)}</p></noscript>`;
}

function render(m: RouteMeta): string {
  let html = template;
  for (const re of OWNED) html = html.replace(re, '');
  html = html.replace('</head>', `${headBlock(m)}  </head>`);
  html = html.replace(/(<div id="root"><\/div>)/, `$1\n    ${noscriptBlock(m)}`);
  return html;
}

for (const route of routes()) {
  const out = route === '/' ? templatePath : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(getRouteMeta(route)), 'utf-8');
  console.log(`[prerender] ${route} -> ${path.relative(process.cwd(), out)}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes()
    .map((r) => `  <url>\n    <loc>${SITE.url}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf-8');
console.log('[prerender] sitemap.xml written');
