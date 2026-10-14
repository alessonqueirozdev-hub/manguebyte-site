// What every page is built with: links, proofs, code samples and the frame
// around the content.

import config from '../../site.config.mjs';
import { juceVersion } from '../content/claims.mjs';
import { escape, html, makeInline } from './html.mjs';
import { highlight } from './highlight.mjs';

export const shortCommit = config.source.commit.slice(0, 7);
export const repoUrl = `https://github.com/${config.repo}`;

// A file or a folder of the repository, as it was at the pinned commit.
export function repoFile(path, line) {
  const folder = path.endsWith('/');
  const clean = folder ? path.slice(0, -1) : path;
  const anchor = line ? `#L${line}` : '';
  return `${repoUrl}/${folder ? 'tree' : 'blob'}/${config.source.commit}/${clean}${anchor}`;
}

const ICONS = {
  done: '<path d="M3.5 8.5l3 3 6-7"/>',
  wip: '<circle cx="8" cy="8" r="5.5"/><path d="M8 2.5a5.5 5.5 0 010 11z" fill="currentColor" stroke="none"/>',
  todo: '<circle cx="8" cy="8" r="5.5"/>',
  none: '<path d="M4 8h8"/>',
  arrow: '<path d="M3 8h9M8.5 4l4 4-4 4"/>',
  out: '<path d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5L7.5 8.5"/>',
  sun: '<circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"/>',
  moon: '<path d="M13 9.6A5.6 5.6 0 016.4 3a5.6 5.6 0 106.6 6.6z"/>',
};

export function icon(name, label) {
  const hidden = label ? `role="img" aria-label="${escape(label)}"` : 'aria-hidden="true"';
  return `<svg class="icon icon-${name}" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${hidden} focusable="false">${ICONS[name]}</svg>`;
}

