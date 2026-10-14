// What exists today, by area.
//
// This mirrors the table under "Status" in the framework's README, one entry
// per crate, in the order a signal travels: from the types everything is
// built on, through DSP and parameters, out to plugin formats, files and
// devices. The detail in some items (which noise colours, which oversampling
// factors) comes from CHANGELOG.md and ROADMAP.md. When a README row changes,
// change the matching entry here, in both languages. Nothing may be listed
// here that those three files do not state.

export const areas = [
  {
    id: 'core',
    crates: ['manguebyte-core'],
    en: {
      name: 'Core',
      lead: 'The types everything else is built on. This crate has no dependencies at all.',
      items: [
        '`AudioBuffer`: planar audio, one contiguous slice per channel',
        'The `Sample` trait, so processors work in `f32` or `f64`',
        '`Smoothed` values for parameters that must not click',
        'Atomic floats',
        'A wait-free single-producer, single-consumer queue',
        'Decibel maths',
        'A guard against subnormal numbers',
      ],
    },
    pt: {
      name: 'Núcleo',
      lead: 'Os tipos sobre os quais todo o resto é construído. Este crate não tem nenhuma dependência.',
      items: [
        '`AudioBuffer`: áudio planar, uma fatia contígua por canal',
        'O trait `Sample`, para que os processadores funcionem em `f32` ou `f64`',
        'Valores `Smoothed`, para parâmetros que não podem estalar',
        'Floats atômicos',
        'Uma fila wait-free de um produtor e um consumidor',
        'Contas com decibéis',
        'Uma guarda contra números subnormais',
      ],
    },
  },
  {
    id: 'dsp',
    crates: ['manguebyte-dsp'],
    en: {
      name: 'Signal processing',
      lead: 'A tuple of processors is a processor: the chain is resolved at compile time, with no virtual calls and no allocation.',
      items: [
        'The `Processor` trait and tuple chains',
        'Sample-accurate events and transport in the process call',
        'A polyphonic `Synth` with per-note expression and modulation',
        'Band-limited oscillator; noise (white, pink, brown); LFO with tempo sync',
        'Biquad filters in 8 shapes; a state-variable filter that stays stable under audio-rate modulation',
        'ADSR envelope; smoothed gain; DC blocker',
        'Delay line and echo; reverb (a feedback delay network)',
        'Compressor with soft knee; noise gate; look-ahead limiter whose ceiling holds for every sample',
        'Waveshaper: hard clip, tanh, soft clip, fold',
        'Oversampling by 2, 4, 8 or 16; resampling at any ratio',
        'FFT of any length, real FFT, window functions, FIR design',
      ],
    },
    pt: {
      name: 'Processamento de sinal',
      lead: 'Uma tupla de processadores é um processador: a cadeia é resolvida em tempo de compilação, sem chamadas virtuais e sem alocação.',
      items: [
        'O trait `Processor` e cadeias em tuplas',
        'Eventos com precisão de amostra e transporte na chamada de processamento',
        'Um `Synth` polifônico com expressão e modulação por nota',
        'Oscilador com banda limitada; ruído (branco, rosa, marrom); LFO sincronizado ao andamento',
        'Filtros biquad em 8 formas; um filtro de variável de estado que continua estável com modulação em taxa de áudio',
        'Envelope ADSR; ganho suavizado; bloqueador de DC',
        'Linha de atraso e eco; reverb (uma rede de atrasos realimentados)',
        'Compressor com soft knee; noise gate; limitador look-ahead cujo teto vale para todas as amostras',
        'Waveshaper: hard clip, tanh, soft clip, fold',
        'Oversampling de 2, 4, 8 ou 16 vezes; reamostragem em qualquer razão',
        'FFT de qualquer tamanho, FFT real, funções de janela, projeto de FIR',
      ],
    },
  },
  {
    id: 'graph',
    crates: ['manguebyte-graph'],
    en: {
      name: 'Processing graph',
      lead: 'A graph that is rewired while it plays.',
      items: [
        'Edits reach the audio thread through a wait-free queue',
        'Nodes keep their state across edits',
        'Removed nodes are freed off the audio thread',
        'Paths of different latency are lined up automatically',
      ],
    },
    pt: {
      name: 'Grafo de processamento',
      lead: 'Um grafo que é religado enquanto toca.',
      items: [
        'As edições chegam à thread de áudio por uma fila wait-free',
        'Os nós mantêm o estado entre uma edição e outra',
        'Os nós removidos são liberados fora da thread de áudio',
        'Caminhos com latências diferentes são alinhados automaticamente',
      ],
    },
  },
  {
    id: 'params',
    crates: ['manguebyte-params'],
    en: {
      name: 'Parameters',
      lead: 'Parameters are atomics in a struct. There are no listeners.',
      items: [
        'Lock-free float, integer, switch and choice parameters',
        'Linear, skewed and logarithmic ranges',
        'Conversion to and from text, with units',
        'Smoothing',
        'Saved state that survives version changes',
      ],
    },
    pt: {
      name: 'Parâmetros',
      lead: 'Parâmetros são atômicos dentro de uma struct. Não existem listeners.',
      items: [
        'Parâmetros lock-free de ponto flutuante, inteiro, chave e escolha',
        'Faixas lineares, enviesadas e logarítmicas',
        'Conversão de e para texto, com unidades',
        'Suavização',
        'Estado salvo que sobrevive a mudanças de versão',
      ],
    },
  },
  {
    id: 'plugins',
    crates: ['manguebyte-plugin', 'manguebyte-clap', 'manguebyte-vst3', 'manguebyte-standalone'],
    en: {
      name: 'Plugins',
      lead: 'Write a plugin once. Export it as CLAP and as VST 3 with one line each, run it as an application, and test it with no host.',
      items: [
        'The `Plugin` trait that every format wraps, and plugin state',
        '`Harness`: plays notes and automation into a plugin inside a unit test',
        'CLAP: notes, expression, automation and modulation arrive on their exact frame. Passes the CLAP project’s validator',
        'VST 3: every automation point lands on its frame; notes carry ids, tuning and per-note expression; MIDI controllers arrive as MIDI again. Passes Steinberg’s validator on Windows, Linux and macOS',
        'Standalone: runs a plugin as an application, with the sound card out, MIDI keyboards in, and the microphone in for effects',
        'Scripts that build a `.clap` file and a `.vst3` bundle on Windows, Linux and macOS',
      ],
    },
    pt: {
      name: 'Plugins',
      lead: 'Escreva o plugin uma vez. Exporte como CLAP e como VST 3 com uma linha cada, rode como aplicativo e teste sem host.',
      items: [
        'O trait `Plugin`, que todos os formatos embrulham, e o estado do plugin',
        '`Harness`: toca notas e automação num plugin dentro de um teste unitário',
        'CLAP: notas, expressão, automação e modulação chegam no frame exato. Passa no validador do projeto CLAP',
        'VST 3: cada ponto de automação cai no seu frame; as notas trazem ids, afinação e expressão por nota; os controladores MIDI voltam a chegar como MIDI. Passa no validador da Steinberg em Windows, Linux e macOS',
        'Standalone: roda um plugin como aplicativo, com saída na placa de som, teclados MIDI na entrada e microfone para os efeitos',
        'Scripts que geram um arquivo `.clap` e um pacote `.vst3` em Windows, Linux e macOS',
      ],
    },
  },
  {
    id: 'midi',
    crates: ['manguebyte-midi'],
    en: {
      name: 'MIDI',
      lead: 'Messages, files and buffers, with timing kept to the sample.',
      items: [
        'Channel and system messages',
        'A byte-stream parser: running status, real-time messages, SysEx',
        'Standard MIDI file reading and writing',
        'A sample-accurate `MidiBuffer`',
        'Pitch conversions',
      ],
    },
    pt: {
      name: 'MIDI',
      lead: 'Mensagens, arquivos e buffers, com o tempo preservado até a amostra.',
      items: [
        'Mensagens de canal e de sistema',
        'Um parser de fluxo de bytes: running status, mensagens de tempo real, SysEx',
        'Leitura e escrita de arquivos MIDI padrão',
        'Um `MidiBuffer` com precisão de amostra',
        'Conversões de altura',
      ],
    },
  },
  {
    id: 'formats',
    crates: ['manguebyte-formats'],
    en: {
      name: 'Audio files',
      lead: 'Decoders written from the specifications and checked against files from FFmpeg.',
      items: [
        'WAV and AIFF reading and writing',
        'FLAC decoding, written from the specification and checked bit for bit against files from FFmpeg',
        'The format is recognised from a file’s contents',
      ],
    },
    pt: {
      name: 'Arquivos de áudio',
      lead: 'Decodificadores escritos a partir das especificações e conferidos com arquivos do FFmpeg.',
      items: [
        'Leitura e escrita de WAV e AIFF',
        'Decodificação de FLAC, escrita a partir da especificação e conferida bit a bit com arquivos do FFmpeg',
        'O formato é reconhecido pelo conteúdo do arquivo',
      ],
    },
  },
  {
    id: 'devices',
    crates: ['manguebyte-devices'],
    en: {
      name: 'Devices',
      lead: 'Sound cards and MIDI ports.',
      items: [
        'Device listing and selection',
        'Playback, recording and full-duplex streams, in any hardware sample format',
        'MIDI input and output ports, with arrival times mapped to frames so a player’s timing survives the audio buffer',
      ],
    },
    pt: {
      name: 'Dispositivos',
      lead: 'Placas de som e portas MIDI.',
      items: [
        'Listagem e seleção de dispositivos',
        'Streams de reprodução, gravação e full-duplex, em qualquer formato de amostra do hardware',
        'Portas MIDI de entrada e de saída, com os horários de chegada convertidos em frames, para que o tempo de quem toca sobreviva ao buffer de áudio',
      ],
    },
  },
];

// The README's "Not there yet", followed by the rest of what its "Where JUCE
// is ahead" paragraph names.
export const missing = {
  en: [
    'A GUI toolkit, and plugin user interfaces (editors)',
    'Audio Unit, LV2 and AAX plugin formats',
    'Plugin hosting',
    'Lossy formats: MP3, Ogg Vorbis, Opus',
    'FLAC encoding',
    'Mobile platforms',
    'A release on crates.io, and a stable API',
  ],
  pt: [
    'Um toolkit de interface gráfica, e as interfaces dos plugins (editores)',
    'Os formatos de plugin Audio Unit, LV2 e AAX',
    'Hospedagem de plugins',
    'Formatos com perdas: MP3, Ogg Vorbis, Opus',
    'Codificação de FLAC',
    'Plataformas móveis',
    'Uma versão publicada no crates.io, e uma API estável',
  ],
};
