// The three projects of the Manguebyte ecosystem, as cards. Shown on the
// home page and on Aratu's page.

import { dish } from './art.mjs';
import { escape, html } from './html.mjs';

export function projectCards(ctx, current) {
  const { t, text, url, asset } = ctx;
  // Parabolic has no page and no public repository yet, so no link.
  const links = { manguebyte: url('/'), aratu: url('/aratu/') };
  const images = {
    manguebyte: 'img/crab-360.webp',
    aratu: 'img/aratu-360.webp',
    parabolic: 'img/parabolic-360.webp',
  };

  return html`<ul class="projects">
    ${t.projects.map((project) => {
      const link = project.id !== current && links[project.id];
      const mark = images[project.id]
        ? `<img src="${asset(images[project.id])}" alt="" width="360" height="360" loading="lazy">`
        : dish();
      return html`<li class="project project-${project.id}${project.id === current ? ' is-current' : ''}">
        <div class="project-mark">${mark}</div>
        <div class="project-text">
          <p class="project-status">${escape(project.status)}</p>
          <h3>${link ? `<a href="${link}">${escape(project.name)}</a>` : escape(project.name)}</h3>
          <p>${text(project.body)}</p>
        </div>
      </li>`;
    })}
  </ul>`;
}
