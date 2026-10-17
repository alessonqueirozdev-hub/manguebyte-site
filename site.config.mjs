// Everything that names an address, a person or a commit lives here.
// Nothing else in the site hard-codes any of it.

export default {
  // The canonical address of the site, with no trailing slash.
  baseUrl: 'https://manguebyte.org',

  // The framework's repository on GitHub.
  repo: 'alessonqueirozdev-hub/manguebyte',

  // The framework commit that every fact, proof link and code sample on the
  // site was read at. To update: change `commit`, `date` and `ciRun`, run
  // `node tools/sync.mjs`, review the content files, then build.
  source: {
    commit: 'c5835bfa656b2a746eebdff8c033ba855b54ae6b',
    date: '2026-10-16',
    // The GitHub Actions run of that commit, for the "green in CI" links.
    ciRun: '38996924457',
    // How many jobs that run has, all of which passed.
    ciJobs: 20,
  },

  // Other repositories of the ecosystem that the site quotes, each pinned
  // to a commit in the same way.
  related: {
    aratu: {
      repo: 'alessonqueirozdev-hub/aratu',
      commit: '40e6286726eb2914792b81427d586e36dd644455',
      // The web editor, published from that repository with GitHub Pages.
      editor: 'https://alessonqueirozdev-hub.github.io/aratu/',
    },
  },

  author: 'Alesson Queiroz',
  contact: 'alessonqueiroz.dev@gmail.com',

  // English is the default and lives at the root. `tag` goes into the
  // `lang` attribute and the hreflang links.
  languages: [
    { code: 'en', tag: 'en', prefix: '', name: 'English' },
    { code: 'pt', tag: 'pt-BR', prefix: '/pt', name: 'Português' },
  ],
};
