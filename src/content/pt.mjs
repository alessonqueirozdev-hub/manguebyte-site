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
      'O Manguebyte Audio Framework é áudio de código aberto para Rust: DSP e instrumentos, medição, MIDI, arquivos, dispositivos, editores de plugin, plugins CLAP, VST 3 e LV2, e hospedagem. Automação com precisão de amostra, saída independente do tamanho do bloco e processamento sem alocação, cada um garantido por um teste.',
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
      'O Manguebyte é jovem. O que existe está testado e dá para usar, mas cobre uma parte pequena do caminho, a API vai mudar antes da versão 1.0, e os editores de plugin foram abertos no CI, ainda não num host à mão.',
    sourceTitle: 'De onde este site tira os fatos',
    source:
      'Cada afirmação, cada link de prova e cada trecho de código daqui foi lido do repositório do framework no commit [{commit}]({commitUrl}) ({date}), em que [os {ciJobs} jobs de CI passaram]({ciUrl}). O repositório é a autoridade; se os dois divergirem, é o site que está desatualizado.',
    legalTitle: 'Nomes e marcas',
    legal:
      'O Manguebyte é um projeto independente. Não é afiliado, patrocinado nem endossado pelos criadores do JUCE, pela Steinberg ou pelo projeto CLAP. JUCE é marca do seu respectivo dono e CLAP é o nome do seu próprio projeto; os dois são citados apenas para descrever o que este framework pretende ser e com o que ele trabalha. VST é marca registrada da Steinberg Media Technologies GmbH.',
    unrelated: 'Este projeto também não tem relação com a empresa de nome parecido que opera o manguebyte.com.',
    licenceTitle: 'Licença',
    licence: 'O framework é licenciado sob [MIT](proof:licence-mit) ou [Apache-2.0](proof:licence-apache), à sua escolha.',
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
      'O Manguebyte serve para construir plugins e aplicativos de áudio em Rust: DSP e instrumentos, medição, MIDI, arquivos, dispositivos, editores e hospedagem de plugins, e exportação nativa para CLAP, VST 3 e LV2 com uma linha cada. A meta é ser para o Rust o que o JUCE é para o C++, e depois ir além. Cada afirmação deste site leva ao teste que a prova.',
    ctaStart: 'Como começar',
    ctaSource: 'Ler o código',
    young:
      '**Projeto jovem.** A API vai mudar antes da versão 1.0. Os editores de plugin abrem em janelas Win32 e são testados no CI, mas ninguém abriu um num host à mão ainda. [Veja o que falta](/features/#missing).',
    ring: 'Caranguejos com cérebro · Crabs with brains · ',

    proof: {
      heading: 'Verde em todo commit',
      caption:
        'São testes e resultados de validadores reais, não uma montagem. Todos passaram no [CI do commit {commit}]({ciUrl}). Cada linha leva ao código.',
      command: 'cargo test --workspace',
      ok: 'ok',
      validators: [
        { name: 'clap-validator · Mangue Pluck.clap', result: '35 passed, 0 failed, 9 skipped', proof: 'ci-clap' },
        { name: 'clap-validator · Mangue Duck.clap', result: '33 passed, 0 failed, 11 skipped', proof: 'ci-clap' },
        { name: 'VST 3 validator · Windows, Linux, macOS', result: '537 passed, 0 failed', proof: 'ci-vst3' },
      ],
    },

    proven: {
      heading: 'Quatro coisas que ele prova a cada commit',
      intro:
        'Igualar o JUCE é a linha de base. Estes são pontos em que o Manguebyte já faz algo que o JUCE {juce} não faz, cada um sustentado por um teste que roda no CI. [A lista completa tem quinze](/beyond-juce/), com a fonte de tudo o que se diz sobre o JUCE e o limite de cada afirmação.',
      juceLabel: 'No JUCE {juce}',
      proofLabel: 'Prova',
      limitLabel: 'Limite',
      more: 'As quinze afirmações, com provas e limites',
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
            '`export_clap!` e `export_vst3!` transformam o mesmo plugin nos dois formatos. O CI roda o validador do projeto CLAP e o da Steinberg num instrumento e num efeito; os 537 testes de VST 3 passam em Windows, Linux e macOS. Os dois também foram [testados à mão no REAPER](proof:host-tests), e `export_lv2!` acrescenta um terceiro formato.',
          juce: 'A exportação para CLAP não existe de forma nativa.',
          limit: 'Os editores são testados no CI, ainda não foram abertos num host à mão. O LV2 é novo: o lilv o carrega no CI, nenhum host o rodou ainda. Sem AU nem AAX.',
          proofs: ['ci-clap', 'ci-vst3'],
        },
      ],
    },

    code: {
      heading: 'Um plugin inteiro, e depois uma linha por formato',
      intro:
        'Este é o efeito de exemplo do repositório: um ducker com sidechain. Ele se descreve, divide cada bloco nos seus eventos e é exportado duas vezes. Nada do código abaixo foi escrito para esta página.',
      notes: [
        {
          title: 'Uma descrição só',
          body: '`INFO` e `LAYOUT` são constantes. A mesma descrição vira o descritor CLAP, a classe VST 3, cujo id é igual em todas as plataformas, e os arquivos Turtle do plugin LV2.',
        },
        {
          title: 'Eventos no seu frame',
          body: '`split_at_events` renderiza até cada evento, aplica-o e segue em frente, sem copiar nem alocar. Essa chamada é tudo o que o plugin faz para ter automação com precisão de amostra.',
        },
        {
          title: 'Três formatos, três linhas',
          body: 'As macros são a integração inteira, e `editor` entrega aos wrappers o editor do plugin. O `cargo mangue` gera depois um pacote `.clap`, um `.vst3` e um `.lv2` no layout de cada sistema.',
        },
      ],
      testHeading: 'E um teste dele, sem host',
      testIntro:
        '`Harness` toca áudio, um sidechain e automação no plugin dentro de um teste unitário comum. Este confere que uma mudança de profundidade cai no frame 1.000 do bloco, e não um frame antes.',
    },

    today: {
      heading: 'O que já existe',
      intro: 'Vinte e três crates que funcionam juntos, cada um utilizável sozinho, um deles uma ferramenta de linha de comando. O `manguebyte-core` não tem nenhuma dependência.',
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
      intro: 'O Manguebyte ainda não está no crates.io. Dependa dele direto do Git:',
      guide: 'O guia de primeiros passos',
      repo: 'O repositório no GitHub',
    },
  },

  beyond: {
    title: 'Onde o Manguebyte vai além do JUCE',
    description:
      'Quinze pontos em que o Manguebyte já faz algo que o JUCE não faz, cada um com o problema, o que o JUCE faz, o que o Manguebyte faz, o teste que prova e o limite da afirmação.',
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
    summaryCaption: 'As quinze afirmações. Cada linha leva à seção correspondente, mais abaixo.',
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
      'Esta página segue o [docs/BEYOND_JUCE.md](repo:docs/BEYOND_JUCE.md) do repositório no commit `{commit}`. Onde o README é mais novo, a página segue o README: o limite da seção 6, sobre editores e LV2, e a lista de onde o JUCE está à frente. O limite da seção 2 também cita o que o teste no REAPER encontrou.',
  },

  features: {
    title: 'Recursos',
    description:
      'O que o Manguebyte contém hoje, área por área: tipos centrais, DSP, um grafo de processamento vivo, parâmetros, plugins CLAP e VST 3, MIDI, arquivos de áudio e dispositivos. E o que ele ainda não contém.',
    kicker: 'Recursos',
    heading: 'O que existe hoje',
    intro: [
      'Vinte e três crates, projetados para funcionar juntos e utilizáveis cada um por si: use o framework inteiro, ou só o tipo de buffer. Tudo o que está listado aqui está no repositório e coberto pelos testes dele.',
      'Isso é uma parte pequena do caminho. [O que falta](#missing) está listado com a mesma clareza.',
    ],
    cratesLabel: 'Crates',
    facade: 'O crate `manguebyte` reúne todos sob um nome só, com um prelude.',
    missingHeading: 'O que ainda não existe',
    missingIntro: 'Nada disto existe hoje no Manguebyte. Se você precisa de algum destes itens agora, o JUCE tem.',
    missingOutro: 'O [roadmap](/roadmap/) lista cada item planejado e a sua situação, e [onde o JUCE está à frente](/beyond-juce/#ahead) diz o mesmo pelo outro lado.',
  },

  start: {
    title: 'Como começar',
    description:
      'Adicione o Manguebyte a um projeto Rust, faça um som, gere o plugin de exemplo como CLAP e VST 3, toque sem host e teste num teste unitário.',
    kicker: 'Como começar',
    heading: 'Do zero a um plugin',
    intro: [
      'Tudo nesta página vem do README do repositório e dos seus dois plugins de exemplo, como estão no commit `{commit}`.',
      'Antes de construir em cima dele: o Manguebyte é jovem, ainda não está no crates.io, e **a API vai mudar antes da versão 1.0**. Os editores de plugin existem e são testados no CI, mas nenhum foi aberto num host à mão ainda.',
    ],
    steps: {
      before: {
        heading: 'Antes de começar',
        body: [
          'Você precisa de um toolchain Rust estável, versão 1.85 ou mais nova.',
          'No Linux, o backend de dispositivos precisa dos cabeçalhos de desenvolvimento do ALSA:',
        ],
      },
      dependency: {
        heading: 'Adicione a dependência',
        body: ['Dependa direto do repositório:'],
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
          '[plugins/pluck](repo:plugins/pluck/src/lib.rs) é um instrumento completo num arquivo só: um sintetizador dedilhado de 16 vozes, com expressão e modulação por nota, automação na amostra exata, um reverb e um editor pequeno. [plugins/duck](repo:plugins/duck/src/lib.rs) é o mesmo para um efeito: um ducker com sidechain, uma chave de bypass que não estala e um editor com medidor de redução de ganho. Cada um vira plugin CLAP, VST 3 e LV2 com uma linha por formato.',
          'Transforme qualquer um dos dois em algo que um host consiga carregar com a ferramenta de linha de comando do framework, o `cargo mangue`, que grava um `.clap` e um `.vst3` no layout de cada sistema (com `--format lv2`, um pacote `.lv2`):',
        ],
        after:
          '`cargo mangue new meu-synth --kind instrument` começa um plugin seu a partir de um modelo; `install` copia um plugin para as pastas de plugins do usuário, e `validate` roda nele os validadores do CLAP e do VST 3. Os dois exemplos passam por esses validadores a cada commit, e foram [testados à mão no REAPER](proof:host-tests) como CLAP e VST 3, antes de terem editores.',
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
      'Esta página segue o [ROADMAP.md](repo:ROADMAP.md) e o [docs/JUCE_PARITY.md](repo:docs/JUCE_PARITY.md) no commit `{commit}`. Um item segue o README, que é mais novo: o ROADMAP.md ainda lista a decodificação de Ogg Vorbis e MP3 como não começada, enquanto o README e o changelog dizem que os dois são lidos.',
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
      body: 'O framework de áudio de código aberto para Rust, sob MIT ou Apache-2.0. O Aratu já toca sobre o seu motor para o navegador; o Parabolic será construído sobre ele.',
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
      '**Em desenvolvimento.** A linguagem lê, confere e agenda todos os exemplos do livro, e o editor roda no navegador sem instalar nada. Rodar dentro de uma DAW está planejado.',
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
      'O editor toca pelo `manguebyte-web`, o motor do Manguebyte para o navegador: todas as vozes do painel de Sons, de instrumentos com samples a cordas modeladas, FM, órgão, baixo acid e synth, os efeitos de cada parte e o master com o limitador de true peak. As linhas de percussão brasileira, o golpe do violão e a palma (menos na 808) ainda tocam num pequeno substituto em Web Audio, até o Manguebyte ter samples para eles. O motor em si ainda está [em andamento](/roadmap/#phase-5): testado nativamente e no Node.js, ainda não sob carga num navegador.',
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
      { term: 'Relate um bug', body: 'Abra uma issue dizendo o que você fez, o que esperava e o que aconteceu. Um programa pequeno que reproduza o problema vale muito.' },
      { term: 'Proponha um recurso', body: 'Abra uma issue antes de escrever uma mudança grande, para que o desenho seja discutido primeiro. O [roadmap](/roadmap/) lista o que está planejado.' },
      { term: 'Melhore a documentação', body: 'Explicações mais claras e exemplos melhores são sempre bem-vindos.' },
      { term: 'Escreva código', body: 'Escolha um item do roadmap ou uma issue aberta, comente que vai pegá-lo e mande um pull request.' },
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
      'Você precisa de um toolchain Rust estável, 1.85 ou mais novo, com `rustfmt` e `clippy`. No Linux, também dos cabeçalhos de desenvolvimento do ALSA.',
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
    ],
    conductHeading: 'Conduta',
    conduct:
      'Seja gentil, tenha paciência e presuma boa-fé. Critique o código, não as pessoas. Este projeto quer contribuidores de todas as origens e níveis de experiência, e não aceita assédio nem desrespeito de nenhum tipo.',
    contactHeading: 'Para onde ir',
    links: {
      guide: 'O guia completo de contribuição',
      issues: 'Issues no GitHub',
      roadmap: 'O roadmap',
      email: 'Escrever para o autor',
    },
  },
};
