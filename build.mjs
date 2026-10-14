// Builds the site into dist/. It needs Node 20 or newer and nothing else.
//
//   node build.mjs
//
// Besides writing the pages it checks three things, and fails if any of them
// is wrong: that the two languages say the same things, key for key; that
// every link from one page to another leads somewhere; and that every proof
// and code sample a page asks for was found in the framework's repository.

import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import config from './site.config.mjs';
import en from './src/content/en.mjs';
import pt from './src/content/pt.mjs';
import { claims, juceAhead } from './src/content/claims.mjs';
import { areas, missing } from './src/content/features.mjs';
import { beyondParity, phases } from './src/content/roadmap.mjs';
import { layout, makeContext } from './src/lib/site.mjs';

import * as home from './src/pages/home.mjs';
import * as beyond from './src/pages/beyond.mjs';
import * as features from './src/pages/features.mjs';
import * as start from './src/pages/start.mjs';
import * as roadmap from './src/pages/roadmap.mjs';
import * as name from './src/pages/name.mjs';
import * as contribute from './src/pages/contribute.mjs';
import * as notFound from './src/pages/not-found.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const strings = { en, pt };

const pages = [
  { id: 'home', path: '/', module: home },
  { id: 'beyond', path: '/beyond-juce/', module: beyond, nav: true },
  { id: 'features', path: '/features/', module: features, nav: true },
  { id: 'start', path: '/start/', module: start, nav: true },
  { id: 'roadmap', path: '/roadmap/', module: roadmap, nav: true },
  { id: 'name', path: '/name/', module: name, nav: true },
  { id: 'contribute', path: '/contribute/', module: contribute, nav: true },
  { id: 'notFound', path: '/404.html', module: notFound, noindex: true },
];

const problems = [];

// --- The two languages must have the same shape. ---------------------------

function shape(value, where, other, otherName) {
  if (Array.isArray(value)) {
    if (!Array.isArray(other) || other.length !== value.length) {
      problems.push(`${where}: ${otherName} does not have the same ${value.length} entries`);
      return;
    }
    value.forEach((item, index) => shape(item, `${where}[${index}]`, other[index], otherName));
  } else if (value && typeof value === 'object') {
    if (!other || typeof other !== 'object') {
      problems.push(`${where}: missing in ${otherName}`);
      return;
    }
    for (const key of Object.keys(value)) {
      if (!(key in other)) problems.push(`${where}.${key}: missing in ${otherName}`);
      else shape(value[key], `${where}.${key}`, other[key], otherName);
    }
  } else if (typeof value === 'string' && (typeof other !== 'string' || other.trim() === '')) {
    problems.push(`${where}: missing in ${otherName}`);
  }
}

function sameShape(first, second, where) {
  shape(first, where, second, 'pt');
  shape(second, where, first, 'en');
}

sameShape(en, pt, 'strings');
// Data files keep both languages side by side, as `en` and `pt`.
(function walk(value, where) {
  if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${where}[${index}]`));
  else if (value && typeof value === 'object') {
    if ('en' in value || 'pt' in value) sameShape(value.en, value.pt, where);
    for (const [key, item] of Object.entries(value)) if (key !== 'en' && key !== 'pt') walk(item, `${where}.${key}`);
  }
})({ claims, juceAhead, areas, missing, phases, beyondParity }, 'data');

// --- Assets. ----------------------------------------------------------------

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'src/assets'), path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'src/assets/img/favicon.ico'), path.join(dist, 'favicon.ico'));

// Every asset is addressed with a hash of its contents, so that a server can
// tell browsers to keep it for a year and a changed file is still fetched.
const hashes = new Map();
async function hashAssets(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) await hashAssets(full);
    else {
      const key = path.relative(path.join(dist, 'assets'), full).replaceAll('\\', '/');
      hashes.set(key, createHash('sha256').update(await readFile(full)).digest('hex').slice(0, 10));
    }
  }
}
await hashAssets(path.join(dist, 'assets'));

// The stylesheet names its fonts by path; give those the same treatment.
const cssPath = path.join(dist, 'assets/css/site.css');
const css = (await readFile(cssPath, 'utf8')).replace(/url\((['"]?)\/assets\/([^'")]+)\1\)/g, (whole, quote, key) => {
  if (!hashes.has(key)) problems.push(`site.css: no asset called ${key}`);
  return `url(/assets/${key}?v=${hashes.get(key)})`;
});
await writeFile(cssPath, css);
hashes.set('css/site.css', createHash('sha256').update(css).digest('hex').slice(0, 10));

function assetUrl(key) {
  if (!hashes.has(key)) throw new Error(`no asset called ${key}`);
  return `/assets/${key}?v=${hashes.get(key)}`;
}

// --- Pages. -----------------------------------------------------------------

const generated = JSON.parse(await readFile(path.join(root, 'src/content/generated.json'), 'utf8'));
if (generated.commit !== config.source.commit) {
  problems.push('src/content/generated.json was made for another commit: run `node tools/sync.mjs`');
}

const written = new Set();
const links = [];
let bytes = 0;

for (const language of config.languages) {
  for (const page of pages) {
    const ctx = makeContext({ language, strings: strings[language.code], page, pages, generated, assetUrl, links });
    const output = layout(ctx, page.module.render(ctx));
    const address = `${language.prefix}${page.path}`;
    const file = path.join(dist, address.endsWith('/') ? `${address}index.html` : address);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, output);
    written.add(address);
    bytes += Buffer.byteLength(output);

    for (const anchor of output.matchAll(/href="#([^"]+)"/g)) {
      if (!output.includes(`id="${anchor[1]}"`)) problems.push(`${address}: nothing has the id "${anchor[1]}"`);
    }
  }
}

// --- Links between pages. ---------------------------------------------------

for (const { from, to } of links) {
  const [address, anchor] = to.split('#');
  if (!written.has(address)) {
    problems.push(`${from}: links to ${to}, which is not a page`);
  } else if (anchor) {
    const target = await readFile(path.join(dist, address, 'index.html'), 'utf8');
    if (!target.includes(`id="${anchor}"`)) problems.push(`${from}: links to ${to}, but nothing there has that id`);
  }
}

// --- What search engines read. ----------------------------------------------

const indexed = pages.filter((page) => !page.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexed
  .flatMap((page) =>
    config.languages.map(
      (language) => `  <url>
    <loc>${config.baseUrl}${language.prefix}${page.path}</loc>
${config.languages.map((other) => `    <xhtml:link rel="alternate" hreflang="${other.tag}" href="${config.baseUrl}${other.prefix}${page.path}"/>`).join('\n')}
    <lastmod>${config.source.date}</lastmod>
  </url>`,
    ),
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${config.baseUrl}/sitemap.xml\n`);

if (problems.length) {
  console.error(`The build found ${problems.length} problem(s):\n${[...new Set(problems)].map((problem) => `  - ${problem}`).join('\n')}`);
  process.exit(1);
}

console.log(
  `Built ${written.size} pages in ${config.languages.length} languages (${(bytes / 1024).toFixed(0)} KB of HTML) ` +
    `from framework commit ${config.source.commit.slice(0, 7)}.`,
);
