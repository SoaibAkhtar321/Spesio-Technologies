// Captures fresh screenshots of the live client projects into public/work/.
// Usage: npm run screenshots   (needs internet; downloads a headless browser on first run)
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const shots = {
  'property-planet': 'https://propertyplanet.vercel.app/',
  'eifa-couture': 'https://eifa-couture-ds3d-git-main-campus-bite-s-projects.vercel.app/',
};

mkdirSync('public/work', { recursive: true });
execSync('npx -y playwright@1.49.1 install chromium', { stdio: 'inherit' });
for (const [slug, url] of Object.entries(shots)) {
  const out = `public/work/${slug}.jpg`;
  console.log(`Capturing ${url} -> ${out}`);
  execSync(`npx -y playwright@1.49.1 screenshot --viewport-size=1440,900 --wait-for-timeout=4000 "${url}" "${out}"`, { stdio: 'inherit' });
}
console.log('Done. Rebuild with: npm run build:site');
