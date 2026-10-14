import { mangrove } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon } from '../lib/site.mjs';

export function render(ctx) {
  const { t, url } = ctx;
  const page = t.notFound;

  const body = html`<section class="lost">
    <div class="wrap">
      <p class="kicker">404</p>
      <h1>${escape(page.heading)}</h1>
      <p class="lede">${escape(page.body)}</p>
      <p class="actions"><a class="button button-primary" href="${url('/')}">${escape(page.back)}${icon('arrow')}</a></p>
    </div>
    ${mangrove({ seed: 4 })}
  </section>`;

  return { title: page.title, description: page.body, body };
}
