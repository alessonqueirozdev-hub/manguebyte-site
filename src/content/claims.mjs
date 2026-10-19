// Where Manguebyte goes beyond JUCE.
//
// This follows docs/BEYOND_JUCE.md in the framework's repository, section by
// section. Every claim keeps the five parts that page gives it: the problem,
// what JUCE does, what Manguebyte does, how to check it, and its limit.
// `proofs` are keys of sources.mjs; they become the "checked by" links.
//
// When BEYOND_JUCE.md changes, change this file to match, in both languages.

export const juceVersion = '9.0.4';

export const claims = [
  {
    id: 'automation',
    proofs: ['automation-harness', 'automation-clap', 'automation-vst3', 'automation-vst3-controller'],
    sample: 'test-automation',
    en: {
      title: 'Automation on the exact sample',
      row: 'Automation timing',
      juceShort: 'Per block in `AudioProcessor`',
      mangueShort: 'On the exact sample',
      problem:
        'A host records automation with sample positions. If a plugin only learns the value once per block, a change that should happen on frame 300 of a 512-frame block is applied on frame 0 or frame 512 instead. Fast automation turns into steps, and the size of the steps depends on the host’s buffer setting.',
      juce:
        '`AudioProcessor::processBlock` receives audio and a MIDI buffer. Parameter changes are not part of the call; a processor reads each parameter’s current value, which the host updates between blocks. In May 2026 a member of the JUCE team said sample-accurate automation would not be ready for the first release of JUCE 9 ([forum thread](https://forum.juce.com/t/sample-accurate-parameter-automation/68800)).',
      mangue:
        'The process call carries an `EventBuffer` in which every parameter change has the frame it falls on. `split_at_events` renders up to each event, applies it, and continues, using `AudioBuffer::windowed` to narrow the buffer in place. Nothing is copied or allocated.',
      check: [
        '[automation_lands_on_its_exact_frame_and_updates_the_parameter](proof:automation-harness) schedules changes on frames 100, 101 and 250 and asserts the output sample by sample. [automation_lands_on_its_frame_when_processing_in_place](proof:automation-clap) does the same through the CLAP C interface, and [a test of the same name](proof:automation-vst3) does it through VST 3, where a host sends a queue of points per parameter and every point is delivered. (JUCE’s VST3 wrapper applies the last point of each queue: `processParameterChanges` in `juce_audio_plugin_client_VST3.cpp`.)',
        'VST 3 adds a trap of its own. A host reports each change twice: to the processor with a frame number, and to the controller on the main thread so that an editor can follow. If the controller’s copy is stored into the parameter, the plugin jumps to a value that is slightly early or late until the next point corrects it. While blocks are running, Manguebyte’s wrapper keeps the controller’s copy for display only; [what_the_controller_is_told_does_not_disturb_running_automation](proof:automation-vst3-controller) checks it.',
      ],
      limit:
        'The framework delivers the timing; a processor chooses whether to use it. Reading a parameter once per block remains valid and is cheaper. The example instrument follows events for its voices and reads its reverb mix and output level once per block, with smoothing.',
    },
    pt: {
      title: 'Automação na amostra exata',
      row: 'Tempo da automação',
      juceShort: 'Por bloco, em `AudioProcessor`',
      mangueShort: 'Na amostra exata',
      problem:
        'O host grava a automação com a posição de cada amostra. Se o plugin só fica sabendo do valor uma vez por bloco, uma mudança que deveria acontecer no frame 300 de um bloco de 512 é aplicada no frame 0 ou no 512. Automação rápida vira degraus, e o tamanho dos degraus depende do buffer configurado no host.',
      juce:
        '`AudioProcessor::processBlock` recebe o áudio e um buffer de MIDI. As mudanças de parâmetro não fazem parte da chamada; o processador lê o valor atual de cada parâmetro, que o host atualiza entre um bloco e outro. Em maio de 2026, um membro da equipe do JUCE disse que a automação com precisão de amostra não ficaria pronta para o primeiro lançamento do JUCE 9 ([tópico no fórum](https://forum.juce.com/t/sample-accurate-parameter-automation/68800)).',
      mangue:
        'A chamada de processamento traz um `EventBuffer` em que cada mudança de parâmetro tem o frame em que cai. `split_at_events` renderiza até cada evento, aplica-o e continua, usando `AudioBuffer::windowed` para estreitar o buffer no próprio lugar. Nada é copiado nem alocado.',
      check: [
        '[automation_lands_on_its_exact_frame_and_updates_the_parameter](proof:automation-harness) agenda mudanças nos frames 100, 101 e 250 e confere a saída amostra por amostra. [automation_lands_on_its_frame_when_processing_in_place](proof:automation-clap) faz o mesmo pela interface C do CLAP, e [um teste de mesmo nome](proof:automation-vst3) faz pelo VST 3, em que o host envia uma fila de pontos por parâmetro e todos os pontos são entregues. (O wrapper VST3 do JUCE aplica o último ponto de cada fila: `processParameterChanges` em `juce_audio_plugin_client_VST3.cpp`.)',
        'O VST 3 tem uma armadilha própria. O host informa cada mudança duas vezes: ao processador, com o número do frame, e ao controlador, na thread principal, para que um editor possa acompanhar. Se a cópia do controlador for gravada no parâmetro, o plugin salta para um valor um pouco adiantado ou atrasado até o ponto seguinte corrigir. Enquanto os blocos estão rodando, o wrapper do Manguebyte guarda a cópia do controlador só para exibição; [what_the_controller_is_told_does_not_disturb_running_automation](proof:automation-vst3-controller) confere isso.',
      ],
      limit:
        'O framework entrega o tempo certo; cabe ao processador usá-lo ou não. Ler um parâmetro uma vez por bloco continua válido e custa menos. O instrumento de exemplo segue os eventos nas vozes e lê a mistura do reverb e o nível de saída uma vez por bloco, com suavização.',
    },
  },

  {
    id: 'block-size',
    proofs: ['block-size', 'block-size-pluck', 'block-size-duck'],
    sample: 'test-block-size',
    en: {
      title: 'The sound does not depend on the host’s block size',
      row: 'Block size and sound',
      juceShort: 'Left to each plugin',
      mangueShort: 'Bit-identical across block sizes, tested',
      problem:
        'Hosts hand plugins blocks of different lengths, and some change the length on every call. If anything in a plugin is tied to block boundaries, the same project sounds slightly different at 64 and at 1024 samples, and an offline bounce differs from what was heard while mixing.',
      juce:
        'Nothing in the framework prevents or tests this. It is up to each plugin author to split blocks at events by hand and to notice when something depends on the block length.',
      mangue:
        'Because events carry their frame and the synth resets a voice before every fresh note, the output is a function of the timeline and not of how it was cut up. This is tested rather than assumed.',
      check: [
        '[the_song_is_the_same_whatever_the_block_size](proof:block-size) renders a polyphonic song with effects and automation six ways: 64, 256, 997 and 1024 frames, an irregular pattern of `1, 511, 7, 300, 64, 2, 129`, and blocks larger than the instrument’s own maximum. The results must be equal bit for bit. Both example plugins have the same test: [the instrument](proof:block-size-pluck) and [the effect](proof:block-size-duck).',
        'The first time this test ran, it failed. A voice that had finished in the middle of a block kept advancing until the end of it, so the next note started from a state that depended on the block length. The test exists to find exactly that, and the fix is part of the `Voice` contract.',
      ],
      limit:
        'The guarantee covers what follows events. A value that a processor reads once per block changes at block boundaries by definition. And a real host found a gap the tests had not: in REAPER 7.82, two offline renders of the example instrument with many voices overlapping differed by one unit in the last place of a 32-bit float, about 134 dB below the signal. The cause was in how `Synth` chose a free voice, and [it is fixed](proof:reaper-render); the renders have not yet been compared again in REAPER with the new build ([TECH_DEBT 56](proof:reaper-owed)).',
    },
    pt: {
      title: 'O som não depende do tamanho de bloco do host',
      row: 'Tamanho do bloco e som',
      juceShort: 'Fica por conta de cada plugin',
      mangueShort: 'Idêntico bit a bit em qualquer tamanho de bloco, com teste',
      problem:
        'Os hosts entregam blocos de tamanhos diferentes, e alguns mudam o tamanho a cada chamada. Se alguma coisa no plugin estiver presa às bordas do bloco, o mesmo projeto soa um pouco diferente com 64 e com 1024 amostras, e o bounce offline sai diferente do que se ouviu na mixagem.',
      juce:
        'Nada no framework impede nem testa isso. Cabe a cada autor de plugin dividir os blocos nos eventos à mão e perceber quando alguma coisa depende do tamanho do bloco.',
      mangue:
        'Como os eventos trazem o seu frame e o sintetizador reinicia a voz antes de cada nota nova, a saída é função da linha do tempo, e não de como ela foi fatiada. Isso é testado, não presumido.',
      check: [
        '[the_song_is_the_same_whatever_the_block_size](proof:block-size) renderiza uma música polifônica, com efeitos e automação, de seis maneiras: 64, 256, 997 e 1024 frames, um padrão irregular de `1, 511, 7, 300, 64, 2, 129` e blocos maiores que o máximo do próprio instrumento. Os resultados têm de ser iguais bit a bit. Os dois plugins de exemplo têm o mesmo teste: [o instrumento](proof:block-size-pluck) e [o efeito](proof:block-size-duck).',
        'Na primeira vez em que rodou, o teste falhou. Uma voz que terminava no meio de um bloco continuava avançando até o fim dele, de modo que a nota seguinte partia de um estado que dependia do tamanho do bloco. O teste existe para achar exatamente isso, e a correção faz parte do contrato de `Voice`.',
      ],
      limit:
        'A garantia cobre o que segue os eventos. Um valor que o processador lê uma vez por bloco muda nas bordas do bloco, por definição. E um host de verdade achou uma brecha que os testes não tinham achado: no REAPER 7.82, dois renders offline do instrumento de exemplo, com muitas vozes sobrepostas, diferiram em uma unidade na última casa de um float de 32 bits, cerca de 134 dB abaixo do sinal. A causa estava em como o `Synth` escolhia uma voz livre, e [foi corrigida](proof:reaper-render); os renders ainda não foram comparados de novo no REAPER com a nova build ([TECH_DEBT 56](proof:reaper-owed)).',
    },
  },

  {
    id: 'events',
    proofs: ['outside-changes'],
    en: {
      title: 'Every parameter change reaches the plugin as an event',
      row: 'Changes from a UI or a restored state',
      juceShort: 'Seen by polling, or by listeners that may run on the audio thread',
      mangueShort: 'Delivered as events in the same stream as automation',
      problem:
        'Host automation is not the only thing that changes a parameter. A user turns a knob in the plugin’s own window, or the host restores a saved state. Those writes do not arrive through the host’s event list, so a plugin that tracks a value from events alone never hears about them.',
      juce:
        'A processor finds out by polling the parameter, or through a listener. Parameter listeners are called synchronously on whichever thread made the change, which during host automation is the audio thread, and the framework’s attachment classes respond by posting to the operating system’s message queue, which takes a lock ([forum thread](https://forum.juce.com/t/apvts-updates-thread-realtime-safety/36928), [bug report](https://forum.juce.com/t/bug-report-asyncupdater-for-real-time-use-in-parameterattachment/50645)).',
      mangue:
        'There are no listeners. Before each block, `ParamWatcher` compares every parameter with the value the plugin last saw and adds an event on frame 0 for each one that differs, ahead of the host’s own events. The event stream is therefore complete: a plugin that follows it never needs to poll, and no user code runs as a side effect of a write.',
      check: [
        '[changes_made_outside_the_host_reach_the_plugin_as_events](proof:outside-changes) uses a test plugin that never reads its parameter, only events. It passes for a direct write, for a restored state, and for host automation on the same frame, which takes precedence.',
      ],
      limit:
        'The plugin receives the *latest* value of each changed parameter at the start of the next block. If a knob is moved through ten values between two blocks, the plugin sees the tenth, not all ten. That is the intended behaviour for a control, and it is why a plugin that wants no steps smooths the value.',
    },
    pt: {
      title: 'Toda mudança de parâmetro chega ao plugin como evento',
      row: 'Mudanças vindas da interface ou de um estado restaurado',
      juceShort: 'Vistas por consulta periódica, ou por listeners que podem rodar na thread de áudio',
      mangueShort: 'Entregues como eventos, no mesmo fluxo da automação',
      problem:
        'A automação do host não é a única coisa que muda um parâmetro. O usuário gira um botão na janela do próprio plugin, ou o host restaura um estado salvo. Essas escritas não chegam pela lista de eventos do host, então um plugin que acompanha o valor só pelos eventos nunca fica sabendo delas.',
      juce:
        'O processador descobre consultando o parâmetro, ou por meio de um listener. Os listeners de parâmetro são chamados de forma síncrona na thread que fez a mudança, que durante a automação do host é a thread de áudio, e as classes de attachment do framework respondem postando na fila de mensagens do sistema operacional, o que toma um lock ([tópico no fórum](https://forum.juce.com/t/apvts-updates-thread-realtime-safety/36928), [relato de bug](https://forum.juce.com/t/bug-report-asyncupdater-for-real-time-use-in-parameterattachment/50645)).',
      mangue:
        'Não existem listeners. Antes de cada bloco, `ParamWatcher` compara cada parâmetro com o valor que o plugin viu por último e acrescenta um evento no frame 0 para cada um que mudou, antes dos eventos do próprio host. O fluxo de eventos fica, assim, completo: o plugin que o segue nunca precisa consultar nada, e nenhum código do usuário roda como efeito colateral de uma escrita.',
      check: [
        '[changes_made_outside_the_host_reach_the_plugin_as_events](proof:outside-changes) usa um plugin de teste que nunca lê o seu parâmetro, só os eventos. Ele passa para uma escrita direta, para um estado restaurado e para automação do host no mesmo frame, que tem precedência.',
      ],
      limit:
        'O plugin recebe o valor *mais recente* de cada parâmetro alterado no começo do bloco seguinte. Se um botão passa por dez valores entre dois blocos, o plugin vê o décimo, não os dez. É o comportamento esperado de um controle, e é por isso que o plugin que não quer degraus suaviza o valor.',
    },
  },

  {
    id: 'real-time',
    proofs: ['no-heap', 'no-heap-synth', 'no-heap-guard', 'no-heap-clap', 'ci-miri'],
    sample: 'test-no-heap',
    en: {
      title: 'Real-time safety is tested, not promised',
      row: 'Real-time safety',
      juceShort: 'A convention',
      mangueShort: 'A heap call while processing fails CI',
      problem:
        'Code on the audio thread must not allocate or free memory: the allocator can take a lock or ask the operating system for pages, and either can outlast the few milliseconds a block has. One stray allocation is an audible dropout that appears only under load.',
      juce:
        'Real-time safety is a rule in the documentation. The framework does not check user code against it, and its own parameter attachments break it, as described in the previous section.',
      mangue:
        'The test suite replaces the global allocator with one that counts. Any allocation, reallocation or free made while a processor is processing fails the test, and so fails CI. The same guard wraps the CLAP wrapper’s `process` call, measured from the host’s side of the C interface.',
      check: [
        '[processors_do_not_use_the_heap](proof:no-heap) and its neighbours cover every processor, the FFT, [a synth handling more notes than it has voices](proof:no-heap-synth), and parameter changes made while running. [A test of the guard itself](proof:no-heap-guard) makes sure it would notice. Through the CLAP interface, [`heap_calls` must be zero](proof:no-heap-clap) for automation, notes, changes reported to the host and the block after a state restore.',
        'The guard has already earned its place. On macOS it reported one heap call inside `process`: a test plugin was recording a value through a standard mutex, which on that platform allocates the first time it is locked.',
      ],
      limit:
        'This is a test that runs, not a property the compiler proves. It catches heap use on the paths the tests exercise, and it does not detect a lock that never allocates. Checking this at compile time is a goal listed in the roadmap; Rust has no stable way to express it yet. The `unsafe` code that handles memory (the wait-free queue and the two plugin wrappers) is additionally [run under Miri](proof:ci-miri), which found and led to the fix of an invalid pointer in the CLAP wrapper.',
    },
    pt: {
      title: 'Segurança em tempo real é testada, não prometida',
      row: 'Segurança em tempo real',
      juceShort: 'Uma convenção',
      mangueShort: 'Uma chamada ao heap durante o processamento faz o CI falhar',
      problem:
        'O código da thread de áudio não pode alocar nem liberar memória: o alocador pode tomar um lock ou pedir páginas ao sistema operacional, e qualquer um dos dois pode durar mais que os poucos milissegundos de um bloco. Uma alocação perdida é um estalo audível que só aparece sob carga.',
      juce:
        'A segurança em tempo real é uma regra da documentação. O framework não confere o código do usuário contra ela, e os seus próprios attachments de parâmetro a quebram, como descrito na seção anterior.',
      mangue:
        'A suíte de testes troca o alocador global por um que conta. Qualquer alocação, realocação ou liberação feita enquanto um processador está processando faz o teste falhar e, com ele, o CI. A mesma guarda envolve a chamada `process` do wrapper CLAP, medida do lado do host na interface C.',
      check: [
        '[processors_do_not_use_the_heap](proof:no-heap) e os testes vizinhos cobrem todos os processadores, a FFT, [um sintetizador recebendo mais notas do que tem vozes](proof:no-heap-synth) e mudanças de parâmetro feitas durante a execução. [Um teste da própria guarda](proof:no-heap-guard) garante que ela perceberia. Pela interface do CLAP, [`heap_calls` tem de ser zero](proof:no-heap-clap) para automação, notas, mudanças informadas ao host e o bloco seguinte a uma restauração de estado.',
        'A guarda já se pagou. No macOS ela acusou uma chamada ao heap dentro de `process`: um plugin de teste gravava um valor por meio de um mutex padrão, que nessa plataforma aloca na primeira vez em que é travado.',
      ],
      limit:
        'Isto é um teste que roda, não uma propriedade que o compilador prova. Ele pega uso do heap nos caminhos que os testes exercitam e não detecta um lock que nunca aloca. Verificar isso em tempo de compilação é uma meta do roadmap; o Rust ainda não tem um jeito estável de expressar isso. O código `unsafe` que lida com memória (a fila wait-free e os dois wrappers de plugin) também [roda sob o Miri](proof:ci-miri), que encontrou um ponteiro inválido no wrapper CLAP e levou à correção.',
    },
  },

  {
    id: 'per-note',
    proofs: ['per-note', 'per-note-mpe', 'per-note-overlap', 'per-note-clap', 'per-note-clap-mpe'],
    en: {
      title: 'Per-note expression and modulation',
      row: 'Per-note control',
      juceShort: 'Through MPE channels',
      mangueShort: 'Per-note expression and modulation events, which MPE and MIDI 2.0 arrive as too',
      problem:
        'Bending, swelling or filtering one note of a chord needs a way to address that note. So does a host’s modulation system that wants to move a parameter for one voice without overwriting the value the user set.',
      juce:
        'Per-note control is available through MPE, which gives each note its own MIDI channel. The processor model has no note expression events and no modulation distinct from changing a parameter’s value, which is why the third-party CLAP wrapper adds its own extension interfaces for them ([clap-juce-extensions](https://github.com/free-audio/clap-juce-extensions)).',
      mangue: [
        'Notes have an identity (`NoteRef`: channel, key and an optional id), so two notes on the same key can overlap. `NoteExpression` shapes one note. `ParamModulation` adds an offset on top of a parameter, optionally for a single note, and never changes the stored value, so it cannot fight automation or end up in a saved preset. `Synth` routes each to the voice that is playing the note.',
        'MPE and MIDI 2.0 arrive as the same events. One converter, `dsp::note_input::NoteInput`, reads the MIDI of every device input, the standalone runner, the test harness and the CLAP, VST 3 and LV2 wrappers. A note of an MPE zone gets an identifier and is reported on the zone’s master channel, and its member channel’s pitch bend, pressure and controller 74 become its tuning, pressure and brightness; MIDI 2.0’s per-note pitch bend, pressure, pitch attributes and registered per-note controllers do the same. MIDI 1.0 values are widened with the specification’s own method first, so an MPE stream and the MIDI 2.0 stream that says the same thing give identical events, bit for bit. A plugin says in `Plugin::MPE` whether it expects zones from the start.',
      ],
      check: [
        '[expression_and_modulation_reach_one_note_and_parameters_reach_all](proof:per-note) and [notes_with_identifiers_overlap_on_one_key_and_end_separately](proof:per-note-overlap) in the synth; [an_instrument_takes_notes_expression_modulation_and_a_sidechain](proof:per-note-clap) does it through CLAP.',
        '[an_mpe_stream_and_the_same_midi_2_stream_give_identical_events](proof:per-note-mpe) in `note_input.rs`; [clap_notes_mpe_and_midi_2_end_in_the_same_events](proof:per-note-clap-mpe), in the CLAP wrapper’s tests, plays one phrase as CLAP notes, as MPE and as MIDI 2.0 packets and requires the same output from all three, with no heap use.',
      ],
      limit:
        'Per-note *automation* from a CLAP host is not accepted yet. A `Processor` reads MIDI 2.0 but cannot write it by itself; a plugin can send notes, expressions and MIDI 2.0 out through CLAP, VST 3 and the standalone runner ([CLAP](proof:midi-out-clap), [VST 3](proof:midi-out-vst3), [standalone](proof:midi-out-standalone)), though no MIDI port uses the systems’ own MIDI 2.0 interfaces yet ([TECH_DEBT 82](proof:midi-out-debt)). Per-note controllers with no expression to become (modulation, breath, the assignable ones) are dropped, and channel-wide MIDI 2.0 messages reach the processor at MIDI 1.0 resolution ([TECH_DEBT 76](proof:per-note-debt)).',
    },
    pt: {
      title: 'Expressão e modulação por nota',
      row: 'Controle por nota',
      juceShort: 'Por canais MPE',
      mangueShort: 'Eventos de expressão e de modulação por nota, que é como chegam também o MPE e o MIDI 2.0',
      problem:
        'Fazer bend, crescer ou filtrar uma só nota de um acorde exige um jeito de endereçar essa nota. O mesmo vale para o sistema de modulação de um host que queira mover um parâmetro em uma voz sem sobrescrever o valor que o usuário definiu.',
      juce:
        'O controle por nota existe por meio do MPE, que dá a cada nota um canal MIDI próprio. O modelo de processador não tem eventos de expressão de nota nem modulação distinta de mudar o valor de um parâmetro, e é por isso que o wrapper CLAP de terceiros acrescenta interfaces de extensão próprias para isso ([clap-juce-extensions](https://github.com/free-audio/clap-juce-extensions)).',
      mangue: [
        'As notas têm identidade (`NoteRef`: canal, tecla e um id opcional), então duas notas na mesma tecla podem se sobrepor. `NoteExpression` molda uma nota. `ParamModulation` soma um deslocamento a um parâmetro, opcionalmente para uma única nota, e nunca muda o valor guardado; por isso não briga com a automação nem vai parar num preset salvo. `Synth` encaminha cada um à voz que está tocando a nota.',
        'O MPE e o MIDI 2.0 chegam como esses mesmos eventos. Um único conversor, `dsp::note_input::NoteInput`, lê o MIDI de todas as entradas de dispositivo, do executor standalone, do harness de testes e dos wrappers CLAP, VST 3 e LV2. Uma nota de uma zona MPE ganha um identificador e é informada no canal mestre da zona, e o pitch bend, a pressão e o controlador 74 do seu canal membro viram a afinação, a pressão e o brilho dela; o pitch bend por nota, a pressão, os atributos de altura e os controladores por nota registrados do MIDI 2.0 seguem o mesmo caminho. Os valores do MIDI 1.0 são antes ampliados pelo método da própria especificação, de modo que um fluxo MPE e o fluxo MIDI 2.0 que diz a mesma coisa geram eventos idênticos, bit a bit. O plugin diz em `Plugin::MPE` se espera zonas desde o começo.',
      ],
      check: [
        '[expression_and_modulation_reach_one_note_and_parameters_reach_all](proof:per-note) e [notes_with_identifiers_overlap_on_one_key_and_end_separately](proof:per-note-overlap) no sintetizador; [an_instrument_takes_notes_expression_modulation_and_a_sidechain](proof:per-note-clap) faz o mesmo pelo CLAP.',
        '[an_mpe_stream_and_the_same_midi_2_stream_give_identical_events](proof:per-note-mpe), em `note_input.rs`; [clap_notes_mpe_and_midi_2_end_in_the_same_events](proof:per-note-clap-mpe), nos testes do wrapper CLAP, toca uma mesma frase como notas CLAP, como MPE e como pacotes MIDI 2.0 e exige a mesma saída das três, sem uso do heap.',
      ],
      limit:
        'A *automação* por nota vinda de um host CLAP ainda não é aceita. Um `Processor` lê MIDI 2.0, mas não consegue escrevê-lo sozinho; já um plugin consegue mandar notas, expressões e MIDI 2.0 para fora pelo CLAP, pelo VST 3 e pelo executor standalone ([CLAP](proof:midi-out-clap), [VST 3](proof:midi-out-vst3), [standalone](proof:midi-out-standalone)), embora nenhuma porta MIDI use ainda as interfaces de MIDI 2.0 dos próprios sistemas ([TECH_DEBT 82](proof:midi-out-debt)). Controladores por nota que não têm uma expressão em que se transformar (modulação, sopro, os atribuíveis) são descartados, e as mensagens MIDI 2.0 que valem para o canal inteiro chegam ao processador com a resolução do MIDI 1.0 ([TECH_DEBT 76](proof:per-note-debt)).',
    },
  },

  {
    id: 'clap',
    proofs: ['ci-clap', 'export-duck', 'ci-cli'],
    en: {
      title: 'Native CLAP',
      row: 'CLAP',
      juceShort: 'Not available natively',
      mangueShort: 'Native, passes `clap-validator`',
      juce:
        'Building CLAP plugins is not supported natively. The plugin client module covers VST, VST3, AU, AUv3, LV2 and AAX. CLAP was listed for JUCE 9 in the 2024 roadmap and is not in the 9.0.x releases; the route today is the unofficial `clap-juce-extensions`.',
      mangue:
        '`export_clap!(MyPlugin)` is the whole integration. CLAP’s event model is the one this framework is built on, so nothing is approximated on the way in.',
      check: [
        '[The CI job](proof:ci-clap) builds both example plugins and runs the CLAP project’s own [clap-validator](https://github.com/free-audio/clap-validator) on them, failing on any failed test. At the commit this site was written against, the validator ran 44 tests on each: the instrument passed 35 and skipped 9, the effect passed 33 and skipped 11, and neither failed any. The skipped tests are for things the plugins do not have yet: preset discovery (3 tests), 64-bit audio (2) and the extensions that let a host reconfigure the audio ports (3). The instrument also skips a test that feeds it audio, because it has no audio input, and the effect skips the three note tests, because it takes no notes.',
        '`cargo mangue bundle` writes the `.clap` beside the `.vst3` in each system’s layout, and `cargo mangue validate` runs the CLAP project’s validator on it as well as Steinberg’s on the `.vst3`; [a CI job](proof:ci-cli) runs the tool end to end on Windows, Linux and macOS. JUCE’s [juce_add_plugin](https://raw.githubusercontent.com/juce-framework/JUCE/master/docs/CMake%20API.md) accepts no CLAP format.',
      ],
      limit:
        'The `gui` extension is tested through the C interface against fake editors and hosts, and the example plugins’ editors open in Win32 windows in CI; windows on macOS and Linux come later. By hand, one editor has been opened inside a DAW: Mangue Pluck’s, as a CLAP in REAPER on Windows, where it showed its title and knobs; working its knobs there has not been tested ([HOST_TESTS.md](proof:host-tests-19)). No 64-bit audio, no presets. Besides VST 3 there are LV2, which lilv loads in CI but no host but the framework’s own has run yet, and Audio Units (version 2), whose example plugins pass Apple’s `auval` in [a macOS CI job](proof:ci-au); JUCE’s AUv3 and AAX support has no counterpart here yet. Both example plugins were also loaded and tested by hand in REAPER before they had editors; see [HOST_TESTS.md](proof:host-tests).',
    },
    pt: {
      title: 'CLAP nativo',
      row: 'CLAP',
      juceShort: 'Não existe de forma nativa',
      mangueShort: 'Nativo, passa no `clap-validator`',
      juce:
        'Gerar plugins CLAP não tem suporte nativo. O módulo de cliente de plugin cobre VST, VST3, AU, AUv3, LV2 e AAX. O CLAP constava para o JUCE 9 no roadmap de 2024 e não está nas versões 9.0.x; o caminho hoje é o `clap-juce-extensions`, não oficial.',
      mangue:
        '`export_clap!(MyPlugin)` é a integração inteira. O modelo de eventos do CLAP é o mesmo sobre o qual este framework foi construído, então nada é aproximado na entrada.',
      check: [
        '[O job de CI](proof:ci-clap) compila os dois plugins de exemplo e roda neles o [clap-validator](https://github.com/free-audio/clap-validator), do próprio projeto CLAP, e falha diante de qualquer teste reprovado. No commit em que este site foi escrito, o validador rodou 44 testes em cada um: o instrumento passou em 35 e pulou 9, o efeito passou em 33 e pulou 11, e nenhum dos dois falhou em algum. Os testes pulados são de coisas que os plugins ainda não têm: descoberta de presets (3 testes), áudio em 64 bits (2) e as extensões que deixam o host reconfigurar as portas de áudio (3). O instrumento também pula um teste que lhe envia áudio, porque não tem entrada de áudio, e o efeito pula os três testes de notas, porque não recebe notas.',
        '`cargo mangue bundle` grava o `.clap` ao lado do `.vst3`, no layout de cada sistema, e `cargo mangue validate` roda nele o validador do projeto CLAP e, no `.vst3`, o da Steinberg; [um job de CI](proof:ci-cli) roda a ferramenta de ponta a ponta em Windows, Linux e macOS. O [juce_add_plugin](https://raw.githubusercontent.com/juce-framework/JUCE/master/docs/CMake%20API.md) do JUCE não aceita o formato CLAP.',
      ],
      limit:
        'A extensão `gui` é testada pela interface C contra editores e hosts falsos, e os editores dos plugins de exemplo abrem em janelas Win32 no CI; janelas em macOS e Linux vêm depois. À mão, um editor já foi aberto dentro de uma DAW: o do Mangue Pluck, como CLAP, no REAPER para Windows, onde mostrou o título e os knobs; mexer nesses knobs ali ainda não foi testado ([HOST_TESTS.md](proof:host-tests-19)). Sem áudio em 64 bits e sem presets. Além do VST 3 há o LV2, que o lilv carrega no CI mas que nenhum host além do próprio framework rodou ainda, e o Audio Unit (versão 2), cujos plugins de exemplo passam no `auval` da Apple [num job de CI no macOS](proof:ci-au); o suporte do JUCE a AUv3 e AAX ainda não tem equivalente aqui. Os dois plugins de exemplo também foram carregados e testados à mão no REAPER antes de terem editores; veja o [HOST_TESTS.md](proof:host-tests).',
    },
  },

  {
    id: 'harness',
    proofs: ['harness-pitch', 'harness-duck', 'block-size-pluck'],
    sample: 'test-pitch',
    en: {
      title: 'A plugin can be tested without a host',
      row: 'Testing a plugin',
      juceShort: 'Needs a host or a hand-built rig',
      mangueShort: 'In a unit test, with `Harness`',
      juce:
        'Exercising a plugin’s audio path needs a host, or a test rig the author builds around `AudioProcessor`.',
      mangue:
        '`Harness` is that rig. It prepares the plugin, schedules notes and automation on a timeline, cuts time into any pattern of block sizes, keeps a transport moving and saves and restores state. The plugin’s sound becomes something an ordinary unit test can assert, on a CI machine with no sound card.',
      check: [
        'The example instrument’s tests check that it is silent until played, that it [plays the pitch it is asked for](proof:harness-pitch) (by FFT), that automation and per-note modulation change the sound, that state round-trips, and that the output is [independent of block size](proof:block-size-pluck). The example effect’s tests [feed its sidechain](proof:harness-duck) the same way.',
      ],
    },
    pt: {
      title: 'Um plugin pode ser testado sem host',
      row: 'Testar um plugin',
      juceShort: 'Precisa de um host ou de uma bancada feita à mão',
      mangueShort: 'Num teste unitário, com `Harness`',
      juce:
        'Exercitar o caminho de áudio de um plugin exige um host, ou uma bancada de testes que o autor monta em volta de `AudioProcessor`.',
      mangue:
        '`Harness` é essa bancada. Ele prepara o plugin, agenda notas e automação numa linha do tempo, corta o tempo em qualquer padrão de tamanhos de bloco, mantém um transporte andando e salva e restaura o estado. O som do plugin vira algo que um teste unitário comum consegue conferir, numa máquina de CI sem placa de som.',
      check: [
        'Os testes do instrumento de exemplo conferem que ele fica em silêncio até ser tocado, que [toca a altura pedida](proof:harness-pitch) (por FFT), que a automação e a modulação por nota mudam o som, que o estado vai e volta, e que a saída [não depende do tamanho do bloco](proof:block-size-pluck). Os testes do efeito de exemplo [alimentam o sidechain](proof:harness-duck) do mesmo jeito.',
      ],
    },
  },

  {
    id: 'state',
    proofs: ['state-versions', 'params-threads'],
    en: {
      title: 'Parameters and state cannot race',
      row: 'Thread safety of parameters and state',
      juceShort: 'Synchronised by each plugin',
      mangueShort: 'Atomics; nothing to lock',
      juce:
        '`getStateInformation` and `setStateInformation` can be called from any non-audio thread while `processBlock` is running, and the framework does not serialise them; each plugin has to ([forum thread](https://forum.juce.com/t/are-getstateinformation-and-setstateinformation-always-called-on-the-audio-thread/53467)). Between JUCE 5.0 and 5.2 the tree that state was saved from could lag behind the real parameter values ([forum thread](https://forum.juce.com/t/audioprocessorvaluetreestate-thread-safety/21811)).',
      mangue:
        'A parameter is an atomic, and every method takes `&self`. Saving reads the atomics; loading writes them. There is one copy of each value, so state cannot go stale, and the compiler rejects code that would share anything else between threads without synchronisation. Saved state holds real values keyed by identifier, so a range can be reshaped in a later version without changing how an old session sounds.',
      check: [
        '[state_from_another_version_loads_as_far_as_it_can](proof:state-versions) and [params_are_shareable_across_threads](proof:params-threads) in the parameters crate.',
      ],
      limit:
        'This covers parameters. Larger state, such as a loaded sample, has a documented pattern (build off-thread, hand over through a queue) but no ready-made type yet.',
    },
    pt: {
      title: 'Parâmetros e estado não têm como disputar',
      row: 'Parâmetros e estado entre threads',
      juceShort: 'Sincronizados por cada plugin',
      mangueShort: 'Atômicos; não há o que travar',
      juce:
        '`getStateInformation` e `setStateInformation` podem ser chamadas de qualquer thread que não seja a de áudio enquanto `processBlock` está rodando, e o framework não as serializa; cada plugin tem de fazer isso ([tópico no fórum](https://forum.juce.com/t/are-getstateinformation-and-setstateinformation-always-called-on-the-audio-thread/53467)). Entre o JUCE 5.0 e o 5.2, a árvore de onde o estado era salvo podia ficar atrasada em relação aos valores reais dos parâmetros ([tópico no fórum](https://forum.juce.com/t/audioprocessorvaluetreestate-thread-safety/21811)).',
      mangue:
        'Um parâmetro é um atômico, e todos os métodos recebem `&self`. Salvar lê os atômicos; carregar escreve neles. Existe uma única cópia de cada valor, então o estado não fica defasado, e o compilador recusa código que compartilhe qualquer outra coisa entre threads sem sincronização. O estado salvo guarda valores reais indexados por identificador, de modo que uma faixa pode ser redesenhada numa versão futura sem mudar o som de uma sessão antiga.',
      check: [
        '[state_from_another_version_loads_as_far_as_it_can](proof:state-versions) e [params_are_shareable_across_threads](proof:params-threads), no crate de parâmetros.',
      ],
      limit:
        'Isso cobre os parâmetros. Estado maior, como um sample carregado, tem um padrão documentado (montar fora da thread de áudio, entregar por uma fila), mas ainda não tem um tipo pronto.',
    },
  },

  {
    id: 'licence',
    proofs: ['licence-mit', 'licence-apache', 'pro-io-licence'],
    en: {
      title: 'Licence',
      row: 'Licence',
      juceShort: 'AGPLv3 or commercial',
      mangueShort: 'MIT or Apache-2.0',
      juce: 'JUCE is offered under the AGPLv3 or a commercial licence.',
      mangue:
        'Manguebyte is under MIT or Apache-2.0, at your option: no copyleft, no per-seat fee and no splash screen, for open and closed products alike.',
      check: ['The two licence texts in the repository: [MIT](proof:licence-mit) and [Apache-2.0](proof:licence-apache).'],
      limit:
        'One crate is the exception. `manguebyte-pro-io`, which speaks to ASIO drivers itself, is opt-in and under the [GPLv3 alone](proof:pro-io-licence), because its driver interface is declared from Steinberg’s ASIO SDK under the SDK’s GPLv3 option. No other crate depends on it, and a program that uses it is under the GPLv3; closed-source programs reach ASIO through `cpal`’s own `asio` feature instead, with an SDK they license themselves ([its README](proof:pro-io-readme)).',
    },
    pt: {
      title: 'Licença',
      row: 'Licença',
      juceShort: 'AGPLv3 ou comercial',
      mangueShort: 'MIT ou Apache-2.0',
      juce: 'O JUCE é oferecido sob a AGPLv3 ou sob uma licença comercial.',
      mangue:
        'O Manguebyte está sob MIT ou Apache-2.0, à sua escolha: sem copyleft, sem taxa por desenvolvedor e sem tela de abertura, para produtos abertos e fechados.',
      check: ['Os dois textos de licença no repositório: [MIT](proof:licence-mit) e [Apache-2.0](proof:licence-apache).'],
      limit:
        'Um crate é a exceção. O `manguebyte-pro-io`, que conversa diretamente com os drivers ASIO, é opcional e está [só sob a GPLv3](proof:pro-io-licence), porque a interface de driver dele é declarada a partir do SDK ASIO da Steinberg, pela opção GPLv3 do próprio SDK. Nenhum outro crate depende dele, e um programa que o use fica sob a GPLv3; programas de código fechado chegam ao ASIO pela feature `asio` do próprio `cpal`, com um SDK que eles mesmos licenciam ([o README dele](proof:pro-io-readme)).',
    },
  },

  {
    id: 'subnormals',
    proofs: ['subnormal-clap', 'subnormal-vst3', 'subnormal-guard'],
    en: {
      title: 'A fading sound cannot slow the audio thread down',
      row: 'Slow-downs in silence',
      juceShort: 'A guard each plugin places in its own callback',
      mangueShort: 'Set by the framework around every plugin and every device callback',
      problem:
        'A fading sound does not reach zero. Filter memory and reverb tails shrink until their values are *subnormal*: still not zero, and tens of times slower for a processor to compute with. The plugin then costs the most in the silence after a note. Processors have a per-thread setting that rounds such numbers to zero, and using it is standard practice.',
      juce:
        'The setting is available as [ScopedNoDenormals](https://docs.juce.com/master/classScopedNoDenormals.html), a guard that the author of each plugin places at the top of `processBlock`. The plugin template includes it. Code that did not start from the template, or a callback written later, is unprotected until someone notices.',
      mangue:
        'The framework holds the guard itself: the CLAP and VST 3 wrappers and the standalone engine around `Plugin::process`, and the device streams around every callback. There is nothing for a plugin author to remember. The setting is put back on the way out, so the host’s own code runs as it expects.',
      check: [
        'A test in both wrappers ([CLAP](proof:subnormal-clap), [VST 3](proof:subnormal-vst3)) has a plugin report what the processor does with a subnormal number from inside `process`, then checks that the host’s thread is back to its own setting afterwards, including after the plugin panics. Measured on the example effect, 4,000 blocks of subnormal input took 442 ms without the guard and 31 ms with it.',
      ],
      limit:
        '`x86_64` and `aarch64` only; elsewhere the guard does nothing. Rust does not define floating-point behaviour under a changed setting, and [ADR 0006](repo:docs/adr/0006-subnormal-numbers-are-flushed.md) says what that means in practice and why the trade is taken. A program that calls a processor in its own loop, outside the wrappers, streams and test harness, creates the guard itself.',
    },
    pt: {
      title: 'Um som que some não deixa a thread de áudio lenta',
      row: 'Lentidão no silêncio',
      juceShort: 'Uma guarda que cada plugin põe no próprio callback',
      mangueShort: 'Posta pelo framework em volta de cada plugin e de cada callback de dispositivo',
      problem:
        'Um som que vai sumindo não chega a zero. A memória dos filtros e as caudas de reverb encolhem até os valores ficarem *subnormais*: ainda diferentes de zero, e dezenas de vezes mais lentos de calcular. O plugin passa a custar mais justamente no silêncio depois da nota. Os processadores têm uma configuração por thread que arredonda esses números para zero, e usá-la é prática comum.',
      juce:
        'A configuração está disponível como [ScopedNoDenormals](https://docs.juce.com/master/classScopedNoDenormals.html), uma guarda que o autor de cada plugin põe no começo de `processBlock`. O modelo de plugin já vem com ela. Código que não partiu do modelo, ou um callback escrito depois, fica desprotegido até alguém notar.',
      mangue:
        'O próprio framework segura a guarda: os wrappers CLAP e VST 3 e o motor standalone em volta de `Plugin::process`, e os streams de dispositivo em volta de cada callback. O autor do plugin não tem nada para lembrar. A configuração é devolvida na saída, então o código do host roda como ele espera.',
      check: [
        'Um teste nos dois wrappers ([CLAP](proof:subnormal-clap), [VST 3](proof:subnormal-vst3)) faz um plugin informar, de dentro de `process`, o que o processador faz com um número subnormal, e depois confere que a thread do host voltou à configuração dela, inclusive depois de o plugin entrar em pânico. Medido no efeito de exemplo, 4.000 blocos de entrada subnormal levaram 442 ms sem a guarda e 31 ms com ela.',
      ],
      limit:
        'Só em `x86_64` e `aarch64`; nas outras arquiteturas a guarda não faz nada. O Rust não define o comportamento de ponto flutuante com a configuração alterada, e o [ADR 0006](repo:docs/adr/0006-subnormal-numbers-are-flushed.md) explica o que isso significa na prática e por que a troca vale a pena. Um programa que chama um processador num laço próprio, fora dos wrappers, dos streams e do harness de testes, cria a guarda por conta própria.',
    },
  },

  {
    id: 'hosting',
    proofs: ['hosting-clap', 'hosting-vst3', 'hosting-automation', 'hosting-heap', 'ci-miri-host'],
    en: {
      title: 'Hosting a plugin: thread rules in the types, every event on its frame',
      row: 'Hosting',
      juceShort: 'No CLAP hosting; one object called from every thread; parameter changes carry no frame',
      mangueShort: 'CLAP and VST 3; thread rules in the types; every event on its frame',
      problem:
        'A host calls a plugin from two kinds of thread, and the formats say which calls belong where. Getting it wrong crashes plugins in the field, and nothing stops a host from getting it wrong. A host that wants to pass automation to a plugin precisely also needs a way to say on which frame each change happens.',
      juce:
        'JUCE 9.0.4 does not host CLAP plugins. For the formats it hosts, a plugin is one [AudioPluginInstance](https://docs.juce.com/master/classAudioPluginInstance.html), an [AudioProcessor](https://docs.juce.com/master/classAudioProcessor.html) that the host calls from the message thread and the audio thread; which method may run where is set out in the documentation, and the compiler checks none of it. The hosting interface is `processBlock(AudioBuffer, MidiBuffer)`: MIDI events carry a sample position, but a parameter change, made through [AudioProcessorParameter::setValue](https://docs.juce.com/master/classAudioProcessorParameter.html), carries none, so a host can place a change on an exact frame only by cutting the block there. JUCE has announced sample-accurate automation for a later JUCE 9 update.',
      mangue:
        '`manguebyte-host` loads CLAP and VST 3 plugins in two halves. The main-thread half (parameters, state, activation) is not `Send`, so code that would load state from the audio thread does not compile; the audio half is `Send`, is the only thing that can process, and processes through `&mut self`. Every event of the framework’s event buffer reaches the plugin on its frame: CLAP events with their offsets, and for VST 3 one queue per parameter with every point on its frame, notes with ids, per-note pressure and note expression.',
      check: [
        'Compile-fail doc-tests on `ClapPlugin` and `Vst3Plugin` show that the main-thread half cannot be sent to another thread. `the_hosted_plugin_sounds_exactly_as_the_plugin_does_alone`, for [CLAP](proof:hosting-clap) and for [VST 3](proof:hosting-vst3), loads the example instrument through its real entry point and requires its output to be identical bit for bit to the same plugin run in process by `Harness`, for four block layouts, with automation of five parameters, notes with ids, expression and pitch bend; removing any one kind of event changes the output, so the identity is not two deaf paths agreeing. [automation_lands_on_its_frame_through_the_host](proof:hosting-automation) sends 59 VST 3 points 61 frames apart.',
      ],
      limit:
        'A second audio half, and deactivating while one exists, are refused at run time, not at compile time. “Main thread” means the thread that created the plugin; the types do not check that it is the program’s main thread. At most 4,096 events per call; the rest are counted. No modulation is sent to VST 3 plugins. Tested with the framework’s own plugins and deliberately misbehaving test plugins, not yet with plugins from other vendors; no editors of hosted plugins. [Scanning](proof:scan) lists CLAP and VST 3 files out of process and LV2 bundles from their Turtle files, and has not met plugins from other vendors either.',
    },
    pt: {
      title: 'Hospedar um plugin: as regras de thread nos tipos, cada evento no seu frame',
      row: 'Hospedagem',
      juceShort: 'Não hospeda CLAP; um objeto chamado de todas as threads; mudanças de parâmetro sem frame',
      mangueShort: 'CLAP e VST 3; regras de thread nos tipos; cada evento no seu frame',
      problem:
        'O host chama o plugin a partir de dois tipos de thread, e os formatos dizem qual chamada pertence a qual. Errar nisso derruba plugins no uso real, e nada impede um host de errar. Um host que queira passar automação a um plugin com precisão também precisa de um jeito de dizer em que frame cai cada mudança.',
      juce:
        'O JUCE 9.0.4 não hospeda plugins CLAP. Nos formatos que ele hospeda, o plugin é um único [AudioPluginInstance](https://docs.juce.com/master/classAudioPluginInstance.html), um [AudioProcessor](https://docs.juce.com/master/classAudioProcessor.html) que o host chama tanto da thread de mensagens quanto da thread de áudio; qual método pode rodar onde está na documentação, e o compilador não confere nada disso. A interface de hospedagem é `processBlock(AudioBuffer, MidiBuffer)`: os eventos MIDI trazem a posição da amostra, mas uma mudança de parâmetro, feita por [AudioProcessorParameter::setValue](https://docs.juce.com/master/classAudioProcessorParameter.html), não traz nenhuma, então o host só consegue pôr uma mudança num frame exato cortando o bloco ali. O JUCE anunciou automação com precisão de amostra para uma atualização futura do JUCE 9.',
      mangue:
        'O `manguebyte-host` carrega plugins CLAP e VST 3 em duas metades. A metade da thread principal (parâmetros, estado, ativação) não é `Send`, então o código que carregaria estado a partir da thread de áudio não compila; a metade de áudio é `Send`, é a única que pode processar, e processa por `&mut self`. Cada evento do buffer de eventos do framework chega ao plugin no seu frame: os eventos CLAP com os seus deslocamentos e, no VST 3, uma fila por parâmetro com cada ponto no seu frame, notas com ids, pressão por nota e expressão de nota.',
      check: [
        'Doc-tests que precisam falhar na compilação, em `ClapPlugin` e `Vst3Plugin`, mostram que a metade da thread principal não pode ser enviada a outra thread. `the_hosted_plugin_sounds_exactly_as_the_plugin_does_alone`, para [CLAP](proof:hosting-clap) e para [VST 3](proof:hosting-vst3), carrega o instrumento de exemplo pelo seu ponto de entrada real e exige que a saída seja idêntica bit a bit à do mesmo plugin rodando dentro do processo pelo `Harness`, em quatro arranjos de blocos, com automação de cinco parâmetros, notas com ids, expressão e pitch bend; tirar qualquer um dos tipos de evento muda a saída, então a identidade não é a de dois caminhos surdos concordando. [automation_lands_on_its_frame_through_the_host](proof:hosting-automation) envia 59 pontos de VST 3 espaçados de 61 frames.',
      ],
      limit:
        'Uma segunda metade de áudio, e desativar enquanto existe uma, são recusadas em tempo de execução, não na compilação. “Thread principal” quer dizer a thread que criou o plugin; os tipos não conferem se ela é a thread principal do programa. No máximo 4.096 eventos por chamada; o restante é contado. Nenhuma modulação é enviada a plugins VST 3. Testado com os plugins do próprio framework e com plugins de teste que se comportam mal de propósito, ainda não com plugins de outros fabricantes; sem os editores dos plugins hospedados. A [varredura](proof:scan) lista os arquivos CLAP e VST 3 fora do processo e os pacotes LV2 pelos seus arquivos Turtle, e também ainda não encontrou plugins de outros fabricantes.',
    },
  },

  {
    id: 'loudness',
    proofs: ['ebu-3341', 'ebu-3341-true-peak', 'ebu-3342'],
    en: {
      title: 'Loudness, true peak and broadcast meters, ready to use',
      row: 'Loudness and broadcast meters',
      juceShort: 'None documented',
      mangueShort: 'BS.1770 / R 128 loudness, true peak, VU, PPM, correlation, checked against the EBU’s test signals',
      problem:
        'Anything that delivers audio for broadcast or streaming has to measure loudness to ITU-R BS.1770 and EBU R 128, and true peak. Getting the gating, the windows and the K-weighting right at every sample rate is easy to get subtly wrong.',
      juce:
        'JUCE 9.0.4’s documented API has no loudness, LUFS, K-weighting or true-peak class or function, and no VU, PPM, correlation or balance meter ([class list](https://docs.juce.com/master/annotated.html)). Its level tools are `AudioBuffer::getRMSLevel` and `getMagnitude`, [AudioDeviceManager::LevelMeter](https://docs.juce.com/master/structjuce_1_1AudioDeviceManager_1_1LevelMeter.html) and [dsp::BallisticsFilter](https://docs.juce.com/master/classjuce_1_1dsp_1_1BallisticsFilter.html). Users on the forum write their own ([loudness](https://forum.juce.com/t/does-juce-have-any-loudness-related-functions-or-classes/57424), [true peak](https://forum.juce.com/t/does-juce-have-a-function-to-read-true-peak/43454)).',
      mangue:
        '`manguebyte-analysis` has a `LoudnessMeter` (momentary, short-term, integrated, loudness range, maxima), a `TruePeakMeter` (BS.1770-4 Annex 2, 4x by default), a VU meter, a PPM with IEC 60268-10 Type I timing, and a correlation and balance meter. They run on the audio thread in memory fixed when they are built, and any thread reads them through atomics without waiting.',
      check: [
        '[ebu_tech_3341.rs](proof:ebu-3341) synthesises the EBU Tech 3341 test signals and requires cases 1 to 6 and 9 to 14 within 0.1 LU, and [the true-peak cases](proof:ebu-3341-true-peak) 15 to 23 within +0.2/−0.4 dB; [ebu_tech_3342.rs](proof:ebu-3342) does the same for loudness range, cases 1 to 4. The VU needle reaches 99% in 300 ms ±3 ms with 1.0 to 1.5% overshoot at 44.1 to 192 kHz. Readings are identical to the bit whatever the block size, and measuring makes no heap call.',
      ],
      limit:
        'The signals are synthesised from the documents’ tables; the EBU’s own files and recorded items were not run. Written to BS.1770-4, which the ITU has since superseded with BS.1770-5. The loudness range is kept in 0.01 LU histograms and can differ from Tech 3342’s function when short-term values straddle the relative gate within one bin; this is documented and tested. The PPM matches Type I at its 5 ms integration point and its return time; other burst readings miss the nominal values by up to 0.6 dB, and it reads samples, not the waveform. JUCE ships the pieces to build such meters; the claim is that it ships none ready.',
    },
    pt: {
      title: 'Loudness, true peak e medidores de broadcast, prontos para usar',
      row: 'Loudness e medidores de broadcast',
      juceShort: 'Nenhum na documentação',
      mangueShort: 'Loudness BS.1770 / R 128, true peak, VU, PPM, correlação, conferidos com os sinais de teste da EBU',
      problem:
        'Tudo o que entrega áudio para broadcast ou streaming tem de medir loudness segundo a ITU-R BS.1770 e a EBU R 128, e o true peak. É fácil errar sutilmente o gating, as janelas e a ponderação K em alguma taxa de amostragem.',
      juce:
        'A API documentada do JUCE 9.0.4 não tem classe nem função de loudness, LUFS, ponderação K ou true peak, nem medidor VU, PPM, de correlação ou de balanço ([lista de classes](https://docs.juce.com/master/annotated.html)). As ferramentas de nível são `AudioBuffer::getRMSLevel` e `getMagnitude`, [AudioDeviceManager::LevelMeter](https://docs.juce.com/master/structjuce_1_1AudioDeviceManager_1_1LevelMeter.html) e [dsp::BallisticsFilter](https://docs.juce.com/master/classjuce_1_1dsp_1_1BallisticsFilter.html). No fórum, os usuários escrevem os seus ([loudness](https://forum.juce.com/t/does-juce-have-any-loudness-related-functions-or-classes/57424), [true peak](https://forum.juce.com/t/does-juce-have-a-function-to-read-true-peak/43454)).',
      mangue:
        'O `manguebyte-analysis` tem um `LoudnessMeter` (momentâneo, de curto prazo, integrado, faixa de loudness, máximos), um `TruePeakMeter` (BS.1770-4, Anexo 2, 4x por padrão), um medidor VU, um PPM com a temporização Tipo I da IEC 60268-10 e um medidor de correlação e balanço. Eles rodam na thread de áudio, numa memória fixada quando são criados, e qualquer thread os lê por atômicos, sem esperar.',
      check: [
        '[ebu_tech_3341.rs](proof:ebu-3341) sintetiza os sinais de teste da EBU Tech 3341 e exige os casos 1 a 6 e 9 a 14 dentro de 0,1 LU, e [os casos de true peak](proof:ebu-3341-true-peak) 15 a 23 dentro de +0,2/−0,4 dB; [ebu_tech_3342.rs](proof:ebu-3342) faz o mesmo para a faixa de loudness, casos 1 a 4. O ponteiro do VU chega a 99% em 300 ms ±3 ms, com 1,0 a 1,5% de sobressinal, de 44,1 a 192 kHz. As leituras são idênticas até o bit em qualquer tamanho de bloco, e medir não faz nenhuma chamada ao heap.',
      ],
      limit:
        'Os sinais são sintetizados a partir das tabelas dos documentos; os arquivos e as gravações da própria EBU não foram usados. Escrito segundo a BS.1770-4, que a ITU já substituiu pela BS.1770-5. A faixa de loudness é guardada em histogramas de 0,01 LU e pode diferir da função da Tech 3342 quando valores de curto prazo ficam dos dois lados do gate relativo dentro de uma mesma faixa; isso está documentado e testado. O PPM bate com o Tipo I no ponto de integração de 5 ms e no tempo de retorno; outras leituras de rajada ficam até 0,6 dB longe dos valores nominais, e ele lê amostras, não a forma de onda. O JUCE traz as peças para construir esses medidores; a afirmação é que ele não traz nenhum pronto.',
    },
  },

  {
    id: 'osc',
    proofs: ['osc-time-tag', 'osc-every-frame', 'osc-block-size', 'osc-codec'],
    en: {
      title: 'Open Sound Control that lands on the sample',
      row: 'OSC timing',
      juceShort: 'Listeners on the message or network thread',
      mangueShort: 'Time-tagged bundles land on their frame; every OSC 1.0 type; TCP',
      problem:
        'OSC bundles carry a time tag so that a controller or a live-coding program can say when something should happen. An audio engine that applies messages when they arrive, or once per block, throws that timing away.',
      juce:
        '[OSCReceiver](https://docs.juce.com/master/classOSCReceiver.html) calls its listeners on the message thread or directly on the network thread; its documentation describes no delivery into the audio callback and no scheduling by time tag. [OSCArgument](https://docs.juce.com/master/classOSCArgument.html) documents five argument types (int32, float32, string, blob, colour). [OSCAddressPattern](https://docs.juce.com/master/classOSCAddressPattern.html) documents the OSC 1.0 wildcards, and [OSCSender](https://docs.juce.com/master/classOSCSender.html) and `OSCReceiver` document UDP only.',
      mangue:
        '`manguebyte-osc` decodes on a network thread and hands fixed events to the audio thread through wait-free queues, and a message in a time-tagged bundle lands on the frame nearest its time tag. Every argument type the OSC 1.0 specification lists is supported, nested arrays included; the `//` wildcard proposed for OSC 1.1 ([Freed and Schmeder, 2009](https://ccrma.stanford.edu/groups/osc/spec-1_1.html)) is matched; and TCP with the OSC 1.1 SLIP framing sits beside UDP.',
      check: [
        '[a_time_tag_lands_on_its_exact_frame](proof:osc-time-tag), [every_frame_of_a_block_can_be_hit](proof:osc-every-frame) and [where_an_event_lands_does_not_depend_on_the_block_size](proof:osc-block-size) (400 events, seven block patterns, identical frames); reading on the audio thread makes no heap call. [codec.rs](proof:osc-codec) encodes the specification’s examples byte for byte and round-trips every type.',
      ],
      limit:
        'Exact relative to the block start the caller passes; the variant that reads the system clock inherits the callback’s jitter and any offset between the sender’s clock and this one. Fixed capacities (1,024 events, a pool for messages over 64 bytes); what does not fit is dropped whole and counted. OSC 1.1 is a conference paper, not a ratified specification, and `//` is read as XPath’s descendant step. OSC 1.0’s size-prefixed stream framing is not implemented. A JUCE user can build the same path by hand; JUCE ships none.',
    },
    pt: {
      title: 'Open Sound Control que cai na amostra',
      row: 'Tempo do OSC',
      juceShort: 'Listeners na thread de mensagens ou de rede',
      mangueShort: 'Bundles com time tag caem no seu frame; todos os tipos do OSC 1.0; TCP',
      problem:
        'Os bundles OSC trazem um time tag para que um controlador ou um programa de live coding diga quando algo deve acontecer. Um motor de áudio que aplica as mensagens quando chegam, ou uma vez por bloco, joga esse tempo fora.',
      juce:
        'O [OSCReceiver](https://docs.juce.com/master/classOSCReceiver.html) chama os seus listeners na thread de mensagens ou direto na thread de rede; a documentação dele não descreve entrega dentro do callback de áudio nem agendamento por time tag. O [OSCArgument](https://docs.juce.com/master/classOSCArgument.html) documenta cinco tipos de argumento (int32, float32, string, blob, cor). O [OSCAddressPattern](https://docs.juce.com/master/classOSCAddressPattern.html) documenta os curingas do OSC 1.0, e o [OSCSender](https://docs.juce.com/master/classOSCSender.html) e o `OSCReceiver` documentam só UDP.',
      mangue:
        'O `manguebyte-osc` decodifica numa thread de rede e entrega eventos fixos à thread de áudio por filas wait-free, e uma mensagem num bundle com time tag cai no frame mais próximo do seu time tag. Todos os tipos de argumento listados na especificação do OSC 1.0 são aceitos, inclusive arrays aninhados; o curinga `//` proposto para o OSC 1.1 ([Freed e Schmeder, 2009](https://ccrma.stanford.edu/groups/osc/spec-1_1.html)) é reconhecido; e TCP com o enquadramento SLIP do OSC 1.1 fica ao lado do UDP.',
      check: [
        '[a_time_tag_lands_on_its_exact_frame](proof:osc-time-tag), [every_frame_of_a_block_can_be_hit](proof:osc-every-frame) e [where_an_event_lands_does_not_depend_on_the_block_size](proof:osc-block-size) (400 eventos, sete padrões de bloco, frames idênticos); ler na thread de áudio não faz nenhuma chamada ao heap. [codec.rs](proof:osc-codec) codifica os exemplos da especificação byte a byte e faz ida e volta com todos os tipos.',
      ],
      limit:
        'Exato em relação ao começo de bloco que quem chama informa; a variante que lê o relógio do sistema herda o jitter do callback e qualquer diferença entre o relógio de quem envia e o deste lado. Capacidades fixas (1.024 eventos, um reservatório para mensagens acima de 64 bytes); o que não cabe é descartado inteiro e contado. O OSC 1.1 é um artigo de conferência, não uma especificação ratificada, e `//` é lido como o passo de descendente do XPath. O enquadramento de fluxo com prefixo de tamanho do OSC 1.0 não está implementado. Um usuário do JUCE pode montar o mesmo caminho à mão; o JUCE não traz nenhum pronto.',
    },
  },

  {
    id: 'pitch',
    proofs: ['pitch', 'spectrum-band', 'spectrum-noise'],
    en: {
      title: 'Pitch detection and fractional-octave analysis',
      row: 'Pitch and band analysis',
      juceShort: 'None documented',
      mangueShort: 'YIN and McLeod pitch; IEC octave bands and weighting',
      juce:
        'JUCE 9.0.4’s documented class list has no pitch detection and no fractional-octave band analyser or A- and C-weighting class ([classes](https://docs.juce.com/master/classes.html)); it provides `dsp::FFT` and `dsp::WindowingFunction` as building blocks, and spectrum display appears in its tutorials as code the reader writes.',
      mangue:
        '`PitchDetector` offers YIN and the McLeod pitch method with a confidence value and the nearest note named, refined between samples by band-limited interpolation. `SpectrumAnalyzer` gives octave to twenty-fourth-octave bands on the exact frequencies of IEC 61260-1 and A and C weighting from IEC 61672-1, with ballistics and peak hold, handing whole frames to an interface through a wait-free triple buffer.',
      check: [
        '[pitch.rs](proof:pitch): sines, sawtooths, square waves, tones without their fundamental and tones with a strong second harmonic from 55 Hz to 2 kHz read within 2 cents at 44.1 and 48 kHz, with no octave errors. [spectrum.rs](proof:spectrum-band): a full-scale sine reads 0 dB in its band within 0.01 dB, and [the third-octave bands of white and pink noise](proof:spectrum-noise) add up within 0.05 dB.',
      ],
      limit:
        'Synthetic, steady, single tones. At 8 to 22 kHz sample rates the error grows to 13 cents; a second harmonic more than about four times the fundamental makes the detector read an octave high; low-frequency noise can read a confidence near 0.7. The bands are formed from FFT bins, not an IEC 61260-1 filter bank, and bands narrower than about four bins are not resolved. Third-party pitch modules for JUCE exist.',
    },
    pt: {
      title: 'Detecção de altura e análise em frações de oitava',
      row: 'Altura e análise por bandas',
      juceShort: 'Nenhuma na documentação',
      mangueShort: 'Altura por YIN e McLeod; bandas de oitava IEC e ponderação',
      juce:
        'A lista de classes documentada do JUCE 9.0.4 não tem detecção de altura nem analisador de bandas em frações de oitava ou classe de ponderação A e C ([classes](https://docs.juce.com/master/classes.html)); ela oferece `dsp::FFT` e `dsp::WindowingFunction` como peças, e a exibição de espectro aparece nos tutoriais como código que o leitor escreve.',
      mangue:
        'O `PitchDetector` oferece o YIN e o método de McLeod, com um valor de confiança e o nome da nota mais próxima, refinado entre amostras por interpolação de banda limitada. O `SpectrumAnalyzer` dá bandas de oitava a 1/24 de oitava nas frequências exatas da IEC 61260-1 e as ponderações A e C da IEC 61672-1, com balística e retenção de pico, entregando quadros inteiros a uma interface por um buffer triplo wait-free.',
      check: [
        '[pitch.rs](proof:pitch): senoides, dentes de serra, ondas quadradas, tons sem a fundamental e tons com um segundo harmônico forte, de 55 Hz a 2 kHz, são lidos dentro de 2 cents a 44,1 e 48 kHz, sem erros de oitava. [spectrum.rs](proof:spectrum-band): uma senoide em escala cheia lê 0 dB na sua banda, com margem de 0,01 dB, e [as bandas de terço de oitava de ruído branco e rosa](proof:spectrum-noise) somam certo dentro de 0,05 dB.',
      ],
      limit:
        'Tons sintéticos, estáveis e isolados. Em taxas de 8 a 22 kHz o erro sobe a 13 cents; um segundo harmônico mais de cerca de quatro vezes mais forte que a fundamental faz o detector ler uma oitava acima; ruído grave pode ler confiança perto de 0,7. As bandas são formadas a partir dos bins da FFT, não por um banco de filtros IEC 61260-1, e bandas mais estreitas que uns quatro bins não são resolvidas. Existem módulos de altura de terceiros para o JUCE.',
    },
  },

  {
    id: 'keyboard',
    proofs: ['keyboard-heap', 'keyboard-sounding', 'keyboard-threads'],
    en: {
      title: 'A keyboard an interface can read without listening',
      row: 'Keyboard state',
      juceShort: 'Listeners that may run on the audio thread',
      mangueShort: 'Atomics an interface polls; no listener, no lock',
      juce:
        '[MidiKeyboardState](https://docs.juce.com/master/classMidiKeyboardState.html) reports key changes to its listeners synchronously, on whichever thread updates it, and its documentation warns that the callback could happen from an audio callback thread ([listener](https://docs.juce.com/master/classMidiKeyboardState_1_1Listener.html)). An interface can poll `isNoteOn()` instead, but the documentation gives no guarantee that updates or reads are free of locks or allocation, and the class tracks keys, not pedals.',
      mangue:
        '`midi::keyboard::KeyboardState` keeps keys, velocities and the sustain pedal in atomics. The audio thread updates it with no listener code, no lock and no heap call; an interface polls it. A reader never sees a key that was not struck, and never sees a sustained key go silent while it passes from the hand to the pedal.',
      check: [
        '[the_keyboard_state_does_not_use_the_heap](proof:keyboard-heap) (20,000 random messages, reads interleaved), and [a_key_that_goes_on_sounding_is_never_read_as_silent](proof:keyboard-sounding) and [an_interface_can_read_while_another_thread_writes](proof:keyboard-threads).',
      ],
      limit:
        'One writing thread. A read is consistent within each group of 16 keys, not across the whole keyboard, and a velocity can briefly lead or lag its key. Only the sustain pedal is tracked. “No lock” and “no listener” follow from the code (atomic operations only, no callback interface), not from a test.',
    },
    pt: {
      title: 'Um teclado que a interface lê sem ficar ouvindo',
      row: 'Estado do teclado',
      juceShort: 'Listeners que podem rodar na thread de áudio',
      mangueShort: 'Atômicos que a interface consulta; sem listener, sem lock',
      juce:
        'O [MidiKeyboardState](https://docs.juce.com/master/classMidiKeyboardState.html) informa as mudanças de tecla aos seus listeners de forma síncrona, na thread que o atualiza, e a documentação avisa que o callback pode acontecer a partir de uma thread de callback de áudio ([listener](https://docs.juce.com/master/classMidiKeyboardState_1_1Listener.html)). A interface pode consultar `isNoteOn()` em vez disso, mas a documentação não garante que atualizações ou leituras sejam livres de locks ou de alocação, e a classe acompanha teclas, não pedais.',
      mangue:
        'O `midi::keyboard::KeyboardState` guarda teclas, velocidades e o pedal de sustain em atômicos. A thread de áudio o atualiza sem código de listener, sem lock e sem chamada ao heap; a interface o consulta. Quem lê nunca vê uma tecla que não foi tocada, e nunca vê uma tecla sustentada ficar muda enquanto passa da mão para o pedal.',
      check: [
        '[the_keyboard_state_does_not_use_the_heap](proof:keyboard-heap) (20.000 mensagens aleatórias, com leituras intercaladas), e [a_key_that_goes_on_sounding_is_never_read_as_silent](proof:keyboard-sounding) e [an_interface_can_read_while_another_thread_writes](proof:keyboard-threads).',
      ],
      limit:
        'Uma única thread escrevendo. Uma leitura é consistente dentro de cada grupo de 16 teclas, não no teclado inteiro, e uma velocidade pode chegar um pouco antes ou depois da sua tecla. Só o pedal de sustain é acompanhado. “Sem lock” e “sem listener” decorrem do código (só operações atômicas, nenhuma interface de callback), não de um teste.',
    },
  },
  {
    id: 'instruments',
    proofs: ['instruments-poly-tuning', 'instruments-snare', 'instruments-crash', 'instruments-bowed', 'instruments-mallet', 'instruments-choir', 'instruments-heap'],
    en: {
      title: 'Instruments ready to play, measured in tests',
      row: 'Instruments ready to play',
      juceShort: 'Classes to build an instrument from; none ready to play',
      mangueShort: 'Modelled and synthesised instruments and drum kits, their tuning and spectra measured in tests',
      juce:
        'JUCE gives the parts to build an instrument from: [Synthesiser](https://docs.juce.com/master/classSynthesiser.html) and [SynthesiserVoice](https://docs.juce.com/master/classSynthesiserVoice.html), a basic sample player in [SamplerSound](https://docs.juce.com/master/classSamplerSound.html) and [SamplerVoice](https://docs.juce.com/master/classSamplerVoice.html), and building blocks such as [dsp::Oscillator](https://docs.juce.com/master/classdsp_1_1Oscillator.html) and [dsp::LadderFilter](https://docs.juce.com/master/classdsp_1_1LadderFilter.html). Its [class list](https://docs.juce.com/master/annotated.html) has no instrument ready to play: no modelled acoustic instrument, no drum machine, no synthesiser with presets.',
      mangue:
        '`manguebyte_dsp::instruments` holds voices for the polyphonic `Synth` that play as they are: plucked guitars and basses, four-operator FM, a tonewheel organ with a rotary speaker, mallets by modal synthesis, bowed strings and winds by digital waveguide, choirs by formant synthesis, an acid bass with accent and slide, drum kits (acoustic drums and cymbals by modal synthesis, and the 808, 909, 606 and CR-78 with kits for each genre), and a deep polyphonic synthesiser with 68 presets. Every one of them takes velocity and accents, stays off the heap while it plays, and renders the same samples whatever the block size.',
      check: [
        'Tuning is measured across each instrument’s range: [every_note_is_in_tune_across_the_keyboard](proof:instruments-poly-tuning) for the synthesiser (within 0.012 cent), [every_note_is_within_a_cent_across_the_keyboard](proof:instruments-string) for the plucked strings, [every_bowed_note_is_in_tune_across_its_range](proof:instruments-bowed), [every_note_is_in_tune_across_its_range](proof:instruments-wind) for the winds, and the tuning tests of the mallets, choir, organ, FM and acid voices.',
        'Spectra are measured too: [every_mode_rings_within_half_a_percent_of_its_model](proof:instruments-mallet), [the_formants_peak_at_the_vowels_targets](proof:instruments-choir), [high_notes_are_kept_free_of_aliasing](proof:instruments-poly-aliasing), and [the_snare_measures_as_the_one_recorded](proof:instruments-snare) and [the_crash_measures_as_the_one_recorded](proof:instruments-crash), which compare the modelled snare and crash with recordings of real ones.',
        'The heap: [the_instruments_do_not_use_the_heap](proof:instruments-voices-heap), [the_modelled_acoustic_instruments_do_not_use_the_heap](proof:instruments-heap) and [the_poly_synth_does_not_use_the_heap](proof:instruments-poly-heap). The block size: [the_output_does_not_depend_on_the_block_size](proof:instruments-block-size), a test most instrument modules repeat for their own voices.',
      ],
      limit:
        'These numbers are measurements, not opinions: nobody outside the project has judged how the instruments sound yet. Only the snare and the crash are calibrated against recordings, from lossy files. The low notes of the bowed cello and double bass take up to half a second to settle, the saxophone’s bore is cylindrical, the choir sings speech vowels and no consonants, and the instruments’ levels are matched only in the browser engine, not in `manguebyte-dsp` itself; [TECH_DEBT.md, items 66 to 71](proof:instruments-debt), lists the rest.',
    },
    pt: {
      title: 'Instrumentos prontos para tocar, medidos em testes',
      row: 'Instrumentos prontos para tocar',
      juceShort: 'Classes para montar um instrumento; nenhum pronto para tocar',
      mangueShort: 'Instrumentos e kits de bateria modelados e sintetizados, com afinação e espectro medidos em testes',
      juce:
        'O JUCE dá as peças para montar um instrumento: [Synthesiser](https://docs.juce.com/master/classSynthesiser.html) e [SynthesiserVoice](https://docs.juce.com/master/classSynthesiserVoice.html), um player de samples simples em [SamplerSound](https://docs.juce.com/master/classSamplerSound.html) e [SamplerVoice](https://docs.juce.com/master/classSamplerVoice.html), e blocos como [dsp::Oscillator](https://docs.juce.com/master/classdsp_1_1Oscillator.html) e [dsp::LadderFilter](https://docs.juce.com/master/classdsp_1_1LadderFilter.html). A [lista de classes](https://docs.juce.com/master/annotated.html) dele não tem nenhum instrumento pronto para tocar: nenhum instrumento acústico modelado, nenhuma bateria eletrônica, nenhum sintetizador com presets.',
      mangue:
        'O `manguebyte_dsp::instruments` traz vozes para o `Synth` polifônico que tocam como estão: violões, guitarras e baixos dedilhados, FM de quatro operadores, um órgão de tonewheel com caixa rotativa, percussão de teclas por síntese modal, cordas de arco e sopros por guia de onda digital, coros por síntese de formantes, um baixo acid com acento e slide, kits de bateria (bateria acústica e pratos por síntese modal, e as 808, 909, 606 e CR-78, com kits para cada gênero) e um sintetizador polifônico profundo com 68 presets. Todos respondem à velocidade e a acentos, não usam o heap enquanto tocam e geram as mesmas amostras em qualquer tamanho de bloco.',
      check: [
        'A afinação é medida em toda a extensão de cada instrumento: [every_note_is_in_tune_across_the_keyboard](proof:instruments-poly-tuning) para o sintetizador (dentro de 0,012 cent), [every_note_is_within_a_cent_across_the_keyboard](proof:instruments-string) para as cordas dedilhadas, [every_bowed_note_is_in_tune_across_its_range](proof:instruments-bowed), [every_note_is_in_tune_across_its_range](proof:instruments-wind) para os sopros, e os testes de afinação da percussão de teclas, do coro, do órgão, do FM e do acid.',
        'O espectro também é medido: [every_mode_rings_within_half_a_percent_of_its_model](proof:instruments-mallet), [the_formants_peak_at_the_vowels_targets](proof:instruments-choir), [high_notes_are_kept_free_of_aliasing](proof:instruments-poly-aliasing), e [the_snare_measures_as_the_one_recorded](proof:instruments-snare) e [the_crash_measures_as_the_one_recorded](proof:instruments-crash), que comparam a caixa e o prato modelados com gravações de uma caixa e de um prato de verdade.',
        'O heap: [the_instruments_do_not_use_the_heap](proof:instruments-voices-heap), [the_modelled_acoustic_instruments_do_not_use_the_heap](proof:instruments-heap) e [the_poly_synth_does_not_use_the_heap](proof:instruments-poly-heap). O tamanho do bloco: [the_output_does_not_depend_on_the_block_size](proof:instruments-block-size), um teste que a maioria dos módulos de instrumento repete para as suas vozes.',
      ],
      limit:
        'Esses números são medições, não opiniões: ninguém de fora do projeto avaliou ainda como os instrumentos soam. Só a caixa e o prato são calibrados com gravações, a partir de arquivos com perda. As notas graves do violoncelo e do contrabaixo de arco levam até meio segundo para se firmar, o tubo do saxofone é cilíndrico, o coro canta vogais da fala e nenhuma consoante, e os níveis dos instrumentos só são igualados no motor do navegador, não no próprio `manguebyte-dsp`; o [TECH_DEBT.md, itens 66 a 71](proof:instruments-debt), lista o resto.',
    },
  },

  {
    id: 'hotswap',
    proofs: ['hotswap', 'hotswap-gap', 'hotswap-rate', 'hotswap-lost', 'hotswap-asio'],
    en: {
      title: 'Changing the audio device in the middle of a song',
      row: 'Changing the audio device',
      juceShort: 'The device stops, and the callback is prepared again for the next one',
      mangueShort: 'Prepared once; the output changes under the engine with a crossfade or a short faded gap, the engine’s output the same bit for bit',
      problem:
        'Plugging in headphones, moving from the laptop’s speakers to an interface, or a driver that asks to be reset should not stop the music. In most applications it does: the audio stops, everything is prepared again for the new device, and some programs ask to be restarted.',
      juce:
        'An [AudioIODeviceCallback](https://docs.juce.com/master/classAudioIODeviceCallback.html) is told `audioDeviceStopped` when its device stops, and `audioDeviceAboutToStart`, with the new device, before it starts again, which its documentation says also happens when the device restarts for a new sample rate or block size. Changing the device through [AudioDeviceManager::setAudioDeviceSetup](https://docs.juce.com/master/classAudioDeviceManager.html) goes through that pair, and `audioDeviceAboutToStart` is where a callback that plays a processor, such as [AudioProcessorPlayer](https://docs.juce.com/master/classAudioProcessorPlayer.html), has to prepare it again for the new rate and block size. Nothing in the documented classes keeps one device playing while the next one starts, or runs the processing at a rate of its own while the device’s rate changes.',
      mangue: [
        '`DeviceManager::start_engine` fixes the engine’s rate, largest block and channels once, as an `EngineFormat`, and prepares the callback once. Only the edge between the engine and the device adapts: a device at the engine’s rate gets its output directly, with nothing copied or delayed; one at another rate gets it through a resampler whose output does not depend on the device’s blocks (0.7 ms more); other channel counts are repeated or folded.',
        'When the backend can run two streams and the output device changes, the new device fades in while the old one fades out, the old device copying what the engine renders into a wait-free ring until it hands the engine itself over; no audio thread allocates, locks or waits. When it cannot (one ASIO driver per process, the same device opened again, a driver’s reset request), the old device fades out and closes, and the new one opens and fades in, the engine waiting so that no frame is lost. A lost device is replaced the same way, without the fade-out.',
      ],
      check: [
        '[the_song_goes_on_while_the_device_changes_under_it](proof:hotswap) plays a song through the manager on four simulated sound cards, each called on its own clock in real time, and changes the output under it four times: to another device at the same rate with a smaller block, to one at 44.1 kHz, through that driver’s reset request, and to one with four channels and blocks of 64 frames. The callback is prepared once and never released; what it renders is the song rendered with no device, bit for bit; each device at the engine’s rate plays one unbroken stretch of the engine’s frames, exactly, scaled only inside its fades; a reference tone never breaks on any device, the level never dips while two devices play, and the reset leaves under 100 ms of silence (9 ms when it was measured); the devices’ thread never touches the heap.',
        '[devices_that_cannot_overlap_hand_over_after_a_short_faded_gap](proof:hotswap-gap) shows the second device starting on the very frame after the last one the first played, [a_device_at_another_rate_plays_the_same_whatever_its_blocks](proof:hotswap-rate) the resampled edge’s independence from the device’s blocks, and [a_lost_device_is_replaced_without_preparing_again](proof:hotswap-lost) a device unplugged. On real drivers, [the_engine_runs_on_while_the_driver_changes](proof:hotswap-asio) in `manguebyte-pro-io` moves a running engine from FlexASIO to ASIO4ALL and back, playing silence; it runs only on a machine where both drivers are installed, so not in CI.',
      ],
      limit:
        'Two devices crossfade only when the backend can run both and they are different devices; otherwise the gap is as long as the backend takes to close one stream and open the next: 90 ms for the WASAPI device of the machine it was tried on, and 0.37 to 2.6 s between two ASIO drivers, which load slowly. During a gap the engine waits, so the song resumes late by it. The crossfade has been run on the headless backend only, the machine having one output, and its level can rise by up to 3 dB while the fades are a block apart. [TECH_DEBT item 85](proof:hotswap-debt) lists the rest.',
    },
    pt: {
      title: 'Trocar o dispositivo de áudio no meio da música',
      row: 'Troca do dispositivo de áudio',
      juceShort: 'O dispositivo para, e o callback é preparado de novo para o seguinte',
      mangueShort: 'Preparado uma vez só; a saída troca por baixo do motor com um crossfade ou uma pausa curta com fade, e a saída do motor fica idêntica bit a bit',
      problem:
        'Plugar um fone, passar dos alto-falantes do notebook para uma interface, ou um driver que pede para ser reiniciado não deveria parar a música. Na maioria dos aplicativos para: o áudio cai, tudo é preparado de novo para o dispositivo novo, e alguns programas pedem para ser reiniciados.',
      juce:
        'Um [AudioIODeviceCallback](https://docs.juce.com/master/classAudioIODeviceCallback.html) recebe `audioDeviceStopped` quando o seu dispositivo para, e `audioDeviceAboutToStart`, com o dispositivo novo, antes de ele voltar a tocar, o que, segundo a documentação, também acontece quando o dispositivo reinicia por causa de uma nova taxa de amostragem ou de um novo tamanho de bloco. Trocar o dispositivo por [AudioDeviceManager::setAudioDeviceSetup](https://docs.juce.com/master/classAudioDeviceManager.html) passa por esse par, e é em `audioDeviceAboutToStart` que um callback que toca um processador, como o [AudioProcessorPlayer](https://docs.juce.com/master/classAudioProcessorPlayer.html), tem de prepará-lo de novo para a nova taxa e o novo tamanho de bloco. Nada nas classes documentadas mantém um dispositivo tocando enquanto o seguinte começa, nem roda o processamento numa taxa própria enquanto a do dispositivo muda.',
      mangue: [
        '`DeviceManager::start_engine` fixa uma vez só a taxa, o maior bloco e os canais do motor, num `EngineFormat`, e prepara o callback uma vez só. Só a borda entre o motor e o dispositivo se adapta: um dispositivo na taxa do motor recebe a saída dele diretamente, sem nada copiado nem atrasado; um em outra taxa a recebe por um reamostrador cuja saída não depende dos blocos do dispositivo (0,7 ms a mais); outras quantidades de canais são repetidas ou somadas.',
        'Quando o backend consegue rodar dois streams e o dispositivo de saída muda, o novo entra em fade-in enquanto o antigo sai em fade-out, e o antigo vai copiando o que o motor renderiza num anel wait-free até lhe passar o próprio motor; nenhuma thread de áudio aloca, trava ou espera. Quando não consegue (um driver ASIO por processo, o mesmo dispositivo aberto de novo, um pedido de reinício do driver), o antigo sai em fade-out e fecha, e o novo abre e entra em fade-in, com o motor esperando para que nenhum frame se perca. Um dispositivo perdido é substituído do mesmo jeito, sem o fade-out.',
      ],
      check: [
        '[the_song_goes_on_while_the_device_changes_under_it](proof:hotswap) toca uma música pelo gerenciador em quatro placas de som simuladas, cada uma chamada no seu próprio relógio em tempo real, e troca a saída por baixo dela quatro vezes: para outro dispositivo na mesma taxa com um bloco menor, para um a 44,1 kHz, pelo pedido de reinício desse driver e para um com quatro canais e blocos de 64 frames. O callback é preparado uma vez e nunca liberado; o que ele renderiza é a música renderizada sem dispositivo, bit a bit; cada dispositivo na taxa do motor toca um trecho contínuo dos frames do motor, exatamente, alterado só dentro dos seus fades; um tom de referência nunca se interrompe em nenhum dispositivo, o nível nunca cai enquanto dois dispositivos tocam, e o reinício deixa menos de 100 ms de silêncio (9 ms na medição); a thread dos dispositivos nunca toca no heap.',
        '[devices_that_cannot_overlap_hand_over_after_a_short_faded_gap](proof:hotswap-gap) mostra o segundo dispositivo começando exatamente no frame seguinte ao último que o primeiro tocou, [a_device_at_another_rate_plays_the_same_whatever_its_blocks](proof:hotswap-rate) mostra que a borda reamostrada não depende dos blocos do dispositivo, e [a_lost_device_is_replaced_without_preparing_again](proof:hotswap-lost) trata de um dispositivo desplugado. Com drivers de verdade, [the_engine_runs_on_while_the_driver_changes](proof:hotswap-asio), no `manguebyte-pro-io`, passa um motor em execução do FlexASIO para o ASIO4ALL e de volta, tocando silêncio; ele só roda numa máquina com os dois drivers instalados, e portanto não no CI.',
      ],
      limit:
        'Dois dispositivos só fazem crossfade quando o backend consegue rodar os dois e eles são dispositivos diferentes; nos outros casos a pausa dura o que o backend leva para fechar um stream e abrir o seguinte: 90 ms no dispositivo WASAPI da máquina em que foi testado, e de 0,37 a 2,6 s entre dois drivers ASIO, que carregam devagar. Durante a pausa o motor espera, então a música volta atrasada por esse tempo. O crossfade só rodou no backend sem hardware, porque a máquina tem uma saída só, e o nível dele pode subir até 3 dB enquanto os fades estão a um bloco de distância. O [TECH_DEBT, item 85](proof:hotswap-debt), lista o resto.',
    },
  },
];

