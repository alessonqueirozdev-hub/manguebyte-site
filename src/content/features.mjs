// What exists today, by area.
//
// This mirrors the table under "Status" in the framework's README, one entry
// per crate or group of crates, in the order a signal travels: from the types
// everything is built on, through DSP, instruments, analysis and parameters,
// out to plugin formats, hosting, files, devices, the interface, the browser
// and the tools. The detail in some items comes from CHANGELOG.md,
// ROADMAP.md and ADR 0007. When a README row changes, change the matching
// entry here, in both languages. Nothing may be listed here that those files
// do not state.

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
        'A polyphonic `Synth` with per-note expression and modulation, accents and legato',
        'Band-limited oscillator and a band-limited wavetable oscillator; noise; LFO with tempo sync',
        'Biquad filters in 8 shapes; state-variable, one-pole and ladder filters; high-order IIR design (Butterworth, Chebyshev, elliptic); Linkwitz-Riley crossovers',
        'A FIR filter, and convolution with zero latency, true stereo and responses swapped while playing',
        'Compressor, noise gate, expander, sidechain keying for the dynamics, and a look-ahead limiter whose ceiling holds for every sample',
        'Interpolated delay lines and echo; chorus and flanger; phaser; reverb',
        'ADSR envelope, envelope follower, smoothed gain, panner, dry/wet mixing, waveshaper',
        'Oversampling by 2, 4, 8 or 16; resampling at any ratio; FFT of any length, window functions, FIR design',
        'Response curves to draw them all, from filters and dynamics to envelopes, LFOs, delays and reverb tails, worked out from the settings without touching the heap',
      ],
    },
    pt: {
      name: 'Processamento de sinal',
      lead: 'Uma tupla de processadores é um processador: a cadeia é resolvida em tempo de compilação, sem chamadas virtuais e sem alocação.',
      items: [
        'O trait `Processor` e cadeias em tuplas; eventos com precisão de amostra e transporte',
        'Um `Synth` polifônico com expressão e modulação por nota, acentos e legato',
        'Oscilador com banda limitada e oscilador de wavetable com banda limitada; ruído; LFO sincronizado ao andamento',
        'Filtros biquad em 8 formas; filtros de variável de estado, de um polo e ladder; projeto de IIR de ordem alta (Butterworth, Chebyshev, elíptico); crossovers Linkwitz-Riley',
        'Um filtro FIR, e convolução com latência zero, estéreo verdadeiro e respostas trocadas enquanto toca',
        'Compressor, noise gate, expansor, sidechain para a dinâmica e um limitador look-ahead cujo teto vale para todas as amostras',
        'Linhas de atraso interpoladas e eco; chorus e flanger; phaser; reverb',
        'Envelope ADSR, seguidor de envelope, ganho suavizado, panner, mistura dry/wet, waveshaper',
        'Oversampling de 2, 4, 8 ou 16 vezes; reamostragem em qualquer razão; FFT de qualquer tamanho, funções de janela, projeto de FIR',
        'Curvas de resposta para desenhar tudo isso, de filtros e dinâmica a envelopes, LFOs, delays e caudas de reverb, calculadas a partir dos ajustes sem tocar no heap',
      ],
    },
  },
  {
    id: 'instruments',
    crates: ['manguebyte-dsp'],
    en: {
      name: 'Instruments',
      lead: 'Voices ready to play, each with presets, measured for tuning, decay, velocity and accent, and all at one loudness.',
      items: [
        'Physically modelled plucked strings: guitars and basses',
        'Four-operator FM, with piano, bell and bass presets',
        'A tonewheel organ with a rotary speaker',
        'The drums and kick bass of the classic analogue drum machine, and an acid bass with accent and slide',
        'Drum kits: acoustic drums and cymbals by modal synthesis, calibrated against recordings of a real snare and crash; the 909, 606 and CR-78; kits for trap, techno, house, drum and bass and lo-fi',
      ],
    },
    pt: {
      name: 'Instrumentos',
      lead: 'Vozes prontas para tocar, cada uma com presets, medidas em afinação, decaimento, velocidade e acento, e todas na mesma loudness.',
      items: [
        'Cordas dedilhadas por modelagem física: violões, guitarras e baixos',
        'FM de quatro operadores, com presets de piano, sino e baixo',
        'Um órgão de tonewheel com caixa rotativa',
        'A bateria e o bumbo-baixo da clássica bateria eletrônica analógica, e um baixo acid com acento e slide',
        'Kits de bateria: bateria acústica e pratos por síntese modal, calibrados com gravações de uma caixa e de um prato de verdade; os 909, 606 e CR-78; kits de trap, techno, house, drum and bass e lo-fi',
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
        'Linear, skewed and logarithmic ranges, conversion to and from text with units, and smoothing',
        'Saved state that survives version changes',
        'Every parameter described as data and as JSON, for editors outside Rust',
      ],
    },
    pt: {
      name: 'Parâmetros',
      lead: 'Parâmetros são atômicos dentro de uma struct. Não existem listeners.',
      items: [
        'Parâmetros lock-free de ponto flutuante, inteiro, chave e escolha',
        'Faixas lineares, enviesadas e logarítmicas, conversão de e para texto com unidades, e suavização',
        'Estado salvo que sobrevive a mudanças de versão',
        'Cada parâmetro descrito como dado e como JSON, para editores fora do Rust',
      ],
    },
  },
  {
    id: 'plugins',
    crates: ['manguebyte-plugin', 'manguebyte-clap', 'manguebyte-vst3', 'manguebyte-lv2', 'manguebyte-standalone'],
    en: {
      name: 'Plugins',
      lead: 'Write a plugin once. Export it as CLAP, VST 3 and LV2 with one line each, run it as an application, and test it with no host.',
      items: [
        'The `Plugin` trait that every format wraps, with the MIDI controllers it listens to, and plugin state',
        '`Harness`: plays notes, automation and a sidechain into a plugin inside a unit test',
        'CLAP: notes, expression, automation and modulation arrive on their exact frame. Passes the CLAP project’s validator',
        'VST 3: every automation point lands on its frame; notes carry ids, tuning and per-note expression; the controllers a plugin declares arrive as MIDI again. Passes Steinberg’s validator on Windows, Linux and macOS',
        'LV2: the Turtle files are generated, and CI loads the example plugins’ bundles with lilv; not yet run in a host, and without an editor',
        'Standalone: runs a plugin as an application, with the sound card out, MIDI keyboards in, and the microphone in for effects',
      ],
    },
    pt: {
      name: 'Plugins',
      lead: 'Escreva o plugin uma vez. Exporte como CLAP, VST 3 e LV2 com uma linha cada, rode como aplicativo e teste sem host.',
      items: [
        'O trait `Plugin`, que todos os formatos embrulham, com os controladores MIDI que ele escuta, e o estado do plugin',
        '`Harness`: toca notas, automação e um sidechain num plugin dentro de um teste unitário',
        'CLAP: notas, expressão, automação e modulação chegam no frame exato. Passa no validador do projeto CLAP',
        'VST 3: cada ponto de automação cai no seu frame; as notas trazem ids, afinação e expressão por nota; os controladores que o plugin declara voltam a chegar como MIDI. Passa no validador da Steinberg em Windows, Linux e macOS',
        'LV2: os arquivos Turtle são gerados, e o CI carrega os pacotes dos plugins de exemplo com o lilv; ainda não rodou num host, e não tem editor',
        'Standalone: roda um plugin como aplicativo, com saída na placa de som, teclados MIDI na entrada e microfone para os efeitos',
      ],
    },
  },
  {
    id: 'interface',
    crates: ['manguebyte-gfx', 'manguebyte-ui', 'manguebyte-window', 'manguebyte-gui'],
    en: {
      name: 'Plugin editors',
      lead: 'Editors drawn on the CPU and opened in a child of the host’s window, on Win32 so far. Tested in CI; nobody has opened one in a host by hand yet.',
      items: [
        'The editor interfaces of both formats, CLAP’s `gui` extension and VST 3’s `IPlugView`, tested through their real interfaces',
        'Windows on Win32 that present only what changed, and a headless backend that lets a test drive a window on any system',
        '2D drawing on the CPU: paths, gradients, images, clips and layers, recorded as a scene; text with an embedded Inter subset',
        'Widgets: label, knob, slider, toggle, meter and canvas; a text field and values typed into knobs and sliders; popup menus, a combo box, hover and tooltips',
        'Parameter edits as gestures, an accessibility description required of every widget, and a harness that drives it all in a unit test',
        'Editors for both example plugins',
      ],
    },
    pt: {
      name: 'Editores de plugin',
      lead: 'Editores desenhados na CPU e abertos numa janela filha da janela do host, por enquanto no Win32. Testados no CI; ninguém abriu um num host à mão ainda.',
      items: [
        'As interfaces de editor dos dois formatos, a extensão `gui` do CLAP e o `IPlugView` do VST 3, testadas pelas interfaces reais',
        'Janelas no Win32 que só redesenham o que mudou, e um backend sem tela que deixa um teste conduzir uma janela em qualquer sistema',
        'Desenho 2D na CPU: caminhos, gradientes, imagens, recortes e camadas, gravados como uma cena; texto com um subconjunto embutido da Inter',
        'Widgets: rótulo, knob, slider, chave, medidor e canvas; um campo de texto e valores digitados nos knobs e sliders; menus popup, combo box, hover e dicas',
        'Edições de parâmetro como gestos, uma descrição de acessibilidade obrigatória em cada widget, e um harness que conduz tudo num teste unitário',
        'Editores para os dois plugins de exemplo',
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
    id: 'sampler',
    crates: ['manguebyte-sampler'],
    en: {
      name: 'Sampler',
      lead: 'An SFZ player, open so that any program can play the instruments it is given.',
      items: [
        'SFZ instruments with inheritance, `#define` and `#include`, their samples loaded from files or from memory',
        'Played on the exact frame, with velocity layers, round robin, release triggers, loops with crossfades, choke groups and voice stealing that fades',
        'Builds for WebAssembly',
      ],
    },
    pt: {
      name: 'Sampler',
      lead: 'Um player de SFZ, aberto para que qualquer programa toque os instrumentos que receber.',
      items: [
        'Instrumentos SFZ com herança, `#define` e `#include`, com os samples carregados de arquivos ou da memória',
        'Tocados no frame exato, com camadas de velocidade, round robin, samples de release, loops com crossfade, grupos de choke e roubo de voz com fade',
        'Compila para WebAssembly',
      ],
    },
  },
  {
    id: 'web',
    crates: ['manguebyte-web'],
    en: {
      name: 'In the browser',
      lead: 'An engine for a browser’s AudioWorklet. Tested natively and in Node.js, not yet in a browser’s audio thread under load.',
      items: [
        'Parts that play a synth, drum kits, SFZ instruments or the instruments of `manguebyte-dsp`',
        'A chain of effects for each part, and a master bus with a true-peak limiter',
        'Every kind of instrument and every preset at one loudness, sampled instruments measured as they load',
        'Events as 32-byte records that land on their exact frame, through a shared-memory ring',
        'WebAssembly exports with no imports, an `AudioWorklet` and a demo page',
      ],
    },
    pt: {
      name: 'No navegador',
      lead: 'Um motor para o AudioWorklet de um navegador. Testado nativamente e no Node.js, ainda não na thread de áudio de um navegador sob carga.',
      items: [
        'Partes que tocam um synth, kits de bateria, instrumentos SFZ ou os instrumentos do `manguebyte-dsp`',
        'Uma cadeia de efeitos para cada parte, e um master com limitador de true peak',
        'Todo tipo de instrumento e todo preset na mesma loudness, os instrumentos com samples medidos ao carregar',
        'Eventos como registros de 32 bytes que caem no frame exato, por um anel de memória compartilhada',
        'Exports de WebAssembly sem imports, um `AudioWorklet` e uma página de demonstração',
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
        'Ogg Vorbis and MP3 read, with decoders written from their specifications and tested on files libvorbis and LAME wrote',
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
        'Ogg Vorbis e MP3 lidos, com decodificadores escritos a partir das especificações e testados com arquivos gravados pelo libvorbis e pelo LAME',
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
    id: 'tools',
    crates: ['cargo-mangue'],
    en: {
      name: 'Command-line tool',
      lead: 'From an empty folder to an installed plugin.',
      items: [
        '`cargo mangue new` creates a plugin crate from a template, instrument or effect',
        '`bundle` turns it into a `.clap` and a `.vst3` in each system’s layout, and `bundle --format lv2` into an `.lv2`',
        '`install` copies a plugin into the user’s plugin folders',
        '`validate` runs the CLAP and VST 3 validators on it',
      ],
    },
    pt: {
      name: 'Ferramenta de linha de comando',
      lead: 'De uma pasta vazia a um plugin instalado.',
      items: [
        '`cargo mangue new` cria um crate de plugin a partir de um modelo, instrumento ou efeito',
        '`bundle` o transforma num `.clap` e num `.vst3`, no layout de cada sistema, e `bundle --format lv2` num `.lv2`',
        '`install` copia um plugin para as pastas de plugins do usuário',
        '`validate` roda nele os validadores do CLAP e do VST 3',
      ],
    },
  },
];

// The README's "Not there yet", followed by the rest of what its "Where JUCE
// is ahead" paragraph names.
export const missing = {
  en: [
    'A plugin editor opened in a host by hand: so far the editors are tested in CI only',
    'Editor windows on macOS and Linux',
    'LV2 run by a host or checked by `lv2lint`, and LV2 editors',
    'The browser engine and the sampler in a browser’s audio thread under load',
    'Audio Unit and AAX plugin formats',
    'Encoding to lossy formats, and reading Opus',
    'Plugin scanning, and the editors of hosted plugins',
    'Mobile platforms',
    'A release on crates.io, and a stable API',
  ],
  pt: [
    'Um editor de plugin aberto num host à mão: por enquanto os editores só foram testados no CI',
    'Janelas de editor em macOS e Linux',
    'LV2 rodando num host ou conferido pelo `lv2lint`, e editores LV2',
    'O motor do navegador e o sampler na thread de áudio de um navegador sob carga',
    'Os formatos de plugin Audio Unit e AAX',
    'Codificação em formatos com perdas, e leitura de Opus',
    'Varredura de plugins, e os editores dos plugins hospedados',
    'Plataformas móveis',
    'Uma versão publicada no crates.io, e uma API estável',
  ],
};
