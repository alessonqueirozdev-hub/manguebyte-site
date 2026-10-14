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
        'The guarantee covers what follows events. A value that a processor reads once per block changes at block boundaries by definition.',
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
        'A garantia cobre o que segue os eventos. Um valor que o processador lê uma vez por bloco muda nas bordas do bloco, por definição.',
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
    proofs: ['per-note', 'per-note-overlap', 'per-note-clap'],
    en: {
      title: 'Per-note expression and modulation',
      row: 'Per-note control',
      juceShort: 'Through MPE channels',
      mangueShort: 'Per-note expression and modulation events',
      problem:
        'Bending, swelling or filtering one note of a chord needs a way to address that note. So does a host’s modulation system that wants to move a parameter for one voice without overwriting the value the user set.',
      juce:
        'Per-note control is available through MPE, which gives each note its own MIDI channel. The processor model has no note expression events and no modulation distinct from changing a parameter’s value, which is why the third-party CLAP wrapper adds its own extension interfaces for them ([clap-juce-extensions](https://github.com/free-audio/clap-juce-extensions)).',
      mangue:
        'Notes have an identity (`NoteRef`: channel, key and an optional id), so two notes on the same key can overlap. `NoteExpression` shapes one note. `ParamModulation` adds an offset on top of a parameter, optionally for a single note, and never changes the stored value, so it cannot fight automation or end up in a saved preset. `Synth` routes each to the voice that is playing the note.',
      check: [
        '[expression_and_modulation_reach_one_note_and_parameters_reach_all](proof:per-note) and [notes_with_identifiers_overlap_on_one_key_and_end_separately](proof:per-note-overlap) in the synth; [an_instrument_takes_notes_expression_modulation_and_a_sidechain](proof:per-note-clap) does it through CLAP.',
      ],
      limit:
        'MIDI 2.0 packets and MPE zone handling are not converted to these events yet, and per-note *automation* from a CLAP host is not accepted yet.',
    },
    pt: {
      title: 'Expressão e modulação por nota',
      row: 'Controle por nota',
      juceShort: 'Por canais MPE',
      mangueShort: 'Eventos de expressão e de modulação por nota',
      problem:
        'Fazer bend, crescer ou filtrar uma só nota de um acorde exige um jeito de endereçar essa nota. O mesmo vale para o sistema de modulação de um host que queira mover um parâmetro em uma voz sem sobrescrever o valor que o usuário definiu.',
      juce:
        'O controle por nota existe por meio do MPE, que dá a cada nota um canal MIDI próprio. O modelo de processador não tem eventos de expressão de nota nem modulação distinta de mudar o valor de um parâmetro, e é por isso que o wrapper CLAP de terceiros acrescenta interfaces de extensão próprias para isso ([clap-juce-extensions](https://github.com/free-audio/clap-juce-extensions)).',
      mangue:
        'As notas têm identidade (`NoteRef`: canal, tecla e um id opcional), então duas notas na mesma tecla podem se sobrepor. `NoteExpression` molda uma nota. `ParamModulation` soma um deslocamento a um parâmetro, opcionalmente para uma única nota, e nunca muda o valor guardado; por isso não briga com a automação nem vai parar num preset salvo. `Synth` encaminha cada um à voz que está tocando a nota.',
      check: [
        '[expression_and_modulation_reach_one_note_and_parameters_reach_all](proof:per-note) e [notes_with_identifiers_overlap_on_one_key_and_end_separately](proof:per-note-overlap) no sintetizador; [an_instrument_takes_notes_expression_modulation_and_a_sidechain](proof:per-note-clap) faz o mesmo pelo CLAP.',
      ],
      limit:
        'Pacotes MIDI 2.0 e o tratamento de zonas MPE ainda não são convertidos nesses eventos, e a *automação* por nota vinda de um host CLAP ainda não é aceita.',
    },
  },

  {
    id: 'clap',
    proofs: ['ci-clap', 'export-duck'],
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
        '[The CI job](proof:ci-clap) builds both example plugins and runs the CLAP project’s own [clap-validator](https://github.com/free-audio/clap-validator) on them. At the commit this site was written against, the validator ran 44 tests on each: the instrument passed 35 and skipped 9, the effect passed 33 and skipped 11, and neither failed any. The skipped ones concern features not implemented yet or another platform.',
      ],
      limit:
        'No plugin GUI extension yet, no 64-bit audio, no presets. VST 3 is the only other format so far, also without an editor: JUCE’s AU, AAX and LV2 support has no counterpart here yet.',
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
        '[O job de CI](proof:ci-clap) compila os dois plugins de exemplo e roda neles o [clap-validator](https://github.com/free-audio/clap-validator), do próprio projeto CLAP. No commit em que este site foi escrito, o validador rodou 44 testes em cada um: o instrumento passou em 35 e pulou 9, o efeito passou em 33 e pulou 11, e nenhum dos dois falhou em algum. Os pulados tratam de recursos ainda não implementados ou de outra plataforma.',
      ],
      limit:
        'Ainda sem a extensão de interface gráfica, sem áudio em 64 bits e sem presets. O VST 3 é o único outro formato por enquanto, também sem editor: o suporte do JUCE a AU, AAX e LV2 ainda não tem equivalente aqui.',
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
    proofs: ['licence-mit', 'licence-apache'],
    en: {
      title: 'Licence',
      row: 'Licence',
      juceShort: 'AGPLv3 or commercial',
      mangueShort: 'MIT or Apache-2.0',
      juce: 'JUCE is offered under the AGPLv3 or a commercial licence.',
      mangue:
        'Manguebyte is under MIT or Apache-2.0, at your option: no copyleft, no per-seat fee and no splash screen, for open and closed products alike.',
      check: ['The two licence texts in the repository: [MIT](proof:licence-mit) and [Apache-2.0](proof:licence-apache).'],
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
];

// What JUCE has today and Manguebyte does not: the last section of
// BEYOND_JUCE.md.
export const juceAhead = {
  en: [
    'a complete GUI toolkit, with plugin editor windows in every format;',
    'Audio Unit, AAX and LV2 plugin formats;',
    'plugin hosting;',
    'many more DSP building blocks, and readers for compressed audio formats;',
    'iOS and Android;',
    'documentation, tutorials and a large community.',
  ],
  pt: [
    'um toolkit de interface gráfica completo, com janelas de editor de plugin em todos os formatos;',
    'os formatos de plugin Audio Unit, AAX e LV2;',
    'hospedagem de plugins;',
    'muito mais blocos de DSP, e leitores de formatos de áudio comprimidos;',
    'iOS e Android;',
    'documentação, tutoriais e uma comunidade grande.',
  ],
};
