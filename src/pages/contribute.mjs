import { signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon, repoFile, repoUrl } from '../lib/site.mjs';

export function render(ctx) {
  const { t, text, inline, url, codeBlock, config } = ctx;
  const page = t.contribute;

  const head = html`<section class="page-head">
    <div class="wrap">
      <p class="kicker">${escape(page.kicker)}</p>
      <h1>${escape(page.heading)}</h1>
      <div class="page-intro">${page.intro.map((paragraph) => `<p>${text(paragraph)}</p>`)}</div>
    </div>
    ${signal({ seed: 52 })}
  </section>`;

  const body = html`<section class="section">
    <div class="wrap">
      <div class="prose">
        <h2 id="ways">${escape(page.waysHeading)}</h2>
      </div>
      <dl class="ways">
        ${page.ways.map((way) => `<div><dt>${escape(way.term)}</dt><dd>${text(way.body)}</dd></div>`)}
      </dl>
      <div class="prose">
        <h2 id="clean-room">${escape(page.cleanHeading)}</h2>
        <div class="callout">${page.clean.map((paragraph) => `<p>${text(paragraph)}</p>`)}</div>

        <h2 id="setup">${escape(page.setupHeading)}</h2>
        ${page.setup.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        ${codeBlock('./scripts/check.sh', 'bash')}
        <p>${text(page.setupAfter)}</p>

        <h2 id="real-time">${escape(page.realtimeHeading)}</h2>
        <p>${text(page.realtimeIntro)}</p>
        <ul class="rules-list">${page.realtime.map((rule) => `<li>${text(rule)}</li>`)}</ul>
        <p>${text(page.realtimeAfter)}</p>

        <h2 id="licence">${escape(page.licenceHeading)}</h2>
        ${page.licence.map((paragraph) => `<p>${text(paragraph)}</p>`)}

        <h2 id="security">${escape(page.securityHeading)}</h2>
        <p>${text(page.security)}</p>

        <h2 id="conduct">${escape(page.conductHeading)}</h2>
        <p>${inline(page.conduct)}</p>

        <h2 id="links">${escape(page.contactHeading)}</h2>
        <p class="link-row">
          <a class="button button-primary" href="${repoFile('CONTRIBUTING.md')}">${escape(page.links.guide)}${icon('out')}</a>
          <a class="button" href="${repoUrl}/issues">${escape(page.links.issues)}${icon('out')}</a>
          <a class="button" href="${repoUrl}/labels/good%20first%20issue">${escape(page.links.goodFirst)}${icon('out')}</a>
          <a class="button" href="${repoUrl}/discussions">${escape(page.links.discussions)}${icon('out')}</a>
          <a class="button" href="${url('/roadmap/')}">${escape(page.links.roadmap)}${icon('arrow')}</a>
          <a class="button" href="mailto:${config.contact}">${escape(page.links.email)}</a>
        </p>
      </div>
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + body };
}
