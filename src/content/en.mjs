// Every sentence of the site, in English.
//
// pt.mjs has the same shape, key for key; the build fails if the two differ.
// Text is written in the small markup described in src/lib/html.mjs.
// `{commit}` is replaced by the short hash of the pinned framework commit and
// `{juce}` by the JUCE version the comparisons describe.

export default {
  site: {
    name: 'Manguebyte',
    tagline: 'An audio framework for Rust',
    description:
      'Manguebyte is an open-source audio framework for Rust: DSP, MIDI, devices, parameters and native CLAP and VST 3 plugins. Sample-accurate automation, output independent of block size and allocation-free processing, each enforced by a test.',
  },

  nav: {
    label: 'Main',
    home: 'Home',
    beyond: 'Beyond JUCE',
    features: 'Features',
    start: 'Get started',
    roadmap: 'Roadmap',
    name: 'The name',
    contribute: 'Contribute',
    github: 'GitHub',
    menu: 'Menu',
    skip: 'Skip to content',
    theme: 'Switch between the light and the dark theme',
    otherLanguage: 'Português',
    otherLanguageHint: 'Ler esta página em português',
    logoAlt: 'Manguebyte: a crab wearing headphones and playing an electric guitar',
  },

  code: {
    copy: 'Copy',
    copied: 'Copied',
    excerpt: 'Excerpt from [{file}]({url}) at commit `{commit}`.',
    whole: 'From [{file}]({url}) at commit `{commit}`, as it is in the file.',
    gaps: 'Lines beginning `// ...` mark what is left out.',
  },

  status: {
    done: 'Done',
    wip: 'In progress',
    todo: 'Not started',
    none: 'Not planned',
  },

  footer: {
    statusTitle: 'Where the project stands',
    status:
      'Manguebyte is young. What exists is tested and usable, but it covers a small part of the road ahead, the API will change before 1.0, and there is no GUI toolkit or plugin editor yet.',
    sourceTitle: 'Where this site gets its facts',
    source:
      'Every statement, proof link and code sample here was read from the framework\'s repository at commit [{commit}]({commitUrl}) ({date}), where [all eleven CI jobs passed]({ciUrl}). The repository is the authority; if the two disagree, the site is out of date.',
    legalTitle: 'Names and marks',
    legal:
      'Manguebyte is an independent project. It is not affiliated with, sponsored by or endorsed by the makers of JUCE, by Steinberg or by the CLAP project. JUCE is a trademark of its respective owner and CLAP is the name of its own project; both are mentioned only to describe what this framework aims to be and what it works with. VST is a trademark of Steinberg Media Technologies GmbH.',
    unrelated: 'This project is also unrelated to the company of a similar name that operates manguebyte.com.',
    licenceTitle: 'Licence',
    licence: 'The framework is licensed under [MIT](proof:licence-mit) or [Apache-2.0](proof:licence-apache), at your option.',
    contactTitle: 'Contact',
    contact: 'Questions and bugs go to the [issue tracker]({issuesUrl}). To reach the author directly, write to [{email}](mailto:{email}).',
    privacy: 'No cookies, no trackers, no requests to anyone else\'s servers.',
    colophon:
      'Headings are set in Londrina Solid, drawn by Marcelo Magalhães from the hand-painted signs of Brazilian streets. Text and code are in Atkinson Hyperlegible Next and Mono, from the Braille Institute. All three are under the SIL Open Font License.',
    madeIn: 'Made in Recife, Brazil.',
  },

  notFound: {
    title: 'Page not found',
    heading: 'Nothing here but mud.',
    body: 'The page you asked for does not exist, or has moved.',
    back: 'Back to the home page',
  },

  home: {
    title: 'Manguebyte: an audio framework for Rust, tested, not promised',
    kicker: 'Open-source audio framework for Rust',
    heading: ['Tested,', 'not promised.'],
    lede:
      'Manguebyte builds audio plugins and applications in Rust: DSP, MIDI, devices, parameters, and native CLAP and VST 3 export from one line each. Its goal is to be for Rust what JUCE is for C++, and then to go further. Every claim on this site links to the test that proves it.',
    ctaStart: 'Get started',
    ctaSource: 'Read the source',
    young:
      '**Young project.** The API will change before 1.0, and there is no GUI toolkit or plugin editor yet. [See what is missing](/features/#missing).',
    ring: 'Crabs with brains · Caranguejos com cérebro · ',

    proof: {
      heading: 'Green on every commit',
      caption:
        'These are real tests and validator results, not a mock-up. All of them passed in [CI at commit {commit}]({ciUrl}). Follow any line to the code.',
      command: 'cargo test --workspace',
      ok: 'ok',
      validators: [
        { name: 'clap-validator · Mangue Pluck.clap', result: '35 passed, 0 failed, 9 skipped', proof: 'ci-clap' },
        { name: 'clap-validator · Mangue Duck.clap', result: '33 passed, 0 failed, 11 skipped', proof: 'ci-clap' },
        { name: 'VST 3 validator · Windows, Linux, macOS', result: '537 passed, 0 failed', proof: 'ci-vst3' },
      ],
    },

    proven: {
      heading: 'Four things it proves on every commit',
      intro:
        'Matching JUCE is the baseline. These are places where Manguebyte already does something JUCE {juce} does not, each one backed by a test that runs in CI. [The full list has ten](/beyond-juce/), with a source for everything said about JUCE and the limit of every claim.',
      juceLabel: 'In JUCE {juce}',
      proofLabel: 'Proof',
      limitLabel: 'Limit',
      more: 'All ten claims, with proofs and limits',
      cards: [
        {
          claim: 'automation',
          title: 'Automation lands on the exact sample',
          body:
            'Every parameter change arrives with the frame it falls on and is applied on that frame: in the test harness, through CLAP, and through VST 3, where every point of every automation queue is delivered.',
          juce: 'A processor reads each parameter once per block.',
          limit: 'A processor chooses whether to use the timing. Reading a value once per block is still valid, and cheaper.',
          proofs: ['automation-harness', 'automation-clap', 'automation-vst3'],
        },
        {
          claim: 'block-size',
          title: 'The same sound at any block size',
          body:
            'One song rendered with six block patterns, from a steady 64 frames to an irregular `1, 511, 7, 300, 64, 2, 129`, must match bit for bit. The first time this test ran, it failed, and exposed a real bug.',
          juce: 'Whether the sound depends on the host\'s buffer size is up to each plugin.',
          limit: 'It covers what follows events. A value read once per block changes at block boundaries by definition.',
          proofs: ['block-size'],
        },
        {
          claim: 'real-time',
          title: 'No heap on the audio thread, or CI fails',
          body:
            'The tests replace the global allocator with one that counts. If any processor, or the CLAP wrapper, allocates or frees while processing, the build is red. It has already caught a mutex that allocates on macOS.',
          juce: 'Real-time safety is a rule in the documentation.',
          limit: 'A test that runs, not a compile-time proof. It catches heap use on the paths the tests exercise.',
          proofs: ['no-heap', 'no-heap-clap'],
        },
        {
          claim: 'clap',
          title: 'CLAP and VST 3 from one line each, checked by their own validators',
          body:
            '`export_clap!` and `export_vst3!` turn the same plugin into both formats. CI runs the CLAP project\'s validator and Steinberg\'s on an instrument and an effect; all 537 VST 3 tests pass on Windows, Linux and macOS.',
          juce: 'CLAP export is not available natively.',
          limit: 'No plugin editor in either format yet, and no AU, AAX or LV2.',
          proofs: ['ci-clap', 'ci-vst3'],
        },
      ],
    },

    code: {
      heading: 'A whole plugin, then one line per format',
      intro:
        'This is the example effect from the repository: a sidechain ducker. It describes itself, splits each block at its events, and is exported twice. None of the code below was written for this page.',
      notes: [
        {
          title: 'One description',
          body: '`INFO` and `LAYOUT` are constants. The same description becomes the CLAP descriptor and the VST 3 class, whose id is the same on every platform.',
        },
        {
          title: 'Events on their frame',
          body: '`split_at_events` renders up to each event, applies it and carries on, without copying or allocating. That call is all a plugin does to get sample-accurate automation.',
        },
        {
          title: 'Two formats, two lines',
          body: 'The macros are the whole integration. The repository\'s scripts then build a `.clap` file and a `.vst3` bundle on Windows, Linux and macOS.',
        },
      ],
      testHeading: 'And a test of it, with no host',
      testIntro:
        '`Harness` plays audio, a sidechain and automation into the plugin inside an ordinary unit test. This one checks that a change of depth lands on frame 1,000 of the block, and not one frame earlier.',
    },

    today: {
      heading: 'What you get today',
      intro: 'Twelve crates that work together, each usable on its own. `manguebyte-core` has no dependencies at all.',
      more: 'Every feature, by area',
    },

    missing: {
      heading: 'Where JUCE is ahead',
      intro:
        'JUCE has more than twenty years of production use behind it, and far more breadth. Today it has, and Manguebyte does not:',
      outro: 'The [roadmap](/roadmap/) says what exists and in what order the gap is being closed.',
    },

    name: {
      heading: 'Crabs with brains',
      body: [
        'The name comes from Recife, the city in the north-east of Brazil where this project was born. Recife is built on mangroves, [[pt:mangue]] in Portuguese.',
        'In the early 1990s a group of local musicians answered the city\'s troubles with a manifesto, [[pt:Caranguejos com Cérebro]], "Crabs with Brains": plug the rich, muddy roots of the region\'s culture into the global network of ideas. The image they chose was a satellite dish stuck in the mangrove mud.',
      ],
      more: 'The story of the name',
    },

    start: {
      heading: 'Start with one dependency',
      intro: 'Manguebyte is not on crates.io yet. Depend on it straight from Git:',
      guide: 'The getting started guide',
      repo: 'The repository on GitHub',
    },
  },

  beyond: {
    title: 'Where Manguebyte goes beyond JUCE',
    description:
      'Ten places where Manguebyte already does something JUCE does not, each with the problem, what JUCE does, what Manguebyte does, the test that proves it and the limit of the claim.',
    kicker: 'Beyond JUCE',
    heading: 'Where it already goes beyond JUCE',
    intro: [
      'JUCE is the reference for what a complete audio framework contains, and Manguebyte\'s first goal is to match it. This page is about the second goal: the places where Manguebyte already does something JUCE does not, and how each claim can be checked.',
      'JUCE is far ahead in breadth, and [the last section](#ahead) says where. Nothing in Manguebyte contains JUCE code: see [ADR 0004](repo:docs/adr/0004-juce-as-reference.md).',
    ],
    rulesHeading: 'Three rules keep this page honest',
    rules: [
      '**Every claim points at a test.** If it cannot be verified by running something in the repository, it is not listed.',
      '**Every statement about JUCE has a source**, and describes JUCE\'s `master` branch at version {juce} (October 2026). JUCE keeps moving; the JUCE team has announced an "AudioProcessor v2" that targets several of these points, so some of them may change in later releases.',
      '**Limits are stated next to the claim**, not left for the reader to find.',
    ],
    summaryHeading: 'Summary',
    summaryCaption: 'The ten claims. Each row links to its section below.',
    table: { claim: 'Claim', juce: 'JUCE {juce}', mangue: 'Manguebyte', checked: 'Checked by' },
    labels: {
      problem: 'The problem',
      juce: 'In JUCE',
      mangue: 'In Manguebyte',
      check: 'Check it',
      limit: 'Limit',
      proofs: 'The proofs',
      showTest: 'Show the test',
    },
    aheadHeading: 'Where JUCE is ahead',
    aheadIntro:
      'JUCE has been in production for more than twenty years, and it shows. Today it has, and Manguebyte does not:',
    aheadOutro:
      '[JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) tracks that gap module by module, and the [roadmap](/roadmap/) says in what order it is being closed.',
    sourceNote:
      'This page follows [docs/BEYOND_JUCE.md](repo:docs/BEYOND_JUCE.md) in the repository, which is the authority. One number differs: the validator counts in the CLAP section are the ones in the CI log of commit `{commit}`.',
  },

  features: {
    title: 'Features',
    description:
      'What Manguebyte contains today, area by area: core types, DSP, a live processing graph, parameters, CLAP and VST 3 plugins, MIDI, audio files and devices. And what it does not contain yet.',
    kicker: 'Features',
    heading: 'What exists today',
    intro: [
      'Twelve crates, designed to work together and each usable on its own: take the whole framework, or only the buffer type. Everything listed here is in the repository and covered by its tests.',
      'This is a small part of the road ahead. [What is missing](#missing) is listed just as plainly.',
    ],
    cratesLabel: 'Crates',
    facade: 'The `manguebyte` crate gathers all of them under one name, with a prelude.',
    missingHeading: 'Not there yet',
    missingIntro: 'These do not exist in Manguebyte today. If you need one of them now, JUCE has it.',
    missingOutro: 'The [roadmap](/roadmap/) lists every planned item and its status, and [where JUCE is ahead](/beyond-juce/#ahead) says the same from the other side.',
  },

  start: {
    title: 'Get started',
    description:
      'Add Manguebyte to a Rust project, make a sound, build the example plugin as CLAP and VST 3, play it without a host and test it in a unit test.',
    kicker: 'Get started',
    heading: 'From nothing to a plugin',
    intro: [
      'Everything on this page comes from the repository\'s README and its two example plugins, as they are at commit `{commit}`.',
      'Before you build on it: Manguebyte is young, it is not on crates.io yet, and **the API will change before 1.0**. There is no plugin editor yet: a plugin has parameters, and no window of its own.',
    ],
    steps: {
      before: {
        heading: 'Before you start',
        body: [
          'You need a stable Rust toolchain, version 1.85 or newer.',
          'On Linux, the device backend needs the ALSA development headers:',
        ],
      },
      dependency: {
        heading: 'Add the dependency',
        body: ['Depend on the repository directly:'],
      },
      render: {
        heading: 'Make a sound',
        body: [
          'A tuple of processors is itself a processor. Build a synth voice by putting three of them in a tuple, then render one second of it to a WAV file. This needs no audio hardware.',
        ],
      },
      play: {
        heading: 'Play it live',
        body: ['The same kind of chain, on the default output device. The closure runs on the audio thread.'],
      },
      examples: {
        heading: 'Run the examples',
        body: ['Clone the repository to run its examples and to build the example plugins:'],
      },
      plugin: {
        heading: 'Build a plugin',
        body: [
          '[plugins/pluck](repo:plugins/pluck/src/lib.rs) is a complete instrument in one file: a 16-voice plucked synth with per-note expression and modulation, automation on the exact sample, and a reverb. [plugins/duck](repo:plugins/duck/src/lib.rs) is the same for an effect: a sidechain ducker with a bypass switch that does not click. Each becomes a CLAP plugin and a VST 3 plugin with one line per format.',
          'Build either one into something a host can load. The scripts are shell scripts; on Windows, run them from Git Bash.',
        ],
        after:
          'The results are written to `target/bundled`. Copy them to the folder your host scans for CLAP or VST 3 plugins. Both examples go through the CLAP project\'s validator and Steinberg\'s on every commit.',
      },
      standalone: {
        heading: 'Play it without a host',
        body: [
          'The standalone wrapper runs the instrument straight on the sound card, with any connected MIDI keyboard. The argument is the level in decibels.',
        ],
      },
      test: {
        heading: 'Test it without a host',
        body: [
          'The same plugin runs inside a unit test through `Harness`, on a machine with no sound card. This test from the example instrument plays an A and checks, by FFT, that 440 Hz is what comes out.',
        ],
      },
      params: {
        heading: 'Declare parameters',
        body: [
          'Parameters are fields of a struct: typed, lock-free, with ranges, units and text conversion. This is the whole declaration from the example effect.',
        ],
      },
      next: {
        heading: 'Where to read next',
        items: [
          '[ARCHITECTURE.md](repo:docs/ARCHITECTURE.md): how the crates fit together, and which thread runs what.',
          '[The decision records](repo:docs/adr/): why parameters have no listeners, why there is one event stream, and the rest.',
          '[Beyond JUCE](/beyond-juce/): what the framework proves, and the limit of each claim.',
          '[CONTRIBUTING.md](repo:CONTRIBUTING.md): the rules for code that runs on the audio thread.',
        ],
      },
    },
  },

  roadmap: {
    title: 'Roadmap and status',
    description:
      'What exists in Manguebyte and what is planned, phase by phase, and where it stands against each of JUCE\'s 24 modules.',
    kicker: 'Roadmap',
    heading: 'What exists and what is planned',
    intro: [
      'Manguebyte aims to become the complete equivalent of JUCE for Rust. That is years of work, so it is split into phases, and each phase leaves the framework useful for a wider set of projects than the one before.',
      '**Nothing here is a promise or a schedule.** It is a statement of direction, and it changes as people show up and build things. If an item interests you, [open an issue]({issuesUrl}) and say so.',
    ],
    legend: 'Legend',
    count: '{done} of {total} done',
    beyondHeading: 'Beyond parity',
    beyondIntro:
      'Matching JUCE is the baseline, not the finish line. These are the places where a framework designed for Rust can do better. They are goals: [what is already proven](/beyond-juce/) has its own page.',
    parityHeading: 'Against JUCE, module by module',
    parityIntro:
      'JUCE {juce} has 24 modules. Parity means the same capability, not the same classes: where Rust or its ecosystem already solves something well, the plan is to not rebuild it. [JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) explains every row.',
    parityTable: { module: 'JUCE module', crates: 'Manguebyte crates', status: 'Status' },
    sourceNote:
      'This page follows [ROADMAP.md](repo:ROADMAP.md) at commit `{commit}`. One item is split in two here: that file still lists protection against subnormal numbers as not started, while the same commit adds it and tests it.',
  },

  name: {
    title: 'Why "Manguebyte"?',
    description:
      'The name comes from Recife and from mangue bit, the movement the world came to know as manguebeat: local roots plugged into global technology.',
    kicker: 'The name',
    heading: 'Why "Manguebyte"?',
    lede: 'The name comes from Recife, the city in the north-east of Brazil where this project was born.',
    story: [
      'Recife is built on mangroves, [[pt:mangue]] in Portuguese: tidal forests where rivers meet the sea, and one of the most fertile ecosystems on Earth.',
      'In the early 1990s the city was in deep economic trouble, and a group of local musicians answered with a manifesto called [[pt:Caranguejos com Cérebro]], "Crabs with Brains". Its proposal was to plug the rich, muddy roots of the region\'s culture into the global network of ideas. The image they chose was a satellite dish stuck in the mangrove mud.',
      'The movement was called **mangue bit**: [[pt:mangue]] for the mangrove, *bit* for the unit of digital information. The press heard "beat", and the world came to know it as **manguebeat**. Bands such as Chico Science & Nação Zumbi and Mundo Livre S/A mixed maracatu, coco and ciranda with rock, funk, hip-hop and electronic music, and changed Brazilian music for good.',
    ],
    fitsHeading: 'The name fits in more ways than one',
    fits: [
      {
        term: 'Mangue',
        body: 'is where we come from, and it is the home of the crab, which is both the symbol of the movement and, as it happens, the mascot of Rust.',
      },
      {
        term: 'Byte',
        body: 'is the bit grown up: eight of them, the unit that software is actually written in. It is our nod to *mangue bit*, one step further on.',
      },
      {
        term: 'Music',
        body: 'It is a music name for a music framework, taken from a movement that was about connecting local roots to global technology. That is what open source does.',
      },
    ],
    logoHeading: 'So the logo is a crab',
    logo: 'A crab with headphones and a guitar: a crab with brains, making noise.',
    quote: 'A satellite dish stuck in the mangrove mud.',
    quoteSource: 'The image of the manifesto',
  },

  contribute: {
    title: 'Contribute',
    description:
      'How to help build Manguebyte: where help is needed, the clean-room rule, the checks to run, the rules for real-time code, and the licence.',
    kicker: 'Contribute',
    heading: 'Built in the open',
    intro: [
      'Manguebyte is a large project with a long road ahead, and it only gets there if many people build it together. Contributions are welcome, from typo fixes to whole new crates.',
      'Everything in the repository is in English: code, comments, commit messages, issues and pull requests. Imperfect English is completely fine.',
    ],
    waysHeading: 'Ways to help',
    ways: [
      { term: 'Report a bug', body: 'Open an issue with what you did, what you expected and what happened. A small program that reproduces the problem is worth a lot.' },
      { term: 'Propose a feature', body: 'Open an issue before writing a large change, so the design can be discussed first. The [roadmap](/roadmap/) lists what is planned.' },
      { term: 'Improve documentation', body: 'Clearer explanations and better examples are always welcome.' },
      { term: 'Write code', body: 'Pick an item from the roadmap or an open issue, comment that you are taking it, and send a pull request.' },
    ],
    cleanHeading: 'One rule above the others: clean room',
    clean: [
      'Manguebyte is inspired by what JUCE makes possible, but it contains no JUCE code and must never contain any. JUCE is licensed under the AGPL or a commercial licence, both incompatible with this project\'s.',
      '**Do** use JUCE\'s module list, public documentation, changelog, issue tracker and forum to decide what to build and which designs to avoid.',
      '**Never** copy, translate or paraphrase JUCE source code, and do not write an implementation with the corresponding JUCE implementation open. The same goes for any other project whose licence is not compatible with MIT or Apache-2.0.',
      'Work from specifications, standards, papers, textbooks and your own knowledge. The reasoning is in [ADR 0004](repo:docs/adr/0004-juce-as-reference.md).',
    ],
    setupHeading: 'Set up and check',
    setup: [
      'You need a stable Rust toolchain, 1.85 or newer, with `rustfmt` and `clippy`. On Linux, also the ALSA development headers.',
      'Before opening a pull request, run the same checks the CI runs. One script does all of them and stops at the first failure:',
    ],
    setupAfter:
      'A pull request should do one thing and say what and why; include tests for new behaviour and for fixed bugs; document every public item; and keep the build free of warnings.',
    realtimeHeading: 'Writing real-time code',
    realtimeIntro:
      'Code on the audio thread has a deadline of a few milliseconds, every time. In `Processor::process` and anything it calls:',
    realtime: [
      '**Do not allocate or free memory.** Allocate in `prepare`.',
      '**Do not lock.** Use atomics or the wait-free queue.',
      '**Do not block or do I/O.** No files, no network, no printing.',
      '**Do not panic.** Validate in `prepare`, and clamp instead of asserting.',
    ],
    realtimeAfter:
      'These rules are enforced: [a test](proof:no-heap) replaces the allocator with one that counts and fails if a processor touches the heap while processing. When you add a processor, add it to that test.',
    licenceHeading: 'Licence of contributions',
    licence: [
      'Manguebyte is dual licensed under [MIT](proof:licence-mit) and [Apache-2.0](proof:licence-apache). Unless you explicitly state otherwise, any contribution you intentionally submit for inclusion in the project, as defined in the Apache-2.0 licence, is dual licensed in the same way, without any additional terms or conditions.',
    ],
    conductHeading: 'Conduct',
    conduct:
      'Be kind, be patient and assume good faith. Criticise code, not people. This project wants contributors of every background and experience level, and harassment or disrespect of any kind is not accepted.',
    contactHeading: 'Where to go',
    links: {
      guide: 'The full contributing guide',
      issues: 'Issues on GitHub',
      roadmap: 'The roadmap',
      email: 'Write to the author',
    },
  },
};
