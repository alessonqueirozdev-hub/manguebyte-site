import { beyondParity, parity, phases } from '../content/roadmap.mjs';
import { signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon } from '../lib/site.mjs';

export function render(ctx) {
  const { t, text, inline, fill, sectionHead, pick, lang } = ctx;
  const page = t.roadmap;
  const status = (state) => `<span class="status-${state}">${icon(state, t.status[state])}</span>`;

  const head = html`<section class="page-head">
    <div class="wrap">
      <p class="kicker">${escape(page.kicker)}</p>
      <h1>${escape(page.heading)}</h1>
      <div class="page-intro">${page.intro.map((paragraph) => `<p>${text(paragraph)}</p>`)}</div>
      <ul class="legend" aria-label="${escape(page.legend)}">
        ${['done', 'wip', 'todo'].map((state) => `<li class="status-${state}">${icon(state)}${escape(t.status[state])}</li>`)}
      </ul>
    </div>
    ${signal({ seed: 31 })}
  </section>`;

  const list = html`<section class="section">
    <div class="wrap">
      ${phases.map((phase) => {
        const content = pick(phase);
        const items = phase.groups.flatMap((group) => group.items);
        const count = (state) => items.filter((item) => item.s === state).length;
        const share = (state) => Number(((count(state) / items.length) * 100).toFixed(1));
        const counted = fill(page.count, { done: count('done'), total: items.length });
        return html`<section class="phase" id="${phase.id}" aria-labelledby="${phase.id}-title">
          <div class="phase-head">
            <div>
              <h2 id="${phase.id}-title">${escape(content.name)}</h2>
              <p>${inline(content.lead)}</p>
            </div>
            <div>
              <span class="progress-label">${escape(counted)}</span>
              <svg class="progress" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true" focusable="false"><rect class="progress-done" width="${share('done')}" height="4"/><rect class="progress-wip" x="${share('done')}" width="${share('wip')}" height="4"/></svg>
            </div>
          </div>
          ${phase.groups.map(
            (group) => html`${group[lang] && `<h3>${escape(group[lang])}</h3>`}
            <ul class="items">${group.items.map((item) => `<li class="is-${item.s}">${status(item.s)}<span>${inline(item[lang])}</span></li>`)}</ul>`,
          )}
          ${phase[`${lang}_note`] && `<p class="phase-note">${inline(phase[`${lang}_note`])}</p>`}
        </section>`;
      })}
    </div>
  </section>`;

  const further = html`<section class="section section-ink" aria-labelledby="beyond-parity">
    <div class="wrap split">
      <div>
        ${sectionHead({ heading: page.beyondHeading, id: 'beyond-parity' })}
        <p class="section-intro">${text(page.beyondIntro)}</p>
      </div>
      <ul class="plain-list">${pick(beyondParity).map((item) => `<li>${inline(item)}</li>`)}</ul>
    </div>
  </section>`;

  const modules = html`<section class="section" aria-labelledby="parity">
    <div class="wrap">
      ${sectionHead({ heading: page.parityHeading, id: 'parity' })}
      <p class="section-intro">${text(page.parityIntro)}</p>
      <div class="table-wrap" role="region" aria-labelledby="parity" tabindex="0">
        <table class="parity">
          <thead>
            <tr>
              <th scope="col">${escape(page.parityTable.module)}</th>
              <th scope="col">${escape(page.parityTable.crates)}</th>
              <th scope="col">${escape(page.parityTable.status)}</th>
            </tr>
          </thead>
          <tbody>
            ${parity.map(
              (row) => html`<tr>
                <th scope="row"><code>${row.module}</code></th>
                <td>${row.crate ? `<code>${row.crate}</code>` : '<span aria-hidden="true">·</span>'}</td>
                <td class="status-${row.s}">${icon(row.s)}${escape(t.status[row.s])}</td>
              </tr>`,
            )}
          </tbody>
        </table>
      </div>
      <p class="source-note">${text(page.sourceNote)}</p>
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + list + further + modules };
}
