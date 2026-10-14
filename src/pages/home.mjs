import { areas } from '../content/features.mjs';
import { juceAhead } from '../content/claims.mjs';
import { mangrove, signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon, repoFile, repoUrl } from '../lib/site.mjs';

// The tests listed under the hero, one per claim the page goes on to make.
const HERO_PROOFS = [
  'automation-harness',
  'block-size',
  'no-heap',
  'outside-changes',
  'per-note',
  'state-versions',
  'subnormal-clap',
];

export function render(ctx) {
  const { t, text, inline, url, asset, proof, origin, breakable, proofList, sample, sectionHead, pick } = ctx;
  const home = t.home;

  const hero = html`<section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <p class="kicker">${escape(home.kicker)}</p>
        <h1>${home.heading.map((line) => `<span>${escape(line)}</span>`).join(' ')}</h1>
        <p class="lede">${text(home.lede)}</p>
        <p class="actions">
          <a class="button button-primary" href="${url('/start/')}">${escape(home.ctaStart)}${icon('arrow')}</a>
          <a class="button" href="${repoUrl}">${escape(home.ctaSource)}${icon('out')}</a>
        </p>
        <p class="young">${text(home.young)}</p>
      </div>
      <div class="hero-art">
        <div class="disc">
          <svg class="disc-ring" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
            <defs><path id="ring" d="M200,200 m-183,0 a183,183 0 1,1 366,0 a183,183 0 1,1 -366,0"/></defs>
            <text><textPath href="#ring" textLength="1138" lengthAdjust="spacing">${escape(home.ring.repeat(2).toUpperCase())}</textPath></text>
          </svg>
          <div class="disc-face">
            <img src="${asset('img/crab-720.webp')}" srcset="${asset('img/crab-360.webp')} 360w, ${asset('img/crab-720.webp')} 720w" sizes="(min-width: 60rem) 330px, 220px" width="720" height="720" alt="${escape(t.nav.logoAlt)}" fetchpriority="high">
          </div>
        </div>
      </div>
    </div>
    ${mangrove({ seed: 11 })}
  </section>`;

  const proofs = html`<section class="band" aria-labelledby="green">
    ${signal({ seed: 5 })}
    <div class="wrap band-grid">
      <div class="band-text">
        <h2 id="green">${escape(home.proof.heading)}</h2>
        <p>${text(home.proof.caption)}</p>
      </div>
      <div class="terminal">
        <p class="terminal-command"><span aria-hidden="true">$ </span>${escape(home.proof.command)}</p>
        <ul>
          ${HERO_PROOFS.map((id) => {
            const found = proof(id);
            return `<li><a href="${escape(found.href)}"><span class="terminal-kind">${origin(found)}</span><span class="terminal-name">${breakable(found.name)}</span><span class="terminal-ok">${escape(home.proof.ok)}</span></a></li>`;
          })}
        </ul>
        <ul class="terminal-validators">
          ${home.proof.validators.map((entry) => {
            const found = proof(entry.proof);
            return `<li><a href="${escape(found.href)}"><span class="terminal-kind">ci</span><span class="terminal-name">${escape(entry.name)}</span><span class="terminal-ok">${escape(entry.result)}</span></a></li>`;
          })}
        </ul>
      </div>
    </div>
  </section>`;

  const proven = html`<section class="section" aria-labelledby="proven">
    <div class="wrap">
      ${sectionHead({ number: '01', heading: home.proven.heading, id: 'proven' })}
      <p class="section-intro">${text(home.proven.intro)}</p>
      <ol class="cards">
        ${home.proven.cards.map(
          (card, index) => html`<li class="card">
            <span class="card-number" aria-hidden="true">${index + 1}</span>
            <h3><a href="${url(`/beyond-juce/#${card.claim}`)}">${inline(card.title)}</a></h3>
            <p>${inline(card.body)}</p>
            <dl class="card-facts">
              <div class="fact fact-juce"><dt>${text(home.proven.juceLabel)}</dt><dd>${inline(card.juce)}</dd></div>
              <div class="fact fact-limit"><dt>${escape(home.proven.limitLabel)}</dt><dd>${inline(card.limit)}</dd></div>
            </dl>
            <p class="card-label">${escape(home.proven.proofLabel)}</p>
            ${proofList(card.proofs)}
          </li>`,
        )}
      </ol>
      <p class="more"><a class="button" href="${url('/beyond-juce/')}">${escape(home.proven.more)}${icon('arrow')}</a></p>
    </div>
  </section>`;

  const code = html`<section class="section section-tint" aria-labelledby="code">
    <div class="wrap">
      ${sectionHead({ number: '02', heading: home.code.heading, id: 'code' })}
      <p class="section-intro">${text(home.code.intro)}</p>
      <div class="annotated">
        <ol class="notes">
          ${home.code.notes.map((note) => `<li><h3>${escape(note.title)}</h3><p>${inline(note.body)}</p></li>`)}
        </ol>
        ${sample('duck-plugin')}
      </div>
      <div class="annotated annotated-flip">
        <div class="notes notes-single">
          <h3>${escape(home.code.testHeading)}</h3>
          <p>${inline(home.code.testIntro)}</p>
        </div>
        ${sample('duck-test')}
      </div>
    </div>
  </section>`;

  const today = html`<section class="section" aria-labelledby="today">
    <div class="wrap">
      ${sectionHead({ number: '03', heading: home.today.heading, id: 'today' })}
      <p class="section-intro">${text(home.today.intro)}</p>
      <ul class="areas">
        ${areas.map((area) => {
          const content = pick(area);
          return html`<li class="area">
            <h3><a href="${url(`/features/#${area.id}`)}">${escape(content.name)}</a></h3>
            <p>${inline(content.lead)}</p>
            <p class="crates">${area.crates.map((crate) => `<a href="${repoFile(`crates/${crate}/`)}"><code>${crate}</code></a>`).join(' ')}</p>
          </li>`;
        })}
      </ul>
      <p class="more"><a class="button" href="${url('/features/')}">${escape(home.today.more)}${icon('arrow')}</a></p>
    </div>
  </section>`;

  const missing = html`<section class="section section-ink" aria-labelledby="ahead">
    <div class="wrap split">
      <div>
        ${sectionHead({ number: '04', heading: home.missing.heading, id: 'ahead' })}
        <p class="section-intro">${text(home.missing.intro)}</p>
      </div>
      <div>
        <ul class="plain-list">
          ${pick(juceAhead).map((item) => `<li>${inline(item)}</li>`)}
        </ul>
        <p>${text(home.missing.outro)}</p>
      </div>
    </div>
  </section>`;

  const name = html`<section class="section" aria-labelledby="name">
    <div class="wrap split split-name">
      <div>
        ${sectionHead({ number: '05', heading: home.name.heading, id: 'name' })}
        ${home.name.body.map((paragraph) => `<p>${inline(paragraph)}</p>`)}
        <p class="more"><a class="button" href="${url('/name/')}">${escape(home.name.more)}${icon('arrow')}</a></p>
      </div>
      <div class="start-box">
        <h2>${escape(home.start.heading)}</h2>
        <p>${text(home.start.intro)}</p>
        ${sample('readme-dependency')}
        <p class="actions">
          <a class="button button-primary" href="${url('/start/')}">${escape(home.start.guide)}${icon('arrow')}</a>
          <a class="button" href="${repoUrl}">${escape(home.start.repo)}${icon('out')}</a>
        </p>
      </div>
    </div>
  </section>`;

  return {
    title: home.title,
    description: t.site.description,
    wide: true,
    body: hero + proofs + proven + code + today + missing + name,
  };
}
