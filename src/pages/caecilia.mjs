import { signal } from '../lib/art.mjs';
import { projectCards } from '../lib/ecosystem.mjs';
import { escape, html } from '../lib/html.mjs';
import { icon } from '../lib/site.mjs';

export function render(ctx) {
  const { t, text, asset, sectionHead, config } = ctx;
  const page = t.caecilia;
  const { release, windows, playlist, videos, repo } = config.related.caecilia;
  const linked = (paragraph) =>
    text(
      paragraph
        .replace('(caecilia-windows)', `(${windows})`)
        .replace('(caecilia-release)', `(${release})`)
        .replace('(caecilia-v1)', `(https://github.com/${repo}/tree/v1-cpp-final)`)
        .replace('(caecilia-playlist)', `(https://www.youtube.com/playlist?list=${playlist})`),
    );

  const head = html`<section class="page-head aratu-head">
    <div class="wrap aratu-grid">
      <div>
        <p class="kicker">${escape(page.kicker)}</p>
        <h1>${escape(page.heading)}</h1>
        <p class="lede">${text(page.lede)}</p>
        <p class="actions">
          <a class="button button-primary" href="${escape(windows)}">${escape(page.download)}${icon('out')}</a>
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

  const listen = html`<section class="section" aria-labelledby="videos">
    <div class="wrap">
      <h2 id="videos">${escape(page.videosHeading)}</h2>
      <p class="section-intro">${linked(page.videosIntro)}</p>
      <ul class="videos">
        ${videos.map((id, at) => {
          const title = `Caecilia Pipe Organ: ${page.videoTitles[at]}`;
          return html`<li>
            <a class="video-poster" href="https://www.youtube.com/watch?v=${escape(id)}&amp;list=${escape(playlist)}" data-video="${escape(id)}" data-title="${escape(title)}">
              <img src="${asset(`img/video-${id}.webp`)}" width="1280" height="720" alt="" loading="lazy">
              <span class="video-play" aria-hidden="true"></span>
              <span class="sr-only">${escape(title)}</span>
            </a>
            <p>${escape(page.videoTitles[at])}</p>
          </li>`;
        })}
      </ul>
    </div>
  </section>`;

  const body = html`<section class="section section-tint">
    <div class="wrap">
      <div class="prose">
        <h2 id="what">${escape(page.whatHeading)}</h2>
        ${page.what.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        <h2 id="download">${escape(page.downloadHeading)}</h2>
        ${page.downloadBody.map((paragraph) => `<p>${linked(paragraph)}</p>`)}
      </div>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <div class="prose">
        <h2 id="sound">${escape(page.soundHeading)}</h2>
        ${page.sound.map((paragraph) => `<p>${text(paragraph)}</p>`)}
        <h2 id="made">${escape(page.devHeading)}</h2>
        ${page.dev.map((paragraph) => `<p>${linked(paragraph)}</p>`)}
      </div>
    </div>
  </section>
  <section class="section section-tint">
    <div class="wrap">
      <div class="prose">
        <h2 id="manguebyte">${escape(page.frameworkHeading)}</h2>
        <p>${text(page.frameworkIntro)}</p>
        <dl class="ways ways-stacked">
          ${page.framework.map((part) => `<div><dt>${escape(part.term)}</dt><dd>${text(part.body)}</dd></div>`).join('')}
        </dl>
        <p>${text(page.frameworkOutro)}</p>
        <p>${text(page.contact)}</p>
      </div>
    </div>
  </section>`;

  const ecosystem = html`<section class="section" aria-labelledby="ecosystem">
    <div class="wrap">
      ${sectionHead({ heading: t.home.ecosystem.heading, id: 'ecosystem' })}
      <p class="section-intro">${text(t.home.ecosystem.intro)}</p>
      ${projectCards(ctx, 'caecilia')}
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + listen + body + ecosystem };
}
