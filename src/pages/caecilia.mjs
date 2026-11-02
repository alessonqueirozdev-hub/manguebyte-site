import { signal } from '../lib/art.mjs';
import { projectCards } from '../lib/ecosystem.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon } from '../lib/site.mjs';

export function render(ctx) {
  const { t, text, asset, sectionHead, config } = ctx;
  const page = t.caecilia;
  const { releases, repo } = config.related.caecilia;
  const linked = (paragraph) => text(paragraph.replace('(caecilia-releases)', `(${releases})`));

  const head = html`<section class="page-head aratu-head">
    <div class="wrap aratu-grid">
      <div>
        <p class="kicker">${escape(page.kicker)}</p>
        <h1>${escape(page.heading)}</h1>
        <p class="lede">${text(page.lede)}</p>
        <p class="actions">
          <a class="button button-primary" href="${escape(releases)}">${escape(page.download)}${icon('out')}</a>
          <a class="button" href="https://github.com/${escape(repo)}">${escape(page.source)}${icon('out')}</a>
        </p>
        <p class="young">${text(page.status)}</p>
      </div>
      <div class="disc-face aratu-mascot">
        <img src="${asset('img/caecilia-512.webp')}" srcset="${asset('img/caecilia-360.webp')} 360w, ${asset('img/caecilia-512.webp')} 512w" sizes="(min-width: 60rem) 330px, 240px" width="512" height="512" alt="${escape(page.logoAlt)}" fetchpriority="high">
      </div>
    </div>
    ${signal({ seed: 73 })}
  </section>`;

  const body = html`<section class="section">
    <div class="wrap">
      <div class="prose">
        <h2 id="download">${escape(page.downloadHeading)}</h2>
        ${page.downloadBody.map((paragraph) => `<p>${linked(paragraph)}</p>`)}
        <h2 id="what">${escape(page.whatHeading)}</h2>
        ${page.what.map((paragraph) => `<p>${text(paragraph)}</p>`)}
      </div>
    </div>
  </section>`;

  const ecosystem = html`<section class="section section-tint" aria-labelledby="ecosystem">
    <div class="wrap">
      ${sectionHead({ heading: t.home.ecosystem.heading, id: 'ecosystem' })}
      <p class="section-intro">${text(t.home.ecosystem.intro)}</p>
      ${projectCards(ctx, 'caecilia')}
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + body + ecosystem };
}
