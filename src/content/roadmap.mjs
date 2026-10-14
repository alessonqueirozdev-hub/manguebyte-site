// What exists and what is planned.
//
// This follows ROADMAP.md in the framework's repository, phase by phase and
// item by item. `s` is the status: 'done', 'wip' (in progress) or 'todo'
// (not started). When ROADMAP.md changes, change this file to match.
//
// One item differs from ROADMAP.md at the pinned commit, on purpose: the
// roadmap still lists "denormal protection" as not started, while the same
// commit adds it, tests it and describes it in the README and the changelog.
// The item is split here so that the site says what the repository proves.

export const phases = [
  {
    id: 'phase-0',
    s: 'done',
    en: { name: 'Phase 0: foundation (v0.1)', lead: 'The types everything else is built on, and enough around them to make sound.' },
    pt: { name: 'Fase 0: fundação (v0.1)', lead: 'Os tipos sobre os quais todo o resto é construído, e o bastante em volta deles para fazer som.' },
    groups: [
      {
        items: [
          { s: 'done', en: '`manguebyte-core`: `AudioBuffer`, `Sample`, `Smoothed`, atomic floats, wait-free SPSC queue, decibel conversions', pt: '`manguebyte-core`: `AudioBuffer`, `Sample`, `Smoothed`, floats atômicos, fila SPSC wait-free, conversões de decibéis' },
          { s: 'done', en: '`manguebyte-dsp`: `Processor` trait, compile-time tuple chains, band-limited oscillator, biquad filters, ADSR, delay line and echo, gain', pt: '`manguebyte-dsp`: trait `Processor`, cadeias em tuplas resolvidas na compilação, oscilador com banda limitada, filtros biquad, ADSR, linha de atraso e eco, ganho' },
          { s: 'done', en: '`manguebyte-midi`: channel voice messages, sample-accurate `MidiBuffer`', pt: '`manguebyte-midi`: mensagens de voz de canal, `MidiBuffer` com precisão de amostra' },
          { s: 'done', en: '`manguebyte-formats`: WAV reading and writing', pt: '`manguebyte-formats`: leitura e escrita de WAV' },
          { s: 'done', en: '`manguebyte-devices`: playback on the default output device', pt: '`manguebyte-devices`: reprodução no dispositivo de saída padrão' },
          { s: 'done', en: '`manguebyte`: facade crate and prelude', pt: '`manguebyte`: crate de fachada e prelude' },
        ],
      },
    ],
  },
  {
    id: 'phase-1',
    s: 'wip',
    en: { name: 'Phase 1: a complete audio toolbox', lead: 'Everything a standalone audio application needs, short of a user interface.' },
    pt: { name: 'Fase 1: uma caixa de ferramentas de áudio completa', lead: 'Tudo de que um aplicativo de áudio independente precisa, menos a interface com o usuário.' },
    groups: [
      {
        en: 'Devices',
        pt: 'Dispositivos',
        items: [
          { s: 'done', en: 'Audio input and full-duplex streams', pt: 'Entrada de áudio e streams full-duplex' },
          { s: 'done', en: 'Device enumeration and selection; choosing sample rate and buffer size', pt: 'Listagem e seleção de dispositivos; escolha da taxa de amostragem e do tamanho do buffer' },
          { s: 'todo', en: 'Hot-plug and default-device change notifications', pt: 'Avisos de conexão a quente e de troca do dispositivo padrão' },
          { s: 'todo', en: 'Clock-drift compensation between duplex devices by adaptive resampling (the resampler it needs now exists)', pt: 'Compensação do desvio de relógio entre dispositivos duplex por reamostragem adaptativa (o reamostrador necessário já existe)' },
          { s: 'todo', en: 'Choosing the audio host (ASIO, JACK, PipeWire)', pt: 'Escolha do host de áudio (ASIO, JACK, PipeWire)' },
          { s: 'done', en: 'MIDI input and output ports, with jitter-free timing into the audio thread', pt: 'Portas MIDI de entrada e de saída, com tempo sem jitter até a thread de áudio' },
        ],
      },
      {
        en: 'MIDI',
        pt: 'MIDI',
        items: [
          { s: 'done', en: 'System common, system real-time and SysEx messages', pt: 'Mensagens de sistema comuns, de tempo real e SysEx' },
          { s: 'done', en: 'Running status and a byte-stream parser', pt: 'Running status e um parser de fluxo de bytes' },
          { s: 'done', en: 'Standard MIDI File reading and writing, with tempo-aware timing', pt: 'Leitura e escrita de arquivos MIDI padrão, com tempo que respeita o andamento' },
          { s: 'todo', en: 'MPE and MIDI 2.0 / UMP', pt: 'MPE e MIDI 2.0 / UMP' },
        ],
      },
      {
        en: 'DSP',
        pt: 'DSP',
        items: [
          { s: 'done', en: 'FFT of any length, real FFT and window functions', pt: 'FFT de qualquer tamanho, FFT real e funções de janela' },
          { s: 'todo', en: 'Short-time Fourier transform with overlap-add; spectrum analysis helpers', pt: 'Transformada de Fourier de tempo curto com overlap-add; auxiliares de análise de espectro' },
          { s: 'done', en: 'Resampling at any ratio, and oversampling by 2, 4, 8 or 16', pt: 'Reamostragem em qualquer razão, e oversampling de 2, 4, 8 ou 16 vezes' },
          { s: 'done', en: 'State-variable filter, stable under audio-rate modulation', pt: 'Filtro de variável de estado, estável com modulação em taxa de áudio' },
          { s: 'done', en: 'FIR low-pass design (Kaiser-windowed sinc)', pt: 'Projeto de passa-baixas FIR (sinc com janela de Kaiser)' },
          { s: 'todo', en: 'Ladder filter; FIR filter processor; higher-order IIR design', pt: 'Filtro ladder; processador de filtro FIR; projeto de IIR de ordem mais alta' },
          { s: 'done', en: 'Dynamics: compressor with soft knee, noise gate', pt: 'Dinâmica: compressor com soft knee, noise gate' },
          { s: 'done', en: 'Look-ahead limiter whose ceiling holds for every sample', pt: 'Limitador look-ahead cujo teto vale para todas as amostras' },
          { s: 'todo', en: 'Expander, sidechain input', pt: 'Expansor, entrada de sidechain' },
          { s: 'done', en: 'Reverb (feedback delay network)', pt: 'Reverb (rede de atrasos realimentados)' },
          { s: 'todo', en: 'Chorus, phaser, convolution', pt: 'Chorus, phaser, convolução' },
          { s: 'done', en: 'Noise (white, pink, brown), LFO with tempo sync, waveshaper, DC blocker', pt: 'Ruído (branco, rosa, marrom), LFO sincronizado ao andamento, waveshaper, bloqueador de DC' },
          { s: 'todo', en: 'Wavetable oscillator', pt: 'Oscilador de wavetable' },
          { s: 'done', en: 'Polyphonic voice allocation with per-note expression and modulation', pt: 'Alocação de vozes polifônica com expressão e modulação por nota' },
          { s: 'done', en: 'Sample-accurate events, transport and sidechain in the process call', pt: 'Eventos com precisão de amostra, transporte e sidechain na chamada de processamento' },
          { s: 'todo', en: 'SIMD-accelerated buffer operations', pt: 'Operações de buffer aceleradas por SIMD' },
        ],
      },
      {
        en: 'Formats',
        pt: 'Formatos',
        items: [
          { s: 'todo', en: 'Streaming readers and writers that do not load whole files', pt: 'Leitores e escritores em fluxo, que não carregam o arquivo inteiro' },
          { s: 'done', en: 'AIFF and AIFF-C reading and writing', pt: 'Leitura e escrita de AIFF e AIFF-C' },
          { s: 'done', en: 'FLAC decoding', pt: 'Decodificação de FLAC' },
          { s: 'done', en: 'Recognising a file\'s format from its contents', pt: 'Reconhecimento do formato pelo conteúdo do arquivo' },
          { s: 'todo', en: 'Ogg Vorbis, Opus and MP3 decoding', pt: 'Decodificação de Ogg Vorbis, Opus e MP3' },
          { s: 'todo', en: 'FLAC and Ogg Vorbis encoding', pt: 'Codificação de FLAC e Ogg Vorbis' },
          { s: 'todo', en: 'Metadata, cue points and loop markers', pt: 'Metadados, cue points e marcadores de loop' },
        ],
      },
      {
        en: 'Core',
        pt: 'Núcleo',
        items: [
          { s: 'done', en: 'Parameter system: ranges, skew, text conversion, smoothing', pt: 'Sistema de parâmetros: faixas, enviesamento, conversão em texto, suavização' },
          { s: 'done', en: 'Sample-accurate parameter automation events', pt: 'Eventos de automação de parâmetro com precisão de amostra' },
          { s: 'todo', en: 'Change gestures (begin and end of a user edit)', pt: 'Gestos de mudança (começo e fim de uma edição do usuário)' },
          { s: 'done', en: 'Parameter state save and restore, tolerant of version changes', pt: 'Salvar e restaurar o estado dos parâmetros, com tolerância a mudanças de versão' },
          { s: 'done', en: 'Audio thread helpers: protection against subnormal (denormal) numbers', pt: 'Auxiliares da thread de áudio: proteção contra números subnormais (denormais)' },
          { s: 'todo', en: 'Audio thread helpers: allocation checking in debug builds', pt: 'Auxiliares da thread de áudio: verificação de alocação em builds de depuração' },
          { s: 'todo', en: '`no_std` support for `manguebyte-core` and `manguebyte-dsp`', pt: 'Suporte a `no_std` em `manguebyte-core` e `manguebyte-dsp`' },
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    s: 'wip',
    en: { name: 'Phase 2: plugins', lead: 'Write a processor once and ship it in every format.' },
    pt: { name: 'Fase 2: plugins', lead: 'Escrever o processador uma vez e distribuir em todos os formatos.' },
    groups: [
      {
        items: [
          { s: 'done', en: '`manguebyte-plugin`: the format-independent plugin API, plugin state, and a harness that runs a plugin in a unit test with no host', pt: '`manguebyte-plugin`: a API de plugin independente de formato, o estado do plugin e um harness que roda o plugin num teste unitário, sem host' },
          { s: 'done', en: 'CLAP: audio and note ports, sample-accurate events in, parameters, state, latency, reporting of parameter changes to the host. Checked in CI by the CLAP project\'s validator', pt: 'CLAP: portas de áudio e de notas, entrada de eventos com precisão de amostra, parâmetros, estado, latência, aviso de mudanças de parâmetro ao host. Conferido no CI pelo validador do projeto CLAP' },
          { s: 'todo', en: 'CLAP extensions still to come: GUI, per-note automation, note-end and voice info, 64-bit audio, tail, presets, remote controls', pt: 'Extensões CLAP que ainda faltam: interface gráfica, automação por nota, fim de nota e informação de vozes, áudio em 64 bits, cauda, presets, controles remotos' },
          { s: 'done', en: 'VST 3: audio and event buses, every automation point on its frame, notes with ids, tuning and note expression, MIDI controllers through hidden parameters, parameters, units, state, latency. Checked in CI by Steinberg\'s validator on Windows, Linux and macOS', pt: 'VST 3: barramentos de áudio e de eventos, cada ponto de automação no seu frame, notas com ids, afinação e expressão de nota, controladores MIDI por parâmetros ocultos, parâmetros, unidades, estado, latência. Conferido no CI pelo validador da Steinberg em Windows, Linux e macOS' },
          { s: 'todo', en: 'VST 3 still to come: editor, 64-bit audio, changing the bus layout, program lists, parameter changes sent back to the host', pt: 'O que ainda falta no VST 3: editor, áudio em 64 bits, mudança do layout de barramentos, listas de programas, mudanças de parâmetro devolvidas ao host' },
          { s: 'todo', en: 'Audio Unit (AUv2 and AUv3)', pt: 'Audio Unit (AUv2 e AUv3)' },
          { s: 'todo', en: 'LV2', pt: 'LV2' },
          { s: 'done', en: 'Standalone application wrapper: sound card, MIDI ports, input for effects', pt: 'Wrapper de aplicativo standalone: placa de som, portas MIDI, entrada para efeitos' },
          { s: 'wip', en: 'Tooling to bundle, sign and validate plugins: `scripts/bundle-clap.sh` and `scripts/bundle-vst3.sh` build a `.clap` and a `.vst3` on Windows, Linux and macOS; signing is not started', pt: 'Ferramentas para empacotar, assinar e validar plugins: `scripts/bundle-clap.sh` e `scripts/bundle-vst3.sh` geram um `.clap` e um `.vst3` em Windows, Linux e macOS; a assinatura não foi começada' },
          { s: 'wip', en: 'Project templates: `plugins/pluck` (an instrument) and `plugins/duck` (an effect with a sidechain) are complete one-file examples to start from; a generator is not started', pt: 'Modelos de projeto: `plugins/pluck` (um instrumento) e `plugins/duck` (um efeito com sidechain) são exemplos completos, de um arquivo só, para servir de ponto de partida; um gerador não foi começado' },
        ],
      },
    ],
    en_note: 'AAX depends on a proprietary SDK and will be considered once the other formats are solid.',
    pt_note: 'O AAX depende de um SDK proprietário e será considerado quando os outros formatos estiverem sólidos.',
  },
  {
    id: 'phase-3',
    s: 'todo',
    en: { name: 'Phase 3: user interface', lead: 'Not started.' },
    pt: { name: 'Fase 3: interface com o usuário', lead: 'Não começada.' },
    groups: [
      {
        items: [
          { s: 'todo', en: 'GPU-accelerated 2D renderer', pt: 'Renderizador 2D acelerado por GPU' },
          { s: 'todo', en: 'Windowing, including embedding inside a plugin host', pt: 'Janelas, inclusive embutidas dentro de um host de plugins' },
          { s: 'todo', en: 'Layout, styling and a widget set: sliders, knobs, buttons, meters, text', pt: 'Layout, estilo e um conjunto de widgets: sliders, knobs, botões, medidores, texto' },
          { s: 'todo', en: 'Audio widgets: waveform, spectrum, keyboard, envelope and EQ editors', pt: 'Widgets de áudio: forma de onda, espectro, teclado, editores de envelope e de EQ' },
          { s: 'todo', en: 'Accessibility', pt: 'Acessibilidade' },
          { s: 'todo', en: 'High-DPI and multi-monitor support', pt: 'Suporte a alta densidade de pixels e a vários monitores' },
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    s: 'wip',
    en: { name: 'Phase 4: hosting and graphs', lead: 'The graph is done. Hosting is not started.' },
    pt: { name: 'Fase 4: hospedagem e grafos', lead: 'O grafo está pronto. A hospedagem não foi começada.' },
    groups: [
      {
        items: [
          { s: 'done', en: 'Audio processing graph, rewired while it plays, with automatic latency compensation', pt: 'Grafo de processamento de áudio, religado enquanto toca, com compensação automática de latência' },
          { s: 'todo', en: 'Graph extras: sidechain and per-node event routing, feedback through an explicit delay, crossfaded swaps, buffer reuse', pt: 'Extras do grafo: sidechain e roteamento de eventos por nó, realimentação por um atraso explícito, trocas com crossfade, reaproveitamento de buffers' },
          { s: 'todo', en: 'Plugin scanning and hosting: CLAP, VST3, AU, LV2', pt: 'Varredura e hospedagem de plugins: CLAP, VST3, AU, LV2' },
          { s: 'todo', en: 'Transport, tempo map and timeline primitives', pt: 'Transporte, mapa de andamento e primitivas de linha do tempo' },
        ],
      },
    ],
  },
  {
    id: 'phase-5',
    s: 'todo',
    en: { name: 'Phase 5: everywhere', lead: 'Not started.' },
    pt: { name: 'Fase 5: em todo lugar', lead: 'Não começada.' },
    groups: [
      {
        items: [
          { s: 'todo', en: 'iOS and Android', pt: 'iOS e Android' },
          { s: 'todo', en: 'WebAssembly and Web Audio', pt: 'WebAssembly e Web Audio' },
          { s: 'todo', en: 'Embedded targets', pt: 'Alvos embarcados' },
        ],
      },
    ],
  },
];

// ROADMAP.md, "Beyond parity": where a framework designed for Rust can do
// better. These are goals, not things that exist.
export const beyondParity = {
  en: [
    'Compile-time checked real-time safety for user code',
    'Processing graphs that the compiler can inline end to end',
    'Deterministic offline rendering for testing audio code in CI',
    'First-class CLAP support, including its newer extensions',
    'A plugin API in which sharing state between threads incorrectly does not compile',
  ],
  pt: [
    'Segurança em tempo real do código do usuário verificada na compilação',
    'Grafos de processamento que o compilador consiga embutir de ponta a ponta',
    'Renderização offline determinística, para testar código de áudio no CI',
    'Suporte de primeira classe ao CLAP, incluindo as extensões mais novas',
    'Uma API de plugin em que compartilhar estado entre threads do jeito errado não compila',
  ],
};

// docs/JUCE_PARITY.md: JUCE's 24 modules and where Manguebyte stands on each.
// 'none' means it is not planned as part of Manguebyte.
export const parity = [
  { module: 'juce_audio_basics', s: 'wip', crate: 'core, midi, dsp' },
  { module: 'juce_audio_devices', s: 'wip', crate: 'devices' },
  { module: 'juce_audio_formats', s: 'wip', crate: 'formats' },
  { module: 'juce_audio_processors', s: 'wip', crate: 'params, plugin, graph' },
  { module: 'juce_audio_processors_headless', s: 'done', crate: 'params, plugin, graph' },
  { module: 'juce_audio_plugin_client', s: 'wip', crate: 'clap, vst3, standalone' },
  { module: 'juce_audio_utils', s: 'todo', crate: '' },
  { module: 'juce_dsp', s: 'wip', crate: 'dsp' },
  { module: 'juce_midi_ci', s: 'todo', crate: '' },
  { module: 'juce_osc', s: 'todo', crate: '' },
  { module: 'juce_graphics', s: 'todo', crate: '' },
  { module: 'juce_gui_basics', s: 'todo', crate: '' },
  { module: 'juce_gui_extra', s: 'todo', crate: '' },
  { module: 'juce_animation', s: 'todo', crate: '' },
  { module: 'juce_opengl', s: 'todo', crate: '' },
  { module: 'juce_video', s: 'none', crate: '' },
  { module: 'juce_core', s: 'none', crate: 'core' },
  { module: 'juce_events', s: 'none', crate: '' },
  { module: 'juce_data_structures', s: 'todo', crate: '' },
  { module: 'juce_cryptography', s: 'none', crate: '' },
  { module: 'juce_javascript', s: 'none', crate: '' },
  { module: 'juce_box2d', s: 'none', crate: '' },
  { module: 'juce_analytics', s: 'none', crate: '' },
  { module: 'juce_product_unlocking', s: 'none', crate: '' },
];
