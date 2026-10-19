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

  // Instruments ready to play
  'instruments-poly-tuning': {
    file: 'crates/manguebyte-dsp/src/instruments/poly/tests.rs',
    find: 'fn every_note_is_in_tune_across_the_keyboard(',
  },
  'instruments-snare': {
    file: 'crates/manguebyte-dsp/src/instruments/kit.rs',
    find: 'fn the_snare_measures_as_the_one_recorded(',
  },
  'instruments-crash': {
    file: 'crates/manguebyte-dsp/src/instruments/kit.rs',
    find: 'fn the_crash_measures_as_the_one_recorded(',
  },
  'instruments-string': {
    file: 'crates/manguebyte-dsp/src/instruments/string.rs',
    find: 'fn every_note_is_within_a_cent_across_the_keyboard(',
  },
  'instruments-bowed': {
    file: 'crates/manguebyte-dsp/src/instruments/bowed.rs',
    find: 'fn every_bowed_note_is_in_tune_across_its_range(',
  },
  'instruments-wind': {
    file: 'crates/manguebyte-dsp/src/instruments/wind.rs',
    find: 'fn every_note_is_in_tune_across_its_range(',
  },
  'instruments-mallet': {
    file: 'crates/manguebyte-dsp/src/instruments/mallet.rs',
    find: 'fn every_mode_rings_within_half_a_percent_of_its_model(',
  },
  'instruments-choir': {
    file: 'crates/manguebyte-dsp/src/instruments/choir.rs',
    find: 'fn the_formants_peak_at_the_vowels_targets(',
  },
  'instruments-poly-aliasing': {
    file: 'crates/manguebyte-dsp/src/instruments/poly/tests.rs',
    find: 'fn high_notes_are_kept_free_of_aliasing(',
  },
  'instruments-heap': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    find: 'fn the_modelled_acoustic_instruments_do_not_use_the_heap(',
  },
  'instruments-voices-heap': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    find: 'fn the_instruments_do_not_use_the_heap(',
  },
  'instruments-poly-heap': {
    file: 'crates/manguebyte-dsp/tests/realtime.rs',
    find: 'fn the_poly_synth_does_not_use_the_heap(',
  },
  'instruments-block-size': {
    file: 'crates/manguebyte-dsp/src/instruments/poly/tests.rs',
    find: 'fn the_output_does_not_depend_on_the_block_size(',
  },
  'instruments-debt': {
    file: 'docs/TECH_DEBT.md',
    find: '| 66 | ',
    name: 'TECH_DEBT items 66 to 71',
  },

  // The command-line tool, and what testing in a real host found
  'ci-cli': { file: '.github/workflows/ci.yml', find: '  cli:', name: 'CI job: command-line tool end to end' },
  'reaper-render': {
    file: 'docs/TECH_DEBT.md',
    find: '| Two offline renders of the same project in REAPER differed',
    name: 'TECH_DEBT: the REAPER renders, paid back',
  },
  'reaper-owed': {
    file: 'docs/TECH_DEBT.md',
    find: '| 56 | Hand tests in REAPER 7.82 are still owed',
    name: 'TECH_DEBT item 56',
  },
  'adr-0007': { file: 'docs/adr/0007-user-interface-layer.md', name: 'ADR 0007' },
  'host-tests': { file: 'docs/HOST_TESTS.md', find: '## REAPER 7.82, Windows 11', name: 'HOST_TESTS.md: REAPER 7.82' },

  // Per-note control: MPE and MIDI 2.0 in, and notes and MIDI out
  'per-note-mpe': {
    file: 'crates/manguebyte-dsp/tests/note_input.rs',
    find: 'fn an_mpe_stream_and_the_same_midi_2_stream_give_identical_events(',
  },
  'per-note-clap-mpe': {
    file: 'crates/manguebyte-clap/tests/abi.rs',
    find: 'fn clap_notes_mpe_and_midi_2_end_in_the_same_events(',
  },
  'per-note-debt': { file: 'docs/TECH_DEBT.md', find: '| 76 | ', name: 'TECH_DEBT item 76' },
  'midi-out-clap': {
    file: 'crates/manguebyte-clap/tests/note_output.rs',
    find: 'fn a_host_of_midi_2_gets_the_packets_as_they_are(',
  },
  'midi-out-vst3': {
    file: 'crates/manguebyte-vst3/tests/note_output.rs',
    find: 'fn notes_expressions_and_midi_reach_the_output_event_bus(',
  },
  'midi-out-standalone': {
    file: 'crates/manguebyte-standalone/src/engine.rs',
    find: 'fn notes_the_plugin_sends_reach_the_midi_output(',
  },
  'midi-out-debt': { file: 'docs/TECH_DEBT.md', find: '| 82 | ', name: 'TECH_DEBT item 82' },

  // Audio Units
  'ci-au': { file: '.github/workflows/ci.yml', find: '  au:', name: 'CI job: Audio Unit validation (auval)' },
  'au-effect': {
    file: 'crates/manguebyte-au/tests/abi.rs',
    find: 'fn the_effect_sounds_as_it_does_with_no_host(',
  },
  'au-instrument': {
    file: 'crates/manguebyte-au/tests/abi.rs',
    find: 'fn the_instrument_plays_midi_on_its_frames_and_reads_the_transport(',
  },

  // Hosting LV2, and scanning
  'hosting-lv2': {
    file: 'crates/manguebyte-host/tests/lv2_pluck.rs',
    find: 'fn the_instrument_plays_as_it_does_with_no_host(',
  },
  'scan': {
    file: 'crates/manguebyte-host/tests/scan.rs',
    find: 'fn a_scan_lists_what_works_and_survives_what_does_not(',
  },

  // Changing the audio device in the middle of a song
  'hotswap': {
    file: 'crates/manguebyte-devices/tests/hotswap.rs',
    find: 'fn the_song_goes_on_while_the_device_changes_under_it(',
  },
  'hotswap-gap': {
    file: 'crates/manguebyte-devices/tests/hotswap.rs',
    find: 'fn devices_that_cannot_overlap_hand_over_after_a_short_faded_gap(',
  },
  'hotswap-rate': {
    file: 'crates/manguebyte-devices/tests/hotswap.rs',
    find: 'fn a_device_at_another_rate_plays_the_same_whatever_its_blocks(',
  },
  'hotswap-lost': {
    file: 'crates/manguebyte-devices/tests/hotswap.rs',
    find: 'fn a_lost_device_is_replaced_without_preparing_again(',
  },
  'hotswap-asio': {
    file: 'crates/manguebyte-pro-io/tests/hardware.rs',
    find: 'fn the_engine_runs_on_while_the_driver_changes(',
  },
  'hotswap-debt': { file: 'docs/TECH_DEBT.md', find: '| 85 | ', name: 'TECH_DEBT item 85' },

  // ASIO, in the one crate under the GPLv3
  'pro-io-readme': { file: 'crates/manguebyte-pro-io/README.md', name: 'crates/manguebyte-pro-io/README.md' },
  'pro-io-licence': { file: 'crates/manguebyte-pro-io/LICENSE', name: 'crates/manguebyte-pro-io/LICENSE' },

  // The browser engine
  'web-loudness': {
    file: 'crates/manguebyte-web/tests/loudness.rs',
    find: 'fn every_kind_and_preset_plays_its_phrase_at_the_target(',
  },
  'web-percussion': {
    file: 'crates/manguebyte-web/tests/percussion.rs',
    find: 'fn every_percussion_key_plays_on_every_kit_at_its_level(',
  },
  'web-scope': {
    file: 'crates/manguebyte-web/tests/scope.rs',
    find: 'fn the_scope_is_what_the_part_puts_into_the_master_bus(',
  },
  'web-tube': {
    file: 'crates/manguebyte-web/tests/effects.rs',
    find: 'fn the_tube_gives_even_harmonics_and_no_offset(',
  },

  // The Aratu Bridge
  'bridge-same-bits': {
    file: 'plugins/aratu-bridge/tests/same_bits.rs',
    find: 'fn a_session_sent_over_the_bridge_sounds_as_the_engine_renders_it(',
  },
  'bridge-hosted': {
    file: 'crates/manguebyte-host/tests/clap_aratu_bridge.rs',
    find: 'fn the_hosted_bridge_plays_a_session_as_the_plugin_does_alone(',
  },
  'bridge-heap': {
    file: 'plugins/aratu-bridge/tests/realtime.rs',
    find: 'fn processing_never_touches_the_heap_while_a_page_plays(',
  },
  'bridge-doc': { file: 'docs/ARATU_BRIDGE.md', name: 'docs/ARATU_BRIDGE.md' },
  'bridge-js': { file: 'crates/manguebyte-web/js/bridge.js', name: 'crates/manguebyte-web/js/bridge.js' },
  'bridge-debt': { file: 'docs/TECH_DEBT.md', find: '| 84 | ', name: 'TECH_DEBT item 84' },
  'host-tests-19': {
    file: 'docs/HOST_TESTS.md',
    find: '## REAPER 7.82, Windows, 19 October 2026',
    name: 'HOST_TESTS.md: REAPER 7.82, 19 October 2026',
  },

  // Taking part
  'conduct': { file: 'CODE_OF_CONDUCT.md', name: 'CODE_OF_CONDUCT.md' },
  'security': { file: 'SECURITY.md', name: 'SECURITY.md' },
  'issue-bug': { file: '.github/ISSUE_TEMPLATE/bug_report.yml', name: 'the bug report form' },
  'issue-feature': { file: '.github/ISSUE_TEMPLATE/feature_request.yml', name: 'the feature request form' },

  // Aratu, in its own repository
  'aratu-readme': { repo: 'aratu', file: 'README.md', name: 'aratu/README.md' },
  'aratu-manual': { repo: 'aratu', file: 'book/en/manual.md', name: 'aratu/book/en/manual.md' },
  'aratu-book-works': {
    repo: 'aratu',
    file: 'crates/aratu/tests/book.rs',
    find: 'fn every_block_of_the_book_works(',
  },
  'aratu-book-languages': {
    repo: 'aratu',
    file: 'crates/aratu/tests/book.rs',
    find: 'fn every_exercise_sounds_the_same_in_every_language(',
  },
  'aratu-book-features': {
    repo: 'aratu',
    file: 'crates/aratu/tests/book.rs',
    find: 'fn every_feature_is_taught_in_every_language(',
  },
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
  // Home: the plugin, the four export lines, and a test of it.
  'duck-plugin': {
    file: 'plugins/duck/src/lib.rs',
    lang: 'rust',
    parts: [
      { from: 'impl Plugin for Duck {', to: 'type Params = DuckParams;' },
      { gap: '    // ... new, params and prepare are left out here' },
      { fn: 'process', indent: 4, keepIndent: true },
      { gap: '    // ... reset' },
      { fn: 'editor', indent: 4, keepIndent: true },
      { after: 'fn editor(&self)', from: /^\}$/, to: 'export_au!(Duck);' },
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
    parts: [{ from: '[dependencies]', to: 'manguebyte = "0.1"' }],
  },
  'readme-new-plugin': {
    file: 'README.md',
    lang: 'bash',
    parts: [{ after: '## Quick start', from: 'cargo install cargo-mangue', to: 'cargo mangue new my-gain' }],
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
