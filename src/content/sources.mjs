// What the site takes from the framework's repository.
//
// `tools/sync.mjs` reads this file, fetches each file at the commit pinned in
// `site.config.mjs`, and writes `generated.json` beside it: the line every
// proof is on, and the text of every code sample. If a test is renamed or a
// sample no longer matches, the sync fails instead of leaving the site
// pointing at something that is not there.

// A proof is a place in the repository that a claim links to.
//   file: path in the repository
//   find: text of the line to link to (omit to link to the file as a whole)
//   name: what the link is called on the page (defaults to the test's name)
export const proofs = {
  // Automation on the exact sample
  'automation-harness': {
    file: 'crates/manguebyte-plugin/src/harness.rs',
    find: 'fn automation_lands_on_its_exact_frame_and_updates_the_parameter(',
  },
  'automation-clap': {
    file: 'crates/manguebyte-clap/tests/abi.rs',
    find: 'fn automation_lands_on_its_frame_when_processing_in_place(',
  },
  'automation-vst3': {
    file: 'crates/manguebyte-vst3/tests/abi.rs',
    find: 'fn automation_lands_on_its_frame_when_processing_in_place(',
  },
  'automation-vst3-controller': {
    file: 'crates/manguebyte-vst3/tests/abi.rs',
    find: 'fn what_the_controller_is_told_does_not_disturb_running_automation(',
  },

  // Block size
  'block-size': {
    file: 'crates/manguebyte/tests/offline.rs',
    find: 'fn the_song_is_the_same_whatever_the_block_size(',
  },
  'block-size-pluck': {
    file: 'plugins/pluck/src/lib.rs',
    find: 'fn sounds_the_same_whatever_the_block_size(',
  },
  'block-size-duck': {
    file: 'plugins/duck/src/lib.rs',
    find: 'fn sounds_the_same_whatever_the_block_size(',
  },

  // Changes from outside the host
  'outside-changes': {
    file: 'crates/manguebyte-plugin/src/harness.rs',
    find: 'fn changes_made_outside_the_host_reach_the_plugin_as_events(',
  },

  // Real-time safety
  'no-heap': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    find: 'fn processors_do_not_use_the_heap(',
  },
  'no-heap-guard': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    find: 'fn the_guard_itself_catches_an_allocation(',
  },
  'no-heap-synth': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    find: 'fn a_synth_handles_a_flood_of_events_without_using_the_heap(',
  },
  'no-heap-clap': {
    file: 'crates/manguebyte-clap/tests/abi.rs',
    find: 'assert_eq!(processed.heap_calls, 0, "process used the heap");',
    name: 'heap_calls == 0 through the CLAP interface',
  },
  'ci-miri': { file: '.github/workflows/ci.yml', find: '  miri:', name: 'CI job: Miri' },

  // Per-note control
  'per-note': {
    file: 'crates/manguebyte-dsp/src/synth.rs',
    find: 'fn expression_and_modulation_reach_one_note_and_parameters_reach_all(',
  },
  'per-note-overlap': {
    file: 'crates/manguebyte-dsp/src/synth.rs',
    find: 'fn notes_with_identifiers_overlap_on_one_key_and_end_separately(',
  },
  'per-note-clap': {
    file: 'crates/manguebyte-clap/tests/abi.rs',
    find: 'fn an_instrument_takes_notes_expression_modulation_and_a_sidechain(',
  },

  // Plugin formats
  'ci-clap': { file: '.github/workflows/ci.yml', find: '  clap:', name: 'CI job: CLAP validation' },
  'ci-vst3': { file: '.github/workflows/ci.yml', find: '  vst3:', name: 'CI job: VST 3 validation' },
  'export-duck': {
    file: 'plugins/duck/src/lib.rs',
    find: 'manguebyte::clap::export_clap!(Duck);',
    name: 'plugins/duck/src/lib.rs',
  },

  // Testing without a host
  'harness-pitch': {
    file: 'plugins/pluck/src/lib.rs',
    find: 'fn plays_the_pitch_it_is_asked_for(',
  },
  'harness-duck': {
    file: 'plugins/duck/src/lib.rs',
    find: 'fn automation_lands_on_its_frame_with_audio_running_through(',
  },

  // Parameters and state
  'state-versions': {
    file: 'crates/manguebyte-params/src/set.rs',
    find: 'fn state_from_another_version_loads_as_far_as_it_can(',
  },
  'params-threads': {
    file: 'crates/manguebyte-params/src/param.rs',
    find: 'fn params_are_shareable_across_threads(',
  },

  // Subnormal numbers
  'subnormal-clap': {
    file: 'crates/manguebyte-clap/tests/abi.rs',
    find: 'fn numbers_too_small_to_hear_are_zero_while_the_plugin_runs_and_only_then(',
  },
  'subnormal-vst3': {
    file: 'crates/manguebyte-vst3/tests/abi.rs',
    find: 'fn numbers_too_small_to_hear_are_zero_while_the_plugin_runs_and_only_then(',
  },
  'subnormal-guard': { file: 'crates/manguebyte-core/src/denormal.rs' },

  // Licence
  'licence-mit': { file: 'LICENSE-MIT' },
  'licence-apache': { file: 'LICENSE-APACHE' },

  // Hosting plugins
  'hosting-clap': {
    file: 'crates/manguebyte-host/tests/clap_pluck.rs',
    find: 'fn the_hosted_plugin_sounds_exactly_as_the_plugin_does_alone(',
  },
  'hosting-vst3': {
    file: 'crates/manguebyte-host/tests/vst3_pluck.rs',
    find: 'fn the_hosted_plugin_sounds_exactly_as_the_plugin_does_alone(',
  },
  'hosting-automation': {
    file: 'crates/manguebyte-host/tests/vst3_pluck.rs',
    find: 'fn automation_lands_on_its_frame_through_the_host(',
  },
  'hosting-heap': {
    file: 'crates/manguebyte-host/tests/clap_pluck.rs',
    find: 'fn processing_never_uses_the_heap(',
  },
  'ci-miri-host': { file: '.github/workflows/ci.yml', find: '  miri-host:', name: 'CI job: Miri (plugin host)' },

  // Loudness and meters
  'ebu-3341': {
    file: 'crates/manguebyte-analysis/tests/ebu_tech_3341.rs',
    find: 'fn cases_1_and_2_a_steady_tone_reads_its_level_on_all_three_scales(',
  },
  'ebu-3341-true-peak': {
    file: 'crates/manguebyte-analysis/tests/ebu_tech_3341.rs',
    find: 'fn cases_15_to_19_a_sine_is_read_at_its_crest_wherever_the_samples_fall(',
  },
  'ebu-3342': {
    file: 'crates/manguebyte-analysis/tests/ebu_tech_3342.rs',
    find: 'fn case_1_two_tones_ten_decibels_apart(',
  },

  // Open Sound Control
  'osc-time-tag': {
    file: 'crates/manguebyte-osc/tests/bridge.rs',
    find: 'fn a_time_tag_lands_on_its_exact_frame(',
  },
  'osc-every-frame': {
    file: 'crates/manguebyte-osc/tests/bridge.rs',
    find: 'fn every_frame_of_a_block_can_be_hit(',
  },
  'osc-block-size': {
    file: 'crates/manguebyte-osc/tests/bridge.rs',
    find: 'fn where_an_event_lands_does_not_depend_on_the_block_size(',
  },
  'osc-codec': {
    file: 'crates/manguebyte-osc/tests/codec.rs',
    find: 'fn the_examples_in_the_specification_encode_byte_for_byte(',
  },

  // Pitch and bands
  'pitch': {
    file: 'crates/manguebyte-analysis/tests/pitch.rs',
    find: 'fn every_test_tone_is_found_within_a_cent(',
  },
  'spectrum-band': {
    file: 'crates/manguebyte-analysis/tests/spectrum.rs',
    find: 'fn a_full_scale_sine_reads_0_db_in_its_band(',
  },
  'spectrum-noise': {
    file: 'crates/manguebyte-analysis/tests/spectrum.rs',
    find: 'fn bands_of_white_and_pink_noise_read_the_power_that_lies_in_them(',
  },

  // Keyboard state
  'keyboard-heap': {
    file: 'crates/manguebyte-midi/tests/realtime.rs',
    find: 'fn the_keyboard_state_does_not_use_the_heap(',
  },
  'keyboard-sounding': {
    file: 'crates/manguebyte-midi/src/keyboard.rs',
    find: 'fn a_key_that_goes_on_sounding_is_never_read_as_silent(',
  },
  'keyboard-threads': {
    file: 'crates/manguebyte-midi/src/keyboard.rs',
    find: 'fn an_interface_can_read_while_another_thread_writes(',
  },

  // The command-line tool, and what testing in a real host found
  'ci-cli': { file: '.github/workflows/ci.yml', find: '  cli:', name: 'CI job: command-line tool end to end' },
  'reaper-render': { file: 'docs/TECH_DEBT.md', find: '| 42 | Found in REAPER 7.82', name: 'TECH_DEBT item 42' },
  'reaper-findings': { file: 'docs/TECH_DEBT.md', find: '| 41 | Found in REAPER 7.82', name: 'TECH_DEBT items 41 to 43' },
  'adr-0007': { file: 'docs/adr/0007-user-interface-layer.md', name: 'ADR 0007' },
  'host-tests': { file: 'docs/HOST_TESTS.md', find: '## REAPER 7.82, Windows 11', name: 'HOST_TESTS.md: REAPER 7.82' },

  // Aratu, in its own repository
  'aratu-readme': { repo: 'aratu', file: 'README.md', name: 'aratu/README.md' },
  'aratu-manual': { repo: 'aratu', file: 'docs/MANUAL.md', name: 'aratu/docs/MANUAL.md' },
  'aratu-vision': { repo: 'aratu', file: 'docs/VISION.md', name: 'aratu/docs/VISION.md' },
  'aratu-manual-parses': {
    repo: 'aratu',
    file: 'crates/aratu/tests/manual.rs',
    find: 'fn every_example_in_the_manual_parses(',
  },
  'aratu-manual-checks': {
    repo: 'aratu',
    file: 'crates/aratu/tests/manual.rs',
    find: 'fn every_example_in_the_manual_checks(',
  },
  'aratu-examples-play': {
    repo: 'aratu',
    file: 'crates/aratu/tests/examples.rs',
    find: 'fn every_example_compiles_cleanly_and_plays(',
  },
  'aratu-schedule': {
    repo: 'aratu',
    file: 'crates/aratu/tests/schedule.rs',
    find: 'fn the_rhythm_rules_place_parts_exactly(',
  },
  'aratu-ci': { repo: 'aratu', file: '.github/workflows/ci.yml', find: '  web:', name: 'CI job: the web editor' },
};

