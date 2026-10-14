import { areas, missing } from '../content/features.mjs';
import { signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon, repoFile } from '../lib/site.mjs';

export function render(ctx) {
  const { t, text, inline, sectionHead, pick } = ctx;
  const page = t.features;

  const head = html`<section class="page-head">
    <div class="wrap">
      <p class="kicker">${escape(page.kicker)}</p>
      <h1>${escape(page.heading)}</h1>
      <div class="page-intro">${page.intro.map((paragraph) => `<p>${text(paragraph)}</p>`)}</div>
    </div>
    ${signal({ seed: 14 })}
  </section>`;

  const grid = html`<section class="section">
    <div class="wrap">
      <div class="feature-grid">
        ${areas.map((area) => {
          const content = pick(area);
          return html`<section class="feature" id="${area.id}" aria-labelledby="${area.id}-title">
            <h2 id="${area.id}-title">${escape(content.name)}</h2>
            <p class="crates"><span class="sr-only">${escape(page.cratesLabel)}: </span>${area.crates.map((crate) => `<a href="${repoFile(`crates/${crate}/`)}"><code>${crate}</code></a>`).join(' ')}</p>
            <p class="feature-lead">${inline(content.lead)}</p>
            <ul class="ticks">${content.items.map((item) => `<li>${icon('done')}${inline(item)}</li>`)}</ul>
          </section>`;
        })}
      </div>
      <p class="section-intro">${text(page.facade)}</p>
    </div>
  </section>`;

  const gaps = html`<section class="section section-ink" aria-labelledby="missing">
    <div class="wrap split">
      <div>
        ${sectionHead({ heading: page.missingHeading, id: 'missing' })}
        <p class="section-intro">${text(page.missingIntro)}</p>
      </div>
      <div>
        <ul class="plain-list">${pick(missing).map((item) => `<li>${inline(item)}</li>`)}</ul>
        <p>${text(page.missingOutro)}</p>
      </div>
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + grid + gaps };
}
