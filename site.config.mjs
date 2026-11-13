// Everything that names an address, a person or a commit lives here.
// Nothing else in the site hard-codes any of it.

export default {
  // The canonical address of the site, with no trailing slash.
  baseUrl: 'https://manguebyte.org',

  // The framework's repository on GitHub.
  repo: 'alessonqueirozdev-hub/manguebyte',

  // The framework commit that every fact, proof link and code sample on the
  // site was read at. To update: change `commit`, `date`, `ciRun`, `ciJobs`
  // and, at a release, `release`; run
  // `node tools/sync.mjs`, review the content files, then build.
  source: {
    commit: '46ec338afa0316908bd47653b823a3d939d83dd0',
    date: '2026-11-12',
    // The GitHub Actions run of that commit, for the "green in CI" links.
    ciRun: '43251697233',
    // How many jobs that run has, all of which passed.
    ciJobs: 29,
    // The latest release, and where it was published. Today the pinned
    // commit is the release itself, v0.2.0, and the pages that name the
    // release say that what they describe is on crates.io. If the pin moves
    // past a release, those pages must say again what is not released yet.
    release: {
      version: '0.2.0',
      tag: 'v0.2.0',
      commit: '46ec338afa0316908bd47653b823a3d939d83dd0',
      crate: 'https://crates.io/crates/manguebyte',
      docs: 'https://docs.rs/manguebyte',
    },
  },

  // Other repositories of the ecosystem that the site quotes, each pinned
  // to a commit in the same way.
  related: {
    aratu: {
      repo: 'alessonqueirozdev-hub/aratu',
      commit: '0822eee795128d42af1cde3ef1aa17366aabe8cf',
      // The web editor, published from that repository with GitHub Pages
      // on its own domain. The book is there too, as pages to read, at
      // <language>/manual/ and <language>/learn/.
      editor: 'https://aratu.live/',
    },
    mare: { repo: 'alessonqueirozdev-hub/mare' },
    caecilia: {
      repo: 'alessonqueirozdev-hub/Caecilia',
      // Where the installers are published. Each system is listed in the
      // page's text only once it has a file there.
      release: 'https://github.com/alessonqueirozdev-hub/Caecilia/releases/tag/v2.0.0-alpha.0',
      windows: 'https://github.com/alessonqueirozdev-hub/Caecilia/releases/download/v2.0.0-alpha.0/Caecilia-Setup-2.0.0-alpha.0-x64.exe',
      // The address of each system's installer, once it has one.
      linux: null,
      macos: null,
      playlist: 'PLeH-pPhG59Eo',
      videos: ['inWo58q_7Nk', 'JHh-7zB8bJQ', 'mVf4Q_gmbrA', '2raCsKsKtAI'],
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