const DATES = {
  en: (date) => new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
  pt: (date) => new Date(`${date}T12:00:00Z`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
};

// Everything a page needs to know about where and in which language it is
// being built.
export function makeContext({ language, strings, page, pages, generated, assetUrl, links }) {
  const prefix = language.prefix;
  const url = (path) => `${prefix}${path}`;

  const values = {
    commit: shortCommit,
    juce: juceVersion,
    commitUrl: `${repoUrl}/commit/${config.source.commit}`,
    ciUrl: `${repoUrl}/actions/runs/${config.source.ciRun}`,
    issuesUrl: `${repoUrl}/issues`,
    email: config.contact,
    date: DATES[language.code](config.source.date),
  };
  const fill = (text, more = {}) =>
    text.replace(/\{(\w+)\}/g, (whole, key) => more[key] ?? values[key] ?? whole);

  function proof(id) {
    const found = generated.proofs[id];
    if (!found) throw new Error(`${page.id}: no proof called "${id}" in sources.mjs`);
    return { ...found, href: repoFile(found.file, found.line) };
  }

  function resolve(target) {
    if (target.startsWith('proof:')) return { href: proof(target.slice(6)).href };
    if (target.startsWith('repo:')) return { href: repoFile(target.slice(5)) };
    if (target.startsWith('/')) {
      links.push({ from: `${prefix}${page.path}`, to: url(target) });
      return { href: url(target) };
    }
    return { href: target };
  }

  const inline = makeInline(resolve);
  const text = (source, more) => inline(fill(source, more));

  // Test names are long. Let them break after an underscore, not mid-word.
  const breakable = (name) => escape(name).replaceAll('_', '_<wbr>');

  // Where a proof lives, in a word: the crate, the example plugin, or CI.
  function origin(found) {
    const crate = found.file.match(/^crates\/manguebyte-?([a-z0-9]*)\//);
    if (crate) return crate[1] || 'manguebyte';
    const plugin = found.file.match(/^plugins\/(\w+)\//);
    if (plugin) return plugin[1];
    return found.file.endsWith('.yml') ? 'ci' : 'file';
  }

  // A link to a proof, written the way a test runner reports a test.
  function proofLine(id) {
    const found = proof(id);
    return html`<a class="proof" href="${escape(found.href)}"><span class="proof-kind">${origin(found)}</span><span class="proof-name">${breakable(found.name)}</span><span class="proof-ok">${escape(strings.home.proof.ok)}</span></a>`;
  }

  const proofList = (ids) => html`<ul class="proofs">${ids.map((id) => `<li>${proofLine(id)}</li>`)}</ul>`;

  // A block of code with its language, a way to copy it, and, for a sample
  // taken from the repository, where exactly it came from.
  function codeBlock(source, lang, caption = '') {
    const label = { rust: 'Rust', toml: 'TOML', bash: 'Shell' }[lang] ?? lang;
    return html`<figure class="code">
      <div class="code-frame">
        <div class="code-bar"><span class="code-lang">${label}</span><button class="copy" type="button" data-copy data-done="${escape(strings.code.copied)}">${escape(strings.code.copy)}</button></div>
        <pre tabindex="0"><code>${highlight(source, lang)}</code></pre>
      </div>
      ${caption && `<figcaption>${caption}</figcaption>`}
    </figure>`;
  }

  function sample(id) {
    const found = generated.snippets[id];
    if (!found) throw new Error(`${page.id}: no sample called "${id}" in sources.mjs`);
    const gaps = found.lines.some((line) => 'gap' in line && line.gap.trim() !== '');
    const partial = gaps || found.ranges.length > 1;
    const first = found.ranges[0];
    const where = { file: found.file, url: `${repoFile(found.file)}#L${first[0]}-L${found.ranges.at(-1)[1]}` };
    const caption = text(partial ? strings.code.excerpt : strings.code.whole, where) + (gaps ? ` ${text(strings.code.gaps)}` : '');
    return codeBlock(found.lines, found.lang, caption);
  }

  const sectionHead = ({ number, kicker, heading, id }) => html`<header class="section-head">
      ${(number || kicker) && `<p class="kicker">${number ? `<span class="kicker-number">${number}</span>` : ''}${kicker ? escape(kicker) : ''}</p>`}
      <h2${id ? ` id="${id}"` : ''}>${inline(heading)}</h2>
    </header>`;

  return {
    config,
    language,
    lang: language.code,
    t: strings,
    page,
    pages,
    url,
    asset: assetUrl,
    inline,
    text,
    fill,
    proof,
    origin,
    breakable,
    proofLine,
    proofList,
    codeBlock,
    sample,
    sectionHead,
    pick: (item) => item[language.code],
  };
}

// The page around the content.
export function layout(ctx, { title, description, body, wide = false }) {
  const { t, language, page, pages, config: site, url, asset } = ctx;
  const canonical = (lang) => `${site.baseUrl}${lang.prefix}${page.path}`;
  const other = site.languages.find((candidate) => candidate.code !== language.code);
  const isHome = page.id === 'home';
  const fullTitle = isHome ? title : `${title} · ${t.site.name}`;
  const nav = pages.filter((entry) => entry.nav);

  return html`<!doctype html>
<html lang="${language.tag}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(fullTitle)}</title>
<meta name="description" content="${escape(description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f3ead7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f120e" media="(prefers-color-scheme: dark)">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical(language)}">
${site.languages.map((lang) => `<link rel="alternate" hreflang="${lang.tag}" href="${canonical(lang)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${canonical(site.languages[0])}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escape(t.site.name)}">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${canonical(language)}">
<meta property="og:image" content="${site.baseUrl}/assets/img/card.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${language.tag.replace('-', '_')}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="${asset('img/icon-192.png')}" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="${asset('img/apple-touch-icon.png')}">
<link rel="preload" href="${asset('fonts/londrina-solid-900.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset('fonts/atkinson-hyperlegible-next.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('css/site.css')}">
<script src="${asset('js/site.js')}"></script>
</head>
<body class="page-${page.id}">
<a class="skip" href="#content">${escape(t.nav.skip)}</a>
<header class="masthead">
  <div class="wrap masthead-row">
    <a class="brand" href="${url('/')}"${isHome ? ' aria-current="page"' : ''}>
      <img class="brand-mark" src="${asset('img/icon-192.png')}" alt="" width="40" height="40">
      <span class="brand-name">${escape(t.site.name)}</span>
    </a>
    <nav class="nav" aria-label="${escape(t.nav.label)}">
      <ul>
        ${nav.map((entry) => `<li><a href="${url(entry.path)}"${entry.id === page.id ? ' aria-current="page"' : ''}>${escape(t.nav[entry.id])}</a></li>`)}
      </ul>
    </nav>
    <div class="tools">
      <a class="tool tool-language" href="${other.prefix}${page.noindex ? '/' : page.path}" lang="${other.tag}" hreflang="${other.tag}" title="${escape(t.nav.otherLanguageHint)}">${escape(t.nav.otherLanguage)}</a>
      <button class="tool tool-theme" type="button" data-theme-toggle aria-label="${escape(t.nav.theme)}" title="${escape(t.nav.theme)}">${icon('sun')}${icon('moon')}</button>
      <a class="tool tool-repo" href="${repoUrl}">${escape(t.nav.github)}${icon('out')}</a>
    </div>
  </div>
</header>
<main id="content"${wide ? ' class="wide"' : ''}>
${body}
</main>
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <section class="footer-status">
        <h2>${escape(t.footer.statusTitle)}</h2>
        <p>${ctx.text(t.footer.status)}</p>
      </section>
      <section>
        <h2>${escape(t.footer.sourceTitle)}</h2>
        <p>${ctx.text(t.footer.source)}</p>
      </section>
      <section>
        <h2>${escape(t.footer.licenceTitle)}</h2>
        <p>${ctx.text(t.footer.licence)}</p>
        <h2>${escape(t.footer.contactTitle)}</h2>
        <p>${ctx.text(t.footer.contact)}</p>
      </section>
      <section class="footer-legal">
        <h2>${escape(t.footer.legalTitle)}</h2>
        <p>${ctx.text(t.footer.legal)}</p>
        <p>${ctx.text(t.footer.unrelated)}</p>
      </section>
    </div>
    <div class="footer-end">
      <p>${escape(t.footer.madeIn)} ${escape(t.footer.privacy)}</p>
      <p>${escape(t.footer.colophon)}</p>
    </div>
  </div>
</footer>
</body>
</html>
`;
}
