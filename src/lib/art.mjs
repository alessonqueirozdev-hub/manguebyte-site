// The drawings of the site, generated as SVG when it is built: the mangrove
// roots, the signal under them, and the satellite dish in the mud.
//
// They are drawn from a seeded sequence, so every build gives the same
// picture.

function sequence(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const round = (value) => Math.round(value * 10) / 10;

// The prop roots of a mangrove, standing on the bottom edge of the picture.
// The trunk comes down from above and stops well short of the mud; from
// there the roots arch outwards and down, the highest ones reaching the
// furthest, and some of them drop a second root on the way.
function roots(random, centre, ground, scale) {
  const paths = [];
  const lean = (random() - 0.5) * 34 * scale;
  const fork = ground * (0.36 + random() * 0.14);
  const line = (d, width) => paths.push(`<path pathLength="1" d="${d}" stroke-width="${round(width)}"/>`);

  line(
    `M${round(centre + lean)},-14 Q${round(centre + lean * 0.35)},${round(fork * 0.55)} ${round(centre)},${round(fork)}`,
    (13 + random() * 6) * scale,
  );

  for (const side of [-1, 1]) {
    const count = 2 + Math.floor(random() * 3);
    let reach = 0;
    for (let index = 0; index < count; index += 1) {
      const top = fork * (1 - (0.62 * index) / count) + (random() - 0.5) * 5;
      reach += scale * (22 + random() * 36);
      const from = centre + (lean * (fork - top)) / fork / 3;
      const end = from + side * reach;
      const shoulder = scale * (3 + random() * 13);
      const splay = side * scale * random() * 9;
      line(
        `M${round(from)},${round(top)} C${round(from + side * reach * 0.6)},${round(top - shoulder)} ${round(end)},${round(top + (ground - top) * 0.2)} ${round(end + splay)},${ground}`,
        (9.5 - index * 1.5 + random() * 1.6) * scale,
      );
      if (index > 0 && random() > 0.45) {
        const x = from + side * reach * (0.5 + random() * 0.2);
        const y = top + (ground - top) * 0.05;
        const foot = x + side * scale * (random() * 12 - 3);
        line(`M${round(x)},${round(y)} Q${round(foot)},${round(y + (ground - y) * 0.4)} ${round(foot)},${ground}`, (4 + random() * 1.6) * scale);
      }
    }
  }

  // Roots that hang from the branches and have not reached the mud yet.
  const hanging = Math.floor(random() * 3);
  for (let index = 0; index < hanging; index += 1) {
    const x = centre + (random() - 0.5) * 150 * scale;
    const length = ground * (0.12 + random() * 0.3);
    line(`M${round(x)},-10 Q${round(x + 3)},${round(length * 0.6)} ${round(x - 2)},${round(length)}`, 2.6 * scale);
  }
  return paths.join('');
}

// A row of mangroves across the page.
export function mangrove({ seed = 7, width = 1440, height = 170 } = {}) {
  const random = sequence(seed);
  let out = '';
  let x = 30 + random() * 90;
  while (x < width + 80) {
    const scale = 0.72 + random() * 0.6;
    out += roots(random, x, height, scale);
    x += 200 + random() * 190;
  }
  return `<svg class="mangrove" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-linecap="round">${out}</g></svg>`;
}

// What the roots are plugged into: a waveform that swells and dies away,
// like a string that has been plucked several times.
export function signal({ seed = 3, width = 1440, height = 64 } = {}) {
  const random = sequence(seed);
  const plucks = [];
  let x = 30 + random() * 80;
  while (x < width) {
    plucks.push({ at: x, level: 0.45 + random() * 0.55, decay: 90 + random() * 150, pitch: 0.16 + random() * 0.22 });
    x += 150 + random() * 220;
  }
  const middle = height / 2;
  let path = '';
  for (let step = 0; step <= width; step += 3) {
    let sample = 0;
    for (const pluck of plucks) {
      const since = step - pluck.at;
      if (since >= 0) sample += pluck.level * Math.exp(-since / pluck.decay) * Math.sin(since * pluck.pitch);
    }
    const y = middle - Math.max(-1, Math.min(1, sample)) * (middle - 4);
    path += `${step === 0 ? 'M' : 'L'}${step},${round(y)}`;
  }
  return `<svg class="signal" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

// The image of the manifesto: a satellite dish stuck in the mangrove mud.
export function dish() {
  const random = sequence(21);
  return `<svg class="dish" viewBox="0 0 420 300" role="img" aria-labelledby="dish-title" focusable="false"><title id="dish-title">{title}</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g class="dish-roots" opacity=".55">${roots(random, 70, 250, 0.8)}${roots(random, 372, 250, 0.62)}</g><path d="M4,250 Q60,243 120,250 T240,250 T360,250 T416,250" stroke-width="6"/><path d="M206,250 L226,150" stroke-width="10"/><path d="M196,250 L236,250" stroke-width="10"/><g class="dish-bowl"><path d="M142,84 Q150,196 302,158" stroke-width="9"/><path d="M142,84 Q236,78 302,158" stroke-width="5"/><path d="M196,146 L262,70" stroke-width="5"/><path d="M228,132 L262,70" stroke-width="3"/><circle cx="264" cy="67" r="9" fill="currentColor" stroke="none"/></g><g class="dish-waves" stroke-width="5"><path d="M292,44 Q306,58 300,78"/><path d="M314,26 Q340,56 326,92"/><path d="M338,10 Q376,54 352,106"/></g></g></svg>`;
}
