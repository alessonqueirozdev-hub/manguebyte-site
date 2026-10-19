import { signal } from '../lib/art.mjs';
import { escape, html } from '../lib/html.mjs';
import { repoUrl } from '../lib/site.mjs';

// The commands are the README's and CONTRIBUTING.md's own.
const COMMANDS = {
  alsa: 'sudo apt install libasound2-dev',
  examples: `git clone ${repoUrl}
cd manguebyte

# Render a short synth riff to a WAV file. Needs no audio hardware.
cargo run --example render_wav -- riff.wav

# Play the same riff on your speakers. The optional argument is a level in dB.
cargo run --example play_riff -- -12`,
  bundle: 'cargo run -p cargo-mangue -- bundle -p mangue-pluck --release',
  standalone: 'cargo run -p mangue-pluck --features standalone --example play -- -12 hold',
};

export function render(ctx) {
  const { t, text, codeBlock, sample } = ctx;
  const page = t.start;
  const steps = page.steps;

  const paragraphs = (step) => step.body.map((paragraph) => `<p>${text(paragraph)}</p>`).join('');
  const step = (id, content, ...rest) =>
    html`<li class="step" id="${id}"><h2>${escape(content.heading)}</h2>${rest}</li>`;

  const head = html`<section class="page-head">
    <div class="wrap">
      <p class="kicker">${escape(page.kicker)}</p>
      <h1>${escape(page.heading)}</h1>
      <div class="page-intro">${page.intro.map((paragraph) => `<p>${text(paragraph)}</p>`)}</div>
    </div>
    ${signal({ seed: 27 })}
  </section>`;

  const body = html`<section class="section">
    <div class="wrap">
      <ol class="steps">
        ${step('before', steps.before, paragraphs(steps.before), codeBlock(COMMANDS.alsa, 'bash'))}
        ${step('dependency', steps.dependency, paragraphs(steps.dependency), sample('readme-dependency'), `<p>${text(steps.dependency.after)}</p>`)}
        ${step('new-plugin', steps.newPlugin, paragraphs(steps.newPlugin), sample('readme-new-plugin'))}
        ${step('render', steps.render, paragraphs(steps.render), sample('readme-render'))}
        ${step('play', steps.play, paragraphs(steps.play), sample('readme-play'))}
        ${step('examples', steps.examples, paragraphs(steps.examples), codeBlock(COMMANDS.examples, 'bash'))}
        ${step('plugin', steps.plugin, paragraphs(steps.plugin), codeBlock(COMMANDS.bundle, 'bash'), `<p>${text(steps.plugin.after)}</p>`)}
        ${step('params', steps.params, paragraphs(steps.params), sample('duck-params'))}
        ${step('test', steps.test, paragraphs(steps.test), sample('test-pitch'))}
        ${step('standalone', steps.standalone, paragraphs(steps.standalone), codeBlock(COMMANDS.standalone, 'bash'))}
        ${step('next', steps.next, `<ul>${steps.next.items.map((item) => `<li>${text(item)}</li>`).join('')}</ul>`)}
      </ol>
    </div>
  </section>`;

  return { title: page.title, description: page.description, body: head + body };
}
