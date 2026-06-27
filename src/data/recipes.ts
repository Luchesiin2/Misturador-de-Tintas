import { PremadeRecipe } from '../types';

export const PREMADE_RECIPES: PremadeRecipe[] = [
  // Tons de Pele
  {
    id: 'pr-01',
    name: 'Tom de Pele Claro (Caucasian/Elf)',
    category: 'Tons de Pele',
    finalHex: '#e5bda7',
    colors: [
      { name: 'Cadian Fleshtone', brand: 'Citadel', hex: '#c68d75', parts: 3 },
      { name: 'White Scar', brand: 'Citadel', hex: '#fbfbfb', parts: 1 },
      { name: 'Model Color Pale Sand', brand: 'Vallejo', hex: '#ded4bc', parts: 1 }
    ],
    description: 'Um tom de pele de transição ideal para personagens humanos heróicos ou elfos. Oferece uma tonalidade limpa e aveludada.'
  },
  {
    id: 'pr-02',
    name: 'Tom de Pele Escuro (Afro/Moreno)',
    category: 'Tons de Pele',
    finalHex: '#693e2d',
    colors: [
      { name: 'AK Dark Flesh', brand: 'AK Interactive', hex: '#8d5740', parts: 4 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 1 },
      { name: 'Model Color Leather Brown', brand: 'Vallejo', hex: '#684a30', parts: 2 }
    ],
    description: 'Pele negra rica e profunda. Excelentes sombras de fundo para miniaturas e bustos históricos.'
  },
  {
    id: 'pr-03',
    name: 'Verde Orc Clássico',
    category: 'Monstros',
    finalHex: '#528345',
    colors: [
      { name: 'Model Color Sick Green', brand: 'Vallejo', hex: '#2e7a3c', parts: 4 },
      { name: 'Flash Gitz Yellow', brand: 'Citadel', hex: '#fff200', parts: 2 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 1 }
    ],
    description: 'A clássica pele esverdeada para orcs, goblins e ogros de fantasia medieval.'
  },

  // Metálicos
  {
    id: 'pr-04',
    name: 'Armadura Dourada Polida',
    category: 'Metálicos',
    finalHex: '#dfbb4d',
    colors: [
      { name: 'Retributor Armour', brand: 'Citadel', hex: '#c59b27', parts: 5 },
      { name: 'Elven Gold', brand: 'Scale75', hex: '#dfb75c', parts: 3 },
      { name: 'Chrome Silver X-11', brand: 'Tamiya', hex: '#e6e7e8', parts: 1 }
    ],
    description: 'Armadura dourada brilhante e majestosa, ideal para paladinos, cavaleiros divinos e guardas reais.'
  },
  {
    id: 'pr-05',
    name: 'Aço Escuro de Combate',
    category: 'Metálicos',
    finalHex: '#626466',
    colors: [
      { name: 'Leadbelcher', brand: 'Citadel', hex: '#818285', parts: 4 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 2 },
      { name: 'Plate Mail Metal', brand: 'Army Painter', hex: '#a6a8ab', parts: 2 }
    ],
    description: 'Metal pesado e desgastado pelo combate. Perfeito para espadas, cotas de malha e escudos de bárbaros.'
  },

  // Couro e Madeira
  {
    id: 'pr-06',
    name: 'Couro Claro Envelhecido',
    category: 'Couro',
    finalHex: '#a57448',
    colors: [
      { name: 'Model Color Leather Brown', brand: 'Vallejo', hex: '#684a30', parts: 3 },
      { name: 'Flash Gitz Yellow', brand: 'Citadel', hex: '#fff200', parts: 1 },
      { name: 'White Scar', brand: 'Citadel', hex: '#fbfbfb', parts: 1 }
    ],
    description: 'Couro desgastado pelo sol e uso, ideal para cintos, botas rústicas, algibeiras e coldres.'
  },
  {
    id: 'pr-07',
    name: 'Madeira Envelhecida Rústica',
    category: 'Madeira',
    finalHex: '#4d3927',
    colors: [
      { name: 'Oak Brown', brand: 'Army Painter', hex: '#47311c', parts: 5 },
      { name: 'Model Color Leather Brown', brand: 'Vallejo', hex: '#684a30', parts: 2 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 1 }
    ],
    description: 'Madeira escura e envelhecida pelo tempo, ideal para cabos de martelos, portas e detalhes de escudos.'
  },

  // Ossos
  {
    id: 'pr-08',
    name: 'Osso Envelhecido / Pergaminho',
    category: 'Ossos',
    finalHex: '#ded5bc',
    colors: [
      { name: 'Model Color Pale Sand', brand: 'Vallejo', hex: '#ded4bc', parts: 6 },
      { name: 'Model Color Leather Brown', brand: 'Vallejo', hex: '#684a30', parts: 1 },
      { name: 'White Scar', brand: 'Citadel', hex: '#fbfbfb', parts: 2 }
    ],
    description: 'Tonalidade perfeita para esqueletos, crânios expostos pelo tempo, pergaminhos e garras rústicas.'
  },

  // Weathering, Rust, Blood, Lava, Stone
  {
    id: 'pr-09',
    name: 'Ferrugem Realista Oxigenada',
    category: 'Ferrugem',
    finalHex: '#a04d22',
    colors: [
      { name: 'AK Rusty Orange', brand: 'AK Interactive', hex: '#c35b24', parts: 4 },
      { name: 'Model Color Leather Brown', brand: 'Vallejo', hex: '#684a30', parts: 2 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 1 }
    ],
    description: 'Pátina de ferrugem em estágios avançados de corrosão. Aplique com batidas de pincel de textura.'
  },
  {
    id: 'pr-10',
    name: 'Sangue Coagulado Escuro',
    category: 'Sangue',
    finalHex: '#520608',
    colors: [
      { name: 'Mephiston Red', brand: 'Citadel', hex: '#9a1115', parts: 5 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 2 },
      { name: 'Model Color Leather Brown', brand: 'Vallejo', hex: '#684a30', parts: 1 }
    ],
    description: 'Efeito de sangue seco ou ferida profunda. Para sangue brilhante, adicione verniz brilhante após secar.'
  },
  {
    id: 'pr-11',
    name: 'Lava Incandescente (Efeito OSL)',
    category: 'Lava',
    finalHex: '#e18314',
    colors: [
      { name: 'AK Rusty Orange', brand: 'AK Interactive', hex: '#c35b24', parts: 3 },
      { name: 'Flash Gitz Yellow', brand: 'Citadel', hex: '#fff200', parts: 3 },
      { name: 'Mephiston Red', brand: 'Citadel', hex: '#9a1115', parts: 1 }
    ],
    description: 'Aparência de magma derretido para bases temáticas ou fendas de energia brilhante.'
  },
  {
    id: 'pr-12',
    name: 'Pedra Negra Rúnica',
    category: 'Pedra',
    finalHex: '#46484a',
    colors: [
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 4 },
      { name: 'White Scar', brand: 'Citadel', hex: '#fbfbfb', parts: 1 },
      { name: 'Macragge Blue', brand: 'Citadel', hex: '#0f3d7c', parts: 1 }
    ],
    description: 'Pedra vulcânica escura com um sutil tom azulado nas fendas. Excelente para masmorras e ruínas.'
  },

  // Outros
  {
    id: 'pr-13',
    name: 'Uniforme Militar Camuflagem Verde',
    category: 'Militar',
    finalHex: '#25502a',
    colors: [
      { name: 'Flat Green XF-5', brand: 'Tamiya', hex: '#1d6f2d', parts: 4 },
      { name: 'Abaddon Black', brand: 'Citadel', hex: '#1d1d1b', parts: 2 },
      { name: 'Flash Gitz Yellow', brand: 'Citadel', hex: '#fff200', parts: 1 }
    ],
    description: 'Verde azeitona escuro ideal para uniformes e tanques militares do período da Segunda Guerra.'
  },
  {
    id: 'pr-14',
    name: 'Brilho Quântico Sci-Fi',
    category: 'Sci-Fi',
    finalHex: '#41ded5',
    colors: [
      { name: 'White Scar', brand: 'Citadel', hex: '#fbfbfb', parts: 4 },
      { name: 'Game Color Ultramarine Blue', brand: 'Vallejo', hex: '#194285', parts: 1 },
      { name: 'Moot Green', brand: 'Citadel', hex: '#39b54a', parts: 1 }
    ],
    description: 'Tom azul ciano néon para efeitos de armas de plasma, reatores e runes futuristas.'
  }
];
