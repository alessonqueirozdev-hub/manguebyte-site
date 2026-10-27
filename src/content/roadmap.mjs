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
          { s: 'done', en: 'Hot-plug: devices and MIDI ports added and removed, the default changing and a stream’s device lost, reported by `DeviceManager` and `DeviceWatcher`, which poll (every second by default) because no backend notifies; the systems’ own change notifications are not used', pt: 'Conexão a quente: dispositivos e portas MIDI acrescentados e removidos, troca do dispositivo padrão e perda do dispositivo de um stream, informados por `DeviceManager` e `DeviceWatcher`, que fazem consulta periódica (a cada segundo, por padrão) porque nenhum backend avisa; os avisos de mudança dos próprios sistemas não são usados' },
          { s: 'done', en: 'Clock-drift compensation between duplex devices by adaptive resampling of the input', pt: 'Compensação do desvio de relógio entre dispositivos duplex por reamostragem adaptativa da entrada' },
          { s: 'done', en: 'Choosing the audio host: WASAPI, CoreAudio, ALSA and AAudio, JACK behind the `jack` feature, and ASIO by either path below. No PipeWire host of its own, and JACK has not been run on real hardware', pt: 'Escolha do host de áudio: WASAPI, CoreAudio, ALSA e AAudio, JACK atrás da feature `jack`, e ASIO por qualquer um dos dois caminhos abaixo. Sem um host próprio de PipeWire, e o JACK ainda não rodou em hardware de verdade' },
          { s: 'done', en: 'ASIO drivers, by two paths. The opt-in crate `manguebyte-pro-io` speaks to the drivers itself and runs behind the device manager through the public `AudioBackend` seam; it is under the GPLv3 because it declares Steinberg’s interface under the SDK’s GPLv3 option, and has run on three drivers on Windows x86-64. Closed-source programs use `cpal`’s own `asio` feature instead, with an SDK they license themselves', pt: 'Drivers ASIO, por dois caminhos. O crate opcional `manguebyte-pro-io` conversa diretamente com os drivers e roda por trás do gerenciador de dispositivos pela interface pública `AudioBackend`; está sob a GPLv3 porque declara a interface da Steinberg pela opção GPLv3 do SDK, e já rodou com três drivers no Windows x86-64. Programas de código fechado usam a feature `asio` do próprio `cpal`, com um SDK que eles mesmos licenciam' },
          { s: 'done', en: 'Changing devices under a running engine (`DeviceManager::start_engine`): the callback is prepared once at a fixed `EngineFormat`, and the devices change under it with a crossfade where the backend runs two streams at once, or a short faded gap where it cannot (an ASIO driver, the same device opened again, a driver’s reset request). The crossfade is proven on the headless backend only: two real outputs have not crossfaded yet', pt: 'Troca de dispositivos por baixo de um motor em execução (`DeviceManager::start_engine`): o callback é preparado uma vez só, num `EngineFormat` fixo, e os dispositivos trocam por baixo dele com um crossfade quando o backend roda dois streams ao mesmo tempo, ou com uma pausa curta com fade quando não consegue (um driver ASIO, o mesmo dispositivo aberto de novo, um pedido de reinício do driver). O crossfade só está comprovado no backend sem hardware: duas saídas de verdade ainda não fizeram crossfade' },
          { s: 'done', en: 'MIDI input and output ports, with jitter-free timing into the audio thread, and packets sent from the audio thread when their frame is heard (`midi_output_queue`, `MidiOutput`)', pt: 'Portas MIDI de entrada e de saída, com tempo sem jitter até a thread de áudio, e pacotes enviados da thread de áudio no momento em que o seu frame é ouvido (`midi_output_queue`, `MidiOutput`)' },
          { s: 'wip', en: 'MIDI output through the systems’ own Universal MIDI Packet APIs (`MidiOutput::open_with_protocol`): MIDI 2.0 packets leave unchanged through CoreMIDI’s `MIDISendEventList` on macOS and iOS and the ALSA sequencer’s UMP events on Linux, to ports that speak MIDI 2.0, with MIDI 1.0 bytes and the default translation everywhere else. Checked in CI by a loopback to the test’s own endpoints (macOS, and Linux where the runner has the sequencer), not yet with a MIDI 2.0 device. Windows still sends MIDI 1.0 through WinMM: Windows MIDI Services’ API is not reachable from the `windows` crate', pt: 'Saída de MIDI pelas APIs de Universal MIDI Packet dos próprios sistemas (`MidiOutput::open_with_protocol`): os pacotes MIDI 2.0 saem sem alteração pelo `MIDISendEventList` do CoreMIDI no macOS e no iOS e pelos eventos UMP do sequenciador ALSA no Linux, para as portas que falam MIDI 2.0, com bytes de MIDI 1.0 e a tradução padrão em todos os outros casos. Conferido no CI por um loopback até endpoints do próprio teste (no macOS, e no Linux quando o runner tem o sequenciador), ainda não com um aparelho MIDI 2.0. O Windows continua mandando MIDI 1.0 pelo WinMM: a API do Windows MIDI Services não é alcançável pelo crate `windows`' },
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
          { s: 'done', en: 'MIDI 2.0 and MPE delivered to processors as per-note events, and through the device and plugin layers: one `NoteInput` that devices, the standalone runner, the harness and every wrapper read MIDI through', pt: 'MIDI 2.0 e MPE entregues aos processadores como eventos por nota, e pelas camadas de dispositivos e de plugins: um único `NoteInput`, pelo qual os dispositivos, o executor standalone, o harness e todos os wrappers leem o MIDI' },
          { s: 'done', en: 'MIDI-CI: discovery, profiles, property exchange and process inquiry, and a device agent an application drives', pt: 'MIDI-CI: descoberta, perfis, troca de propriedades e consulta de processos, e um agente de dispositivo que o aplicativo conduz' },
          { s: 'done', en: 'MIDI 2.0 out of plugins: notes, per-note expressions and any MIDI 2.0 channel voice message, written as MIDI 2.0 packets, as MIDI 1.0 by the default translation or as MPE, and sent through CLAP, VST 3, AU (its MIDI output callback, MIDI 1.0), LV2 (the notify port, MIDI 1.0) and the standalone runner. A `manguebyte-dsp` `Processor` cannot send events by itself, and `manguebyte-host` does not read what a hosted LV2 plugin sends', pt: 'MIDI 2.0 saindo dos plugins: notas, expressões por nota e qualquer mensagem de voz de canal do MIDI 2.0, escritas como pacotes MIDI 2.0, como MIDI 1.0 pela tradução padrão ou como MPE, e enviadas pelo CLAP, pelo VST 3, pelo AU (pelo callback de saída de MIDI dele, em MIDI 1.0), pelo LV2 (pela porta notify, em MIDI 1.0) e pelo executor standalone. Um `Processor` do `manguebyte-dsp` não consegue mandar eventos sozinho, e o `manguebyte-host` não lê o que um plugin LV2 hospedado manda' },
        ],
      },
      {
        en: 'DSP',
        pt: 'DSP',
        items: [
          { s: 'done', en: 'FFT of any length, real FFT and window functions', pt: 'FFT de qualquer tamanho, FFT real e funções de janela' },
          { s: 'done', en: 'Spectrum analysis: short-time Fourier transform with any size, hop and window, ballistics, peak hold, fractional-octave bands, A and C weighting (`manguebyte-analysis`)', pt: 'Análise de espectro: transformada de Fourier de tempo curto com qualquer tamanho, salto e janela, balística, retenção de pico, bandas em frações de oitava, ponderação A e C (`manguebyte-analysis`)' },
          { s: 'done', en: 'Overlap-add resynthesis for spectral processing: an STFT processor with any transform size and hop whose windows overlap-add to a constant (others are refused), exact reconstruction, a reported latency and output independent of the host’s blocks, with a spectral gate and denoiser, a spectral freeze and a basic phase-vocoder pitch shifter built on it (`manguebyte_dsp::stft`)', pt: 'Ressíntese por overlap-add para processamento espectral: um processador de STFT com qualquer tamanho de transformada e qualquer salto cujas janelas somam uma constante no overlap-add (as outras são recusadas), reconstrução exata, latência informada e saída independente dos blocos do host, com um gate espectral que também reduz ruído, um congelamento espectral e um pitch shifter básico por phase vocoder construídos sobre ele (`manguebyte_dsp::stft`)' },
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
          { s: 'done', en: 'Acoustic instruments by physical modelling, with no samples: mallets by modal synthesis, bowed strings and winds by digital waveguide, and choirs and a solo voice by formant synthesis', pt: 'Instrumentos acústicos por modelagem física, sem samples: percussão de teclas por síntese modal, cordas de arco e sopros por guia de onda digital, e coros e uma voz solo por síntese de formantes' },
          { s: 'done', en: 'Drum kits: acoustic drums and cymbals by modal synthesis, calibrated against recordings of a real snare and crash; the 909, 606, CR-78 and 808; kits for trap, techno, house, drum and bass and lo-fi', pt: 'Kits de bateria: bateria acústica e pratos por síntese modal, calibrados com gravações de uma caixa e de um prato de verdade; os 909, 606, CR-78 e 808; kits de trap, techno, house, drum and bass e lo-fi' },
          { s: 'done', en: 'A deep polyphonic synthesiser: three band-limited oscillators with sixteen-voice unison, wavetables, sync, FM and ring modulation; two filters of fifteen models; four envelopes, three LFOs and a sixteen-slot modulation matrix; 68 presets for electronic and pop music', pt: 'Um sintetizador polifônico profundo: três osciladores com banda limitada, unison de dezesseis vozes, wavetables, sync, FM e modulação em anel; dois filtros entre quinze modelos; quatro envelopes, três LFOs e uma matriz de modulação de dezesseis posições; 68 presets para música eletrônica e pop' },
          { s: 'done', en: 'Metering: loudness to ITU-R BS.1770 and EBU R 128 (checked against the EBU’s test signals), true peak, peak, RMS, VU, PPM, stereo correlation', pt: 'Medição: loudness segundo a ITU-R BS.1770 e a EBU R 128 (conferido com os sinais de teste da EBU), true peak, pico, RMS, VU, PPM, correlação estéreo' },
          { s: 'done', en: 'Pitch detection (YIN and the McLeod method) with note naming', pt: 'Detecção de altura (YIN e o método de McLeod) com o nome da nota' },
          { s: 'done', en: 'Sample-accurate events, transport and sidechain in the process call', pt: 'Eventos com precisão de amostra, transporte e sidechain na chamada de processamento' },
          { s: 'done', en: 'SIMD-accelerated buffer operations: `manguebyte_core::vector`, with SSE2, AVX, AVX2, NEON and WebAssembly SIMD chosen at run time and the same results on every processor; used by `AudioBuffer`, the WAV reader and writer, convolution and the graph’s and browser engine’s mixing. The FFT, resampler, oversampler and filters are still scalar', pt: 'Operações de buffer aceleradas por SIMD: `manguebyte_core::vector`, com SSE2, AVX, AVX2, NEON e SIMD de WebAssembly escolhidos em tempo de execução e os mesmos resultados em qualquer processador; usadas pelo `AudioBuffer`, pelo leitor e pelo escritor de WAV, pela convolução e pela mixagem do grafo e do motor do navegador. A FFT, o reamostrador, o oversampler e os filtros continuam escalares' },
        ],
      },
      {
        en: 'Formats',
        pt: 'Formatos',
        items: [
          { s: 'done', en: 'Streaming readers and writers that do not load whole files, with sample-exact seeking, RF64, and wait-free bridges for playing and recording from an audio callback', pt: 'Leitores e escritores em fluxo, que não carregam o arquivo inteiro, com busca exata até a amostra, RF64 e pontes wait-free para tocar e gravar a partir de um callback de áudio' },
          { s: 'done', en: 'Audio sources pulled by a device callback or a graph: a transport over a streamed file (play, pause, seek, loop from any thread), audio in memory, a mixer, a sample rate converter and a channel router', pt: 'Fontes de áudio puxadas por um callback de dispositivo ou por um grafo: um transporte sobre um arquivo lido em fluxo (tocar, pausar, buscar, repetir em loop, de qualquer thread), áudio em memória, um mixer, um conversor de taxa de amostragem e um roteador de canais' },
          { s: 'done', en: 'AIFF and AIFF-C reading and writing', pt: 'Leitura e escrita de AIFF e AIFF-C' },
          { s: 'done', en: 'FLAC decoding', pt: 'Decodificação de FLAC' },
          { s: 'done', en: 'Recognising a file’s format from its contents', pt: 'Reconhecimento do formato pelo conteúdo do arquivo' },
          { s: 'done', en: 'Ogg Vorbis and MP3 decoding, with sample-exact seeking', pt: 'Decodificação de Ogg Vorbis e MP3, com busca exata até a amostra' },
          { s: 'done', en: 'Opus decoding: SILK, CELT, hybrid and multistream, gapless, with seeking', pt: 'Decodificação de Opus: SILK, CELT, híbrido e multistream, sem lacunas, com busca' },
          { s: 'done', en: 'FLAC encoding, checked against FFmpeg', pt: 'Codificação de FLAC, conferida com o FFmpeg' },
          { s: 'done', en: 'Ogg Vorbis encoding, at qualities 0 to 10', pt: 'Codificação de Ogg Vorbis, nas qualidades de 0 a 10' },
          { s: 'done', en: 'MP3 encoding: MPEG-1 layer III, constant and variable bitrate, gapless', pt: 'Codificação de MP3: MPEG-1 camada III, taxa de bits constante e variável, sem lacunas' },
          { s: 'wip', en: 'Opus encoding: CELT (music), constant and variable bitrate, frames of 2.5 to 20 ms, up to 255 channels, any input rate, gapless, with metadata; SILK and hybrid frames (speech) are still to come', pt: 'Codificação de Opus: CELT (música), taxa de bits constante e variável, quadros de 2,5 a 20 ms, até 255 canais, qualquer taxa de entrada, sem lacunas, com metadados; os quadros SILK e híbridos (fala) ainda estão por vir' },
          { s: 'done', en: 'Metadata, cue points and loop markers: one model for every format, read and written where the format allows, unknown chunks kept', pt: 'Metadados, cue points e marcadores de loop: um único modelo para todos os formatos, lido e gravado onde o formato permite, com os chunks desconhecidos preservados' },
          { s: 'done', en: 'MPEG audio layers I and II', pt: 'Áudio MPEG, camadas I e II' },
          { s: 'done', en: 'Waveform thumbnails with a cache file', pt: 'Miniaturas de forma de onda, com arquivo de cache' },
          { s: 'done', en: 'AAC, ALAC and WMA through the system’s codecs on Windows and macOS (`platform-codecs`)', pt: 'AAC, ALAC e WMA pelos codecs do sistema no Windows e no macOS (`platform-codecs`)' },
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
          { s: 'done', en: 'Parameter descriptions as data and as JSON (range, curve, steps, names, smoothing), for editors outside Rust such as Aratu’s', pt: 'Descrições dos parâmetros como dado e como JSON (faixa, curva, passos, nomes, suavização), para editores fora do Rust, como o do Aratu' },
          { s: 'done', en: 'Sample-accurate parameter automation events', pt: 'Eventos de automação de parâmetro com precisão de amostra' },
          { s: 'done', en: 'Change gestures (begin and end of a user edit): a `Gesture` guard in the editor contract, sent to CLAP hosts as gesture events and to VST 3 hosts as `beginEdit`, `performEdit` and `endEdit`', pt: 'Gestos de mudança (começo e fim de uma edição do usuário): uma guarda `Gesture` no contrato de editor, enviada aos hosts CLAP como eventos de gesto e aos hosts VST 3 como `beginEdit`, `performEdit` e `endEdit`' },
          { s: 'done', en: 'Parameter state save and restore, tolerant of version changes', pt: 'Salvar e restaurar o estado dos parâmetros, com tolerância a mudanças de versão' },
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
          { s: 'wip', en: 'CLAP `gui`, `timer-support` and `posix-fd-support` for plugins with an editor, tested through the C interface against fake editors and hosts, including `manguebyte-gui` editors in a headless window. Mangue Pluck’s CLAP editor has been opened by hand in REAPER on Windows; no other host has opened one', pt: 'CLAP `gui`, `timer-support` e `posix-fd-support` para plugins com editor, testados pela interface C contra editores e hosts falsos, inclusive editores do `manguebyte-gui` numa janela sem tela. O editor CLAP do Mangue Pluck foi aberto à mão no REAPER para Windows; nenhum outro host abriu um' },
          { s: 'done', en: 'CLAP extensions: per-note automation and modulation with the per-note-id and per-key flags of `ParamFlags::per_note`, modulation converted around the value on its frame, `voice-info`, `note-name`, `audio-ports-config` and `audio-ports-activation` from `Plugin::LAYOUTS`, 64-bit ports through the 32-bit path, and transport events inside a block, which cut it there', pt: 'Extensões CLAP: automação e modulação por nota, com as flags por id de nota e por tecla de `ParamFlags::per_note`, a modulação convertida em torno do valor no seu frame, `voice-info`, `note-name`, `audio-ports-config` e `audio-ports-activation` a partir de `Plugin::LAYOUTS`, portas de 64 bits pelo caminho de 32 bits, e eventos de transporte dentro de um bloco, que o cortam ali' },
          { s: 'todo', en: 'CLAP extensions still to come: note-end events, tail, presets (`preset-load` and the preset-discovery factory), remote controls, `render`, `thread-pool`, a native 64-bit path', pt: 'Extensões CLAP que ainda faltam: eventos de fim de nota, cauda, presets (`preset-load` e a fábrica de descoberta de presets), controles remotos, `render`, `thread-pool`, um caminho nativo de 64 bits' },
          { s: 'done', en: 'VST 3: audio and event buses, every automation point on its frame, notes with ids, tuning and note expression, the MIDI controllers a plugin declares through hidden parameters, parameters, units, state, latency. Checked in CI by Steinberg’s validator on Windows, Linux and macOS', pt: 'VST 3: barramentos de áudio e de eventos, cada ponto de automação no seu frame, notas com ids, afinação e expressão de nota, os controladores MIDI que o plugin declara por parâmetros ocultos, parâmetros, unidades, estado, latência. Conferido no CI pelo validador da Steinberg em Windows, Linux e macOS' },
          { s: 'wip', en: 'VST 3 editor interfaces: the component handler kept and used for edits, `IPlugView` with content scale, showing the editor once attached, `IPlugFrame` and `IRunLoop`, tested against fake host objects, including `manguebyte-gui` editors in a headless window; not yet opened in a real host', pt: 'Interfaces de editor do VST 3: o component handler guardado e usado nas edições, `IPlugView` com escala de conteúdo, mostrando o editor ao ser anexado, `IPlugFrame` e `IRunLoop`, testados contra objetos de host falsos, inclusive editores do `manguebyte-gui` numa janela sem tela; ainda não abertos num host de verdade' },
          { s: 'done', en: 'VST 3 64-bit audio and bus layouts: `kSample64` through the plugin’s 32-bit path, `setBusArrangements` accepting the layouts in `Plugin::LAYOUTS` and `activateBus` switching the sidechain off', pt: 'Áudio em 64 bits e layouts de barramentos no VST 3: `kSample64` pelo caminho de 32 bits do plugin, `setBusArrangements` aceitando os layouts de `Plugin::LAYOUTS` e `activateBus` desligando o sidechain' },
          { s: 'todo', en: 'VST 3 still to come: program lists, note names, a native 64-bit path', pt: 'O que ainda falta no VST 3: listas de programas, nomes de notas, um caminho nativo de 64 bits' },
          { s: 'wip', en: 'Audio Unit, version 2: `export_au!` through the plain C interface, with formats, parameters, scheduled parameters and MIDI on their frames, the host’s transport and state; `.component` bundles written and installed by `cargo mangue`; tested through its C interface on every system, and both example plugins pass Apple’s `auval` in a macOS CI job. MIDI output through `kAudioUnitProperty_MIDIOutputCallback`, and the elements’ channel counts from `Plugin::LAYOUTS`. Not yet loaded in a DAW. No editor, MIDI 2.0 output or factory presets', pt: 'Audio Unit, versão 2: `export_au!` pela interface C simples, com formatos, parâmetros, parâmetros agendados e MIDI nos seus frames, o transporte do host e o estado; pacotes `.component` gravados e instalados pelo `cargo mangue`; testado pela interface C em todos os sistemas, e os dois plugins de exemplo passam no `auval` da Apple num job de CI no macOS. Saída de MIDI por `kAudioUnitProperty_MIDIOutputCallback`, e as quantidades de canais dos elementos tiradas de `Plugin::LAYOUTS`. Ainda não carregado numa DAW. Sem editor, saída de MIDI 2.0 nem presets de fábrica' },
          { s: 'todo', en: 'Audio Unit, version 3 (app extension)', pt: 'Audio Unit, versão 3 (extensão de app)' },
          { s: 'wip', en: 'LV2: audio and sidechain ports, parameters as control ports, MIDI and transport on their frames, state, latency and generated Turtle files, tested in process through the C interface; `.lv2` bundles written by `cargo mangue bundle --format lv2`, and the examples’ found and read by lilv in CI. Not yet checked by `lv2lint` or run in any host but the framework’s own (`manguebyte-host`); MIDI output on the notify port; no editor, one fixed layout', pt: 'LV2: portas de áudio e de sidechain, parâmetros como portas de controle, MIDI e transporte nos seus frames, estado, latência e arquivos Turtle gerados, testados dentro do processo pela interface C; pacotes `.lv2` gravados por `cargo mangue bundle --format lv2`, e os dos exemplos encontrados e lidos pelo lilv no CI. Ainda não conferido pelo `lv2lint` nem rodado em nenhum host além do próprio framework (`manguebyte-host`); saída de MIDI pela porta notify; sem editor, com um layout fixo' },
          { s: 'done', en: 'Standalone application wrapper: sound card, MIDI ports in and out, input for effects', pt: 'Wrapper de aplicativo standalone: placa de som, portas MIDI de entrada e de saída, entrada para efeitos' },
          { s: 'wip', en: 'Aratu Bridge (`plugins/aratu-bridge`): an example CLAP, VST 3 and AU instrument that plays an Aratu page’s music in a DAW, in time with its transport, from the control calls and events the page sends over a local WebSocket ([docs/ARATU_BRIDGE.md](repo:docs/ARATU_BRIDGE.md)). Tried by hand once, as a CLAP in REAPER on Windows with a Chromium page on `http://127.0.0.1`; other DAWs, other browsers and `https://` pages are not tried yet. No editor, one stereo output', pt: 'Aratu Bridge (`plugins/aratu-bridge`): um instrumento de exemplo, em CLAP, VST 3 e AU, que toca numa DAW a música de uma página do Aratu, acompanhando o transporte dela, a partir das chamadas de controle e dos eventos que a página manda por um WebSocket local ([docs/ARATU_BRIDGE.md](repo:docs/ARATU_BRIDGE.md)). Experimentado à mão uma vez, como CLAP no REAPER para Windows, com uma página no Chromium em `http://127.0.0.1`; outras DAWs, outros navegadores e páginas `https://` ainda não foram testados. Sem editor, uma saída estéreo' },
          { s: 'wip', en: 'Tooling: `cargo mangue` bundles (CLAP, VST 3, LV2 and AU), installs and validates plugins and creates new plugin crates from templates; macOS bundles get an ad-hoc signature and universal binaries. Signing with a real identity and notarisation are not started, and there is no LV2 validator in it', pt: 'Ferramentas: `cargo mangue` empacota (CLAP, VST 3, LV2 e AU), instala e valida plugins e cria crates de plugin a partir de modelos; os pacotes de macOS ganham assinatura ad hoc e binários universais. Assinatura com identidade real e notarização não foram começadas, e ele não tem validador de LV2' },
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
          { s: 'done', en: '2D renderer on the CPU behind a seam (`manguebyte-gfx`): paths, gradients, images, clips, layers, a columns primitive for meters and spectra, damage-limited repaint that matches a full repaint bit for bit, and text with an embedded Inter subset. GPU rendering later, never the default while CI cannot test its pixels', pt: 'Renderizador 2D na CPU, por trás de uma interface (`manguebyte-gfx`): caminhos, gradientes, imagens, recortes, camadas, uma primitiva de colunas para medidores e espectros, redesenho limitado ao que mudou que bate bit a bit com um redesenho completo, e texto com um subconjunto embutido da Inter. Renderização em GPU depois, nunca como padrão enquanto o CI não puder testar os seus pixels' },
          { s: 'wip', en: 'Windowing, including embedding inside a plugin host: Win32 child windows inside a host’s window and a headless backend for tests (`manguebyte-window`), and the glue that opens an editor in them (`manguebyte-gui`), tested on Windows, with two plugin binaries’ editors open in one process; macOS and Linux follow as CI proves each', pt: 'Janelas, inclusive embutidas dentro de um host de plugins: janelas filhas no Win32 dentro da janela do host e um backend sem tela para testes (`manguebyte-window`), e a ligação que abre um editor nelas (`manguebyte-gui`), testadas no Windows, com os editores de dois binários de plugin abertos num mesmo processo; macOS e Linux vêm conforme o CI comprovar cada um' },
          { s: 'wip', en: 'Editors for the example plugins: Mangue Duck’s (knobs, a bypass switch and a gain-reduction meter) and Mangue Pluck’s (a knob for each parameter), tested headless and in real Win32 windows. Mangue Pluck’s CLAP editor has been opened by hand in REAPER on Windows, showing its title and knobs; working its knobs there, and Mangue Duck’s editor in a host, are not tested by hand yet', pt: 'Editores para os plugins de exemplo: o do Mangue Duck (knobs, chave de bypass e medidor de redução de ganho) e o do Mangue Pluck (um knob para cada parâmetro), testados sem tela e em janelas Win32 de verdade. O editor CLAP do Mangue Pluck foi aberto à mão no REAPER para Windows e mostrou o título e os knobs; mexer nesses knobs ali, e o editor do Mangue Duck num host, ainda não foram testados à mão' },
          { s: 'wip', en: 'Layout, styling and a widget set (`manguebyte-ui`): row, column and stack layout, theme tokens, label, knob, slider, toggle, meter and canvas done; text entry (a text field, and values typed into knobs and sliders, with the clipboard), popup menus with submenus, a combo box, hover and tooltips done; drag and drop, scrolling and lists not started', pt: 'Layout, estilo e um conjunto de widgets (`manguebyte-ui`): layout em linha, coluna e pilha, tokens de tema, rótulo, knob, slider, chave, medidor e canvas prontos; entrada de texto (um campo de texto, e valores digitados nos knobs e sliders, com a área de transferência), menus popup com submenus, combo box, hover e dicas prontos; arrastar e soltar, rolagem e listas não começados' },
          { s: 'wip', en: 'Application state with undo and redo (`manguebyte-state`, [ADR 0008](repo:docs/adr/0008-application-state.md)): a document tree with stable ids, named transactions, gestures as one step, merging by key, history limits, change journals polled instead of listeners, a mirror of the parameters that keeps host automation out of the history, the document saved with the plugin’s state as text or binary with migrations, a settings file, and snapshots handed to the audio thread without allocating. Tested, including random edit sequences undone to every earlier tree; no example plugin’s editor uses it yet, and it has not been in a DAW', pt: 'Estado do aplicativo com desfazer e refazer (`manguebyte-state`, [ADR 0008](repo:docs/adr/0008-application-state.md)): uma árvore de documento com ids estáveis, transações com nome, gestos como um passo só, junção por chave, limites de histórico, registros de mudanças consultados em vez de listeners, um espelho dos parâmetros que mantém a automação do host fora do histórico, o documento salvo com o estado do plugin, em texto ou em binário, com migrações, um arquivo de configurações, e snapshots entregues à thread de áudio sem alocar. Testado, inclusive com sequências aleatórias de edições desfeitas até cada árvore anterior; nenhum editor dos plugins de exemplo o usa ainda, e ele não passou por nenhuma DAW' },
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
    en: { name: 'Phase 4: hosting and graphs', lead: 'The graph with its sidechain, event and feedback routing, the hosting of CLAP, VST 3, LV2 and Audio Unit (version 2) plugins, plugin scanning, and a tempo map with a transport clock are done. Hosted plugins’ editors are not started.' },
    pt: { name: 'Fase 4: hospedagem e grafos', lead: 'O grafo, com o roteamento de sidechain, de eventos e de realimentação, a hospedagem de plugins CLAP, VST 3, LV2 e Audio Unit (versão 2), a varredura de plugins e um mapa de andamento com relógio de transporte estão prontos. Os editores dos plugins hospedados não foram começados.' },
    groups: [
      {
        items: [
          { s: 'done', en: 'Audio processing graph, rewired while it plays, with automatic latency compensation', pt: 'Grafo de processamento de áudio, religado enquanto toca, com compensação automática de latência' },
          { s: 'done', en: 'Graph extras: sidechain routing with buses and channels, per-node event routing (nodes that send events included), feedback through an explicit delay in frames that keeps the output independent of the block size, and latency compensation across all of them, all editable while it plays', pt: 'Extras do grafo: roteamento de sidechain com barramentos e canais, roteamento de eventos por nó (inclusive de nós que mandam eventos), realimentação por um atraso explícito em frames que mantém a saída independente do tamanho do bloco, e compensação de latência em todos eles, tudo editável enquanto toca' },
          { s: 'todo', en: 'Graph extras still to come: crossfaded swaps, buffer reuse and pruning', pt: 'Extras do grafo que ainda faltam: trocas com crossfade, reaproveitamento de buffers e poda' },
          { s: 'done', en: 'Hosting CLAP, VST 3 and LV2 plugins as processors, through one interface for all three formats, with every event on its frame; LV2 bundles read with the host’s own Turtle reader', pt: 'Hospedagem de plugins CLAP, VST 3 e LV2 como processadores, por uma única interface para os três formatos, com cada evento no seu frame; os pacotes LV2 são lidos com o leitor de Turtle do próprio host' },
          { s: 'done', en: 'Plugin scanning: the standard folders of each format, each CLAP and VST 3 file listed in a process of its own with a time limit, crashes and hangs reported, a cache keyed by path, time and size', pt: 'Varredura de plugins: as pastas padrão de cada formato, cada arquivo CLAP e VST 3 listado num processo próprio com limite de tempo, quedas e travamentos informados, e um cache indexado por caminho, data e tamanho' },
          { s: 'done', en: 'Hosting Audio Units, version 2: components found with `AudioComponentFindNext` and made with `AudioComponentInstanceNew` on macOS, or in process from a factory function anywhere; stream formats, `MaximumFramesPerSlice`, channels as `SupportedNumChannels` allows, the main input and sidechain through render callbacks, parameters with `AudioUnitScheduleParameters` and MIDI with `MusicDeviceMIDIEvent` on their frames, the host’s transport callbacks, latency, tail, `ClassInfo` state and bypass, through the one interface and the out-of-process scanner. The example plugins sound the same, bit for bit, as with no host, through their factories on every system and, installed, through AudioToolbox in the macOS CI job, where the scanner also reports a unit that crashes and one that hangs. No unit from another vendor has been hosted yet. No AUv3 as such, editors or factory presets', pt: 'Hospedagem de Audio Units, versão 2: componentes encontrados com `AudioComponentFindNext` e criados com `AudioComponentInstanceNew` no macOS, ou dentro do processo a partir de uma função de fábrica em qualquer sistema; formatos de stream, `MaximumFramesPerSlice`, canais conforme `SupportedNumChannels` permite, a entrada principal e o sidechain por callbacks de render, parâmetros com `AudioUnitScheduleParameters` e MIDI com `MusicDeviceMIDIEvent` nos seus frames, os callbacks de transporte do host, latência, cauda, estado `ClassInfo` e bypass, pela interface única e pela varredura fora do processo. Os plugins de exemplo soam igual, bit a bit, ao que soam sem host, pelas suas funções de fábrica em todos os sistemas e, instalados, pelo AudioToolbox no job de CI do macOS, onde a varredura também informa uma unidade que cai e uma que trava. Nenhuma unidade de outro fabricante foi hospedada ainda. Sem AUv3 propriamente dito, editores nem presets de fábrica' },
          { s: 'todo', en: 'Hosted plugins’ editors', pt: 'Editores dos plugins hospedados' },
          { s: 'done', en: 'Transport, tempo map and timeline primitives: a tempo map with steps, linear ramps and time signatures, exact conversions between frames, seconds, quarter notes and bars, beats and ticks, and a real-time transport clock with loops and seeking, driving the harness and the standalone runner', pt: 'Transporte, mapa de andamento e primitivas de linha do tempo: um mapa de andamento com degraus, rampas lineares e fórmulas de compasso, conversões exatas entre frames, segundos, semínimas e compassos, tempos e ticks, e um relógio de transporte em tempo real com loops e busca, que conduz o harness e o executor standalone' },
        ],
      },
    ],
  },
  {
    id: 'phase-5',
    s: 'wip',
    en: { name: 'Phase 5: everywhere', lead: 'The browser engine is under way, and the audio crates are built for iOS and Android in CI; embedded targets are not started.' },
    pt: { name: 'Fase 5: em todo lugar', lead: 'O motor para o navegador está em andamento, e os crates de áudio são compilados para iOS e Android no CI; alvos embarcados não foram começados.' },
    groups: [
      {
        items: [
          { s: 'wip', en: 'iOS and Android: the core, DSP, MIDI, formats and device crates and the facade are built in CI for `aarch64-apple-ios` and `aarch64-linux-android` (CoreAudio and CoreMIDI; AAudio and AMidi), but not run on a device; no plugin format for either', pt: 'iOS e Android: os crates core, DSP, MIDI, formatos e dispositivos e a fachada são compilados no CI para `aarch64-apple-ios` e `aarch64-linux-android` (CoreAudio e CoreMIDI; AAudio e AMidi), mas não rodaram num aparelho; nenhum formato de plugin para nenhum dos dois' },
          { s: 'wip', en: 'WebAssembly and Web Audio: `manguebyte-web`, an engine in a browser’s AudioWorklet, fed 32-byte timestamped records through a shared-memory ring, with a synth, a drum kit, an SFZ sampler, the instruments of `manguebyte-dsp` (plucked strings, FM, an organ, an 808-style kit and bass, an acid bass, drum kits with Brazilian percussion on every kit, the polyphonic synthesiser, mallets, bowed strings, winds and a choir), thirteen effects (the drive with a tube curve), a master bus with a true-peak limiter, and a scope and levels for every part; tested natively and in Node.js, its demo tried once in Chromium, not yet under load. The same engine plays in a DAW through the Aratu Bridge. Its first user is [Aratu](/aratu/)', pt: 'WebAssembly e Web Audio: `manguebyte-web`, um motor no AudioWorklet de um navegador, alimentado por registros de 32 bytes com marca de tempo por um anel de memória compartilhada, com um synth, um kit de bateria, um sampler SFZ, os instrumentos do `manguebyte-dsp` (cordas dedilhadas, FM, um órgão, uma bateria e um baixo no estilo da 808, um baixo acid, kits de bateria com percussão brasileira em todos, o sintetizador polifônico, percussão de teclas, cordas de arco, sopros e um coro), treze efeitos (o drive com uma curva de válvula), um master com limitador de true peak, e um osciloscópio e medidores de nível para cada parte; testado nativamente e no Node.js, com a demonstração experimentada uma vez no Chromium, ainda não sob carga. O mesmo motor toca numa DAW pelo Aratu Bridge. O primeiro usuário dele é o [Aratu](/aratu/)' },
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
  { module: 'juce_audio_basics', s: 'done', crate: 'core, midi, dsp, sampler' },
  { module: 'juce_audio_devices', s: 'wip', crate: 'devices' },
  { module: 'juce_audio_formats', s: 'wip', crate: 'formats' },
  { module: 'juce_audio_processors', s: 'wip', crate: 'params, plugin, host, graph' },
  { module: 'juce_audio_processors_headless', s: 'done', crate: 'params, plugin, host, graph' },
  { module: 'juce_audio_plugin_client', s: 'wip', crate: 'clap, vst3, lv2, au, standalone' },
  { module: 'juce_audio_utils', s: 'todo', crate: '' },
  { module: 'juce_dsp', s: 'wip', crate: 'dsp' },
  { module: 'juce_midi_ci', s: 'wip', crate: 'midi' },
  { module: 'juce_osc', s: 'done', crate: 'osc' },
  { module: 'juce_graphics', s: 'wip', crate: 'gfx' },
  { module: 'juce_gui_basics', s: 'wip', crate: 'ui, window, gui' },
  { module: 'juce_gui_extra', s: 'todo', crate: '' },
  { module: 'juce_animation', s: 'todo', crate: '' },
  { module: 'juce_opengl', s: 'todo', crate: '' },
  { module: 'juce_video', s: 'none', crate: '' },
  { module: 'juce_core', s: 'none', crate: 'core' },
  { module: 'juce_events', s: 'none', crate: '' },
  { module: 'juce_data_structures', s: 'done', crate: 'state' },
  { module: 'juce_cryptography', s: 'none', crate: '' },
  { module: 'juce_javascript', s: 'none', crate: '' },
  { module: 'juce_box2d', s: 'none', crate: '' },
  { module: 'juce_analytics', s: 'none', crate: '' },
  { module: 'juce_product_unlocking', s: 'none', crate: '' },
];