// A code sample is one or more stretches of a file, shown as they are.
//   fn:    a whole function, with the attribute above it, by name
//   from / to: the first line containing `from`, up to the next line
//              containing `to`; `after` starts the search further down
//   gap:   a line the site adds between two stretches to say something was
//          left out. It is the only text in a sample that is not in the file.
export const snippets = {
  // Home: the plugin, the two export lines, and a test of it.
  'duck-plugin': {
    file: 'plugins/duck/src/lib.rs',
    lang: 'rust',
    parts: [
      { from: 'impl Plugin for Duck {', to: 'type Params = DuckParams;' },
      { gap: '    // ... new, params and prepare are left out here' },
      { fn: 'process', indent: 4, keepIndent: true },
      { gap: '    // ... reset' },
      { after: 'fn reset(&mut self)', from: /^\}$/, to: 'export_vst3!(Duck);' },
    ],
  },
  'duck-test': {
    file: 'plugins/duck/src/lib.rs',
    lang: 'rust',
    parts: [{ fn: 'automation_lands_on_its_frame_with_audio_running_through' }],
  },

  // Beyond JUCE: the tests behind four of the claims.
  'test-automation': {
    file: 'crates/manguebyte-plugin/src/harness.rs',
    lang: 'rust',
    parts: [{ fn: 'automation_lands_on_its_exact_frame_and_updates_the_parameter' }],
  },
  'test-block-size': {
    file: 'crates/manguebyte/tests/offline.rs',
    lang: 'rust',
    parts: [{ fn: 'the_song_is_the_same_whatever_the_block_size' }],
  },
  'test-no-heap': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    lang: 'rust',
    parts: [{ fn: 'assert_no_heap_use', doc: true }, { gap: '' }, { fn: 'check', doc: true }],
  },
  'test-pitch': {
    file: 'plugins/pluck/src/lib.rs',
    lang: 'rust',
    parts: [{ fn: 'plays_the_pitch_it_is_asked_for' }],
  },

  // Getting started: the README's own samples.
  'readme-dependency': {
    file: 'README.md',
    lang: 'toml',
    parts: [{ from: '[dependencies]', to: 'manguebyte = { git' }],
  },
  'readme-render': {
    file: 'README.md',
    lang: 'rust',
    parts: [{ after: 'render it to a WAV', from: 'use manguebyte::prelude::*;', to: /^\}$/ }],
  },
  'readme-play': {
    file: 'README.md',
    lang: 'rust',
    parts: [{ after: 'Play it live instead', from: 'use manguebyte::prelude::*;', to: /^\}$/ }],
  },
  // Aratu: the taste of its syntax from its README.
  'aratu-taste': {
    repo: 'aratu',
    file: 'README.md',
    lang: 'aratu',
    parts: [{ after: '## A taste', from: 'meter: 4/4', toAfter: 'guitar {', to: /^\}$/ }],
  },
  'duck-params': {
    file: 'plugins/duck/src/lib.rs',
    lang: 'rust',
    parts: [{ from: '/// The plugin\'s parameters.', to: /^\}\);$/ }],
  },
};
