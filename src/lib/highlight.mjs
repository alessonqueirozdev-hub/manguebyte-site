// A small syntax highlighter that runs when the site is built, so pages need
// no script to show coloured code. It knows Rust, TOML and shell commands
// well enough for the samples on the site, and nothing more.

import { escape } from './html.mjs';

const RUST_KEYWORDS =
  'as|async|await|break|const|continue|crate|dyn|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while';

// Each rule is tried in order at the current position; the first to match
// wins. A rule with no class leaves its text uncoloured.
const GRAMMARS = {
  rust: [
    ['c', /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ['s', /b?"(?:\\.|[^"\\])*"/y],
    ['s', /'(?:\\.|[^'\\])'/y],
    ['t', /'[a-z_][a-z0-9_]*/y],
    ['a', /#!?\[[^\]\n]*\]/y],
    ['n', /\b\d[\d_]*(?:\.\d[\d_]*)?(?:e[+-]?\d+)?(?:[fiu](?:8|16|32|64|128|size))?\b/y],
    ['m', /\b[a-z_][a-z0-9_]*!/y],
    ['k', new RegExp(`\\b(?:${RUST_KEYWORDS})\\b`, 'y')],
    ['n', /\b[A-Z][A-Z0-9_]+\b/y],
    ['t', /\b[A-Z][A-Za-z0-9]*\b/y],
    ['f', /\b[a-z_][a-z0-9_]*(?=\s*(?:::<[^>]*>)?\()/y],
    [null, /[A-Za-z_][A-Za-z0-9_]*/y],
  ],
  toml: [
    ['c', /#[^\n]*/y],
    ['t', /^\[[^\]\n]*\]/my],
    ['s', /"(?:\\.|[^"\\])*"/y],
    ['k', /\b(?:true|false)\b/y],
    ['f', /[A-Za-z0-9_-]+(?=\s*=)/y],
    [null, /[A-Za-z_][A-Za-z0-9_.-]*/y],
  ],
  bash: [
    ['c', /#[^\n]*/y],
    ['s', /"(?:\\.|[^"\\])*"|'[^']*'/y],
    ['f', /^[ \t]*(?:\.\/)?[A-Za-z0-9_./-]+/my],
    ['k', /(?<=\s)--?[A-Za-z][A-Za-z0-9-]*/y],
    [null, /[^\s"'#]+/y],
  ],
};

function highlightText(code, lang) {
  const rules = GRAMMARS[lang];
  if (!rules) return escape(code);
  let out = '';
  let plain = '';
  let position = 0;
  while (position < code.length) {
    let matched = false;
    for (const [name, pattern] of rules) {
      pattern.lastIndex = position;
      const match = pattern.exec(code);
      if (!match || match[0] === '') continue;
      if (name) {
        out += `${escape(plain)}<span class="${name}">${escape(match[0])}</span>`;
        plain = '';
      } else {
        plain += match[0];
      }
      position += match[0].length;
      matched = true;
      break;
    }
    if (!matched) {
      plain += code[position];
      position += 1;
    }
  }
  return out + escape(plain);
}

// Highlights a sample. `lines` is either a string or the list a sample has
// in generated.json, where a `gap` is a line the site added to say that
// something was left out. Gaps are marked so that they cannot be mistaken
// for the file's own text.
export function highlight(lines, lang) {
  if (typeof lines === 'string') return highlightText(lines.replace(/\n$/, ''), lang);
  const parts = [];
  let run = [];
  const flush = () => {
    if (run.length) parts.push(highlightText(run.join('\n'), lang));
    run = [];
  };
  for (const line of lines) {
    if ('gap' in line) {
      flush();
      parts.push(`<span class="gap">${escape(line.gap)}</span>`);
    } else {
      run.push(line.text);
    }
  }
  flush();
  return parts.join('\n');
}
