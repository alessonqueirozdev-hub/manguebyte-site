// Reads the proofs and code samples the site needs from the framework's
// repository, at the commit pinned in site.config.mjs, and writes them to
// src/content/generated.json.
//
//   node tools/sync.mjs
//
// It only reads from GitHub. It fails, and writes nothing, if a proof or a
// sample cannot be found: the site must not link to a test that is not there.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import config from '../site.config.mjs';
import { proofs, snippets } from '../src/content/sources.mjs';

const { source } = config;
const files = new Map();

// The framework, or another repository of the ecosystem named in `related`.
function origin(which) {
  if (!which) return { repo: config.repo, commit: source.commit };
  const found = config.related?.[which];
  if (!found) throw new Error(`no repository called "${which}" in site.config.mjs`);
  return found;
}

async function read(path, which) {
  const { repo, commit } = origin(which);
  const key = `${repo}@${commit}:${path}`;
  if (!files.has(key)) {
    const url = `https://raw.githubusercontent.com/${repo}/${commit}/${path}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${path}: ${response.status} from ${url}`);
    files.set(key, (await response.text()).replace(/\r\n/g, '\n').split('\n'));
  }
  return files.get(key);
}

const matches = (line, pattern) =>
  pattern instanceof RegExp ? pattern.test(line) : line.includes(pattern);

function indexOf(lines, pattern, start, what) {
  for (let index = start; index < lines.length; index += 1) {
    if (matches(lines[index], pattern)) return index;
  }
  throw new Error(`${what}: no line matching ${pattern}`);
}

// A whole function: the line with `fn name(`, the attributes (and, when
// asked, the doc comment) above it, down to the closing brace at the same
// indentation.
function functionRange(lines, part, what) {
  const pattern = new RegExp(`^\\s*(?:pub(?:\\([a-z]+\\))? )?fn ${part.fn}\\b`);
  const start = indexOf(lines, pattern, 0, what);
  const indent = lines[start].match(/^\s*/)[0];
  if (part.indent !== undefined && indent.length !== part.indent) {
    throw new Error(`${what}: fn ${part.fn} is indented by ${indent.length}, not ${part.indent}`);
  }
  let first = start;
  const above = part.doc ? /^\s*(#\[|\/\/\/)/ : /^\s*#\[/;
  while (first > 0 && above.test(lines[first - 1])) first -= 1;
  const end = indexOf(lines, new RegExp(`^${indent}\\}$`), start, what);
  return [first, end, part.keepIndent ? 0 : indent.length];
}

function extract(lines, id, definition) {
  const out = [];
  const ranges = [];
  for (const part of definition.parts) {
    if ('gap' in part) {
      out.push({ gap: part.gap });
      continue;
    }
    const what = `sample ${id}`;
    let first;
    let last;
    let dedent = 0;
    if (part.fn) {
      [first, last, dedent] = functionRange(lines, part, what);
    } else {
      const from = part.after ? indexOf(lines, part.after, 0, what) : 0;
      first = indexOf(lines, part.from, from, what);
      // `toAfter` skips ahead before looking for the end, for a sample
      // whose last line also appears earlier in it.
      const end = part.toAfter ? indexOf(lines, part.toAfter, first, what) : first;
      last = indexOf(lines, part.to, end, what);
    }
    ranges.push([first + 1, last + 1]);
    for (const line of lines.slice(first, last + 1)) out.push({ text: line.slice(dedent) });
  }
  return {
    repo: definition.repo ?? null,
    file: definition.file,
    lang: definition.lang,
    ranges,
    lines: out,
  };
}

const related = Object.fromEntries(
  Object.entries(config.related ?? {}).map(([name, { commit }]) => [name, commit]),
);
const result = { commit: source.commit, related, proofs: {}, snippets: {} };

for (const [id, proof] of Object.entries(proofs)) {
  const lines = await read(proof.file, proof.repo);
  let line = null;
  let name = proof.name ?? proof.file;
  if (proof.find) {
    const found = lines.flatMap((text, index) => (text.includes(proof.find) ? [index] : []));
    if (found.length !== 1) {
      throw new Error(`proof ${id}: "${proof.find}" appears ${found.length} times in ${proof.file}`);
    }
    line = found[0] + 1;
    const fn = proof.find.match(/fn (\w+)\(/);
    if (!proof.name && fn) name = fn[1];
  }
  result.proofs[id] = {
    repo: proof.repo ?? null,
    file: proof.file,
    line,
    name,
    test: /fn \w+\($/.test(proof.find ?? ''),
  };
}

for (const [id, definition] of Object.entries(snippets)) {
  result.snippets[id] = extract(await read(definition.file, definition.repo), id, definition);
}

const target = fileURLToPath(new URL('../src/content/generated.json', import.meta.url));
await writeFile(target, `${JSON.stringify(result, null, 2)}\n`);
console.log(
  `Read ${files.size} files at ${source.commit.slice(0, 7)}: ` +
    `${Object.keys(result.proofs).length} proofs, ${Object.keys(result.snippets).length} samples.`,
);
