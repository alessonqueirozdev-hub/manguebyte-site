import { claims, juceAhead } from '../content/claims.mjs';
import { signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';

const two = (number) => String(number).padStart(2, '0');

export function render(ctx) {
  const { t, text, fill, inline, proof, origin, breakable, proofList, sample, sectionHead, pick } = ctx;
  const page = t.beyond;
  const labels = page.labels;

  const head = html`<section class="page-head">
    <div class="wrap">
      <p class="kicker">${escape(page.kicker)}</p>
      <h1>${escape(page.heading)}</h1>
      <div class="page-intro">${page.intro.map((paragraph) => `<p>${text(paragraph)}</p>`)}</div>
    </div>
    ${signal({ seed: 9 })}
  </section>`;

  const rules = html`<section class="section" aria-labelledby="rules">
    <div class="wrap">
      ${sectionHead({ heading: page.rulesHeading, id: 'rules' })}
      <ol class="rules">${page.rules.map((rule) => `<li>${text(rule)}</li>`)}</ol>
    </div>
  </section>`;

  // On phones the rows are laid out as blocks, which makes some browsers
  // forget this is a table; the roles keep it one, and data-label names the
  // column above each cell.
  const summary = html`<section class="section section-tint" aria-labelledby="summary">
    <div class="wrap">
      ${sectionHead({ heading: page.summaryHeading, id: 'summary' })}
      <div class="table-wrap" role="region" aria-labelledby="summary" tabindex="0">
        <table class="summary" role="table">
          <caption>${escape(page.summaryCaption)}</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">${escape(page.table.claim)}</th>
              <th scope="col" role="columnheader">${text(page.table.juce)}</th>
              <th scope="col" role="columnheader">${escape(page.table.mangue)}</th>
              <th scope="col" role="columnheader">${escape(page.table.checked)}</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            ${claims.map((claim, index) => {
              const content = pick(claim);
              return html`<tr role="row">
                <th scope="row" role="rowheader"><a href="#${claim.id}">${index + 1}. ${inline(content.row)}</a></th>
                <td role="cell" data-label="${escape(fill(page.table.juce))}">${inline(content.juceShort)}</td>
                <td role="cell" data-label="${escape(page.table.mangue)}">${inline(content.mangueShort)}</td>
                <td class="checked" role="cell" data-label="${escape(page.table.checked)}">${claim.proofs.slice(0, 2).map((id) => {
                  const found = proof(id);
                  return `<a href="${escape(found.href)}"><span class="where">${origin(found)}</span> ${breakable(found.name)}</a>`;
                })}</td>
              </tr>`;
            })}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;

  const part = (kind, label, paragraphs) =>
    paragraphs && html`<section class="${kind}"><h3>${escape(label)}</h3>${[].concat(paragraphs).map((paragraph) => `<p>${text(paragraph)}</p>`)}</section>`;

  const articles = html`<div class="wrap claims">
    ${claims.map((claim, index) => {
      const content = pick(claim);
      return html`<article class="claim" id="${claim.id}" aria-labelledby="${claim.id}-title">
        <p class="claim-number" aria-hidden="true">${two(index + 1)}</p>
        <div class="claim-body">
          <h2 id="${claim.id}-title">${inline(content.title)}</h2>
          ${part('claim-part claim-problem', labels.problem, content.problem)}
          <div class="versus">
            ${part('versus-juce', labels.juce, content.juce)}
            ${part('versus-mangue', labels.mangue, content.mangue)}
          </div>
          <section class="claim-part claim-check">
            <h3>${escape(labels.check)}</h3>
            ${content.check.map((paragraph) => `<p>${text(paragraph)}</p>`)}
            ${proofList(claim.proofs)}
            ${claim.sample && html`<details class="show-test"><summary>${escape(labels.showTest)}</summary>${sample(claim.sample)}</details>`}
          </section>
          ${content.limit && html`<aside class="limit"><h3>${escape(labels.limit)}</h3><p>${text(content.limit)}</p></aside>`}
        </div>
      </article>`;
    })}
  </div>`;

  const ahead = html`<section class="section section-ink" aria-labelledby="ahead">
    <div class="wrap split">
      <div>
        ${sectionHead({ heading: page.aheadHeading, id: 'ahead' })}
        <p class="section-intro">${text(page.aheadIntro)}</p>
      </div>
      <div>
        <ul class="plain-list">${pick(juceAhead).map((item) => `<li>${inline(item)}</li>`)}</ul>
        <p>${text(page.aheadOutro)}</p>
      </div>
    </div>
  </section>`;

  const note = html`<div class="wrap"><p class="source-note">${text(page.sourceNote)}</p></div><div class="section"></div>`;

  return {
    title: page.title,
    description: page.description,
    body: head + rules + summary + articles + ahead + note,
  };
}
