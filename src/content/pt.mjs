// Todas as frases do site, em português do Brasil.
//
// Este arquivo tem a mesma forma de en.mjs, chave por chave; o build falha se
// os dois diferirem. O texto usa a marcação descrita em src/lib/html.mjs.
// `{commit}` vira o hash curto do commit fixado do framework e `{juce}` a
// versão do JUCE que as comparações descrevem.

export default {
  site: {
    name: 'Manguebyte',
    fullName: 'Manguebyte Audio Framework',
    tagline: 'Um framework de áudio para Rust',
    description:
      'O Manguebyte Audio Framework é áudio de código aberto para Rust, publicado no crates.io: DSP e instrumentos, medição, MIDI, arquivos, dispositivos, editores de plugin, plugins CLAP, VST 3, LV2 e Audio Unit, e hospedagem. Automação com precisão de amostra, saída independente do tamanho do bloco e processamento sem alocação, cada um garantido por um teste.',
  },

  nav: {
    label: 'Principal',
    home: 'Início',
    beyond: 'Além do JUCE',
    features: 'Recursos',
    start: 'Como começar',
    roadmap: 'Roadmap',
    name: 'O nome',
    contribute: 'Contribuir',
    aratu: 'Aratu',
    github: 'GitHub',
    menu: 'Menu',
    skip: 'Ir para o conteúdo',
    theme: 'Alternar entre o tema claro e o escuro',
    otherLanguage: 'English',
    otherLanguageHint: 'Read this page in English',
    logoAlt: 'Manguebyte: um caranguejo de fones de ouvido tocando guitarra',
  },

  code: {
    copy: 'Copiar',
    copied: 'Copiado',
    excerpt: 'Trecho de [{file}]({url}) no commit `{commit}`.',
    whole: 'De [{file}]({url}) no commit `{commit}`, como está no arquivo.',
    gaps: 'As linhas que começam com `// ...` marcam o que ficou de fora.',
  },

  status: {
    done: 'Pronto',
    wip: 'Em andamento',
    todo: 'Não começado',
    none: 'Fora do plano',
  },

  footer: {
    statusTitle: 'Em que pé está o projeto',
    status:
      'O Manguebyte é jovem. A versão {version} é a primeira publicada no crates.io. O que existe está testado e dá para usar, mas cobre uma parte pequena do caminho, a API vai mudar antes da versão 1.0, e dos editores de plugin só um foi aberto num host à mão.',
    sourceTitle: 'De onde este site tira os fatos',
    source:
      'Cada afirmação, cada link de prova e cada trecho de código daqui foi lido do repositório do framework no commit [{commit}]({commitUrl}) ({date}), em que [os {ciJobs} jobs de CI passaram]({ciUrl}). Esse commit vem bem depois da [versão {version}]({releaseUrl}), no commit `{releaseCommit}`, então nem tudo o que se descreve aqui já está no crates.io: a hospedagem de Audio Units, o MIDI 2.0 pela saída dos próprios sistemas, a codificação de Opus, o processamento espectral, as operações vetoriais, o mapa de andamento, as extensões de plugin mais novas e os crates `manguebyte-state` e `manguebyte-ump-io`, entre outras coisas, por enquanto só estão no repositório, listados em “Unreleased” no [changelog](repo:CHANGELOG.md) dele. O repositório é a autoridade; se os dois divergirem, é o site que está desatualizado.',
    legalTitle: 'Nomes e marcas',
    legal:
      'O Manguebyte é um projeto independente. Não é afiliado, patrocinado nem endossado pelos criadores do JUCE, pela Steinberg, pela Apple, pela Avid, pela Cockos ou pelo projeto CLAP. JUCE é marca do seu respectivo dono e CLAP é o nome do seu próprio projeto; os dois são citados apenas para descrever o que este framework pretende ser e com o que ele trabalha. VST é marca registrada da Steinberg Media Technologies GmbH. ASIO é marca da Steinberg Media Technologies GmbH, registrada na Europa e em outros países. Audio Units, Mac e macOS são marcas da Apple Inc. AAX e Pro Tools são marcas da Avid Technology, Inc. REAPER é marca da Cockos Incorporated.',
    unrelated: 'Este projeto também não tem relação com a empresa de nome parecido que opera o manguebyte.com.',
    licenceTitle: 'Licença',
    licence: 'O framework é licenciado sob [MIT](proof:licence-mit) ou [Apache-2.0](proof:licence-apache), à sua escolha. A única exceção é o crate opcional de ASIO, o `manguebyte-pro-io`, que está sob a [GPLv3](proof:pro-io-licence).',
    contactTitle: 'Contato',
    contact: 'Dúvidas e bugs vão para as [issues]({issuesUrl}). Para falar direto com o autor, escreva para [{email}](mailto:{email}).',
    privacy: 'Sem cookies, sem rastreadores, sem requisições a servidores de terceiros.',
    colophon:
      'Os títulos estão em Londrina Solid, desenhada por Marcelo Magalhães a partir dos letreiros pintados à mão das ruas brasileiras. O texto e o código estão em Atkinson Hyperlegible Next e Mono, do Braille Institute. As três estão sob a SIL Open Font License.',
    madeIn: 'Feito no Recife, Brasil.',
  },

  notFound: {
    title: 'Página não encontrada',
    heading: 'Aqui só tem lama.',
    body: 'A página que você pediu não existe, ou mudou de lugar.',
    back: 'Voltar para o início',
  },

  home: {
    title: 'Manguebyte Audio Framework: áudio para Rust, testado, não prometido',
    kicker: 'Framework de áudio de código aberto para Rust',
    heading: ['Testado,', 'não prometido.'],
    lede:
      'O Manguebyte serve para construir plugins e aplicativos de áudio em Rust: DSP e instrumentos, medição, MIDI, arquivos, dispositivos, editores e hospedagem de plugins, e exportação nativa para CLAP, VST 3, LV2 e Audio Unit com uma linha cada. A meta é ser para o Rust o que o JUCE é para o C++, e depois ir além. Cada afirmação deste site leva ao teste que a prova.',
    ctaStart: 'Como começar',
    ctaSource: 'Ler o código',
    young:
      '**Versão {version}, a primeira no [crates.io]({crateUrl}).** O projeto é jovem e a API vai mudar antes da versão 1.0. Os editores de plugin abrem em janelas Win32 e são testados no CI; à mão, até agora só um foi aberto num host: o do Mangue Pluck, no REAPER. [Veja o que falta](/features/#missing).',
    ring: 'Caranguejos com cérebro · Crabs with brains · ',

    proof: {
      heading: 'Verde em todo commit',
      caption:
        'São testes e resultados de validadores reais, não uma montagem. Todos passaram no [CI do commit {commit}]({ciUrl}). Cada linha leva ao código.',
      command: 'cargo test --workspace',
      ok: 'ok',
      validators: [
        { name: 'clap-validator · Mangue Pluck.clap', result: '37 passed, 0 failed, 7 skipped', proof: 'ci-clap' },
        { name: 'clap-validator · Mangue Duck.clap', result: '36 passed, 0 failed, 8 skipped', proof: 'ci-clap' },
        { name: 'VST 3 validator · Windows, Linux, macOS', result: '537 passed, 0 failed', proof: 'ci-vst3' },
        { name: 'auval · Mangue Pluck e Mangue Duck, macOS', result: 'AU VALIDATION SUCCEEDED', proof: 'ci-au' },
      ],
    },

    proven: {
      heading: 'Quatro coisas que ele prova a cada commit',
      intro:
        'Igualar o JUCE é a linha de base. Estes são pontos em que o Manguebyte já faz algo que o JUCE {juce} não faz, cada um sustentado por um teste que roda no CI. [A lista completa tem dezessete](/beyond-juce/), com a fonte de tudo o que se diz sobre o JUCE e o limite de cada afirmação.',
      juceLabel: 'No JUCE {juce}',
      proofLabel: 'Prova',
      limitLabel: 'Limite',
      more: 'As dezessete afirmações, com provas e limites',
      cards: [
        {
          claim: 'automation',
          title: 'A automação cai na amostra exata',
          body:
            'Cada mudança de parâmetro chega com o frame em que cai e é aplicada nesse frame: no harness de testes, pelo CLAP e pelo VST 3, em que todos os pontos de todas as filas de automação são entregues.',
          juce: 'O processador lê cada parâmetro uma vez por bloco.',
          limit: 'Cabe ao processador usar ou não esse tempo. Ler um valor uma vez por bloco continua válido, e custa menos.',
          proofs: ['automation-harness', 'automation-clap', 'automation-vst3'],
        },
        {
          claim: 'block-size',
          title: 'O mesmo som em qualquer tamanho de bloco',
          body:
            'Uma música renderizada com seis padrões de bloco, de 64 frames constantes a um irregular `1, 511, 7, 300, 64, 2, 129`, tem de sair idêntica bit a bit. Na primeira vez em que rodou, o teste falhou e revelou um bug de verdade.',
          juce: 'Se o som depende ou não do buffer do host fica por conta de cada plugin.',
          limit: 'Cobre o que segue os eventos. Um valor lido uma vez por bloco muda nas bordas do bloco, por definição.',
          proofs: ['block-size'],
        },
        {
          claim: 'real-time',
          title: 'Sem heap na thread de áudio, ou o CI falha',
          body:
            'Os testes trocam o alocador global por um que conta. Se algum processador, ou o wrapper CLAP, alocar ou liberar memória durante o processamento, o build fica vermelho. Isso já pegou um mutex que aloca no macOS.',
          juce: 'A segurança em tempo real é uma regra da documentação.',
          limit: 'É um teste que roda, não uma prova em tempo de compilação. Pega uso do heap nos caminhos que os testes exercitam.',
          proofs: ['no-heap', 'no-heap-clap'],
        },
        {
          claim: 'clap',
          title: 'CLAP e VST 3 com uma linha cada, conferidos pelos próprios validadores',
          body:
            '`export_clap!` e `export_vst3!` transformam o mesmo plugin nos dois formatos. O CI roda o validador do projeto CLAP e o da Steinberg num instrumento e num efeito, e nenhum dos dois reprova um teste; os 537 da Steinberg passam em Windows, Linux e macOS, inclusive os testes em precisão dupla. Os dois também foram [testados à mão no REAPER](proof:host-tests), e `export_lv2!` e `export_au!` acrescentam o LV2 e o Audio Unit, que passa no `auval` da Apple no CI.',
          juce: 'A exportação para CLAP não existe de forma nativa.',
          limit: 'Os editores são testados no CI; à mão, só o editor CLAP do Mangue Pluck foi aberto num host. O LV2 só rodou no host do próprio framework, e nenhuma DAW carregou os Audio Units ainda. Sem AUv3 nem AAX.',
          proofs: ['ci-clap', 'ci-vst3', 'ci-au'],
        },
      ],
    },

    code: {
      heading: 'Um plugin inteiro, e depois uma linha por formato',
      intro:
        'Este é o efeito de exemplo do repositório: um ducker com sidechain. Ele se descreve, divide cada bloco nos seus eventos e é exportado em quatro formatos. Nada do código abaixo foi escrito para esta página.',
      notes: [
        {
          title: 'Uma descrição só',
          body: '`INFO` e `LAYOUT` são constantes. A mesma descrição vira o descritor CLAP, a classe VST 3, cujo id é igual em todas as plataformas, os arquivos Turtle do plugin LV2 e os códigos do Audio Unit, calculados por hash a partir do id do plugin.',
        },
        {
          title: 'Eventos no seu frame',
          body: '`split_at_events` renderiza até cada evento, aplica-o e segue em frente, sem copiar nem alocar. Essa chamada é tudo o que o plugin faz para ter automação com precisão de amostra.',
        },
        {
          title: 'Quatro formatos, quatro linhas',
          body: 'As macros são a integração inteira, e `editor` entrega aos wrappers o editor do plugin. O `cargo mangue` gera depois um pacote `.clap`, um `.vst3` e um `.lv2` no layout de cada sistema, e, num Mac, um `.component`.',
        },
      ],
      testHeading: 'E um teste dele, sem host',
      testIntro:
        '`Harness` toca áudio, um sidechain e automação no plugin dentro de um teste unitário comum. Este confere que uma mudança de profundidade cai no frame 1.000 do bloco, e não um frame antes.',
    },

    today: {
      heading: 'O que já existe',
      intro: 'Vinte e sete crates que funcionam juntos, cada um utilizável sozinho, um deles uma ferramenta de linha de comando. Vinte e cinco estão no crates.io, com a documentação no docs.rs; o `manguebyte-state` e o `manguebyte-ump-io` vieram depois da versão {version} e só estão no repositório. O `manguebyte-core` não tem nenhuma dependência.',
      more: 'Todos os recursos, por área',
    },

    missing: {
      heading: 'Onde o JUCE está à frente',
      intro:
        'O JUCE tem mais de vinte anos de uso em produção, e muito mais abrangência. Hoje ele tem, e o Manguebyte não:',
      outro: 'O [roadmap](/roadmap/) diz o que existe e em que ordem essa distância está sendo fechada.',
    },

    name: {
      heading: 'Caranguejos com cérebro',
      body: [
        'O nome vem do Recife, a cidade do Nordeste do Brasil onde este projeto nasceu. O Recife foi construído sobre manguezais.',
        'No começo dos anos 1990, um grupo de músicos da cidade respondeu à crise com um manifesto, *Caranguejos com Cérebro*: ligar as raízes ricas e lamacentas da cultura da região à rede global de ideias. A imagem que escolheram foi uma antena parabólica fincada na lama do mangue.',
      ],
      more: 'A história do nome',
    },

    ecosystem: {
      heading: 'O ecossistema Manguebyte',
      intro: 'Mais dois projetos do Recife crescem do mesmo mangue, feitos para rodar sobre o Manguebyte.',
      more: 'Mais sobre o Aratu',
    },

    start: {
      heading: 'Comece com uma dependência',
      intro: 'O Manguebyte está no [crates.io]({crateUrl}), com a documentação no [docs.rs]({docsUrl}):',
      tool: 'Ou instale a ferramenta de linha de comando e deixe que ela escreva um crate de plugin para você:',
      guide: 'O guia de primeiros passos',
      repo: 'O repositório no GitHub',
    },
  },

  beyond: {
    title: 'Onde o Manguebyte vai além do JUCE',
    description:
      'Dezessete pontos em que o Manguebyte já faz algo que o JUCE não faz, cada um com o problema, o que o JUCE faz, o que o Manguebyte faz, o teste que prova e o limite da afirmação.',
    kicker: 'Além do JUCE',
    heading: 'Onde ele já vai além do JUCE',
    intro: [
      'O JUCE é a referência do que um framework de áudio completo contém, e a primeira meta do Manguebyte é igualá-lo. Esta página trata da segunda meta: os pontos em que o Manguebyte já faz algo que o JUCE não faz, e como cada afirmação pode ser conferida.',
      'O JUCE está muito à frente em abrangência, e [a última seção](#ahead) diz onde. Nada no Manguebyte contém código do JUCE: veja o [ADR 0004](repo:docs/adr/0004-juce-as-reference.md).',
    ],
    rulesHeading: 'Três regras mantêm esta página honesta',
    rules: [
      '**Toda afirmação aponta para um teste.** Se não dá para verificar rodando algo do repositório, não entra na lista.',
      '**Toda frase sobre o JUCE tem fonte**, e descreve o branch `master` do JUCE na versão {juce} (outubro de 2026). O JUCE continua andando; a equipe anunciou um “AudioProcessor v2” que mira vários destes pontos, então alguns deles podem mudar em versões futuras.',
      '**Os limites vêm ao lado da afirmação**, em vez de ficarem para o leitor descobrir.',
    ],
    summaryHeading: 'Resumo',
    summaryCaption: 'As dezessete afirmações. Cada linha leva à seção correspondente, mais abaixo.',
    table: { claim: 'Afirmação', juce: 'JUCE {juce}', mangue: 'Manguebyte', checked: 'Conferido por' },
    labels: {
      problem: 'O problema',
      juce: 'No JUCE',
      mangue: 'No Manguebyte',
      check: 'Confira',
      limit: 'Limite',
      proofs: 'As provas',
      showTest: 'Mostrar o teste',
    },
    aheadHeading: 'Onde o JUCE está à frente',
    aheadIntro:
      'O JUCE está em produção há mais de vinte anos, e isso aparece. Hoje ele tem, e o Manguebyte não:',
    aheadOutro:
      'O [JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) acompanha essa distância módulo a módulo, e o [roadmap](/roadmap/) diz em que ordem ela está sendo fechada.',
    sourceNote:
      'Esta página segue o [docs/BEYOND_JUCE.md](repo:docs/BEYOND_JUCE.md) do repositório no commit `{commit}`. Quatro limites dizem um pouco mais, ou algo mais novo, a partir de outros documentos do repositório: o da seção 2 cita o que o teste no REAPER encontrou; o da seção 5 acrescenta, a partir do [TECH_DEBT.md](repo:docs/TECH_DEBT.md), como o CI confere as portas que falam MIDI 2.0, e que nenhum aparelho MIDI 2.0 foi experimentado; o da seção 6 diz, como o README, que o lilv carrega os plugins LV2 no CI; e o da seção 9 diz, também como o README, que um crate opcional está sob a GPLv3.',
  },

  features: {
    title: 'Recursos',
    description:
      'O que o Manguebyte contém hoje, área por área: tipos centrais, DSP e instrumentos, um grafo de processamento vivo, parâmetros, plugins CLAP, VST 3, LV2 e Audio Unit, hospedagem, MIDI, arquivos de áudio e dispositivos. E o que ele ainda não contém.',
    kicker: 'Recursos',
    heading: 'O que existe hoje',
    intro: [
      'Vinte e sete crates, projetados para funcionar juntos e utilizáveis cada um por si: use o framework inteiro, ou só o tipo de buffer. Tudo o que está listado aqui está no repositório no commit `{commit}` e coberto pelos testes dele, mas nem tudo foi publicado: vinte e cinco dos crates estão no [crates.io]({crateUrl}) na versão {version}, com a documentação no [docs.rs]({docsUrl}), e o que veio depois dessa versão, inclusive dois crates, está listado em “Unreleased” no [changelog](repo:CHANGELOG.md). Para usar isso agora, dependa do repositório.',
      'Isso é uma parte pequena do caminho. [O que falta](#missing) está listado com a mesma clareza.',
    ],
    cratesLabel: 'Crates',
    facade: 'O crate `manguebyte` reúne dezenove dos outros sob um nome só, com um prelude; os formatos de plugin, os editores, a hospedagem e o sampler ficam atrás de features. Sete ficam de fora: o `manguebyte-gfx` e o `manguebyte-window`, sobre os quais os editores são construídos, o `manguebyte-ump-io`, que a saída de MIDI do crate de dispositivos usa, o `manguebyte-state`, do estado do aplicativo, o motor para o navegador `manguebyte-web`, a ferramenta de linha de comando e o `manguebyte-pro-io`.',
    missingHeading: 'O que ainda não existe',
    missingIntro: 'Nada disto existe hoje no Manguebyte. Se você precisa de algum destes itens agora, o JUCE tem.',
    missingOutro: 'O [roadmap](/roadmap/) lista cada item planejado e a sua situação, e [onde o JUCE está à frente](/beyond-juce/#ahead) diz o mesmo pelo outro lado.',
  },

  start: {
    title: 'Como começar',
    description:
      'Adicione o Manguebyte do crates.io a um projeto Rust, comece um plugin com a ferramenta de linha de comando, faça um som, gere o plugin de exemplo como CLAP e VST 3, toque sem host e teste num teste unitário.',
    kicker: 'Como começar',
    heading: 'Do zero a um plugin',
    intro: [
      'Tudo nesta página vem do README do repositório e dos seus dois plugins de exemplo, como estão no commit `{commit}`. Esse commit vem bem depois da [versão {version}]({releaseUrl}), mas os dois plugins e o início rápido do README são os mesmos da versão publicada.',
      'Antes de construir em cima dele: o Manguebyte é jovem, a {version} é a primeira versão publicada, e **a API vai mudar antes da versão 1.0**. Os editores de plugin existem e são testados no CI; à mão, por enquanto só o editor CLAP do Mangue Pluck foi aberto num host.',
    ],
    steps: {
      before: {
        heading: 'Antes de começar',
        body: [
          'Você precisa de um toolchain Rust estável, versão 1.85 ou mais nova.',
          'No Linux, o backend de dispositivos precisa dos cabeçalhos de desenvolvimento do ALSA, e o host JACK (feature `jack`), dos do JACK (`libjack-jackd2-dev`):',
        ],
      },
      dependency: {
        heading: 'Adicione a dependência',
        body: [
          'O Manguebyte está no [crates.io]({crateUrl}), e a documentação de cada crate está no [docs.rs]({docsUrl}). Acrescente-o ao seu `Cargo.toml`:',
        ],
        after: 'Para acompanhar o trabalho mais recente do `main`, dependa do repositório com uma dependência `git`, como mostra o [README](repo:README.md).',
      },
      newPlugin: {
        heading: 'Comece um plugin',
        body: [
          'Instale a ferramenta de linha de comando e deixe que ela escreva um crate de plugin. O crate depende da versão que veio com o `cargo mangue`; com `--manguebyte-git` ele acompanha o repositório, e com `--manguebyte-path`, uma cópia local dele.',
        ],
      },
      render: {
        heading: 'Faça um som',
        body: [
          'Uma tupla de processadores é ela mesma um processador. Monte uma voz de sintetizador pondo três deles numa tupla e renderize um segundo dela num arquivo WAV. Não precisa de hardware de áudio.',
        ],
      },
      play: {
        heading: 'Toque ao vivo',
        body: ['O mesmo tipo de cadeia, no dispositivo de saída padrão. A closure roda na thread de áudio.'],
      },
      examples: {
        heading: 'Rode os exemplos',
        body: ['Clone o repositório para rodar os exemplos e gerar os plugins de exemplo:'],
      },
      plugin: {
        heading: 'Gere um plugin',
        body: [
          '[plugins/pluck](repo:plugins/pluck/src/lib.rs) é um instrumento completo num arquivo só: um sintetizador dedilhado de 16 vozes, com expressão e modulação por nota, automação na amostra exata, um reverb e um editor pequeno. [plugins/duck](repo:plugins/duck/src/lib.rs) é o mesmo para um efeito: um ducker com sidechain, uma chave de bypass que não estala e um editor com medidor de redução de ganho. Cada um vira plugin CLAP, VST 3, LV2 e Audio Unit com uma linha por formato.',
          'Transforme qualquer um dos dois em algo que um host consiga carregar com a ferramenta de linha de comando do framework, o `cargo mangue`, que grava um `.clap` e um `.vst3` no layout de cada sistema (com `--format lv2`, um pacote `.lv2`, e num Mac, com `--format au`, um `.component`):',
        ],
        after:
          '`cargo mangue new meu-synth --kind instrument` começa um plugin seu a partir de um modelo; `install` copia um plugin para as pastas de plugins do usuário, e `validate` roda nele os validadores do CLAP e do VST 3 (`validate --format au` roda o `auval` da Apple num `.component`). Os dois exemplos passam por esses validadores a cada commit, e [foram testados à mão no REAPER](proof:host-tests) como CLAP e VST 3 antes de terem editores; depois disso, [o editor CLAP do Mangue Pluck foi aberto lá](proof:host-tests-19).',
      },
      standalone: {
        heading: 'Toque sem host',
        body: [
          'O wrapper standalone roda o instrumento direto na placa de som, com qualquer teclado MIDI conectado. O argumento é o nível em decibéis.',
        ],
      },
      test: {
        heading: 'Teste sem host',
        body: [
          'O mesmo plugin roda dentro de um teste unitário por meio do `Harness`, numa máquina sem placa de som. Este teste do instrumento de exemplo toca um lá e confere, por FFT, que o que sai é 440 Hz.',
        ],
      },
      params: {
        heading: 'Declare os parâmetros',
        body: [
          'Os parâmetros são campos de uma struct: tipados, lock-free, com faixas, unidades e conversão em texto. Esta é a declaração inteira do efeito de exemplo.',
        ],
      },
      next: {
        heading: 'O que ler depois',
        items: [
          '[docs.rs]({docsUrl}): a documentação de cada crate da versão publicada.',
          '[ARCHITECTURE.md](repo:docs/ARCHITECTURE.md): como os crates se encaixam, e qual thread roda o quê.',
          '[Os registros de decisão](repo:docs/adr/): por que os parâmetros não têm listeners, por que há um só fluxo de eventos, e o resto.',
          '[Além do JUCE](/beyond-juce/): o que o framework prova, e o limite de cada afirmação.',
          '[CONTRIBUTING.md](repo:CONTRIBUTING.md): as regras para o código que roda na thread de áudio.',
        ],
      },
    },
  },

  roadmap: {
    title: 'Roadmap e situação',
    description:
      'O que existe no Manguebyte e o que está planejado, fase por fase, e em que pé ele está diante de cada um dos 24 módulos do JUCE.',
    kicker: 'Roadmap',
    heading: 'O que existe e o que está planejado',
    intro: [
      'O Manguebyte pretende se tornar o equivalente completo do JUCE para Rust. Isso é trabalho de anos, então ele está dividido em fases, e cada fase deixa o framework útil para um conjunto maior de projetos que a anterior.',
      '**Nada aqui é promessa nem cronograma.** É uma declaração de direção, e muda conforme as pessoas aparecem e constroem. Se um item interessa a você, [abra uma issue]({issuesUrl}) e diga.',
    ],
    legend: 'Legenda',
    count: '{done} de {total} prontos',
    beyondHeading: 'Além da paridade',
    beyondIntro:
      'Igualar o JUCE é a linha de base, não a linha de chegada. Estes são os pontos em que um framework projetado para Rust pode fazer melhor. São metas: [o que já está provado](/beyond-juce/) tem a sua própria página.',
    parityHeading: 'Diante do JUCE, módulo a módulo',
    parityIntro:
      'O JUCE {juce} tem 24 módulos. Paridade significa a mesma capacidade, não as mesmas classes: onde o Rust ou o seu ecossistema já resolve bem alguma coisa, o plano é não refazer. O [JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) explica cada linha.',
    parityTable: { module: 'Módulo do JUCE', crates: 'Crates do Manguebyte', status: 'Situação' },
    sourceNote:
      'Esta página segue o [ROADMAP.md](repo:ROADMAP.md) e o [docs/JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) no commit `{commit}`.',
  },

  name: {
    title: 'Por que “Manguebyte”?',
    description:
      'O nome vem do Recife e do mangue bit, o movimento que o mundo conheceu como manguebeat: raízes locais ligadas à tecnologia global.',
    kicker: 'O nome',
    heading: 'Por que “Manguebyte”?',
    lede: 'O nome vem do Recife, a cidade do Nordeste do Brasil onde este projeto nasceu.',
    story: [
      'O Recife foi construído sobre manguezais: florestas de maré onde os rios encontram o mar, um dos ecossistemas mais férteis da Terra.',
      'No começo dos anos 1990 a cidade vivia uma crise econômica profunda, e um grupo de músicos locais respondeu com um manifesto chamado *Caranguejos com Cérebro*. A proposta era ligar as raízes ricas e lamacentas da cultura da região à rede global de ideias. A imagem que escolheram foi uma antena parabólica fincada na lama do mangue.',
      'O movimento se chamou **mangue bit**: *mangue* de manguezal, *bit* da unidade de informação digital. A imprensa ouviu “beat”, e o mundo passou a conhecê-lo como **manguebeat**. Bandas como Chico Science & Nação Zumbi e Mundo Livre S/A misturaram maracatu, coco e ciranda com rock, funk, hip-hop e música eletrônica, e mudaram a música brasileira de vez.',
    ],
    fitsHeading: 'O nome serve de mais de um jeito',
    fits: [
      {
        term: 'Mangue',
        body: 'é de onde a gente vem, e é a casa do caranguejo, que é ao mesmo tempo o símbolo do movimento e, por coincidência, o mascote do Rust.',
      },
      {
        term: 'Byte',
        body: 'é o bit crescido: oito deles, a unidade em que o software é escrito de fato. É o nosso aceno ao *mangue bit*, um passo adiante.',
      },
      {
        term: 'Música',
        body: 'É um nome de música para um framework de música, tirado de um movimento que tratava de ligar raízes locais à tecnologia global. É o que o código aberto faz.',
      },
    ],
    logoHeading: 'Por isso o logo é um caranguejo',
    logo: 'Um caranguejo de fones de ouvido e guitarra: um caranguejo com cérebro, fazendo barulho.',
    quote: 'Uma antena parabólica fincada na lama do mangue.',
    quoteSource: 'A imagem do manifesto',
  },

  // Os projetos do ecossistema, mostrados no início e na página do Aratu.
  projects: [
    {
      id: 'manguebyte',
      name: 'Manguebyte',
      status: 'Este framework',
      body: 'O framework de áudio de código aberto para Rust, sob MIT ou Apache-2.0, publicado no crates.io. O Aratu já toca sobre o seu motor para o navegador, e o plugin Aratu Bridge toca essa mesma música numa DAW; o Parabolic será construído sobre ele.',
    },
    {
      id: 'aratu',
      name: 'Aratu',
      status: 'Em desenvolvimento',
      body: 'Uma linguagem de live coding que se lê como música: compassos, tempos e figuras em primeiro lugar, em português, espanhol e inglês. O editor roda no navegador e toca sobre o Manguebyte.',
    },
    {
      id: 'parabolic',
      name: 'Parabolic',
      status: 'Planejado',
      body: 'Uma ferramenta para músicos gravarem os próprios instrumentos e os transformarem em plugins e samplers sem escrever código.',
    },
  ],

  aratu: {
    title: 'Aratu: uma linguagem de live coding que se lê como música',
    description:
      'O Aratu é uma linguagem de live coding para músicos: compassos, tempos e figuras em primeiro lugar, em português, espanhol e inglês. O editor roda no navegador, com um curso de 24 lições, e toca sobre o motor do Manguebyte para o navegador.',
    kicker: 'O ecossistema Manguebyte',
    heading: 'Aratu',
    lede: 'Uma linguagem de live coding que se lê como música: compassos, tempos e figuras em primeiro lugar, em português, espanhol e inglês, no navegador. Em desenvolvimento, e tocando sobre o Manguebyte.',
    status:
      '**Em desenvolvimento.** A linguagem lê, confere e agenda todos os exemplos do livro, e o editor roda no navegador sem instalar nada. Rodar dentro de uma DAW está planejado, e o [Aratu Bridge](#bridge) do Manguebyte é o caminho para chegar lá.',
    mascotAlt: 'Aratu, um caranguejo-do-mangue laranja de fones de ouvido programando música num notebook',
    tryIt: 'Experimente no navegador',
    whatHeading: 'O tempo do jeito que o músico conta',
    what: [
      'O Aratu é uma linguagem e um ambiente de live coding para quem sabe música. Compassos, fórmulas de compasso, figuras e andamento vêm primeiro, para que o que você digita fique disposto no tempo do jeito que um músico já pensa.',
      'Os nomes das notas funcionam em solfejo (dó4 ré4 mi4) tanto quanto em letras, e as próprias palavras-chave podem ser escritas em português, espanhol ou inglês. Quando um compasso não fecha, o Aratu avisa com palavras de músico, em qualquer das três. Hoje ele roda no navegador; rodar dentro de uma DAW, acompanhando o transporte do host, está planejado.',
    ],
    placesHeading: 'Três lugares no editor',
    places: [
      {
        term: 'Aprender',
        body: 'Um curso de 24 lições, do primeiro som a uma peça inteira, feito para a sala de aula: ritmo e fórmulas de compasso, percussão brasileira, melodia e harmonia, dinâmica e forma, andamento e balanço, tocar ao vivo, som e mixagem. Termina num projeto de maracatu. Cada exemplo toca na própria página, e cada exercício é conferido pelo que toca, com o que difere apontado compasso a compasso.',
      },
      {
        term: 'Manual',
        body: 'A linguagem inteira em 21 capítulos, na mesma ordem do curso, com todos os exemplos tocáveis.',
      },
      {
        term: 'Tocar',
        body: 'Um editor livre com mapa rítmico editável, um knob ao lado de cada número de andamento ou de som, e um painel de Sons. Uma mudança feita enquanto toca entra no próximo compasso, ou no próximo tempo. Um modo palco mostra só o código, em tela cheia, para tocar diante do público.',
      },
    ],
    tasteHeading: 'Uma amostra',
    tasteIntro: 'Do README do Aratu. Um espaço separa os tempos, símbolos escritos juntos dividem o mesmo tempo (`cc` são duas colcheias), `_` sustenta e `-` é pausa; os acordes se escrevem como numa cifra, e as batidas com `d` e `u`.',
    engineHeading: 'Construído sobre o Manguebyte',
    engine:
      'O editor toca pelo `manguebyte-web`, o motor do Manguebyte para o navegador: todas as vozes do painel de Sons, de instrumentos com samples a cordas modeladas, FM, órgão, baixo acid e synth, os efeitos de cada parte e o master com o limitador de true peak. No commit fixado do Aratu, as linhas de percussão brasileira, o golpe do violão e a palma (menos na 808) ainda tocam em sons provisórios do próprio Aratu, em Web Audio; o motor do Manguebyte agora [sintetiza esses sons em todos os kits de bateria](proof:web-percussion), no mesmo nível em cada um. O motor em si ainda está [em andamento](/roadmap/#phase-5): testado nativamente e no Node.js, com a demonstração experimentada uma vez no Chromium, ainda não sob carga num navegador.',
    bridgeHeading: 'Numa DAW: o Aratu Bridge',
    bridge: [
      'O [Aratu Bridge](repo:plugins/aratu-bridge/) do Manguebyte é um instrumento de exemplo, em CLAP, VST 3 e Audio Unit, que roda o motor do navegador dentro de uma DAW. A página manda para ele a música, não o áudio: as chamadas de controle e os registros de eventos que mandaria para o próprio motor, com o tempo contado em batidas, por um WebSocket em 127.0.0.1. O plugin toca tudo com o `manguebyte-web` compilado nativamente, no dispositivo da DAW e acompanhando o transporte dela, e o som cai numa trilha da DAW como o de qualquer outro instrumento. Uma sessão enviada por um socket de verdade sai igual, bit a bit, ao que o motor renderiza sozinho. Do lado da página, o [bridge.js](proof:bridge-js) oferece os mesmos métodos do motor no navegador, embora os seis que leem de volta o estado do motor, como `paramValue` e `partLevels`, não sejam respondidos pela rede; [o protocolo](proof:bridge-doc) está documentado, e ligá-lo ao Aratu é a parte que cabe ao próprio Aratu.',
      'Ele foi experimentado à mão uma vez: em 19 de outubro de 2026, uma página no Chromium servida a partir de `http://127.0.0.1` tocou pela versão CLAP no REAPER 7.82 para Windows, que aplicou os 44 eventos enviados pela página, nenhum atrasado e nenhum perdido, seguindo o andamento do REAPER. Outras DAWs, as versões VST 3 e AU, outros navegadores e páginas `https://` ainda não foram testados, e o plugin não tem editor e tem uma única saída estéreo.',
    ],
    bridgeProofsIntro: 'O que comprova isso, no commit `{commit}`: três testes que rodam no CI do Manguebyte, o registro do teste à mão e a lista do que ainda falta:',
    nameHeading: 'Por que “Aratu”?',
    name: 'O aratu é um caranguejo do mangue, o mangue do Recife que deu nome ao manguebeat e ao Manguebyte.',
    proofsHeading: 'O que os testes conferem',
    proofsIntro: 'O Aratu tem o seu próprio [repositório]({aratuUrl}) e CI, no commit `{aratuCommit}`. Estes testes rodam lá a cada commit:',
    readHeading: 'Leia mais',
    links: {
      repo: 'O Aratu no GitHub',
      manual: 'Ler o manual',
      vision: 'A visão',
    },
  },

  contribute: {
    title: 'Contribuir',
    description:
      'Como ajudar a construir o Manguebyte: onde a ajuda é necessária, a regra de sala limpa, as verificações a rodar, as regras para código de tempo real e a licença.',
    kicker: 'Contribuir',
    heading: 'Feito às claras',
    intro: [
      'O Manguebyte é um projeto grande, com um caminho longo pela frente, e só chega lá se muita gente construir junto. Contribuições são bem-vindas, de correções de digitação a crates inteiros.',
      'Tudo no repositório é em inglês: código, comentários, mensagens de commit, issues e pull requests. Inglês imperfeito não é problema nenhum.',
    ],
    waysHeading: 'Jeitos de ajudar',
    ways: [
      { term: 'Relate um bug', body: 'Abra uma issue pelo [formulário de bug](proof:issue-bug), dizendo o que você fez, o que esperava e o que aconteceu. Um programa pequeno que reproduza o problema vale muito.' },
      { term: 'Tire uma dúvida', body: 'Perguntas, e ideias que ainda não estão prontas para virar issue, vão para as [Discussions]({discussionsUrl}).' },
      { term: 'Proponha um recurso', body: 'Abra uma issue pelo [formulário de pedido de recurso](proof:issue-feature) antes de escrever uma mudança grande, para que o desenho seja discutido primeiro. O [roadmap](/roadmap/) lista o que está planejado.' },
      { term: 'Melhore a documentação', body: 'Explicações mais claras e exemplos melhores são sempre bem-vindos.' },
      { term: 'Escreva código', body: 'Escolha um item do roadmap ou uma issue aberta, comente que vai pegá-lo e mande um pull request. As issues com a etiqueta [good first issue]({goodFirstUrl}) são pequenas e um bom lugar para começar.' },
    ],
    cleanHeading: 'Uma regra acima das outras: sala limpa',
    clean: [
      'O Manguebyte se inspira no que o JUCE torna possível, mas não contém código do JUCE e nunca pode conter. O JUCE é licenciado sob a AGPL ou sob uma licença comercial, ambas incompatíveis com a deste projeto.',
      '**Use** a lista de módulos do JUCE, a documentação pública, o changelog, o rastreador de issues e o fórum para decidir o que construir e quais desenhos evitar.',
      '**Nunca** copie, traduza nem parafraseie código-fonte do JUCE, e não escreva uma implementação com a implementação correspondente do JUCE aberta. O mesmo vale para qualquer outro projeto cuja licença não seja compatível com MIT ou Apache-2.0.',
      'Trabalhe a partir de especificações, normas, artigos, livros e do seu próprio conhecimento. O raciocínio está no [ADR 0004](repo:docs/adr/0004-juce-as-reference.md).',
    ],
    setupHeading: 'Prepare o ambiente e confira',
    setup: [
      'Você precisa de um toolchain Rust estável, 1.85 ou mais novo, com `rustfmt` e `clippy`. No Linux, também dos cabeçalhos de desenvolvimento do ALSA, e dos do JACK, que o `--all-features` compila.',
      'Antes de abrir um pull request, rode as mesmas verificações que o CI roda. Um script faz todas e para na primeira falha:',
    ],
    setupAfter:
      'Um pull request deve fazer uma coisa só e dizer o quê e por quê; trazer testes para comportamento novo e para bugs corrigidos; documentar todo item público; e manter o build sem avisos.',
    realtimeHeading: 'Como escrever código de tempo real',
    realtimeIntro:
      'O código da thread de áudio tem um prazo de poucos milissegundos, todas as vezes. Em `Processor::process` e em tudo o que ele chama:',
    realtime: [
      '**Não aloque nem libere memória.** Aloque em `prepare`.',
      '**Não use locks.** Use atômicos ou a fila wait-free.',
      '**Não bloqueie nem faça E/S.** Nada de arquivos, rede ou impressão.',
      '**Não entre em pânico.** Valide em `prepare`, e limite os valores em vez de usar asserções.',
    ],
    realtimeAfter:
      'Essas regras são cobradas: [um teste](proof:no-heap) troca o alocador por um que conta e falha se um processador tocar no heap durante o processamento. Quando você acrescentar um processador, acrescente-o a esse teste.',
    licenceHeading: 'Licença das contribuições',
    licence: [
      'O Manguebyte tem licença dupla, [MIT](proof:licence-mit) e [Apache-2.0](proof:licence-apache). A menos que você declare explicitamente o contrário, qualquer contribuição enviada de propósito para inclusão no projeto, conforme a definição da licença Apache-2.0, fica licenciada da mesma forma dupla, sem termos ou condições adicionais.',
      'A única exceção é o `crates/manguebyte-pro-io`, que está só sob a [GPLv3](proof:pro-io-licence), pelo motivo que [o README dele](proof:pro-io-readme) explica: uma contribuição para ele fica sob a GPLv3.',
    ],
    securityHeading: 'Problemas de segurança',
    security: 'Não abra uma issue pública para um problema de segurança. Relate-o em privado, como o [SECURITY.md](proof:security) descreve.',
    conductHeading: 'Conduta',
    conduct:
      'Seja gentil, tenha paciência e presuma boa-fé. Critique o código, não as pessoas. Este projeto quer contribuidores de todas as origens e níveis de experiência, e não aceita assédio nem desrespeito de nenhum tipo. O [Código de Conduta](proof:conduct) diz isso por inteiro e explica como relatar um problema.',
    contactHeading: 'Para onde ir',
    links: {
      guide: 'O guia completo de contribuição',
      issues: 'Issues no GitHub',
      goodFirst: 'Boas primeiras issues',
      discussions: 'Discussions',
      roadmap: 'O roadmap',
      email: 'Escrever para o autor',
    },
  },
};
