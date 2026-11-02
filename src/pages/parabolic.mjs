import { signal } from '../lib/art.mjs';
import { projectCards } from '../lib/ecosystem.mjs';
import { escape, html } from '../lib/html.mjs';

export function render(ctx) {
  const { t, text, asset, sectionHead } = ctx;
  const page = t.parabolic;

  const head = html`<section class="page-head aratu-head">
    <div class="wrap aratu-grid">
      <div>
        <p class="kicker">${escape(page.kicker)}</p>
        <h1>${escape(page.heading)}</h1>
        <p class="lede">${text(page.lede)}</p>
        <p class="young">${text(page.status)}</p>
      </div>
      <div class="disc-face aratu-mascot">
        <img src="${asset('img/parabolic-720.webp')}" srcset="${asset('img/parabolic-360.webp')} 360w, ${asset('img/parabolic-720.webp')} 720w" sizes="(min-width: 60rem) 330px, 240px" width="720" height="720" alt="${escape(page.logoAlt)}" fetchpriority="high">
      </div>
    </div>
    ${signal({ seed: 89 })}
  </section>`;

  const screens = html`<section class="section" aria-labelledby="screens">
    <div class="wrap">
      <h2 id="screens">${escape(page.screensHeading)}</h2>
      <p class="section-intro">${text(page.screensIntro)}</p>
      <ul class="shots">
        ${page.shots.map(
          (shot) => html`<li>
            <figure>
              <a href="${asset(`img/parabolic-${shot.id}.webp`)}"><img src="${asset(`img/parabolic-${shot.id}.webp`)}" width="1360" height="860" alt="${escape(shot.caption)}" loading="lazy"></a>
              <figcaption>${escape(shot.caption)}</figcaption>
            </figure>
          </li>`,
        )}
      </ul>
    </div>
  </section>`;

  const about = html`<section class="section section-tint">
    <div class="wrap">
      <div class="prose">
        <h2 id="what">${escape(page.whatHeading)}</h2>
        ${page.what.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        <h2 id="does">${escape(page.doesHeading)}</h2>
        <dl class="ways ways-stacked">
          ${page.does.map((part) => `<div><dt>${escape(part.term)}</dt><dd>${text(part.body)}</dd></div>`).join('')}
        </dl>
      </div>
    </div>
  </section>`;

  const inside = html`<section class="section section-tint">
    <div class="wrap">
      <div class="prose">
        <h2 id="how">${escape(page.howHeading)}</h2>
        ${page.how.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        <h2 id="manguebyte">${escape(page.frameworkHeading)}</h2>
        ${page.framework.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        <h2 id="licence">${escape(page.licenceHeading)}</h2>
        <p>${text(page.licence)}</p>
      </div>
    </div>
  </section>`;

  const ecosystem = html`<section class="section" aria-labelledby="ecosystem">
    <div class="wrap">
      ${sectionHead({ heading: t.home.ecosystem.heading, id: 'ecosystem' })}
      <p class="section-intro">${text(t.home.ecosystem.intro)}</p>
      ${projectCards(ctx, 'parabolic')}
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + about + screens + inside + ecosystem };
}
