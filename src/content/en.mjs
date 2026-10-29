// Every sentence of the site, in English.
//
// pt.mjs has the same shape, key for key; the build fails if the two differ.
// Text is written in the small markup described in src/lib/html.mjs.
// `{commit}` is replaced by the short hash of the pinned framework commit and
// `{juce}` by the JUCE version the comparisons describe.

export default {
  site: {
    name: 'Manguebyte',
    fullName: 'Manguebyte Audio Framework',
    tagline: 'An audio framework for Rust',
    description:
      'The Manguebyte Audio Framework is open-source audio for Rust, released on crates.io: DSP and instruments, metering, MIDI, files, devices, plugin editors, CLAP, VST 3, LV2 and Audio Unit plugins, and hosting. Sample-accurate automation, output independent of block size and allocation-free processing, each enforced by a test.',
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
    aratu: 'Aratu',
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
      'Manguebyte is young. Version {version} is its first release on crates.io. What exists is tested and usable, but it covers a small part of the road ahead, the API will change before 1.0, and of its plugin editors only one has been opened in a host by hand.',
    sourceTitle: 'Where this site gets its facts',
    source:
      'Every statement, proof link and code sample here was read from the framework’s repository at commit [{commit}]({commitUrl}) ({date}), where [all {ciJobs} CI jobs passed]({ciUrl}). That commit comes well after the [{version} release]({releaseUrl}), commit `{releaseCommit}`, so not everything described here is on crates.io yet: hosting Audio Units, MIDI 2.0 through the systems’ own output, Opus encoding, spectral processing, the vector operations, the tempo map, the newer plugin extensions and the crates `manguebyte-state` and `manguebyte-ump-io`, among others, are only in the repository so far, listed under “Unreleased” in its [changelog](repo:CHANGELOG.md). The repository is the authority; if the two disagree, the site is out of date.',
    legalTitle: 'Names and marks',
    legal:
      'Manguebyte is an independent project. It is not affiliated with, sponsored by or endorsed by the makers of JUCE, by Steinberg, by Apple, by Avid, by Cockos or by the CLAP project. JUCE is a trademark of its respective owner and CLAP is the name of its own project; both are mentioned only to describe what this framework aims to be and what it works with. VST is a trademark of Steinberg Media Technologies GmbH. ASIO is a trademark of Steinberg Media Technologies GmbH, registered in Europe and other countries. Audio Units, Mac and macOS are trademarks of Apple Inc. AAX and Pro Tools are trademarks of Avid Technology, Inc. REAPER is a trademark of Cockos Incorporated.',
    unrelated: 'This project is also unrelated to the company of a similar name that operates manguebyte.com.',
    licenceTitle: 'Licence',
    licence: 'The framework is licensed under [MIT](proof:licence-mit) or [Apache-2.0](proof:licence-apache), at your option. The one exception is the opt-in ASIO crate, `manguebyte-pro-io`, which is under the [GPLv3](proof:pro-io-licence).',
    contactTitle: 'Contact',
    contact: 'Questions and bugs go to the [issue tracker]({issuesUrl}). To reach the author directly, write to [{email}](mailto:{email}).',
    privacy: 'No cookies, no trackers, no requests to anyone else’s servers.',
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
    title: 'Manguebyte Audio Framework: audio for Rust, tested, not promised',
    kicker: 'Open-source audio framework for Rust',
    heading: ['Tested,', 'not promised.'],
    lede:
      'Manguebyte builds audio plugins and applications in Rust: DSP and instruments, metering, MIDI, files, devices, plugin editors and hosting, and native CLAP, VST 3, LV2 and Audio Unit export from one line each. Its goal is to be for Rust what JUCE is for C++, and then to go further. Every claim on this site links to the test that proves it.',
    ctaStart: 'Get started',
    ctaSource: 'Read the source',
    young:
      '**Version {version}, the first on [crates.io]({crateUrl}).** The project is young and the API will change before 1.0. Plugin editors open in Win32 windows and are tested in CI; by hand, one has been opened in a host so far, Mangue Pluck’s in REAPER. [See what is missing](/features/#missing).',
    ring: 'Crabs with brains · Caranguejos com cérebro · ',

    proof: {
      heading: 'Green on every commit',
      caption:
        'These are real tests and validator results, not a mock-up. All of them passed in [CI at commit {commit}]({ciUrl}). Follow any line to the code.',
      command: 'cargo test --workspace',
      ok: 'ok',
      validators: [
        { name: 'clap-validator · Mangue Pluck.clap', result: '37 passed, 0 failed, 7 skipped', proof: 'ci-clap' },
        { name: 'clap-validator · Mangue Duck.clap', result: '36 passed, 0 failed, 8 skipped', proof: 'ci-clap' },
        { name: 'VST 3 validator · Windows, Linux, macOS', result: '537 passed, 0 failed', proof: 'ci-vst3' },
        { name: 'auval · Mangue Pluck and Mangue Duck, macOS', result: 'AU VALIDATION SUCCEEDED', proof: 'ci-au' },
      ],
    },

    proven: {
      heading: 'Four things it proves on every commit',
      intro:
        'Matching JUCE is the baseline. These are places where Manguebyte already does something JUCE {juce} does not, each one backed by a test that runs in CI. [The full list has seventeen](/beyond-juce/), with a source for everything said about JUCE and the limit of every claim.',
      juceLabel: 'In JUCE {juce}',
      proofLabel: 'Proof',
      limitLabel: 'Limit',
      more: 'All seventeen claims, with proofs and limits',
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
          juce: 'Whether the sound depends on the host’s buffer size is up to each plugin.',
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
            '`export_clap!` and `export_vst3!` turn the same plugin into both formats. CI runs the CLAP project’s validator and Steinberg’s on an instrument and an effect, and neither fails a test; all 537 of Steinberg’s pass on Windows, Linux and macOS, its double-precision tests included. Both were also [tested by hand in REAPER](proof:host-tests), and `export_lv2!` and `export_au!` add LV2 and Audio Units, which pass Apple’s `auval` in CI.',
          juce: 'CLAP export is not available natively.',
          limit: 'Editors are tested in CI; by hand, only Mangue Pluck’s CLAP editor has been opened in a host. LV2 has run in no host but the framework’s own, and no DAW has loaded the Audio Units yet. No AUv3 or AAX.',
          proofs: ['ci-clap', 'ci-vst3', 'ci-au'],
        },
      ],
    },

    code: {
      heading: 'A whole plugin, then one line per format',
      intro:
        'This is the example effect from the repository: a sidechain ducker. It describes itself, splits each block at its events, and is exported in four formats. None of the code below was written for this page.',
      notes: [
        {
          title: 'One description',
          body: '`INFO` and `LAYOUT` are constants. The same description becomes the CLAP descriptor, the VST 3 class, whose id is the same on every platform, the LV2 plugin’s Turtle files, and the Audio Unit’s codes, which are hashed from the plugin’s id.',
        },
        {
          title: 'Events on their frame',
          body: '`split_at_events` renders up to each event, applies it and carries on, without copying or allocating. That call is all a plugin does to get sample-accurate automation.',
        },
        {
          title: 'Four formats, four lines',
          body: 'The macros are the whole integration, and `editor` hands the wrappers the plugin’s editor. `cargo mangue` then builds a `.clap`, a `.vst3` and an `.lv2` bundle in each system’s layout, and on a Mac a `.component`.',
        },
      ],
      testHeading: 'And a test of it, with no host',
      testIntro:
        '`Harness` plays audio, a sidechain and automation into the plugin inside an ordinary unit test. This one checks that a change of depth lands on frame 1,000 of the block, and not one frame earlier.',
    },

    today: {
      heading: 'What you get today',
      intro: 'Twenty-seven crates that work together, each usable on its own, one of them a command-line tool. Twenty-five are on crates.io, with their documentation on docs.rs; `manguebyte-state` and `manguebyte-ump-io` came after the {version} release and are in the repository only. `manguebyte-core` has no dependencies at all.',
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
        'In the early 1990s a group of local musicians answered the city’s troubles with a manifesto, [[pt:Caranguejos com Cérebro]], “Crabs with Brains”: plug the rich, muddy roots of the region’s culture into the global network of ideas. The image they chose was a satellite dish stuck in the mangrove mud.',
      ],
      more: 'The story of the name',
    },

    ecosystem: {
      heading: 'The Manguebyte ecosystem',
      intro: 'Two more projects from Recife grow from the same mangue, built to run on Manguebyte.',
      more: 'More about Aratu',
    },

    start: {
      heading: 'Start with one dependency',
      intro: 'Manguebyte is on [crates.io]({crateUrl}), with its documentation on [docs.rs]({docsUrl}):',
      tool: 'Or install the command-line tool and let it write a plugin crate for you:',
      guide: 'The getting started guide',
      repo: 'The repository on GitHub',
    },
  },

  beyond: {
    title: 'Where Manguebyte goes beyond JUCE',
    description:
      'Seventeen places where Manguebyte already does something JUCE does not, each with the problem, what JUCE does, what Manguebyte does, the test that proves it and the limit of the claim.',
    kicker: 'Beyond JUCE',
    heading: 'Where it already goes beyond JUCE',
    intro: [
      'JUCE is the reference for what a complete audio framework contains, and Manguebyte’s first goal is to match it. This page is about the second goal: the places where Manguebyte already does something JUCE does not, and how each claim can be checked.',
      'JUCE is far ahead in breadth, and [the last section](#ahead) says where. Nothing in Manguebyte contains JUCE code: see [ADR 0004](repo:docs/adr/0004-juce-as-reference.md).',
    ],
    rulesHeading: 'Three rules keep this page honest',
    rules: [
      '**Every claim points at a test.** If it cannot be verified by running something in the repository, it is not listed.',
      '**Every statement about JUCE has a source**, and describes JUCE’s `master` branch at version {juce} (October 2026). JUCE keeps moving; the JUCE team has announced an “AudioProcessor v2” that targets several of these points, so some of them may change in later releases.',
      '**Limits are stated next to the claim**, not left for the reader to find.',
    ],
    summaryHeading: 'Summary',
    summaryCaption: 'The seventeen claims. Each row links to its section below.',
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
      'This page follows [docs/BEYOND_JUCE.md](repo:docs/BEYOND_JUCE.md) in the repository at commit `{commit}`. Four limits say a little more, or something newer, from the repository’s other documents: that of section 2 cites what testing in REAPER found; that of section 5 adds, from [TECH_DEBT.md](repo:docs/TECH_DEBT.md), how CI checks the ports that speak MIDI 2.0, and that no MIDI 2.0 device has been tried; that of section 6 says, as the README does, that lilv loads the LV2 plugins in CI; and that of section 9 says, as the README does, that one opt-in crate is under the GPLv3.',
  },

  features: {
    title: 'Features',
    description:
      'What Manguebyte contains today, area by area: core types, DSP and instruments, a live processing graph, parameters, CLAP, VST 3, LV2 and Audio Unit plugins, hosting, MIDI, audio files and devices. And what it does not contain yet.',
    kicker: 'Features',
    heading: 'What exists today',
    intro: [
      'Twenty-seven crates, designed to work together and each usable on its own: take the whole framework, or only the buffer type. Everything listed here is in the repository at commit `{commit}` and covered by its tests, but not all of it is released: twenty-five of the crates are on [crates.io]({crateUrl}) as version {version}, with their documentation on [docs.rs]({docsUrl}), and what came after that release, two crates among it, is listed under “Unreleased” in the [changelog](repo:CHANGELOG.md). To use it now, depend on the repository.',
      'This is a small part of the road ahead. [What is missing](#missing) is listed just as plainly.',
    ],
    cratesLabel: 'Crates',
    facade: 'The `manguebyte` crate gathers nineteen of the others under one name, with a prelude; the plugin formats, editors, hosting and the sampler are behind features. It leaves seven out: `manguebyte-gfx` and `manguebyte-window`, which the editors are built on, `manguebyte-ump-io`, which the device crate’s MIDI output uses, `manguebyte-state`, for application state, the browser engine `manguebyte-web`, the command-line tool and `manguebyte-pro-io`.',
    missingHeading: 'Not there yet',
    missingIntro: 'These do not exist in Manguebyte today. If you need one of them now, JUCE has it.',
    missingOutro: 'The [roadmap](/roadmap/) lists every planned item and its status, and [where JUCE is ahead](/beyond-juce/#ahead) says the same from the other side.',
  },

  start: {
    title: 'Get started',
    description:
      'Add Manguebyte to a Rust project from crates.io, start a plugin with its command-line tool, make a sound, build the example plugin as CLAP and VST 3, play it without a host and test it in a unit test.',
    kicker: 'Get started',
    heading: 'From nothing to a plugin',
    intro: [
      'Everything on this page comes from the repository’s README and its two example plugins, as they are at commit `{commit}`. That commit comes well after the [{version} release]({releaseUrl}), but the two plugins and the README’s quick start are the same as in the release.',
      'Before you build on it: Manguebyte is young, {version} is its first release, and **the API will change before 1.0**. Plugin editors exist and are tested in CI; by hand, only Mangue Pluck’s CLAP editor has been opened in a host so far.',
    ],
    steps: {
      before: {
        heading: 'Before you start',
        body: [
          'You need a stable Rust toolchain, version 1.85 or newer.',
          'On Linux, the device backend needs the ALSA development headers, and the JACK host (feature `jack`) the JACK ones (`libjack-jackd2-dev`):',
        ],
      },
      dependency: {
        heading: 'Add the dependency',
        body: [
          'Manguebyte is on [crates.io]({crateUrl}), and the documentation of every crate is on [docs.rs]({docsUrl}). Add it to your `Cargo.toml`:',
        ],
        after: 'To follow the newest work on `main` instead, depend on the repository with a `git` dependency, as the [README](repo:README.md) shows.',
      },
      newPlugin: {
        heading: 'Start a plugin',
        body: [
          'Install the command-line tool, and let it write a plugin crate. The crate depends on the release `cargo mangue` came with; `--manguebyte-git` makes it follow the repository instead, and `--manguebyte-path` a checkout of it.',
        ],
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
          '[plugins/pluck](repo:plugins/pluck/src/lib.rs) is a complete instrument in one file: a 16-voice plucked synth with per-note expression and modulation, automation on the exact sample, a reverb and a small editor. [plugins/duck](repo:plugins/duck/src/lib.rs) is the same for an effect: a sidechain ducker with a bypass switch that does not click and an editor with a gain-reduction meter. Each becomes a CLAP, a VST 3, an LV2 plugin and an Audio Unit with one line per format.',
          'Build either one into something a host can load with the framework’s command-line tool, `cargo mangue`, which writes a `.clap` and a `.vst3` in each system’s layout (add `--format lv2` for an `.lv2` bundle, and on a Mac `--format au` for a `.component`):',
        ],
        after:
          '`cargo mangue new my-synth --kind instrument` starts a plugin of your own from a template; `install` copies a plugin into the user’s plugin folders, and `validate` runs the CLAP and VST 3 validators on it (`validate --format au` runs Apple’s `auval` on a `.component`). Both examples go through those validators on every commit, and [were tested by hand in REAPER](proof:host-tests) as CLAP and VST 3 before they had editors; since then [Mangue Pluck’s CLAP editor has been opened there](proof:host-tests-19).',
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
          '[docs.rs]({docsUrl}): the documentation of every crate of the release.',
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
      'What exists in Manguebyte and what is planned, phase by phase, and where it stands against each of JUCE’s 24 modules.',
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
      'This page follows [ROADMAP.md](repo:ROADMAP.md) and [docs/JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) at commit `{commit}`.',
  },

  name: {
    title: 'Why “Manguebyte”?',
    description:
      'The name comes from Recife and from mangue bit, the movement the world came to know as manguebeat: local roots plugged into global technology.',
    kicker: 'The name',
    heading: 'Why “Manguebyte”?',
    lede: 'The name comes from Recife, the city in the north-east of Brazil where this project was born.',
    story: [
      'Recife is built on mangroves, [[pt:mangue]] in Portuguese: tidal forests where rivers meet the sea, and one of the most fertile ecosystems on Earth.',
      'In the early 1990s the city was in deep economic trouble, and a group of local musicians answered with a manifesto called [[pt:Caranguejos com Cérebro]], “Crabs with Brains”. Its proposal was to plug the rich, muddy roots of the region’s culture into the global network of ideas. The image they chose was a satellite dish stuck in the mangrove mud.',
      'The movement was called **mangue bit**: [[pt:mangue]] for the mangrove, *bit* for the unit of digital information. The press heard “beat”, and the world came to know it as **manguebeat**. Bands such as Chico Science & Nação Zumbi and Mundo Livre S/A mixed maracatu, coco and ciranda with rock, funk, hip-hop and electronic music, and changed Brazilian music for good.',
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

  // The projects of the ecosystem, shown on the home page and on Aratu’s.
  projects: [
    {
      id: 'manguebyte',
      name: 'Manguebyte',
      status: 'This framework',
      body: 'The open-source audio framework for Rust, under MIT or Apache-2.0, released on crates.io. Aratu already plays on its browser engine, and its Aratu Bridge plugin plays the same music in a DAW; Parabolic is to be built on it.',
    },
    {
      id: 'aratu',
      name: 'Aratu',
      status: 'In development',
      body: 'A live-coding language that reads like music: measures, beats and note values first, in Portuguese, Spanish and English. Its editor runs in the browser and plays on Manguebyte.',
    },
    {
      id: 'parabolic',
      name: 'Parabolic',
      status: 'Planned',
      body: 'A tool for musicians to record their own instruments and turn them into plugins and samplers without writing code.',
    },
  ],

  aratu: {
    title: 'Aratu: a live-coding language that reads like music',
    description:
      'Aratu is a live-coding language for musicians: measures, beats and note values first, in Portuguese, Spanish and English. Its editor runs in the browser, with a course of 24 lessons, and plays on Manguebyte’s browser engine.',
    kicker: 'The Manguebyte ecosystem',
    heading: 'Aratu',
    lede: 'A live-coding language that reads like music: measures, beats and note values first, in Portuguese, Spanish and English, in the browser. In development, and playing on Manguebyte.',
    status:
      '**In development.** The language reads, checks and schedules every example in its book, and the editor runs in the browser with nothing to install. Running inside a DAW is planned, and Manguebyte’s [Aratu Bridge](#bridge) is the way there.',
    mascotAlt: 'Aratu, an orange mangrove crab wearing headphones, coding music on a laptop',
    tryIt: 'Try it in the browser',
    whatHeading: 'Time the way a musician counts it',
    what: [
      'Aratu is a live-coding language and environment for people who know music. Measures, time signatures, note values and tempo come first, so that what you type is laid out in time the way a musician already thinks about it.',
      'Note names work in solfège ([[pt:dó4 ré4 mi4]]) as well as in letters, and the keywords themselves can be written in Portuguese, Spanish or English. When a bar does not add up, Aratu says so in a musician’s words, in any of the three. It runs in the browser today; running inside a DAW, in step with the host’s transport, is planned.',
    ],
    placesHeading: 'Three places in the editor',
    places: [
      {
        term: 'Learn',
        body: 'A course of 24 lessons, from the first sound to a whole piece, made for the classroom: rhythm and meters, Brazilian percussion, melody and harmony, dynamics and form, tempo and feel, playing live, sound and mixing. It ends with a maracatu project. Every example plays on the page, and every exercise is checked by what it plays, with what differs told bar by bar.',
      },
      {
        term: 'Manual',
        body: 'The whole language in 21 chapters, in the same order as the course, with every example playable.',
      },
      {
        term: 'Play',
        body: 'A free editor with an editable rhythm map, a knob beside every number that sets the tempo or the sound, and a Sounds panel. A change made while it plays comes in at the next bar line, or at the next beat. A stage mode shows only the code, full screen, for playing in front of an audience.',
      },
    ],
    tasteHeading: 'A taste',
    tasteIntro: 'From Aratu’s README. A space separates beats, symbols written together share their beat (`cc` is two eighths), `_` holds and `-` rests; chords are written as a lead sheet, and strums with `d` and `u`.',
    engineHeading: 'Built on Manguebyte',
    engine:
      'The editor plays through `manguebyte-web`, Manguebyte’s engine for the browser: every voice in its Sounds panel, from sampled instruments to modelled strings, FM, an organ, an acid bass and a synth, each part’s effects, and the master bus with its true-peak limiter. At Aratu’s pinned commit its Brazilian percussion lines, the guitar’s golpe and the clap (except on the 808) still play on provisional sounds of its own, in Web Audio; Manguebyte’s engine now [synthesises them on every drum kit](proof:web-percussion), at the same level on each. The engine itself is still [in progress](/roadmap/#phase-5): tested natively and in Node.js, its demo tried once in Chromium, not yet under load in a browser.',
    bridgeHeading: 'In a DAW: the Aratu Bridge',
    bridge: [
      'Manguebyte’s [Aratu Bridge](repo:plugins/aratu-bridge/) is an example CLAP, VST 3 and Audio Unit instrument that runs the browser’s engine inside a DAW. The page sends it the music, not the audio: the control calls and event records it would send its own engine, timed in beats, over a WebSocket on 127.0.0.1. The plugin plays them with `manguebyte-web` built natively, on the DAW’s device and in time with its transport, so the sound lands on a DAW track like any other instrument’s. A session sent over a real socket renders the same, bit for bit, as the engine renders it alone. On the page’s side, [bridge.js](proof:bridge-js) offers the same methods as the engine in the browser, though the six that read the engine’s state back, such as `paramValue` and `partLevels`, are not answered over the network; [the protocol](proof:bridge-doc) is written down, and wiring it into Aratu is Aratu’s side to write.',
      'It has been tried by hand once: on 19 October 2026, a page in Chromium served from `http://127.0.0.1` played through the CLAP build in REAPER 7.82 on Windows, which applied all 44 events the page sent, none late and none dropped, following REAPER’s tempo. Other DAWs, the VST 3 and AU builds, other browsers and `https://` pages are not tried yet, and the plugin has no editor and one stereo output.',
    ],
    bridgeProofsIntro: 'What backs this, at commit `{commit}`: three tests that run in Manguebyte’s CI, the record of the hand test, and the list of what is still owed:',
    nameHeading: 'Why “Aratu”?',
    name: 'The aratu is a crab of the mangrove, the [[pt:mangue]] of Recife that gave manguebeat, and Manguebyte, their names.',
    proofsHeading: 'What its tests check',
    proofsIntro: 'Aratu has its own [repository]({aratuUrl}) and CI, at commit `{aratuCommit}`. These tests run there on every commit:',
    readHeading: 'Read more',
    links: {
      repo: 'Aratu on GitHub',
      manual: 'Read the manual',
      vision: 'The vision',
    },
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
      { term: 'Report a bug', body: 'Open an issue with [the bug report form](proof:issue-bug): what you did, what you expected and what happened. A small program that reproduces the problem is worth a lot.' },
      { term: 'Ask a question', body: 'Questions, and ideas not yet ready to be an issue, go to [Discussions]({discussionsUrl}).' },
      { term: 'Propose a feature', body: 'Open an issue with [the feature request form](proof:issue-feature) before writing a large change, so the design can be discussed first. The [roadmap](/roadmap/) lists what is planned.' },
      { term: 'Improve documentation', body: 'Clearer explanations and better examples are always welcome.' },
      { term: 'Write code', body: 'Pick an item from the roadmap or an open issue, comment that you are taking it, and send a pull request. Issues labelled [good first issue]({goodFirstUrl}) are small and a good place to begin.' },
    ],
    cleanHeading: 'One rule above the others: clean room',
    clean: [
      'Manguebyte is inspired by what JUCE makes possible, but it contains no JUCE code and must never contain any. JUCE is licensed under the AGPL or a commercial licence, both incompatible with this project’s.',
      '**Do** use JUCE’s module list, public documentation, changelog, issue tracker and forum to decide what to build and which designs to avoid.',
      '**Never** copy, translate or paraphrase JUCE source code, and do not write an implementation with the corresponding JUCE implementation open. The same goes for any other project whose licence is not compatible with MIT or Apache-2.0.',
      'Work from specifications, standards, papers, textbooks and your own knowledge. The reasoning is in [ADR 0004](repo:docs/adr/0004-juce-as-reference.md).',
    ],
    setupHeading: 'Set up and check',
    setup: [
      'You need a stable Rust toolchain, 1.85 or newer, with `rustfmt` and `clippy`. On Linux, also the ALSA development headers, and the JACK ones, which `--all-features` builds.',
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
      'The one exception is `crates/manguebyte-pro-io`, which is under the [GPLv3](proof:pro-io-licence) only, for the reason [its README](proof:pro-io-readme) gives: a contribution to it is under the GPLv3.',
    ],
    securityHeading: 'Security problems',
    security: 'Do not open a public issue for a security problem. Report it privately, as [SECURITY.md](proof:security) describes.',
    conductHeading: 'Conduct',
    conduct:
      'Be kind, be patient and assume good faith. Criticise code, not people. This project wants contributors of every background and experience level, and harassment or disrespect of any kind is not accepted. The [Code of Conduct](proof:conduct) sets this out in full and says how to report a problem.',
    contactHeading: 'Where to go',
    links: {
      guide: 'The full contributing guide',
      issues: 'Issues on GitHub',
      goodFirst: 'Good first issues',
      discussions: 'Discussions',
      roadmap: 'The roadmap',
      email: 'Write to the author',
    },
  },
};
