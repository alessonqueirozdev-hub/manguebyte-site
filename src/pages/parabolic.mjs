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

  const ecosystem = html`<section class="section section-tint" aria-labelledby="ecosystem">
    <div class="wrap">
      ${sectionHead({ heading: t.home.ecosystem.heading, id: 'ecosystem' })}
      <p class="section-intro">${text(t.home.ecosystem.intro)}</p>
      ${projectCards(ctx, 'parabolic')}
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + screens + ecosystem };
}
