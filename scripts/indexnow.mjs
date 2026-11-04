// Tells Bing, Yandex and other IndexNow search engines that pages changed.
// Run after each deploy:  npm run indexnow
// The key file public/498056103f67708b5df1154ebda76ec5.txt must be live on the site for this to work.
import { readFileSync } from 'node:fs';

const KEY = '498056103f67708b5df1154ebda76ec5';
const xml = readFileSync('dist/sitemap.xml', 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !u.includes('/og/'));
const host = new URL(urlList[0]).host;

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs on ${host}`);
