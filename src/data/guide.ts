import { GuideStage } from '../types';

export const GUIDE_STAGES: GuideStage[] = [
  {
    id: 1,
    title: 'Materiais Necessários',
    difficulty: 'Fácil',
    explanation: 'Antes de começar, você precisa organizar seu espaço de trabalho. Os itens essenciais são: Pincéis redondos de qualidade (tamanhos 0, 1 e 2), Tintas Acrílicas próprias para hobby (à base de água), Paleta (convencional ou Paleta Úmida), Copo d\'água para limpeza, Papel toalha e um Alicate de corte para remover a peça dos suportes.',
    tips: [
      'Use uma paleta úmida (wet palette) caseira usando um pote plástico raso, papel toalha úmido e papel manteiga por cima. Isso evita que suas tintas sequem enquanto pinta!',
      'Pincéis sintéticos são excelentes para começar por serem mais baratos e resistentes.'
    ],
    commonErrors: [
      'Pintar com pincéis de maquiagem comuns para pintura geral (eles são bons apenas para drybrush seco).',
      'Usar tintas acrílicas de parede ou escolares muito grossas sem diluição adequada.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 2,
    title: 'Preparação da Peça',
    difficulty: 'Fácil',
    explanation: 'As peças impressas em 3D (sejam de Resina ou filamento FDM) necessitam de preparação. Remova marcas de suporte com alicate delicadamente. Se a peça for de filamento, lixe as linhas de camada com lixas d\'água de granulatura progressiva (400 a 1000). Lave a miniatura com água morna e sabão neutro usando uma escova de dentes velha para remover resíduos de gordura ou desmoldantes que impedem a tinta de aderir.',
    tips: [
      'Lixe sempre em movimentos circulares leves e com a lixa úmida para evitar poeira tóxica de resina.',
      'Sempre verifique se a peça de resina está totalmente curada (não deve estar pegajosa).'
    ],
    commonErrors: [
      'Pular a lavagem da miniatura, resultando em descascamento da tinta no futuro.',
      'Forçar a remoção dos suportes com as mãos, quebrando partes frágeis como espadas e dedos.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 3,
    title: 'Aplicação de Primer',
    difficulty: 'Fácil',
    explanation: 'O Primer é a camada mais importante para a ancoragem da tinta. Ele cria uma textura microscópica que faz a tinta acrílica aderir perfeitamente ao plástico ou resina. Pode ser aplicado com spray aerosol (mantenha 20-30cm de distância), aerógrafo ou pincel largo. Use cores neutras como Preto (excelente para sombrear fendas), Cinza (intermediário neutro) ou Branco (para cores mais vibrantes).',
    tips: [
      'Tente a técnica de Primer Zenital: aplique primer preto em toda a peça e, em seguida, borrife de leve o primer branco apenas por cima (ângulo de 45°). Isso cria um mapeamento de luz natural!',
      'Agite o spray de primer por pelo menos 2 minutos inteiros antes de aplicar.'
    ],
    commonErrors: [
      'Aplicar camadas muito grossas de primer spray de uma só vez, o que "afoga" os detalhes finos da escultura.',
      'Aplicar primer spray em dias extremamente úmidos ou frios, criando um efeito texturizado/arenoso indesejado.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 4,
    title: 'Camada Base (Base Coat)',
    difficulty: 'Fácil',
    explanation: 'A Camada Base consiste em aplicar as cores sólidas e opacas em cada área da miniatura (pele, roupas, armadura, couro). O maior segredo da pintura de miniaturas está aqui: DILUA SUA TINTA. Misture um pouco de água ou diluente na paleta até que ela tenha a consistência de leite de caixinha. É preferível aplicar duas ou três camadas finas do que uma única camada grossa.',
    tips: [
      'Espere a primeira camada fina secar completamente antes de passar a segunda. Pintar sobre tinta semi-seca rasga a película de tinta anterior.',
      'Use pincéis maiores (tamanho 1 ou 2) com boa ponta para agilizar a aplicação das bases.'
    ],
    commonErrors: [
      'Usar a tinta diretamente do pote. Isso deixa marcas de pinceladas visíveis e tampa os detalhes da peça.',
      'Tentar cobrir cores escuras com amarelo ou branco em apenas uma camada grossa.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 5,
    title: 'Sombras (Shading / Recess)',
    difficulty: 'Médio',
    explanation: 'A sombra dá volume tridimensional à peça. Sem ela, a miniatura parecerá plana e sem vida. Você pode aplicar sombras escurecendo a cor base na paleta com um tom complementar escuro (por exemplo, adicionar azul ou marrom ao verde da pele) e aplicar nas áreas onde a luz solar não atinge (sob os braços, dobras profundas da capa, recessos musculares).',
    tips: [
      'Evite usar preto puro para sombrear cores claras. Tons de azul escuro, roxo ou marrom criam sombras muito mais ricas e realistas.',
      'Use a gravidade como guia: imagine o sol diretamente acima e pinte as áreas voltadas para baixo com cores escuras.'
    ],
    commonErrors: [
      'Escurecer as cores apenas adicionando preto puro, deixando o visual acinzentado e "sujo".',
      'Não manter transições suaves nas áreas planas da peça.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 6,
    title: 'Luzes (Highlighting)',
    difficulty: 'Médio',
    explanation: 'O oposto da sombra. As luzes destacam as áreas salientes que recebem maior luminosidade (como as bochechas, topo dos ombros, dobras superiores de tecidos e bordas de armaduras). Misture a cor base com uma tonalidade mais clara (como amarelo, bege ou branco) e aplique com a lateral do pincel nas bordas ou com batidas suaves nas superfícies elevadas.',
    tips: [
      'Para peles humanas, use tons amarelos ou beges para clarear em vez de branco puro, para evitar um tom pálido cinzento de cadáver.',
      'Faça luzes graduais: cada camada de luz deve cobrir uma área menor e mais centralizada que a anterior.'
    ],
    commonErrors: [
      'Criar uma linha de luz muito grossa e sem diluição nas bordas das peças, parecendo listras artificiais.',
      'Aplicar luzes em áreas que deveriam estar na sombra natural do modelo.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 7,
    title: 'Pincel Seco (Dry Brush)',
    difficulty: 'Fácil',
    explanation: 'Uma técnica rápida e fantástica para destacar texturas em relevo (pelos de animais, cotas de malha, pedras, cabelos ou terra). Molhe um pincel de cerdas duras na tinta pura, esfregue-o vigorosamente em um papel toalha até que pareça não haver mais tinta nas cerdas. Em seguida, passe o pincel levemente de um lado para o outro sobre os relevos da miniatura. A tinta seca restante se fixará apenas nos pontos mais altos.',
    tips: [
      'Use pincéis de maquiagem redondos (pincel de esfumar sombra). Eles dão um acabamento incrivelmente suave e sem riscos na técnica de drybrush!',
      'Certifique-se de que o pincel esteja totalmente livre de umidade de água ao fazer o drybrush.'
    ],
    commonErrors: [
      'Pincel ainda muito úmido de tinta, borrando toda a peça e estragando as camadas inferiores de base.',
      'Fazer drybrush em superfícies totalmente lisas (isso cria apenas riscos feios na miniatura).'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 8,
    title: 'Sombreamento Líquido (Wash / Ink)',
    difficulty: 'Fácil',
    explanation: 'O wash (ou "talento líquido") é uma tinta extremamente diluída e translúcida que corre naturalmente para os recessos da miniatura por capilaridade, sombreando fendas instantaneamente. Aplique generosamente sobre superfícies texturizadas como cotas de malha, peles, couros e armaduras metálicas. Conforme seca, ele escurece os vãos profundos e cria contraste automático.',
    tips: [
      'Evite que o wash acumule demais em superfícies planas (poças). Use um pincel limpo e levemente úmido para absorver o excesso antes que comece a secar.',
      'Sempre espere o wash secar 100% antes de tocar ou pintar por cima. Demora mais que tinta comum.'
    ],
    commonErrors: [
      'Tentar pincelar sobre o wash enquanto ele está secando, criando rasgos permanentes e manchas pegajosas.',
      'Aplicar wash em abundância no modelo todo de uma vez, deixando toda a peça escura e com visual fosco/sujo.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 9,
    title: 'Detalhamento Fino',
    difficulty: 'Difícil',
    explanation: 'Esta etapa exige controle e paciência. Consiste em pintar os olhos, gemas mágicas, runas, fivelas pequenas de cinto, dentes e arranhões de batalha (battle damage). Use um pincel tamanho 0 ou 00 com cerdas longas que retenham boa umidade, mas que terminem em uma ponta perfeita. Apoie os punhos firmemente um no outro para neutralizar o tremor das mãos.',
    tips: [
      'Para pintar olhos com facilidade: pinte a cavidade ocular de preto, depois faça um traço branco horizontal, e finalize com um pontinho preto vertical para a pupila. Corrija as bordas com a cor da pele!',
      'Respire fundo e solte o ar devagar enquanto faz o traço mais fino.'
    ],
    commonErrors: [
      'Usar um pincel excessivamente pequeno (tipo 00000) com tinta diluída: a tinta seca na ponta antes de tocar a peça. Prefira um pincel 0 de qualidade com excelente reservatório.',
      'Prender a respiração por muito tempo, o que na verdade aumenta o tremor das mãos.'
    ],
    isCompleted: false,
    isFavorite: false
  },
  {
    id: 10,
    title: 'Aplicação de Verniz',
    difficulty: 'Fácil',
    explanation: 'Suas miniaturas são feitas para serem manuseadas durante jogos de tabuleiro (como RPG ou Wargames). O suor das mãos e atritos descascam a tinta com o tempo. O verniz protege sua pintura. O Verniz Fosco (Matte) é o mais recomendado, pois elimina reflexos artificiais e unifica o acabamento da pintura. Verniz Brilhante (Gloss) pode ser aplicado especificamente nos olhos, boca, fendas de lava ou gemas para simular brilho molhado.',
    tips: [
      'Para uma proteção ultra-resistente, aplique primeiro uma camada de verniz brilhante (que é mais resistente) e, após seco, aplique uma ou duas camadas de verniz fosco para remover o brilho.',
      'Mantenha a lata de verniz spray bem agitada e aplique em passadas rápidas para não criar névoa esbranquiçada.'
    ],
    commonErrors: [
      'Aplicar verniz spray sob sol muito forte ou alta umidade, o que gera o efeito "frosting" (a miniatura fica totalmente branca e opaca, arruinando a pintura).',
      'Usar verniz vitral espesso demais que derrete detalhes de peças de resina.'
    ],
    isCompleted: false,
    isFavorite: false
  }
];
