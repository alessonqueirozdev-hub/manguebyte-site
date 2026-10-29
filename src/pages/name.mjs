import { dish, signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';

export function render(ctx) {
  const { t, inline, asset, sectionHead } = ctx;
  const page = t.name;

  const head = html`<section class="page-head">
    <div class="wrap">
      <p class="kicker">${escape(page.kicker)}</p>
      <h1>${escape(page.heading)}</h1>
    </div>
    ${signal({ seed: 40 })}
  </section>`;

  const story = html`<section class="section">
    <div class="wrap story">
      <div class="story-text">
        <p>${inline(page.lede)}</p>
        ${page.story.map((paragraph) => `<p>${inline(paragraph)}</p>`)}
      </div>
      <div class="story-art">${dish(escape(page.quote))}</div>
    </div>
  </section>`;

  const quote = html`<section class="section-ink">
    <div class="wrap">
      <blockquote class="quote">
        <p>${escape(page.quote)}</p>
        <footer>${escape(page.quoteSource)}</footer>
      </blockquote>
    </div>
  </section>`;

  const fits = html`<section class="section" aria-labelledby="fits">
    <div class="wrap">
      ${sectionHead({ heading: page.fitsHeading, id: 'fits' })}
      <dl class="fits">
        ${page.fits.map((fit) => `<div><dt>${escape(fit.term)}</dt><dd>${inline(fit.body)}</dd></div>`)}
      </dl>
    </div>
  </section>`;

  const logo = html`<section class="section section-tint" aria-labelledby="logo">
    <div class="wrap logo-row">
      <div class="disc-face">
        <img src="${asset('img/logo-720.webp')}" srcset="${asset('img/logo-360.webp')} 360w, ${asset('img/logo-720.webp')} 720w" sizes="280px" width="720" height="720" alt="${escape(t.nav.logoAlt)}" loading="lazy">
      </div>
      <div>
        ${sectionHead({ heading: page.logoHeading, id: 'logo' })}
        <p>${inline(page.logo)}</p>
      </div>
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + story + quote + fits + logo };
}
