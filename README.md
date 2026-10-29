# Spesio Technologies website

Marketing site for Spesio Technologies, a web design and development studio in Greater Noida.

## Stack

React 19 + TypeScript, built with Vite. Every route is server-rendered to static HTML at build time
(`scripts/prerender.ts`) and hydrated in the browser. The contact form posts to a Vercel function
(`api/contact.ts`) that emails enquiries through Resend.

## Commands

```bash
npm install
npm run dev          # local dev server with the contact API on http://localhost:3000
npm run build:site   # static build + prerender into dist/
npm run preview      # serve dist/ on http://localhost:4173
npm run lint         # type check
```

## Editing content

All copy, services, projects, packages, FAQs and legal text live in `src/content/site.ts`.
Page titles, descriptions, canonical URLs and structured data are generated from it in `src/seo.ts`.
The build also generates `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt`.

## Custom domain

1. Add the domain in Vercel: Project, Settings, Domains.
2. Change `SITE.url` in `src/content/site.ts` and the URLs in `index.html` to the new domain.
3. Rebuild, deploy, and submit `https://yourdomain/sitemap.xml` in Google Search Console.

## Environment variables

See `.env.example`.
