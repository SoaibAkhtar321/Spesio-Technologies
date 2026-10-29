/**
 * Post-build step.
 *  1. Server-renders every route to static HTML (full content, not just meta tags),
 *     so Google, Bing and LLM crawlers (GPTBot, ClaudeBot, PerplexityBot…) read the
 *     real page without running JavaScript. React hydrates on top.
 *  2. Writes per-route <title>, description, canonical, Open Graph and JSON-LD.
 *  3. Generates sitemap.xml, robots.txt, llms.txt and llms-full.txt from the same content.
 *
 * Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { SITE, PROJECTS, SERVICES, FAQS, PROCESS, PRINCIPLES, PACKAGES, HERO, STUDIO, LEGAL, routes } from '../src/content/site';
import { getRouteMeta, type RouteMeta } from '../src/seo';

const dist = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(dist, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf-8');

const ssrEntry = ['entry-server.js', 'entry-server.mjs'].map((f) => path.resolve('dist-ssr', f)).find(fs.existsSync);
if (!ssrEntry) {
  console.error('[prerender] dist-ssr/entry-server.js not found. Run the SSR build first.');
  process.exit(1);
}
const { render } = (await import(pathToFileURL(ssrEntry).href)) as { render: (p: string) => string };

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const OWNED = [
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\s+name="(?:description|robots|twitter:[^"]+)"[^>]*>\s*/gi,
  /<meta\s+property="og:[^"]+"[^>]*>\s*/gi,
  /<link\s+rel="canonical"[^>]*>\s*/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
];

function headBlock(m: RouteMeta): string {
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`,
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
    `<meta property="og:image:alt" content="${esc(SITE.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.ogImage)}" />`,
    ...m.jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ]
    .map((l) => `    ${l}`)
    .join('\n');
}

function page(route: string, meta: RouteMeta): string {
  let html = template;
  for (const re of OWNED) html = html.replace(re, '');
  html = html.replace('</head>', `${headBlock(meta)}\n  </head>`);
  html = html.replace('<!--app-->', render(route));
  return html;
}

for (const p of PROJECTS) {
  if (p.screenshot && !fs.existsSync(path.join('public', p.screenshot)))
    console.warn(`[prerender] WARNING: ${p.screenshot} is missing. Run \`npm run screenshots\` to capture it.`);
}

for (const route of routes()) {
  const out = route === '/' ? templatePath : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(route, getRouteMeta(route)), 'utf-8');
  console.log(`[prerender] ${route} -> ${path.relative(process.cwd(), out)}`);
}
// Real 404 page (Vercel serves dist/404.html with a 404 status).
fs.writeFileSync(path.join(dist, '404.html'), page('/404', getRouteMeta('/404')), 'utf-8');

/* ---------------------------------------------------------------- sitemap */
const today = new Date().toISOString().slice(0, 10);
const prio = (r: string) => (r === '/' ? '1.0' : r.startsWith('/services') ? '0.9' : r.startsWith('/work') ? '0.8' : '0.3');
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  routes()
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE.url}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${prio(r)}</priority>` +
        `\n    <image:image><image:loc>${getRouteMeta(r).ogImage}</image:loc></image:image>` +
        `\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

/* ----------------------------------------------------------------- robots */
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Meta-ExternalAgent', 'DuckAssistBot', 'cohere-ai'];
const robots =
  `# ${SITE.name}: crawlers and AI assistants are welcome.\n\nUser-agent: *\nAllow: /\nDisallow: /api/\n\n` +
  aiBots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /api/`).join('\n\n') +
  `\n\nSitemap: ${SITE.url}/sitemap.xml\n`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

/* -------------------------------------------------------------- llms.txt */
const llms = `# ${SITE.name}

> ${SITE.name} is a web design and development studio in ${SITE.location}, founded in ${SITE.foundingYear} by ${SITE.founder.name}. It designs and builds business websites, web applications, e-commerce stores, native Android apps, custom software (dashboards, ERP, CRM) and AI integrations (chatbots, document processing, workflow automation) for clients across India and worldwide.

Key facts:
- Founder: ${SITE.founder.name} (${SITE.founder.role}); clients work directly with the engineer building their product.
- Clients own their code, data, domain and accounts. Every package includes six months of free maintenance.
- Contact: ${SITE.email} · ${SITE.phone} (call / WhatsApp) · ${SITE.hours}

## Services
${SERVICES.map((s) => `- [${s.seoTitle}](${SITE.url}/services/${s.slug}): ${s.line}`).join('\n')}

## Selected work
${PROJECTS.map((p) => `- [${p.name}](${SITE.url}/work/${p.slug}): ${p.type} for ${p.category.toLowerCase()}. ${p.summary}`).join('\n')}

## Company pages
${LEGAL.map((l) => `- [${l.title}](${SITE.url}/${l.slug})`).join('\n')}

## More
- [Full details for LLMs](${SITE.url}/llms-full.txt)
- [Contact form](${SITE.url}/#contact)
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

const full = `# ${SITE.name}: full reference

${HERO.headline}
${HERO.sub}

${STUDIO.heading}
${STUDIO.body.join(' ')}

## Company
- Name: ${SITE.name}
- Type: Digital product studio (web, Android, AI)
- Founded: ${SITE.foundingYear}
- Founder: ${SITE.founder.name}, ${SITE.founder.role}
- Location: ${SITE.location}; serves clients across India and internationally (remote)
- Email: ${SITE.email}
- Phone / WhatsApp: ${SITE.phone}
- Hours: ${SITE.hours}
- Website: ${SITE.url}/

## Services
${SERVICES.map((s) => `### ${s.seoTitle}\n${s.description}\nCapabilities: ${s.capabilities.join(', ')}.\nTechnology: ${s.stack.join(', ')}.\nDeliverables: ${s.deliverables.join('; ')}.\nURL: ${SITE.url}/services/${s.slug}`).join('\n\n')}

## Case studies
${PROJECTS.map((p) => `### ${p.name} (${p.category})\n${p.overview}\nChallenge: ${p.challenge}\nBuilt: ${p.capabilities.join('; ')}.\nStack: ${p.stack.join(', ')}.${p.liveUrl ? `\nLive: ${p.liveUrl}` : ''}\nURL: ${SITE.url}/work/${p.slug}`).join('\n\n')}

## How we work
${PROCESS.map((s) => `${s.number}. ${s.title} (${s.duration}): ${s.line}`).join('\n')}

## Principles
${PRINCIPLES.map((p) => `- ${p.title}: ${p.line}`).join('\n')}

## Packages (scope; pricing on request)
Websites: ${PACKAGES.website.map((t) => `${t.name} (${t.features.join(', ')})`).join('; ')}.
Android apps: ${PACKAGES.android.map((t) => `${t.name} (${t.features.join(', ')})`).join('; ')}.

## FAQ
${FAQS.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}
`;
fs.writeFileSync(path.join(dist, 'llms-full.txt'), full);

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log('[prerender] sitemap.xml, robots.txt, llms.txt, llms-full.txt, 404.html written');
