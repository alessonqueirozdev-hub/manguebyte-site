// What exists and what is planned.
//
// This follows ROADMAP.md in the framework's repository, phase by phase and
// item by item. `s` is the status: 'done', 'wip' (in progress) or 'todo'
// (not started). When ROADMAP.md changes, change this file to match.

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
          { s: 'done', en: 'MIDI 2.0: Universal MIDI Packets with every message type, and MIDI 1.0 to 2.0 translation as the specification prescribes', pt: 'MIDI 2.0: Universal MIDI Packets com todos os tipos de mensagem, e tradução do MIDI 1.0 para o 2.0 como a especificação manda' },
          { s: 'done', en: 'RPN and NRPN, MPE zones, channel allocation and per-note tracking, and a keyboard state an interface can read while the audio thread writes', pt: 'RPN e NRPN, zonas MPE, alocação de canais e acompanhamento por nota, e um estado de teclado que a interface lê enquanto a thread de áudio escreve' },
          { s: 'todo', en: 'MIDI 2.0 and MPE delivered to processors as per-note events, and through the device and plugin layers', pt: 'MIDI 2.0 e MPE entregues aos processadores como eventos por nota, e pelas camadas de dispositivos e de plugins' },
        ],
      },
      {
        en: 'DSP',
        pt: 'DSP',
        items: [
          { s: 'done', en: 'FFT of any length, real FFT and window functions', pt: 'FFT de qualquer tamanho, FFT real e funções de janela' },
          { s: 'done', en: 'Spectrum analysis: short-time Fourier transform with any size, hop and window, ballistics, peak hold, fractional-octave bands, A and C weighting', pt: 'Análise de espectro: transformada de Fourier de tempo curto com qualquer tamanho, salto e janela, balística, retenção de pico, bandas em frações de oitava, ponderação A e C' },
          { s: 'todo', en: 'Overlap-add resynthesis for spectral processing', pt: 'Ressíntese por overlap-add para processamento espectral' },
          { s: 'done', en: 'Resampling at any ratio, and oversampling by 2, 4, 8 or 16', pt: 'Reamostragem em qualquer razão, e oversampling de 2, 4, 8 ou 16 vezes' },
          { s: 'done', en: 'State-variable filter, stable under audio-rate modulation', pt: 'Filtro de variável de estado, estável com modulação em taxa de áudio' },
          { s: 'done', en: 'FIR low-pass design (Kaiser-windowed sinc)', pt: 'Projeto de passa-baixas FIR (sinc com janela de Kaiser)' },
          { s: 'done', en: 'One-pole and ladder filters, stable under audio-rate modulation', pt: 'Filtros de um polo e ladder, estáveis com modulação em taxa de áudio' },
          { s: 'done', en: 'High-order IIR design: Butterworth, Chebyshev I and II, elliptic, order 1 to 16, gliding between designs without blowing up', pt: 'Projeto de IIR de ordem alta: Butterworth, Chebyshev I e II, elíptico, ordem 1 a 16, deslizando entre projetos sem explodir' },
          { s: 'done', en: 'Linkwitz-Riley crossovers, 2 to 5 bands that sum flat', pt: 'Crossovers Linkwitz-Riley, de 2 a 5 bandas que somam plano' },
          { s: 'done', en: 'FIR filter processor, choosing direct or FFT convolution by length', pt: 'Processador de filtro FIR, escolhendo convolução direta ou por FFT conforme o tamanho' },
          { s: 'done', en: 'Dynamics: compressor with soft knee, noise gate', pt: 'Dinâmica: compressor com soft knee, noise gate' },
          { s: 'done', en: 'Look-ahead limiter whose ceiling holds for every sample', pt: 'Limitador look-ahead cujo teto vale para todas as amostras' },
          { s: 'done', en: 'Expander, and sidechain keying for the compressor, gate and expander, chosen per processor', pt: 'Expansor, e sidechain para o compressor, o gate e o expansor, escolhido por processador' },
          { s: 'done', en: 'Reverb (feedback delay network)', pt: 'Reverb (rede de atrasos realimentados)' },
          { s: 'done', en: 'Chorus and flanger, phaser, dry/wet mixing with latency compensation, panner, envelope follower, interpolated delay lines', pt: 'Chorus e flanger, phaser, mistura dry/wet com compensação de latência, panner, seguidor de envelope, linhas de atraso interpoladas' },
          { s: 'done', en: 'Convolution: uniformly partitioned, with zero latency or a latency of one partition, true stereo, and responses swapped with a crossfade while playing. A non-uniformly partitioned scheme, cheaper for long responses at small block sizes, is not started', pt: 'Convolução: particionada de modo uniforme, com latência zero ou de uma partição, estéreo verdadeiro e respostas trocadas com crossfade enquanto toca. Um esquema não uniforme, mais barato para respostas longas com blocos pequenos, não foi começado' },
          { s: 'done', en: 'Noise (white, pink, brown), LFO with tempo sync, waveshaper, DC blocker', pt: 'Ruído (branco, rosa, marrom), LFO sincronizado ao andamento, waveshaper, bloqueador de DC' },
          { s: 'done', en: 'Wavetable oscillator: band-limited by a mip-map, with morphing between frames and phase modulation', pt: 'Oscilador de wavetable: banda limitada por mip-map, com morphing entre quadros e modulação de fase' },
          { s: 'done', en: 'Sampler: an SFZ player (`manguebyte-sampler`): multisamples, velocity layers, round robin and random layers, loop points with crossfades, release triggers, choke groups and polyphony limits, from files or from memory, in WebAssembly too, open so that any program can play the instruments Parabolic exports. Samples are loaded whole, not streamed from disk; filters, LFOs, modulation by controllers and keyswitches are not started', pt: 'Sampler: um player de SFZ (`manguebyte-sampler`): multisamples, camadas de velocidade, round robin e camadas aleatórias, pontos de loop com crossfade, samples de release, grupos de choke e limites de polifonia, de arquivos ou da memória, também em WebAssembly, aberto para que qualquer programa toque os instrumentos que o Parabolic exportar. Os samples são carregados inteiros, não lidos do disco em fluxo; filtros, LFOs, modulação por controladores e keyswitches não foram começados' },
          { s: 'done', en: 'Polyphonic voice allocation with per-note expression and modulation, accents and legato slides', pt: 'Alocação de vozes polifônica com expressão e modulação por nota, acentos e legato' },
          { s: 'done', en: 'Instruments: physically modelled plucked strings (guitars and basses), four-operator FM, a tonewheel organ with a rotary speaker, the drums and kick bass of the classic analogue drum machine, and an acid bass; each a `Voice` with presets, measured for tuning, decay, velocity and accent', pt: 'Instrumentos: cordas dedilhadas por modelagem física (violões, guitarras e baixos), FM de quatro operadores, um órgão de tonewheel com caixa rotativa, a bateria e o bumbo-baixo da clássica bateria eletrônica analógica, e um baixo acid; cada um uma `Voice` com presets, medida em afinação, decaimento, velocidade e acento' },
          { s: 'done', en: 'Drum kits: acoustic drums and cymbals by modal synthesis, calibrated against recordings of a real snare and crash; the 909, 606, CR-78 and 808; kits for trap, techno, house, drum and bass and lo-fi', pt: 'Kits de bateria: bateria acústica e pratos por síntese modal, calibrados com gravações de uma caixa e de um prato de verdade; os 909, 606, CR-78 e 808; kits de trap, techno, house, drum and bass e lo-fi' },
          { s: 'done', en: 'Metering: loudness to ITU-R BS.1770 and EBU R 128 (checked against the EBU’s test signals), true peak, peak, RMS, VU, PPM, stereo correlation', pt: 'Medição: loudness segundo a ITU-R BS.1770 e a EBU R 128 (conferido com os sinais de teste da EBU), true peak, pico, RMS, VU, PPM, correlação estéreo' },
          { s: 'done', en: 'Pitch detection (YIN and the McLeod method) with note naming', pt: 'Detecção de altura (YIN e o método de McLeod) com o nome da nota' },
          { s: 'done', en: 'Sample-accurate events, transport and sidechain in the process call', pt: 'Eventos com precisão de amostra, transporte e sidechain na chamada de processamento' },
          { s: 'todo', en: 'SIMD-accelerated buffer operations', pt: 'Operações de buffer aceleradas por SIMD' },
        ],
      },
      {
        en: 'Formats',
        pt: 'Formatos',
        items: [
          { s: 'done', en: 'Streaming readers and writers that do not load whole files, with sample-exact seeking, RF64, and wait-free bridges for playing and recording from an audio callback', pt: 'Leitores e escritores em fluxo, que não carregam o arquivo inteiro, com busca exata até a amostra, RF64 e pontes wait-free para tocar e gravar a partir de um callback de áudio' },
          { s: 'done', en: 'AIFF and AIFF-C reading and writing', pt: 'Leitura e escrita de AIFF e AIFF-C' },
          { s: 'done', en: 'FLAC decoding', pt: 'Decodificação de FLAC' },
          { s: 'done', en: 'Recognising a file’s format from its contents', pt: 'Reconhecimento do formato pelo conteúdo do arquivo' },
          { s: 'done', en: 'Ogg Vorbis and MP3 decoding, gapless and with exact seeking', pt: 'Decodificação de Ogg Vorbis e MP3, sem lacunas e com busca exata' },
          { s: 'todo', en: 'Opus decoding', pt: 'Decodificação de Opus' },
          { s: 'done', en: 'FLAC encoding, checked against FFmpeg', pt: 'Codificação de FLAC, conferida com o FFmpeg' },
          { s: 'todo', en: 'Ogg Vorbis encoding', pt: 'Codificação de Ogg Vorbis' },
          { s: 'todo', en: 'Metadata, cue points and loop markers', pt: 'Metadados, cue points e marcadores de loop' },
        ],
      },
      {
        en: 'Networking',
        pt: 'Rede',
        items: [
          { s: 'done', en: 'Open Sound Control: codec, address patterns, UDP and TCP, and a real-time bridge that puts time-tagged bundles on their exact frame', pt: 'Open Sound Control: codec, padrões de endereço, UDP e TCP, e uma ponte de tempo real que põe os bundles com time tag no seu frame exato' },
        ],
      },
      {
        en: 'Core',
        pt: 'Núcleo',
        items: [
          { s: 'done', en: 'Parameter system: ranges, skew, text conversion, smoothing', pt: 'Sistema de parâmetros: faixas, enviesamento, conversão em texto, suavização' },
          { s: 'done', en: 'Sample-accurate parameter automation events', pt: 'Eventos de automação de parâmetro com precisão de amostra' },
          { s: 'done', en: 'Change gestures (begin and end of a user edit): a `Gesture` guard in the editor contract, sent to CLAP hosts as gesture events and to VST 3 hosts as `beginEdit`, `performEdit` and `endEdit`', pt: 'Gestos de mudança (começo e fim de uma edição do usuário): uma guarda `Gesture` no contrato de editor, enviada aos hosts CLAP como eventos de gesto e aos hosts VST 3 como `beginEdit`, `performEdit` e `endEdit`' },
          { s: 'done', en: 'Parameter state save and restore, tolerant of version changes', pt: 'Salvar e restaurar o estado dos parâmetros, com tolerância a mudanças de versão' },
          { s: 'done', en: 'Parameter descriptions as data and as JSON (range, curve, steps, names, smoothing), for editors outside Rust such as Aratu’s', pt: 'Descrições dos parâmetros como dado e como JSON (faixa, curva, passos, nomes, suavização), para editores fora do Rust, como o do Aratu' },
          { s: 'done', en: 'Denormal protection: `NoDenormals`, held by the wrappers, the standalone engine, the device streams and the test harness', pt: 'Proteção contra denormais: `NoDenormals`, mantida pelos wrappers, pelo motor standalone, pelos streams de dispositivo e pelo harness de testes' },
          { s: 'todo', en: 'Allocation checking in debug builds (today it is a test-only allocator)', pt: 'Verificação de alocação em builds de depuração (hoje é um alocador só dos testes)' },
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
          { s: 'done', en: 'CLAP: audio and note ports, sample-accurate events in, parameters, state, latency, reporting of parameter changes to the host. Checked in CI by the CLAP project’s validator', pt: 'CLAP: portas de áudio e de notas, entrada de eventos com precisão de amostra, parâmetros, estado, latência, aviso de mudanças de parâmetro ao host. Conferido no CI pelo validador do projeto CLAP' },
          { s: 'wip', en: 'CLAP `gui`, `timer-support` and `posix-fd-support` for plugins with an editor, tested through the C interface against fake editors and hosts, including `manguebyte-gui` editors in a headless window; not yet opened in a real host', pt: 'CLAP `gui`, `timer-support` e `posix-fd-support` para plugins com editor, testados pela interface C contra editores e hosts falsos, inclusive editores do `manguebyte-gui` numa janela sem tela; ainda não abertos num host de verdade' },
          { s: 'todo', en: 'CLAP extensions still to come: per-note automation, note-end and voice info, 64-bit audio, tail, presets, remote controls', pt: 'Extensões CLAP que ainda faltam: automação por nota, fim de nota e informação de vozes, áudio em 64 bits, cauda, presets, controles remotos' },
          { s: 'done', en: 'VST 3: audio and event buses, every automation point on its frame, notes with ids, tuning and note expression, the MIDI controllers a plugin declares through hidden parameters, parameters, units, state, latency. Checked in CI by Steinberg’s validator on Windows, Linux and macOS', pt: 'VST 3: barramentos de áudio e de eventos, cada ponto de automação no seu frame, notas com ids, afinação e expressão de nota, os controladores MIDI que o plugin declara por parâmetros ocultos, parâmetros, unidades, estado, latência. Conferido no CI pelo validador da Steinberg em Windows, Linux e macOS' },
          { s: 'wip', en: 'VST 3 editor interfaces: the component handler kept and used for edits, `IPlugView` with content scale, showing the editor once attached, `IPlugFrame` and `IRunLoop`, tested against fake host objects, including `manguebyte-gui` editors in a headless window; not yet opened in a real host', pt: 'Interfaces de editor do VST 3: o component handler guardado e usado nas edições, `IPlugView` com escala de conteúdo, mostrando o editor ao ser anexado, `IPlugFrame` e `IRunLoop`, testados contra objetos de host falsos, inclusive editores do `manguebyte-gui` numa janela sem tela; ainda não abertos num host de verdade' },
          { s: 'todo', en: 'VST 3 still to come: 64-bit audio, changing the bus layout, program lists', pt: 'O que ainda falta no VST 3: áudio em 64 bits, mudança do layout de barramentos, listas de programas' },
          { s: 'todo', en: 'Audio Unit (AUv2 and AUv3)', pt: 'Audio Unit (AUv2 e AUv3)' },
          { s: 'wip', en: 'LV2: audio and sidechain ports, parameters as control ports, MIDI and transport on their frames, state, latency and generated Turtle files, tested in process through the C interface; `.lv2` bundles written by `cargo mangue bundle --format lv2`, and the examples’ found and read by lilv in CI. Not yet checked by `lv2lint` or run in a host; no editor', pt: 'LV2: portas de áudio e de sidechain, parâmetros como portas de controle, MIDI e transporte nos seus frames, estado, latência e arquivos Turtle gerados, testados dentro do processo pela interface C; pacotes `.lv2` gravados por `cargo mangue bundle --format lv2`, e os dos exemplos encontrados e lidos pelo lilv no CI. Ainda não conferido pelo `lv2lint` nem rodado num host; sem editor' },
          { s: 'done', en: 'Standalone application wrapper: sound card, MIDI ports, input for effects', pt: 'Wrapper de aplicativo standalone: placa de som, portas MIDI, entrada para efeitos' },
          { s: 'wip', en: 'Tooling: `cargo mangue` bundles (CLAP, VST 3 and LV2), installs and validates plugins and creates new plugin crates from templates; macOS bundles get an ad-hoc signature and universal binaries. Signing with a real identity and notarisation are not started, and there is no LV2 validator in it', pt: 'Ferramentas: `cargo mangue` empacota (CLAP, VST 3 e LV2), instala e valida plugins e cria crates de plugin a partir de modelos; os pacotes de macOS ganham assinatura ad hoc e binários universais. Assinatura com identidade real e notarização não foram começadas, e ele não tem validador de LV2' },
        ],
      },
    ],
    en_note: 'AAX depends on a proprietary SDK and will be considered once the other formats are solid.',
    pt_note: 'O AAX depende de um SDK proprietário e será considerado quando os outros formatos estiverem sólidos.',
  },
  {
    id: 'phase-3',
    s: 'wip',
    en: { name: 'Phase 3: user interface', lead: 'An editor contract in the plugin API, rendering on the CPU first, a thin window layer of the framework’s own, and nothing claimed before its test exists.' },
    pt: { name: 'Fase 3: interface com o usuário', lead: 'Um contrato de editor na API de plugin, renderização na CPU primeiro, uma camada fina de janelas própria do framework, e nada anunciado antes de existir o teste.' },
    groups: [
      {
        items: [
          { s: 'done', en: 'Editor contract and parameter gestures in the plugin API and both wrappers, each tested through the format’s real interface against fake hosts', pt: 'Contrato de editor e gestos de parâmetro na API de plugin e nos dois wrappers, cada um testado pela interface real do formato contra hosts falsos' },
          { s: 'done', en: '2D renderer on the CPU (`manguebyte-gfx`): paths, gradients, images, clips, layers, a columns primitive for meters and spectra, damage-limited repaint that matches a full repaint bit for bit, and text with an embedded Inter subset. GPU rendering later, never the default while CI cannot test its pixels', pt: 'Renderizador 2D na CPU (`manguebyte-gfx`): caminhos, gradientes, imagens, recortes, camadas, uma primitiva de colunas para medidores e espectros, redesenho limitado ao que mudou que bate bit a bit com um redesenho completo, e texto com um subconjunto embutido da Inter. Renderização em GPU depois, nunca como padrão enquanto o CI não puder testar os seus pixels' },
          { s: 'wip', en: 'Windowing, including embedding inside a plugin host: Win32 child windows inside a host’s window and a headless backend for tests (`manguebyte-window`), and the glue that opens an editor in them (`manguebyte-gui`), tested on Windows, with two plugin binaries’ editors open in one process; macOS and Linux follow as CI proves each', pt: 'Janelas, inclusive embutidas dentro de um host de plugins: janelas filhas no Win32 dentro da janela do host e um backend sem tela para testes (`manguebyte-window`), e a ligação que abre um editor nelas (`manguebyte-gui`), testadas no Windows, com os editores de dois binários de plugin abertos num mesmo processo; macOS e Linux vêm conforme o CI comprovar cada um' },
          { s: 'wip', en: 'Editors for the example plugins: Mangue Duck’s (knobs, a bypass switch and a gain-reduction meter) and Mangue Pluck’s (a knob for each parameter), tested headless and in real Win32 windows; not yet opened in a host by hand', pt: 'Editores para os plugins de exemplo: o do Mangue Duck (knobs, chave de bypass e medidor de redução de ganho) e o do Mangue Pluck (um knob para cada parâmetro), testados sem tela e em janelas Win32 de verdade; ainda não abertos num host à mão' },
          { s: 'wip', en: 'Layout, styling and a widget set (`manguebyte-ui`): row, column and stack layout, theme tokens, label, knob, slider, toggle, meter and canvas done; text entry (a text field, and values typed into knobs and sliders, with the clipboard), popup menus with submenus, a combo box, hover and tooltips done; drag and drop, scrolling and lists not started', pt: 'Layout, estilo e um conjunto de widgets (`manguebyte-ui`): layout em linha, coluna e pilha, tokens de tema, rótulo, knob, slider, chave, medidor e canvas prontos; entrada de texto (um campo de texto, e valores digitados nos knobs e sliders, com a área de transferência), menus popup com submenus, combo box, hover e dicas prontos; arrastar e soltar, rolagem e listas não começados' },
          { s: 'todo', en: 'Audio widgets: waveform, spectrum, keyboard, envelope and EQ editors', pt: 'Widgets de áudio: forma de onda, espectro, teclado, editores de envelope e de EQ' },
          { s: 'wip', en: 'Accessibility: every widget describes itself (the method has no default) and the test harness finds widgets only that way; platform adapters not started', pt: 'Acessibilidade: cada widget se descreve (o método não tem implementação padrão) e o harness de testes só encontra widgets desse jeito; adaptadores de plataforma não começados' },
          { s: 'wip', en: 'High-DPI: scale flows from the host through the contract to the renderer, and a Win32 window takes the system’s scale when the host gives none; a change of scale while a window is open is handled but untested', pt: 'Alta densidade de pixels: a escala vem do host, passa pelo contrato e chega ao renderizador, e uma janela Win32 usa a escala do sistema quando o host não informa nenhuma; uma mudança de escala com a janela aberta é tratada, mas não testada' },
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    s: 'wip',
    en: { name: 'Phase 4: hosting and graphs', lead: 'The graph and the hosting of CLAP and VST 3 plugins are done. Scanning and hosted plugins’ editors are not started.' },
    pt: { name: 'Fase 4: hospedagem e grafos', lead: 'O grafo e a hospedagem de plugins CLAP e VST 3 estão prontos. A varredura e os editores dos plugins hospedados não foram começados.' },
    groups: [
      {
        items: [
          { s: 'done', en: 'Audio processing graph, rewired while it plays, with automatic latency compensation', pt: 'Grafo de processamento de áudio, religado enquanto toca, com compensação automática de latência' },
          { s: 'todo', en: 'Graph extras: sidechain and per-node event routing, feedback through an explicit delay, crossfaded swaps, buffer reuse', pt: 'Extras do grafo: sidechain e roteamento de eventos por nó, realimentação por um atraso explícito, trocas com crossfade, reaproveitamento de buffers' },
          { s: 'done', en: 'Hosting CLAP and VST 3 plugins as processors, through one interface for both formats, with every event on its frame', pt: 'Hospedagem de plugins CLAP e VST 3 como processadores, por uma única interface para os dois formatos, com cada evento no seu frame' },
          { s: 'todo', en: 'Plugin scanning (out of process), hosted plugins’ editors, AU and LV2', pt: 'Varredura de plugins (fora do processo), editores dos plugins hospedados, AU e LV2' },
          { s: 'todo', en: 'Transport, tempo map and timeline primitives', pt: 'Transporte, mapa de andamento e primitivas de linha do tempo' },
        ],
      },
    ],
  },
  {
    id: 'phase-5',
    s: 'wip',
    en: { name: 'Phase 5: everywhere', lead: 'The browser engine is under way; mobile and embedded targets are not started.' },
    pt: { name: 'Fase 5: em todo lugar', lead: 'O motor para o navegador está em andamento; celulares e alvos embarcados não foram começados.' },
    groups: [
      {
        items: [
          { s: 'todo', en: 'iOS and Android', pt: 'iOS e Android' },
          { s: 'wip', en: 'WebAssembly and Web Audio: `manguebyte-web`, an engine in a browser’s AudioWorklet, fed 32-byte timestamped records through a shared-memory ring, with a synth, a drum kit, an SFZ sampler, the instruments of `manguebyte-dsp`, thirteen effects and a master bus with a true-peak limiter; tested natively and in Node.js, not yet under load in a browser. [Aratu](/aratu/) plays on it', pt: 'WebAssembly e Web Audio: `manguebyte-web`, um motor no AudioWorklet de um navegador, alimentado por registros de 32 bytes com marca de tempo por um anel de memória compartilhada, com um synth, um kit de bateria, um sampler SFZ, os instrumentos do `manguebyte-dsp`, treze efeitos e um master com limitador de true peak; testado nativamente e no Node.js, ainda não sob carga num navegador. O [Aratu](/aratu/) toca sobre ele' },
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
  { module: 'juce_audio_basics', s: 'wip', crate: 'core, midi, dsp, sampler' },
  { module: 'juce_audio_devices', s: 'wip', crate: 'devices' },
  { module: 'juce_audio_formats', s: 'wip', crate: 'formats' },
  { module: 'juce_audio_processors', s: 'wip', crate: 'params, plugin, host, graph' },
  { module: 'juce_audio_processors_headless', s: 'done', crate: 'params, plugin, host, graph' },
  { module: 'juce_audio_plugin_client', s: 'wip', crate: 'clap, vst3, lv2, standalone' },
  { module: 'juce_audio_utils', s: 'todo', crate: '' },
  { module: 'juce_dsp', s: 'wip', crate: 'dsp' },
  { module: 'juce_midi_ci', s: 'todo', crate: '' },
  { module: 'juce_osc', s: 'done', crate: 'osc' },
  { module: 'juce_graphics', s: 'wip', crate: 'gfx' },
  { module: 'juce_gui_basics', s: 'wip', crate: 'ui, window, gui' },
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
