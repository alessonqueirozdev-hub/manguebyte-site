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
    commit: 'b59fd3a53ac862598c7b7a3e940bd994d35bce11',
    date: '2026-10-27',
    // The GitHub Actions run of that commit, for the "green in CI" links.
    ciRun: '40535674334',
    // How many jobs that run has, all of which passed.
    ciJobs: 29,
    // The latest release, and where it was published. Its tag can be an
    // earlier commit than `commit`: today v0.1.0 is 9daba9d, and the pinned
    // commit comes well after it, with new features and two new crates
    // (see the "Unreleased" section of the framework's CHANGELOG.md). What
    // the site says is true at the pinned commit; some of it is not in the
    // release on crates.io yet, and the pages that name the release say so.
    release: {
      version: '0.1.0',
      tag: 'v0.1.0',
      commit: '9daba9d020872d0fd98f291ddb225f2b505cb6ed',
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
