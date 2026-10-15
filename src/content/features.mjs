// What exists today, by area.
//
// This mirrors the table under "Status" in the framework's README, one entry
// per crate, in the order a signal travels: from the types everything is
// built on, through DSP, analysis and parameters, out to plugin formats,
// hosting, files, devices, the interface and the tools. The detail in some
// items comes from CHANGELOG.md, ROADMAP.md and ADR 0007. When a README row
// changes, change the matching entry here, in both languages. Nothing may be
// listed here that those files do not state.

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
        'Atomic floats and a wait-free single-producer, single-consumer queue',
        'A log the audio thread can write to',
        'Decibel maths, and a guard against subnormal numbers',
      ],
    },
    pt: {
      name: 'Núcleo',
      lead: 'Os tipos sobre os quais todo o resto é construído. Este crate não tem nenhuma dependência.',
      items: [
        '`AudioBuffer`: áudio planar, uma fatia contígua por canal',
        'O trait `Sample`, para que os processadores funcionem em `f32` ou `f64`',
        'Valores `Smoothed`, para parâmetros que não podem estalar',
        'Floats atômicos e uma fila wait-free de um produtor e um consumidor',
        'Um log em que a thread de áudio pode escrever',
        'Contas com decibéis, e uma guarda contra números subnormais',
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
        'The `Processor` trait and tuple chains; sample-accurate events and transport',
        'A polyphonic `Synth` with per-note expression and modulation',
        'Band-limited oscillator; noise (white, pink, brown); LFO with tempo sync',
        'Biquad filters in 8 shapes; state-variable, one-pole and ladder filters, stable under audio-rate modulation',
        'High-order IIR design (Butterworth, Chebyshev, elliptic) and Linkwitz-Riley crossovers',
        'ADSR envelope, envelope follower, smoothed gain, panner, dry/wet mixing',
        'Interpolated delay lines and echo; chorus and flanger; phaser; reverb',
        'Compressor with soft knee; noise gate; look-ahead limiter whose ceiling holds for every sample',
        'Waveshaper, oversampling by 2, 4, 8 or 16, resampling at any ratio',
        'FFT of any length, window functions, FIR design',
      ],
    },
    pt: {
      name: 'Processamento de sinal',
      lead: 'Uma tupla de processadores é um processador: a cadeia é resolvida em tempo de compilação, sem chamadas virtuais e sem alocação.',
      items: [
        'O trait `Processor` e cadeias em tuplas; eventos com precisão de amostra e transporte',
        'Um `Synth` polifônico com expressão e modulação por nota',
        'Oscilador com banda limitada; ruído (branco, rosa, marrom); LFO sincronizado ao andamento',
        'Filtros biquad em 8 formas; filtros de variável de estado, de um polo e ladder, estáveis com modulação em taxa de áudio',
        'Projeto de IIR de ordem alta (Butterworth, Chebyshev, elíptico) e crossovers Linkwitz-Riley',
        'Envelope ADSR, seguidor de envelope, ganho suavizado, panner, mistura dry/wet',
        'Linhas de atraso interpoladas e eco; chorus e flanger; phaser; reverb',
        'Compressor com soft knee; noise gate; limitador look-ahead cujo teto vale para todas as amostras',
        'Waveshaper, oversampling de 2, 4, 8 ou 16 vezes, reamostragem em qualquer razão',
        'FFT de qualquer tamanho, funções de janela, projeto de FIR',
      ],
    },
  },
  {
    id: 'analysis',
    crates: ['manguebyte-analysis'],
    en: {
      name: 'Metering and analysis',
      lead: 'Meters that run on the audio thread and that any thread reads without waiting.',
      items: [
        'Loudness to BS.1770 and EBU R 128, checked against the EBU’s test signals',
        'True peak, peak, RMS, VU and PPM meters; stereo correlation',
        'A spectrum analyser with octave bands and weighting',
        'Pitch detection, with the nearest note named',
      ],
    },
    pt: {
      name: 'Medição e análise',
      lead: 'Medidores que rodam na thread de áudio e que qualquer thread lê sem esperar.',
      items: [
        'Loudness segundo a BS.1770 e a EBU R 128, conferido com os sinais de teste da EBU',
        'Medidores de true peak, pico, RMS, VU e PPM; correlação estéreo',
        'Um analisador de espectro com bandas de oitava e ponderação',
        'Detecção de altura, com o nome da nota mais próxima',
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
        '`Harness`: plays notes, automation and a sidechain into a plugin inside a unit test',
        'CLAP: notes, expression, automation and modulation arrive on their exact frame. Passes the CLAP project’s validator',
        'VST 3: every automation point lands on its frame; notes carry ids, tuning and per-note expression; MIDI controllers arrive as MIDI again. Passes Steinberg’s validator on Windows, Linux and macOS',
        'Standalone: runs a plugin as an application, with the sound card out, MIDI keyboards in, and the microphone in for effects',
      ],
    },
    pt: {
      name: 'Plugins',
      lead: 'Escreva o plugin uma vez. Exporte como CLAP e como VST 3 com uma linha cada, rode como aplicativo e teste sem host.',
      items: [
        'O trait `Plugin`, que todos os formatos embrulham, e o estado do plugin',
        '`Harness`: toca notas, automação e um sidechain num plugin dentro de um teste unitário',
        'CLAP: notas, expressão, automação e modulação chegam no frame exato. Passa no validador do projeto CLAP',
        'VST 3: cada ponto de automação cai no seu frame; as notas trazem ids, afinação e expressão por nota; os controladores MIDI voltam a chegar como MIDI. Passa no validador da Steinberg em Windows, Linux e macOS',
        'Standalone: roda um plugin como aplicativo, com saída na placa de som, teclados MIDI na entrada e microfone para os efeitos',
      ],
    },
  },
  {
    id: 'hosting',
    crates: ['manguebyte-host'],
    en: {
      name: 'Hosting plugins',
      lead: 'Load plugins made by anyone and run them as processors.',
      items: [
        'CLAP and VST 3, through one interface for both formats',
        'Every event on its frame, and nothing allocated while processing',
        'Thread rules in the types: state cannot be loaded from the audio thread',
      ],
    },
    pt: {
      name: 'Hospedagem de plugins',
      lead: 'Carregue plugins feitos por qualquer pessoa e rode-os como processadores.',
      items: [
        'CLAP e VST 3, por uma única interface para os dois formatos',
        'Cada evento no seu frame, e nada alocado durante o processamento',
        'Regras de thread nos tipos: o estado não pode ser carregado a partir da thread de áudio',
      ],
    },
  },
  {
    id: 'midi',
    crates: ['manguebyte-midi'],
    en: {
      name: 'MIDI',
      lead: 'MIDI 1.0 and 2.0, with timing kept to the sample.',
      items: [
        'MIDI 1.0 channel and system messages, a byte-stream parser, standard MIDI files',
        'A sample-accurate `MidiBuffer`',
        'MIDI 2.0 packets (UMP) and translation between the protocols',
        'RPN and NRPN; MPE zones and note tracking',
        'A keyboard state an interface can read while the audio thread writes',
      ],
    },
    pt: {
      name: 'MIDI',
      lead: 'MIDI 1.0 e 2.0, com o tempo preservado até a amostra.',
      items: [
        'Mensagens de canal e de sistema do MIDI 1.0, um parser de fluxo de bytes, arquivos MIDI padrão',
        'Um `MidiBuffer` com precisão de amostra',
        'Pacotes MIDI 2.0 (UMP) e tradução entre os protocolos',
        'RPN e NRPN; zonas MPE e acompanhamento de notas',
        'Um estado de teclado que a interface lê enquanto a thread de áudio escreve',
      ],
    },
  },
  {
    id: 'formats',
    crates: ['manguebyte-formats'],
    en: {
      name: 'Audio files',
      lead: 'Read and write whole files or block by block, from disk to the audio thread.',
      items: [
        'WAV (with RF64), AIFF and FLAC, read and written',
        'Whole or block by block, with exact seeking',
        'A FLAC encoder and decoder written from the specification and checked against FFmpeg',
        'Wait-free bridges to play and record from an audio callback',
      ],
    },
    pt: {
      name: 'Arquivos de áudio',
      lead: 'Leia e grave arquivos inteiros ou bloco a bloco, do disco até a thread de áudio.',
      items: [
        'WAV (com RF64), AIFF e FLAC, lidos e gravados',
        'Inteiros ou bloco a bloco, com busca exata',
        'Um codificador e um decodificador de FLAC escritos a partir da especificação e conferidos com o FFmpeg',
        'Pontes wait-free para tocar e gravar a partir de um callback de áudio',
      ],
    },
  },
  {
    id: 'osc',
    crates: ['manguebyte-osc'],
    en: {
      name: 'Open Sound Control',
      lead: 'Messages from controllers and live-coding programs, on the frame they ask for.',
      items: [
        'OSC over UDP and TCP',
        'A real-time bridge that puts time-tagged bundles on their exact frame',
      ],
    },
    pt: {
      name: 'Open Sound Control',
      lead: 'Mensagens de controladores e de programas de live coding, no frame que elas pedem.',
      items: [
        'OSC por UDP e TCP',
        'Uma ponte de tempo real que põe os bundles com time tag no seu frame exato',
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
  {
    id: 'interface',
    crates: ['manguebyte-gfx', 'manguebyte-ui'],
    en: {
      name: 'User interface',
      lead: 'The pieces of a plugin editor, tested without a display. There are no windows yet, so no editor opens inside a real host yet.',
      items: [
        'The editor interfaces of both formats: CLAP’s `gui` extension and VST 3’s `IPlugView`, tested against fake hosts',
        '2D drawing on the CPU: paths, gradients, images, clips and layers, recorded as a scene; repaint limited to what changed, identical to a full repaint',
        'Text shaped and laid out with an embedded Inter subset',
        'Widgets for plugin editors: a retained tree, row and column layout, theme tokens, label, knob, slider, toggle, meter and canvas',
        'Parameter edits as gestures, an accessibility description required of every widget, and a harness that drives it all in a unit test',
      ],
    },
    pt: {
      name: 'Interface com o usuário',
      lead: 'As peças de um editor de plugin, testadas sem tela. Ainda não há janelas, então nenhum editor abre dentro de um host de verdade.',
      items: [
        'As interfaces de editor dos dois formatos: a extensão `gui` do CLAP e o `IPlugView` do VST 3, testadas contra hosts falsos',
        'Desenho 2D na CPU: caminhos, gradientes, imagens, recortes e camadas, gravados como uma cena; redesenho só do que mudou, idêntico a um redesenho completo',
        'Texto moldado e diagramado com um subconjunto embutido da Inter',
        'Widgets para editores de plugin: uma árvore retida, layout em linha e coluna, tokens de tema, rótulo, knob, slider, chave, medidor e canvas',
        'Edições de parâmetro como gestos, uma descrição de acessibilidade obrigatória em cada widget, e um harness que conduz tudo num teste unitário',
      ],
    },
  },
  {
    id: 'tools',
    crates: ['cargo-mangue'],
    en: {
      name: 'Command-line tool',
      lead: 'From an empty folder to an installed plugin.',
      items: [
        '`cargo mangue new` creates a plugin crate from a template, instrument or effect',
        '`bundle` turns it into a `.clap` and a `.vst3` in each system’s layout',
        '`install` copies a plugin into the user’s plugin folders',
        '`validate` runs both formats’ validators on it',
      ],
    },
    pt: {
      name: 'Ferramenta de linha de comando',
      lead: 'De uma pasta vazia a um plugin instalado.',
      items: [
        '`cargo mangue new` cria um crate de plugin a partir de um modelo, instrumento ou efeito',
        '`bundle` o transforma num `.clap` e num `.vst3`, no layout de cada sistema',
        '`install` copia um plugin para as pastas de plugins do usuário',
        '`validate` roda nele os validadores dos dois formatos',
      ],
    },
  },
];

// The README's "Not there yet", followed by the rest of what its "Where JUCE
// is ahead" paragraph names.
export const missing = {
  en: [
    'Windows for plugin editors: no editor opens inside a real host yet',
    'Audio Unit, LV2 and AAX plugin formats',
    'Plugin scanning, and the editors of hosted plugins',
    'Lossy formats: MP3, Ogg Vorbis, Opus',
    'Convolution',
    'Mobile platforms',
    'A release on crates.io, and a stable API',
  ],
  pt: [
    'Janelas para os editores de plugin: nenhum editor abre ainda dentro de um host de verdade',
    'Os formatos de plugin Audio Unit, LV2 e AAX',
    'Varredura de plugins, e os editores dos plugins hospedados',
    'Formatos com perdas: MP3, Ogg Vorbis, Opus',
    'Convolução',
    'Plataformas móveis',
    'Uma versão publicada no crates.io, e uma API estável',
  ],
};
