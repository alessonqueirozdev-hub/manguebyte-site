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
        'The `AudioSource` trait that device callbacks, graphs and mixers pull audio through, with audio in memory as a source',
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
        'O trait `AudioSource`, pelo qual callbacks de dispositivo, grafos e mixers puxam o áudio, com o áudio em memória como uma fonte',
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
        'One reader that turns MIDI 1.0, MPE and MIDI 2.0 into per-note events',
        'Audio sources made of sources: a mixer, a sample rate converter, a channel router, a source through a processor, and a source as a processor',
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
        'Um único leitor que transforma MIDI 1.0, MPE e MIDI 2.0 em eventos por nota',
        'Fontes de áudio feitas de fontes: um mixer, um conversor de taxa de amostragem, um roteador de canais, uma fonte passando por um processador, e uma fonte como processador',
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
      lead: 'Voices ready to play, each with presets, answering velocity and accents, their tuning or spectra measured in tests. They are brought to one loudness in the browser engine, not in `manguebyte-dsp` itself.',
      items: [
        'Physically modelled plucked strings: guitars and basses',
        'Four-operator FM, with piano, bell and bass presets',
        'A tonewheel organ with a rotary speaker',
        'The drums and kick bass of the classic analogue drum machine, and an acid bass with accent and slide',
        'Drum kits: acoustic drums and cymbals by modal synthesis, calibrated against recordings of a real snare and crash; the 909, 606 and CR-78; kits for trap, techno, house, drum and bass and lo-fi',
        'Brazilian percussion by physical modelling, which any kit can take: agogô, ganzá, cuíca, triangle, surdo, pandeiro, zabumba, tamborim, alfaia, gonguê and cajón, and a hand clap',
        'Mallets by modal synthesis: marimba, vibraphone, xylophone, glockenspiel, celesta, kalimba, steel pan and tubular bells',
        'Bowed strings (violin to double bass, a section, pizzicato) and winds (flute, clarinet, saxophone, trumpet, trombone) by digital waveguide, with no samples',
        'Choirs and a solo voice by formant synthesis',
        'A deep polyphonic synthesiser: three oscillators with sixteen-voice unison and wavetables, two filters of fifteen models, a sixteen-slot modulation matrix, and 68 presets for electronic and pop music',
      ],
    },
    pt: {
      name: 'Instrumentos',
      lead: 'Vozes prontas para tocar, cada uma com presets, respondendo à velocidade e a acentos, com a afinação ou o espectro medidos em testes. É no motor do navegador, e não no próprio `manguebyte-dsp`, que elas chegam todas à mesma loudness.',
      items: [
        'Cordas dedilhadas por modelagem física: violões, guitarras e baixos',
        'FM de quatro operadores, com presets de piano, sino e baixo',
        'Um órgão de tonewheel com caixa rotativa',
        'A bateria e o bumbo-baixo da clássica bateria eletrônica analógica, e um baixo acid com acento e slide',
        'Kits de bateria: bateria acústica e pratos por síntese modal, calibrados com gravações de uma caixa e de um prato de verdade; os 909, 606 e CR-78; kits de trap, techno, house, drum and bass e lo-fi',
        'Percussão brasileira por modelagem física, que qualquer kit pode receber: agogô, ganzá, cuíca, triângulo, surdo, pandeiro, zabumba, tamborim, alfaia, gonguê e cajón, e uma palma',
        'Percussão de teclas por síntese modal: marimba, vibrafone, xilofone, glockenspiel, celesta, kalimba, steel pan e sinos tubulares',
        'Cordas de arco (do violino ao contrabaixo, um naipe, pizzicato) e sopros (flauta, clarinete, saxofone, trompete, trombone) por guia de onda digital, sem samples',
        'Coros e uma voz solo por síntese de formantes',
        'Um sintetizador polifônico profundo: três osciladores com unison de dezesseis vozes e wavetables, dois filtros entre quinze modelos, uma matriz de modulação de dezesseis posições e 68 presets para música eletrônica e pop',
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
    crates: ['manguebyte-plugin', 'manguebyte-clap', 'manguebyte-vst3', 'manguebyte-lv2', 'manguebyte-au', 'manguebyte-standalone'],
    en: {
      name: 'Plugins',
      lead: 'Write a plugin once. Export it as CLAP, VST 3, LV2 and, for macOS, an Audio Unit with one line each, run it as an application, and test it with no host.',
      items: [
        'The `Plugin` trait that every format wraps, with the MIDI controllers it listens to, how it reads MPE, the notes, expressions and MIDI it sends out and their translation to MIDI 2.0, MIDI 1.0 or MPE, and plugin state',
        '`Harness`: plays notes, automation and a sidechain into a plugin inside a unit test, and keeps what it sends',
        'CLAP: notes, expression, automation and modulation arrive on their exact frame, and a plugin’s notes, expressions and MIDI go out through an output note port. Passes the CLAP project’s validator',
        'VST 3: every automation point lands on its frame; notes carry ids, tuning and per-note expression; the controllers a plugin declares arrive as MIDI again; a plugin’s notes and expressions go out through an output event bus. Passes Steinberg’s validator on Windows, Linux and macOS',
        'LV2: the Turtle files are generated, and CI loads the example plugins’ bundles with lilv; not yet checked by `lv2lint` or loaded in any host but the framework’s own, and without an editor',
        'Audio Unit (version 2), for macOS: tested through its C interface on every system, and both example plugins pass Apple’s `auval` in CI; no DAW has loaded one yet, and it has no editor',
        'Standalone: runs a plugin as an application, with the sound card out, MIDI keyboards in, a plugin’s notes out to a MIDI port, and the microphone in for effects',
        'The Aratu Bridge, an example instrument that plays the music of an Aratu page in a DAW, with the browser’s engine built natively; tried by hand once, in REAPER',
      ],
    },
    pt: {
      name: 'Plugins',
      lead: 'Escreva o plugin uma vez. Exporte como CLAP, VST 3, LV2 e, para macOS, Audio Unit com uma linha cada, rode como aplicativo e teste sem host.',
      items: [
        'O trait `Plugin`, que todos os formatos embrulham, com os controladores MIDI que ele escuta, o jeito como lê MPE, as notas, expressões e MIDI que ele manda para fora e a tradução delas para MIDI 2.0, MIDI 1.0 ou MPE, e o estado do plugin',
        '`Harness`: toca notas, automação e um sidechain num plugin dentro de um teste unitário, e guarda o que ele manda para fora',
        'CLAP: notas, expressão, automação e modulação chegam no frame exato, e as notas, expressões e MIDI do plugin saem por uma porta de notas de saída. Passa no validador do projeto CLAP',
        'VST 3: cada ponto de automação cai no seu frame; as notas trazem ids, afinação e expressão por nota; os controladores que o plugin declara voltam a chegar como MIDI; as notas e expressões do plugin saem por um barramento de eventos de saída. Passa no validador da Steinberg em Windows, Linux e macOS',
        'LV2: os arquivos Turtle são gerados, e o CI carrega os pacotes dos plugins de exemplo com o lilv; ainda não foi conferido pelo `lv2lint` nem carregado em nenhum host além do próprio framework, e não tem editor',
        'Audio Unit (versão 2), para macOS: testado pela interface C em todos os sistemas, e os dois plugins de exemplo passam no `auval` da Apple no CI; nenhuma DAW carregou um ainda, e ele não tem editor',
        'Standalone: roda um plugin como aplicativo, com saída na placa de som, teclados MIDI na entrada, as notas do plugin saindo para uma porta MIDI e microfone para os efeitos',
        'O Aratu Bridge, um instrumento de exemplo que toca numa DAW a música de uma página do Aratu, com o motor do navegador compilado nativamente; experimentado à mão uma vez, no REAPER',
      ],
    },
  },
  {
    id: 'interface',
    crates: ['manguebyte-gfx', 'manguebyte-ui', 'manguebyte-window', 'manguebyte-gui'],
    en: {
      name: 'Plugin editors',
      lead: 'Editors drawn on the CPU and opened in a child of the host’s window, on Win32 so far, and tested in CI. By hand, Mangue Pluck’s CLAP editor has been opened in REAPER on Windows.',
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
      lead: 'Editores desenhados na CPU e abertos numa janela filha da janela do host, por enquanto no Win32, e testados no CI. À mão, o editor CLAP do Mangue Pluck já foi aberto no REAPER para Windows.',
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
      lead: 'Load plugins made by anyone and run them as processors, and find the ones installed.',
      items: [
        'CLAP, VST 3 and LV2, through one interface for all three formats; LV2 bundles read with the crate’s own Turtle reader',
        'Every event on its frame, and nothing allocated while processing',
        'Thread rules in the types: state cannot be loaded from the audio thread',
        'Scanning: the plugins installed on a system listed in a process of their own, so one that crashes or hangs is reported and the host goes on, with a cache of what was found',
      ],
    },
    pt: {
      name: 'Hospedagem de plugins',
      lead: 'Carregue plugins feitos por qualquer pessoa, rode-os como processadores e encontre os que estão instalados.',
      items: [
        'CLAP, VST 3 e LV2, por uma única interface para os três formatos; os pacotes LV2 são lidos com o leitor de Turtle do próprio crate',
        'Cada evento no seu frame, e nada alocado durante o processamento',
        'Regras de thread nos tipos: o estado não pode ser carregado a partir da thread de áudio',
        'Varredura: os plugins instalados no sistema são listados num processo à parte, de modo que um que trave ou caia é informado e o host segue em frente, com um cache do que foi encontrado',
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
      lead: 'An engine for a browser’s AudioWorklet, and the sound engine Aratu plays through. Tested natively and in Node.js, its demo tried once in Chromium, not yet in a browser’s audio thread under load.',
      items: [
        'Parts that play a synth, SFZ instruments or the instruments of `manguebyte-dsp`: guitars and basses, FM, an organ, an 808-style kit and bass, an acid bass, drum kits from an acoustic one to the 808, 909, 606 and CR-78 and genre kits, the polyphonic synthesiser and its 68 presets, mallets, bowed strings, winds and a choir',
        'Aratu’s Brazilian percussion on every drum kit',
        'A chain of effects for each part, with a tube among the drive’s curves, and a master bus with a true-peak limiter',
        'Every kind of instrument and every preset at one loudness, -24 LUFS on a standard phrase; a sampled instrument plays as soon as its samples are decoded, and is brought to that loudness while it plays',
        'A scope and levels for every part',
        'Events as 32-byte records that land on their exact frame, through a shared-memory ring',
        'WebAssembly exports with no imports, an `AudioWorklet` and a demo page, and `bridge.js`, which plays the same music in a DAW through the Aratu Bridge plugin',
      ],
    },
    pt: {
      name: 'No navegador',
      lead: 'Um motor para o AudioWorklet de um navegador, e o motor de som pelo qual o Aratu toca. Testado nativamente e no Node.js, com a demonstração experimentada uma vez no Chromium, ainda não na thread de áudio de um navegador sob carga.',
      items: [
        'Partes que tocam um synth, instrumentos SFZ ou os instrumentos do `manguebyte-dsp`: violões, guitarras e baixos, FM, um órgão, uma bateria e um baixo no estilo da 808, um baixo acid, kits de bateria, do acústico às 808, 909, 606 e CR-78 e aos kits de cada gênero, o sintetizador polifônico com os seus 68 presets, percussão de teclas, cordas de arco, sopros e um coro',
        'A percussão brasileira do Aratu em todos os kits de bateria',
        'Uma cadeia de efeitos para cada parte, com uma válvula entre as curvas do drive, e um master com limitador de true peak',
        'Todo tipo de instrumento e todo preset na mesma loudness, -24 LUFS numa frase padrão; um instrumento com samples toca assim que eles são decodificados, e chega a essa loudness enquanto toca',
        'Um osciloscópio e medidores de nível para cada parte',
        'Eventos como registros de 32 bytes que caem no frame exato, por um anel de memória compartilhada',
        'Exports de WebAssembly sem imports, um `AudioWorklet` e uma página de demonstração, e o `bridge.js`, que toca a mesma música numa DAW pelo plugin Aratu Bridge',
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
        'MIDI 2.0 packets (UMP) and translation between the protocols, MIDI 2.0 to MPE included',
        'RPN and NRPN; MPE zones and note tracking',
        'A keyboard state an interface can read while the audio thread writes',
        'MIDI-CI: discovery, profiles, property exchange and process inquiry, and a device agent an application drives',
      ],
    },
    pt: {
      name: 'MIDI',
      lead: 'MIDI 1.0 e 2.0, com o tempo preservado até a amostra.',
      items: [
        'Mensagens de canal e de sistema do MIDI 1.0, um parser de fluxo de bytes, arquivos MIDI padrão',
        'Um `MidiBuffer` com precisão de amostra',
        'Pacotes MIDI 2.0 (UMP) e tradução entre os protocolos, inclusive de MIDI 2.0 para MPE',
        'RPN e NRPN; zonas MPE e acompanhamento de notas',
        'Um estado de teclado que a interface lê enquanto a thread de áudio escreve',
        'MIDI-CI: descoberta, perfis, troca de propriedades e consulta de processos, e um agente de dispositivo que o aplicativo conduz',
      ],
    },
  },
  {
    id: 'formats',
    crates: ['manguebyte-formats'],
    en: {
      name: 'Audio files',
      lead: 'Read and write whole files or block by block, from disk to the audio thread, with codecs written from their specifications.',
      items: [
        'WAV (with RF64), AIFF, FLAC, Ogg Vorbis and MP3, read and written; Ogg Opus and MPEG layers I and II read',
        'Whole or block by block, with exact seeking',
        'FLAC checked against FFmpeg; the Vorbis, Opus and MPEG decoders tested on files libvorbis, libopus, LAME and FFmpeg wrote; the Vorbis and MP3 encoders’ files decoded by FFmpeg and libvorbis to the same audio and length',
        'Tags, cue points, loops, Broadcast Wave fields and pictures in one metadata model, kept on a round trip',
        'Waveform thumbnails with a cache',
        'AAC, ALAC and WMA through the system’s codecs on Windows and macOS',
        'Wait-free bridges to play and record from an audio callback, and a transport source: play, pause, stop, seek and loop a streamed file from any thread, sample-exact',
      ],
    },
    pt: {
      name: 'Arquivos de áudio',
      lead: 'Leia e grave arquivos inteiros ou bloco a bloco, do disco até a thread de áudio, com codecs escritos a partir das especificações.',
      items: [
        'WAV (com RF64), AIFF, FLAC, Ogg Vorbis e MP3, lidos e gravados; Ogg Opus e MPEG camadas I e II, lidos',
        'Inteiros ou bloco a bloco, com busca exata',
        'FLAC conferido com o FFmpeg; os decodificadores de Vorbis, Opus e MPEG testados com arquivos gravados pelo libvorbis, pelo libopus, pelo LAME e pelo FFmpeg; os arquivos dos codificadores de Vorbis e MP3 decodificados pelo FFmpeg e pelo libvorbis com o mesmo áudio e a mesma duração',
        'Tags, cue points, loops, campos do Broadcast Wave e imagens num único modelo de metadados, preservados na ida e volta',
        'Miniaturas de forma de onda, com cache',
        'AAC, ALAC e WMA pelos codecs do sistema no Windows e no macOS',
        'Pontes wait-free para tocar e gravar a partir de um callback de áudio, e uma fonte com transporte: tocar, pausar, parar, buscar e repetir em loop um arquivo lido em fluxo, de qualquer thread, com precisão de amostra',
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
      lead: 'Sound cards and MIDI ports, and an engine that plays on while the device changes under it.',
      items: [
        'Audio hosts: WASAPI, CoreAudio, ALSA, AAudio, and JACK behind a feature; ASIO through the GPLv3 crate below, or through `cpal`’s own `asio` feature, which a closed-source application turns on with an SDK it licenses itself; device listing and selection',
        'Playback, recording and full-duplex streams that follow the drift between two devices’ clocks, in any hardware sample format, with timing and latency in every callback',
        'A device manager that saves its setup and restores it with fallbacks, and follows devices as they are plugged in and out (by polling)',
        'Devices changed under a running engine without stopping it or preparing it again, crossfading where two devices can play at once',
        'A public `AudioBackend` seam for backends from other crates, and a headless backend for tests',
        'MIDI input and output ports, virtual ones too, with arrival times mapped to frames so a player’s timing survives the audio buffer; packets sent from the audio thread when their frame is heard, as MIDI 1.0 bytes for now',
      ],
    },
    pt: {
      name: 'Dispositivos',
      lead: 'Placas de som e portas MIDI, e um motor que continua tocando enquanto o dispositivo muda por baixo dele.',
      items: [
        'Hosts de áudio: WASAPI, CoreAudio, ALSA, AAudio e, atrás de uma feature, JACK; ASIO pelo crate sob a GPLv3 mais abaixo, ou pela feature `asio` do próprio `cpal`, que um aplicativo de código fechado liga com um SDK que ele mesmo licencia; listagem e seleção de dispositivos',
        'Streams de reprodução, gravação e full-duplex que acompanham o desvio entre os relógios de dois dispositivos, em qualquer formato de amostra do hardware, com tempo e latência em cada callback',
        'Um gerenciador de dispositivos que salva a configuração e a restaura com alternativas, e acompanha os dispositivos conforme são plugados e desplugados (por consulta periódica)',
        'Dispositivos trocados por baixo de um motor em execução sem pará-lo nem prepará-lo de novo, com crossfade quando dois dispositivos podem tocar ao mesmo tempo',
        'Uma interface pública, `AudioBackend`, para backends de outros crates, e um backend sem hardware para os testes',
        'Portas MIDI de entrada e de saída, inclusive virtuais, com os horários de chegada convertidos em frames, para que o tempo de quem toca sobreviva ao buffer de áudio; pacotes enviados da thread de áudio no momento em que o seu frame é ouvido, por enquanto como bytes de MIDI 1.0',
      ],
    },
  },
  {
    id: 'pro-io',
    crates: ['manguebyte-pro-io'],
    en: {
      name: 'ASIO, under the GPLv3',
      lead: 'Opt-in, and the one crate under the GPLv3 rather than MIT or Apache-2.0. Not part of the facade, and no other crate depends on it.',
      items: [
        'ASIO drivers spoken to directly: listed from the registry, loaded through COM on a single-threaded apartment of their own',
        'Channels, sample types, latencies, buffer sizes and rates; duplex streams on planar `f32`, with every PCM sample type converted',
        'Driver resets followed by a restart off the audio thread, and a backend for the device manager, which can move a running engine from one driver to another',
        'A fake driver written in Rust that tests it all without hardware',
        'A program that uses it is under the GPLv3; closed-source programs reach ASIO through `cpal`’s own `asio` feature instead',
      ],
    },
    pt: {
      name: 'ASIO, sob a GPLv3',
      lead: 'Opcional, e o único crate sob a GPLv3 em vez de MIT ou Apache-2.0. Não faz parte da fachada, e nenhum outro crate depende dele.',
      items: [
        'Conversa direta com drivers ASIO: listados a partir do registro e carregados por COM num apartamento de thread única só deles',
        'Canais, tipos de amostra, latências, tamanhos de buffer e taxas; streams duplex em `f32` planar, com todos os tipos de amostra PCM convertidos',
        'Reinícios do driver seguidos de um novo início fora da thread de áudio, e um backend para o gerenciador de dispositivos, que consegue passar um motor em execução de um driver para outro',
        'Um driver falso escrito em Rust, que testa tudo isso sem hardware',
        'Um programa que o use fica sob a GPLv3; programas de código fechado chegam ao ASIO pela feature `asio` do próprio `cpal`',
      ],
    },
  },
  {
    id: 'tools',
    crates: ['cargo-mangue'],
    en: {
      name: 'Command-line tool',
      lead: 'From an empty folder to an installed plugin. `cargo install cargo-mangue` installs it.',
      items: [
        '`cargo mangue new` creates a plugin crate from a template, instrument or effect, depending on the release the tool came with, or with `--manguebyte-git` on the repository',
        '`bundle` turns it into a `.clap` and a `.vst3` in each system’s layout, `bundle --format lv2` into an `.lv2`, and on a Mac `--format au` into a `.component`',
        '`install` copies a plugin into the user’s plugin folders',
        '`validate` runs the CLAP and VST 3 validators on it, and Apple’s `auval` on a `.component`',
      ],
    },
    pt: {
      name: 'Ferramenta de linha de comando',
      lead: 'De uma pasta vazia a um plugin instalado. `cargo install cargo-mangue` a instala.',
      items: [
        '`cargo mangue new` cria um crate de plugin a partir de um modelo, instrumento ou efeito, dependente da versão que veio com a ferramenta ou, com `--manguebyte-git`, do repositório',
        '`bundle` o transforma num `.clap` e num `.vst3`, no layout de cada sistema, `bundle --format lv2` num `.lv2`, e num Mac `--format au` num `.component`',
        '`install` copia um plugin para as pastas de plugins do usuário',
        '`validate` roda nele os validadores do CLAP e do VST 3, e o `auval` da Apple num `.component`',
      ],
    },
  },
];

// The README's "Not there yet", followed by the rest of what its "Where JUCE
// is ahead" paragraph names.
export const missing = {
  en: [
    'Editors tried in hosts: by hand, only Mangue Pluck’s CLAP editor has been opened, in REAPER on Windows; working its knobs there, the VST 3 editors and Mangue Duck’s are still to be tried',
    'Editor windows on macOS and Linux',
    'LV2 run by any host but the framework’s own or checked by `lv2lint`; LV2 editors and MIDI output',
    'Audio Units loaded in a DAW; AU editors and MIDI output',
    'The Aratu Bridge in other DAWs and browsers',
    'The browser engine and the sampler in a browser’s audio thread under load',
    'The AUv3 and AAX plugin formats',
    'Encoding Opus',
    'MIDI output through the systems’ own Universal MIDI Packet APIs',
    'Hosting AU plugins, and the editors of hosted plugins',
    'Running on iOS and Android devices: the crates are only built for them in CI',
    'A stable API: it will change before 1.0',
  ],
  pt: [
    'Editores experimentados em hosts: à mão, só o editor CLAP do Mangue Pluck foi aberto, no REAPER para Windows; mexer nos knobs dele ali, os editores VST 3 e o do Mangue Duck ainda estão por experimentar',
    'Janelas de editor em macOS e Linux',
    'LV2 rodando num host além do próprio framework, ou conferido pelo `lv2lint`; editores LV2 e saída de MIDI',
    'Audio Units carregados numa DAW; editores AU e saída de MIDI',
    'O Aratu Bridge em outras DAWs e outros navegadores',
    'O motor do navegador e o sampler na thread de áudio de um navegador sob carga',
    'Os formatos de plugin AUv3 e AAX',
    'Codificação de Opus',
    'Saída de MIDI pelas APIs de Universal MIDI Packet dos próprios sistemas',
    'Hospedagem de plugins AU, e os editores dos plugins hospedados',
    'Rodar em aparelhos iOS e Android: por enquanto os crates só são compilados para eles no CI',
    'Uma API estável: ela vai mudar antes da versão 1.0',
  ],
};
