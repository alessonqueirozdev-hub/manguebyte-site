import { signal } from '../lib/art.mjs';
import { projectCards } from '../lib/ecosystem.mjs';
import { escape, html } from '../lib/html.mjs';
import { aratuUrl, icon, repoFile } from '../lib/site.mjs';

export function render(ctx) {
  const { t, text, inline, asset, sample, sectionHead, proofList } = ctx;
  const page = t.aratu;

  const head = html`<section class="page-head aratu-head">
    <div class="wrap aratu-grid">
      <div>
        <p class="kicker">${escape(page.kicker)}</p>
        <h1>${escape(page.heading)}</h1>
        <p class="lede">${text(page.lede)}</p>
        <p class="actions"><a class="button button-primary" href="${escape(ctx.config.related.aratu.editor)}">${escape(page.tryIt)}${icon('out')}</a></p>
        <p class="young">${text(page.status)}</p>
      </div>
      <div class="disc-face aratu-mascot">
        <img src="${asset('img/aratu-720.webp')}" srcset="${asset('img/aratu-360.webp')} 360w, ${asset('img/aratu-720.webp')} 720w" sizes="(min-width: 60rem) 330px, 240px" width="720" height="720" alt="${escape(page.mascotAlt)}" fetchpriority="high">
      </div>
    </div>
    ${signal({ seed: 61 })}
  </section>`;

  const body = html`<section class="section">
    <div class="wrap split">
      <div class="prose">
        <h2 id="what">${escape(page.whatHeading)}</h2>
        ${page.what.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        <h2 id="editor">${escape(page.placesHeading)}</h2>
        <dl class="ways ways-stacked">
          ${page.places.map((place) => `<div><dt>${escape(place.term)}</dt><dd>${text(place.body)}</dd></div>`).join('')}
        </dl>
        <h2 id="engine">${escape(page.engineHeading)}</h2>
        <p>${text(page.engine)}</p>
        <h2 id="name">${inline(page.nameHeading)}</h2>
        <p>${text(page.name)}</p>
      </div>
      <div>
        <h2 class="small-heading" id="taste">${escape(page.tasteHeading)}</h2>
        <p>${text(page.tasteIntro)}</p>
        ${sample('aratu-taste')}
        <h2 class="small-heading" id="tests">${escape(page.proofsHeading)}</h2>
        <p>${text(page.proofsIntro)}</p>
        ${proofList(['aratu-book-works', 'aratu-book-languages', 'aratu-book-features', 'aratu-manual-checks', 'aratu-schedule', 'aratu-ci'])}
        <h2 class="small-heading" id="read">${escape(page.readHeading)}</h2>
        <p class="link-row">
          <a class="button button-primary" href="${aratuUrl}">${escape(page.links.repo)}${icon('out')}</a>
          <a class="button" href="${escape(new URL(`${ctx.lang}/manual/`, ctx.config.related.aratu.editor).href)}">${escape(page.links.manual)}${icon('out')}</a>
          <a class="button" href="${repoFile('docs/VISION.md', null, 'aratu')}">${escape(page.links.vision)}${icon('out')}</a>
        </p>
      </div>
    </div>
  </section>`;

  const ecosystem = html`<section class="section section-tint" aria-labelledby="ecosystem">
    <div class="wrap">
      ${sectionHead({ heading: t.home.ecosystem.heading, id: 'ecosystem' })}
      <p class="section-intro">${text(t.home.ecosystem.intro)}</p>
      ${projectCards(ctx, 'aratu')}
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + body + ecosystem };
}
