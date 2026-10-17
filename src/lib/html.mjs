// Helpers for writing HTML as strings.

export function escape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// A tagged template that joins arrays and drops null, undefined and false,
// so that a template can say `${condition && html`...`}` and map over lists.
// It does not escape: text that comes from content goes through `escape` or
// `inline` first.
export function html(strings, ...values) {
  let out = '';
  strings.forEach((string, index) => {
    out += string;
    if (index < values.length) {
      const value = values[index];
      if (Array.isArray(value)) out += value.join('');
      else if (value !== null && value !== undefined && value !== false) out += value;
    }
  });
  return out;
}

// The small markup that content files are written in:
//
//   `code`            code
//   **strong**        strong emphasis
//   *emphasis*        emphasis
//   [[pt:mangue]]     a word in another language (also en:)
//   [text](target)    a link
//
// A link's target is one of
//
//   /features/        a page of the site, in the reader's language
//   proof:block-size  a proof from sources.mjs, at its line in the repository
//   repo:docs/X.md    a file in the repository, at the pinned commit
//   aratu:docs/X.md   a file in Aratu's repository, at its pinned commit
//   https://...       anywhere else
export function makeInline(resolve) {
  return function inline(text) {
    let out = escape(text);
    const kept = [];
    const keep = (value) => `\u0000${kept.push(value) - 1}\u0000`;
    out = out.replace(/`([^`]+)`/g, (_, code) => keep(`<code>${code}</code>`));
    out = out.replace(/\[\[(pt|en):([^\]]+)\]\]/g, (_, lang, words) =>
      keep(`<i lang="${lang === 'pt' ? 'pt-BR' : 'en'}">${words}</i>`),
    );
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, target) => {
      const link = resolve(target.replace(/&amp;/g, '&'));
      // A test's name: let it break after an underscore, not mid-word.
      const words = /^[a-z0-9_]+$/.test(label) ? label.replaceAll('_', '_<wbr>') : label;
      return `<a href="${escape(link.href)}"${link.attrs ?? ''}>${words}</a>`;
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return out.replace(/\u0000(\d+)\u0000/g, (_, index) => kept[Number(index)]);
  };
}