// What JUCE has today and Manguebyte does not: the last section of
// BEYOND_JUCE.md.
export const juceAhead = {
  en: [
    'a complete GUI toolkit, with plugin editor windows on macOS and Linux as well as Windows (Manguebyte’s editors open on Windows only so far, and only one has been opened by hand in a DAW);',
    'the AUv3 and AAX plugin formats, and Audio Units checked in real hosts (Manguebyte’s AUv2 wrapper has only its own tests and `auval` in CI);',
    'hosting of AU plugins and the editors of hosted plugins (Manguebyte hosts CLAP, VST 3 and LV2 plugins, without their editors, and scans for them);',
    'SIMD wrappers and lookup tables among its DSP utilities;',
    'iOS and Android (Manguebyte’s audio and device crates are built for both in CI, but not run on a device);',
    'documentation, tutorials and a large community.',
  ],
  pt: [
    'um toolkit de interface gráfica completo, com janelas de editor de plugin no macOS e no Linux além do Windows (os editores do Manguebyte só abrem no Windows por enquanto, e só um foi aberto à mão numa DAW);',
    'os formatos de plugin AUv3 e AAX, e Audio Units conferidos em hosts de verdade (o wrapper AUv2 do Manguebyte só tem os próprios testes e o `auval` no CI);',
    'hospedagem de plugins AU e os editores dos plugins hospedados (o Manguebyte hospeda plugins CLAP, VST 3 e LV2, sem os editores, e faz a varredura deles);',
    'wrappers de SIMD e tabelas de consulta entre os utilitários de DSP;',
    'iOS e Android (os crates de áudio e de dispositivos do Manguebyte são compilados para os dois no CI, mas não rodaram num aparelho);',
    'documentação, tutoriais e uma comunidade grande.',
  ],
};
