import { Paint } from '../types';

export const MINIATURE_PAINTS: Paint[] = [
  // CITADEL
  {
    id: 'cit-01',
    name: 'Mephiston Red',
    code: '9002',
    brand: 'Citadel',
    hex: '#9a1115',
    type: 'Base',
    finish: 'Fosco',
    category: 'Vermelhos',
    recommendedUse: 'Camada de base para armaduras, mantos vermelhos e sangue.'
  },
  {
    id: 'cit-02',
    name: 'Macragge Blue',
    code: '9009',
    brand: 'Citadel',
    hex: '#0f3d7c',
    type: 'Base',
    finish: 'Fosco',
    category: 'Azuis',
    recommendedUse: 'Armaduras do tipo Space Marine, mantos reais e sombras profundas de azul.'
  },
  {
    id: 'cit-03',
    name: 'Moot Green',
    code: '9140',
    brand: 'Citadel',
    hex: '#39b54a',
    type: 'Layer',
    finish: 'Fosco',
    category: 'Verdes',
    recommendedUse: 'Luzes extremas para pele de Orc, venenos, magia verde e folhagem.'
  },
  {
    id: 'cit-04',
    name: 'Flash Gitz Yellow',
    code: '9102',
    brand: 'Citadel',
    hex: '#fff200',
    type: 'Layer',
    finish: 'Fosco',
    category: 'Amarelos',
    recommendedUse: 'Destaques vibrantes de amarelo, luzes de fogo e efeitos de energia.'
  },
  {
    id: 'cit-05',
    name: 'Abaddon Black',
    code: '9021',
    brand: 'Citadel',
    hex: '#1d1d1b',
    type: 'Base',
    finish: 'Fosco',
    category: 'Pretos',
    recommendedUse: 'Base preta pura, excelente cobertura para sombras escuras e sub-capas.'
  },
  {
    id: 'cit-06',
    name: 'White Scar',
    code: '9154',
    brand: 'Citadel',
    hex: '#fbfbfb',
    type: 'Layer',
    finish: 'Fosco',
    category: 'Brancos',
    recommendedUse: 'Luzes finais extremas de branco puro, pontos de brilho nos olhos e metal.'
  },
  {
    id: 'cit-07',
    name: 'Cadian Fleshtone',
    code: '9120',
    brand: 'Citadel',
    hex: '#c68d75',
    type: 'Layer',
    finish: 'Fosco',
    category: 'Tons de Pele',
    recommendedUse: 'Tom médio para peles caucasianas/claras de humanos e elfos.'
  },
  {
    id: 'cit-08',
    name: 'Retributor Armour',
    code: '9175',
    brand: 'Citadel',
    hex: '#c59b27',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Ouro rico e quente para ornamentações, armaduras reais e fivelas.'
  },
  {
    id: 'cit-09',
    name: 'Leadbelcher',
    code: '9023',
    brand: 'Citadel',
    hex: '#818285',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Aço/Ferro escuro para armas, armaduras pesadas e engrenagens mecânicas.'
  },
  {
    id: 'cit-10',
    name: 'Nuln Oil',
    code: '9180',
    brand: 'Citadel',
    hex: '#231f20',
    type: 'Wash',
    finish: 'Fosco',
    category: 'Efeitos Especiais',
    recommendedUse: 'Sombra líquida (wash) preta para criar profundidade em recessos e texturas.'
  },

  // VALLEJO (Model Color & Game Color)
  {
    id: 'val-01',
    name: 'Model Color Flat Red',
    code: '70.957',
    brand: 'Vallejo',
    hex: '#b31a1d',
    type: 'Base',
    finish: 'Fosco',
    category: 'Vermelhos',
    recommendedUse: 'Mantos históricos, uniformes militares e detalhes quentes.'
  },
  {
    id: 'val-02',
    name: 'Game Color Ultramarine Blue',
    code: '72.022',
    brand: 'Vallejo',
    hex: '#194285',
    type: 'Base',
    finish: 'Fosco',
    category: 'Azuis',
    recommendedUse: 'Azul vibrante ideal para capas de magos, luzes e roupas de fantasia.'
  },
  {
    id: 'val-03',
    name: 'Model Color Sick Green',
    code: '72.029',
    brand: 'Vallejo',
    hex: '#2e7a3c',
    type: 'Base',
    finish: 'Fosco',
    category: 'Verdes',
    recommendedUse: 'Tons de pele de monstros, orcs, goblins ou folhagem militar.'
  },
  {
    id: 'val-04',
    name: 'Game Color Heavy Ochre',
    code: '72.153',
    brand: 'Vallejo',
    hex: '#c89527',
    type: 'Base',
    finish: 'Fosco',
    category: 'Amarelos',
    recommendedUse: 'Sombra de amarelo, tons de couro amarelo e bases de ocre.'
  },
  {
    id: 'val-05',
    name: 'Model Color Leather Brown',
    code: '70.871',
    brand: 'Vallejo',
    hex: '#684a30',
    type: 'Base',
    finish: 'Fosco',
    category: 'Couro',
    recommendedUse: 'Couro escuro realista, botas, cintos, arreios e bases de madeira.'
  },
  {
    id: 'val-06',
    name: 'Model Color Wood Grain',
    code: '70.828',
    brand: 'Vallejo',
    hex: '#51341c',
    type: 'Technical',
    finish: 'Satinado',
    category: 'Madeira',
    recommendedUse: 'Efeito de veio de madeira, cabos de machado, escudos e coronhas de armas.'
  },
  {
    id: 'val-07',
    name: 'Model Color Pale Sand',
    code: '70.837',
    brand: 'Vallejo',
    hex: '#ded4bc',
    type: 'Layer',
    finish: 'Fosco',
    category: 'Brancos',
    recommendedUse: 'Mistura com outras cores para clarear de forma natural, ossos envelhecidos.'
  },
  {
    id: 'val-08',
    name: 'Model Color Brass',
    code: '70.801',
    brand: 'Vallejo',
    hex: '#c49c4d',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Latão metálico para engrenagens steampunk, fivelas e ornamentos.'
  },

  // AK INTERACTIVE
  {
    id: 'ak-01',
    name: 'AK Deep Red',
    code: '11088',
    brand: 'AK Interactive',
    hex: '#8a0014',
    type: 'Base',
    finish: 'Ultra Fosco',
    category: 'Vermelhos',
    recommendedUse: 'Vermelho carmim profundo, excelente pigmentação para transições suaves.'
  },
  {
    id: 'ak-02',
    name: 'AK Deep Blue',
    code: '11072',
    brand: 'AK Interactive',
    hex: '#002f6c',
    type: 'Base',
    finish: 'Ultra Fosco',
    category: 'Azuis',
    recommendedUse: 'Azul cobalto escuro com excelente opacidade para capas e tecidos.'
  },
  {
    id: 'ak-03',
    name: 'AK Rusty Orange',
    code: '11111',
    brand: 'AK Interactive',
    hex: '#c35b24',
    type: 'Layer',
    finish: 'Ultra Fosco',
    category: 'Fantasia',
    recommendedUse: 'Laranja enferrujado para pigmentação de oxidação de metais e lava.'
  },
  {
    id: 'ak-04',
    name: 'AK Dark Flesh',
    code: '11053',
    brand: 'AK Interactive',
    hex: '#8d5740',
    type: 'Base',
    finish: 'Ultra Fosco',
    category: 'Tons de Pele',
    recommendedUse: 'Sombra de pele escura ou base para peles morenas e afro-descendentes.'
  },

  // ARMY PAINTER
  {
    id: 'ap-01',
    name: 'Barbarian Flesh',
    code: 'WP1127',
    brand: 'Army Painter',
    hex: '#e1a681',
    type: 'Layer',
    finish: 'Fosco',
    category: 'Tons de Pele',
    recommendedUse: 'Pele saudável nórdica/bárbara para guerreiros, heróis e camponeses.'
  },
  {
    id: 'ap-02',
    name: 'Necrotic Flesh',
    code: 'WP1128',
    brand: 'Army Painter',
    hex: '#a3ab7c',
    type: 'Base',
    finish: 'Fosco',
    category: 'Fantasia',
    recommendedUse: 'Pele apodrecida para zumbis, mortos-vivos, ghouls e demônios.'
  },
  {
    id: 'ap-03',
    name: 'Plate Mail Metal',
    code: 'WP1130',
    brand: 'Army Painter',
    hex: '#a6a8ab',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Metal médio brilhante para placas de armadura, cavaleiros e espadas.'
  },
  {
    id: 'ap-04',
    name: 'Oak Brown',
    code: 'WP1119',
    brand: 'Army Painter',
    hex: '#47311c',
    type: 'Base',
    finish: 'Fosco',
    category: 'Madeira',
    recommendedUse: 'Madeira escura de carvalho antigo, cabos de armas e terras agrícolas.'
  },

  // SCALE 75
  {
    id: 'sc-01',
    name: 'Elven Gold',
    code: 'SC74',
    brand: 'Scale75',
    hex: '#dfb75c',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Ouro amarelo élfico muito brilhante com pigmentos extremamente finos.'
  },
  {
    id: 'sc-02',
    name: 'Decay Black',
    code: 'SC02',
    brand: 'Scale75',
    hex: '#2b2a29',
    type: 'Base',
    finish: 'Fosco Extremo',
    category: 'Pretos',
    recommendedUse: 'Preto acetinado/fosco denso, excelente para veladuras de sombreado.'
  },
  {
    id: 'sc-03',
    name: 'Sartorial Skin',
    code: 'SC17',
    brand: 'Scale75',
    hex: '#d69d80',
    type: 'Base',
    finish: 'Fosco Extremo',
    category: 'Tons de Pele',
    recommendedUse: 'Pele clara sofisticada com textura aveludada, perfeita para bustos.'
  },

  // TAMIYA
  {
    id: 'tam-01',
    name: 'Flat Red XF-7',
    code: 'XF-7',
    brand: 'Tamiya',
    hex: '#be1010',
    type: 'Base',
    finish: 'Fosco',
    category: 'Vermelhos',
    recommendedUse: 'Ideal para aerografia, modelos militares e sci-fi de alta aderência.'
  },
  {
    id: 'tam-02',
    name: 'Flat Green XF-5',
    code: 'XF-5',
    brand: 'Tamiya',
    hex: '#1d6f2d',
    type: 'Base',
    finish: 'Fosco',
    category: 'Verdes',
    recommendedUse: 'Verde militar clássico para veículos blindados e camuflagens.'
  },
  {
    id: 'tam-03',
    name: 'Chrome Silver X-11',
    code: 'X-11',
    brand: 'Tamiya',
    hex: '#e6e7e8',
    type: 'Metallic',
    finish: 'Metálico Brilhante',
    category: 'Metálicos',
    recommendedUse: 'Cromo extremamente brilhante para cilindros, escapamentos e reflexos.'
  },

  // ACRILEX
  {
    id: 'acr-01',
    name: 'Vermelho Fogo Matte',
    code: '507',
    brand: 'Acrilex',
    hex: '#cc1a1a',
    type: 'Base',
    finish: 'Fosco',
    category: 'Vermelhos',
    recommendedUse: 'Excelente custo-benefício nacional para bases de peças impressas.'
  },
  {
    id: 'acr-02',
    name: 'Azul Country Matte',
    code: '822',
    brand: 'Acrilex',
    hex: '#2d4b7c',
    type: 'Base',
    finish: 'Fosco',
    category: 'Azuis',
    recommendedUse: 'Azul sóbrio excelente para bases e vestimentas rústicas.'
  },
  {
    id: 'acr-03',
    name: 'Ouro Solar Acrílica',
    code: '532',
    brand: 'Acrilex',
    hex: '#d9a736',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Pintura metálica nacional de excelente cobertura em ornamentos grandes.'
  },
  {
    id: 'acr-04',
    name: 'Pele Matte',
    code: '520',
    brand: 'Acrilex',
    hex: '#e2b399',
    type: 'Base',
    finish: 'Fosco',
    category: 'Tons de Pele',
    recommendedUse: 'Tom de pele base para figuras impressas e estátuas nacionais.'
  },

  // CORFIX
  {
    id: 'cf-01',
    name: 'Verde Vexiga Decorfix',
    code: '052',
    brand: 'Corfix',
    hex: '#114a1e',
    type: 'Base',
    finish: 'Fosco',
    category: 'Verdes',
    recommendedUse: 'Verde folha escuro excelente para terrenos, vegetação e florestas.'
  },
  {
    id: 'cf-02',
    name: 'Marrom Escuro Decorfix',
    code: '074',
    brand: 'Corfix',
    hex: '#422817',
    type: 'Base',
    finish: 'Fosco',
    category: 'Couro',
    recommendedUse: 'Base de marrom escuro rústico para troncos de árvore e sombras na terra.'
  },
  {
    id: 'cf-03',
    name: 'Prata Acrílica',
    code: '102',
    brand: 'Corfix',
    hex: '#bcbec0',
    type: 'Metallic',
    finish: 'Metálico',
    category: 'Metálicos',
    recommendedUse: 'Prata base nacional de alta viscosidade para armas de peças impressas.'
  }
];
