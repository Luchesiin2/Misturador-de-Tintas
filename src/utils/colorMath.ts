import { ColorSpec, Palette } from '../types';

// Helper: Convert HEX to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Helper: Convert RGB to HEX
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  return '#' + [clamp(r), clamp(g), clamp(b)]
    .map(val => {
      const hexStr = val.toString(16);
      return hexStr.length === 1 ? '0' + hexStr : hexStr;
    })
    .join('');
}

// Proportional Paint Blending
// Takes an array of HEX colors and their parts (drops or percentages) and calculates the mixed result
export function mixColors(colors: Array<{ hex: string; parts: number }>): { hex: string; rgb: { r: number; g: number; b: number } } {
  if (colors.length === 0) {
    return { hex: '#808080', rgb: { r: 128, g: 128, b: 128 } };
  }

  const validColors = colors.filter(c => c.parts > 0);
  if (validColors.length === 0) {
    // default grey if parts are 0
    const d = colors[0] ? hexToRgb(colors[0].hex) : { r: 128, g: 128, b: 128 };
    return { hex: colors[0]?.hex || '#808080', rgb: d };
  }

  const totalParts = validColors.reduce((sum, c) => sum + c.parts, 0);

  // Blend in linear space for more natural-looking physical paint mixing
  let rLinear = 0;
  let gLinear = 0;
  let bLinear = 0;

  validColors.forEach(c => {
    const rgb = hexToRgb(c.hex);
    const weight = c.parts / totalParts;
    // Linearize RGB
    rLinear += Math.pow(rgb.r / 255, 2.2) * weight;
    gLinear += Math.pow(rgb.g / 255, 2.2) * weight;
    bLinear += Math.pow(rgb.b / 255, 2.2) * weight;
  });

  // Convert back to gamma space
  const rResult = Math.pow(rLinear, 1 / 2.2) * 255;
  const gResult = Math.pow(gLinear, 1 / 2.2) * 255;
  const bResult = Math.pow(bLinear, 1 / 2.2) * 255;

  const finalRgb = {
    r: Math.round(rResult),
    g: Math.round(gResult),
    b: Math.round(bResult)
  };

  return {
    hex: rgbToHex(finalRgb.r, finalRgb.g, finalRgb.b),
    rgb: finalRgb
  };
}

// Calculate color similarity percentage based on Euclidean distance in RGB space
export function getColorSimilarity(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  // Euclidean distance (max distance is sqrt(255^2 * 3) = 441.67)
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );

  const maxDistance = 441.673;
  const similarity = (1 - distance / maxDistance) * 100;

  return parseFloat(similarity.toFixed(1));
}

// Core curated themes palette generator
export function generatePaletteByTheme(theme: string, name: string): Palette {
  const id = 'p-' + Date.now();
  const createdAt = new Date().toISOString();

  // Color schemas based on theme
  let colors: Palette['colors'];

  switch (theme) {
    case 'Fantasia':
      colors = {
        principal: { name: 'Verde Élfico Florido', hex: '#2c8a4f', rgb: { r: 44, g: 138, b: 79 } },
        base: { name: 'Pele Élfica', hex: '#dfb293', rgb: { r: 223, g: 178, b: 147 } },
        sombra: { name: 'Sombra Verde Musgo', hex: '#164d2b', rgb: { r: 22, g: 77, b: 43 } },
        luz: { name: 'Luz de Lua Élfica', hex: '#a6edd0', rgb: { r: 166, g: 237, b: 208 } },
        destaque: { name: 'Rosa Mágico Pixie', hex: '#e95c8f', rgb: { r: 233, g: 92, b: 143 } },
        metalica: { name: 'Prata Élfica Brilhante', hex: '#d1d8e0', rgb: { r: 209, g: 216, b: 224 } },
        detalhes: { name: 'Azul Celeste Místico', hex: '#4b9cd3', rgb: { r: 75, g: 156, b: 211 } }
      };
      break;

    case 'Medieval':
      colors = {
        principal: { name: 'Aço Temperado', hex: '#636e72', rgb: { r: 99, g: 110, b: 114 } },
        base: { name: 'Couro de Montaria', hex: '#8c5a3c', rgb: { r: 140, g: 90, b: 60 } },
        sombra: { name: 'Preto de Piche', hex: '#2d3436', rgb: { r: 45, g: 52, b: 54 } },
        luz: { name: 'Pano Cru Linho', hex: '#dfe6e9', rgb: { r: 223, g: 230, b: 233 } },
        destaque: { name: 'Estandarte Escarlate', hex: '#d63031', rgb: { r: 214, g: 48, b: 49 } },
        metalica: { name: 'Cota de Malha Cobre', hex: '#d35400', rgb: { r: 211, g: 84, b: 0 } },
        detalhes: { name: 'Ouro Velho de Fivela', hex: '#e1b12c', rgb: { r: 225, g: 177, b: 44 } }
      };
      break;

    case 'Anime':
      colors = {
        principal: { name: 'Azul Protagonista', hex: '#0984e3', rgb: { r: 9, g: 132, b: 227 } },
        base: { name: 'Rosa Chiclete Cabelo', hex: '#fd79a8', rgb: { r: 253, g: 121, b: 168 } },
        sombra: { name: 'Violeta de Sombreamento', hex: '#6c5ce7', rgb: { r: 108, g: 92, b: 231 } },
        luz: { name: 'Brilho de Olho Anime', hex: '#fff', rgb: { r: 255, g: 255, b: 255 } },
        destaque: { name: 'Amarelo Saiyajin', hex: '#fdcb6e', rgb: { r: 253, g: 203, b: 110 } },
        metalica: { name: 'Aço Katana Cromado', hex: '#dfe6e9', rgb: { r: 223, g: 230, b: 233 } },
        detalhes: { name: 'Laranja Mech', hex: '#e17055', rgb: { r: 225, g: 112, b: 85 } }
      };
      break;

    case 'Super-heróis':
      colors = {
        principal: { name: 'Azul do Defensor', hex: '#2e5b9a', rgb: { r: 46, g: 91, b: 154 } },
        base: { name: 'Vermelho do Capote', hex: '#c0392b', rgb: { r: 192, g: 57, b: 43 } },
        sombra: { name: 'Marinho das Costuras', hex: '#1a2c4c', rgb: { r: 26, g: 44, b: 76 } },
        luz: { name: 'Ciano Visor Laser', hex: '#00cec9', rgb: { r: 0, g: 206, b: 201 } },
        destaque: { name: 'Amarelo Emblema', hex: '#f1c40f', rgb: { r: 241, g: 196, b: 15 } },
        metalica: { name: 'Aço Indestrutível Shield', hex: '#b2bec3', rgb: { r: 178, g: 190, b: 195 } },
        detalhes: { name: 'Ouro Imperial Cinto', hex: '#f39c12', rgb: { r: 243, g: 156, b: 18 } }
      };
      break;

    case 'Terror':
      colors = {
        principal: { name: 'Sangue Arterial Espesso', hex: '#630a0a', rgb: { r: 99, g: 10, b: 10 } },
        base: { name: 'Carne Exposta Putrefata', hex: '#a88c74', rgb: { r: 168, g: 140, b: 116 } },
        sombra: { name: 'Escuridão Profunda Necrose', hex: '#111', rgb: { r: 17, g: 17, b: 17 } },
        luz: { name: 'Osso Envelhecido Purulento', hex: '#e6dfce', rgb: { r: 230, g: 223, b: 206 } },
        destaque: { name: 'Verde Venenoso Líquido', hex: '#2ecc71', rgb: { r: 46, g: 204, b: 113 } },
        metalica: { name: 'Ferro Enferrujado de Tortura', hex: '#b55b2a', rgb: { r: 181, g: 91, b: 42 } },
        detalhes: { name: 'Roxo Hematoma Seco', hex: '#482458', rgb: { r: 72, g: 36, b: 88 } }
      };
      break;

    case 'Ficção Científica':
      colors = {
        principal: { name: 'Grafite Fibra de Carbono', hex: '#34495e', rgb: { r: 52, g: 73, b: 94 } },
        base: { name: 'Branco Cerâmica de Nave', hex: '#eceff1', rgb: { r: 236, g: 239, b: 241 } },
        sombra: { name: 'Cinza Profundidade Espacial', hex: '#2c3e50', rgb: { r: 44, g: 62, b: 80 } },
        luz: { name: 'Ciano Luz Quântica', hex: '#00ffe0', rgb: { r: 0, g: 255, b: 224 } },
        destaque: { name: 'Luz Laser Néon Laranja', hex: '#ff5722', rgb: { r: 255, g: 87, b: 34 } },
        metalica: { name: 'Titânio Aeroespacial', hex: '#b0bec5', rgb: { r: 176, g: 190, b: 197 } },
        detalhes: { name: 'Roxo Motor de Dobra', hex: '#9c27b0', rgb: { r: 156, g: 39, b: 176 } }
      };
      break;

    case 'Militar':
      colors = {
        principal: { name: 'Verde Camuflagem OTAN', hex: '#3b533d', rgb: { r: 59, g: 83, b: 61 } },
        base: { name: 'Bege Deserto Khaki', hex: '#c5a059', rgb: { r: 197, g: 160, b: 89 } },
        sombra: { name: 'Marrom Terra Úmida', hex: '#3d2b1f', rgb: { r: 61, g: 43, b: 31 } },
        luz: { name: 'Areia Clara de Deserto', hex: '#e6dfce', rgb: { r: 230, g: 223, b: 206 } },
        destaque: { name: 'Laranja de Sinalização', hex: '#ff9800', rgb: { r: 255, g: 152, b: 0 } },
        metalica: { name: 'Aço Oxidado de Canhão', hex: '#78909c', rgb: { r: 120, g: 144, b: 156 } },
        detalhes: { name: 'Marrom Couro de Coldre', hex: '#5d4037', rgb: { r: 93, g: 64, b: 55 } }
      };
      break;

    default: // Customizado
      colors = {
        principal: { name: 'Cor Principal Customizada', hex: '#9b59b6', rgb: { r: 155, g: 89, b: 182 } },
        base: { name: 'Cor Base Customizada', hex: '#3498db', rgb: { r: 52, g: 152, b: 219 } },
        sombra: { name: 'Cor de Sombra Customizada', hex: '#2c3e50', rgb: { r: 44, g: 62, b: 80 } },
        luz: { name: 'Cor de Luz Customizada', hex: '#ecf0f1', rgb: { r: 236, g: 240, b: 241 } },
        destaque: { name: 'Cor de Destaque Customizada', hex: '#e74c3c', rgb: { r: 231, g: 76, b: 60 } },
        metalica: { name: 'Metálica Recomendada', hex: '#f1c40f', rgb: { r: 241, g: 196, b: 15 } },
        detalhes: { name: 'Cor para Detalhes Customizada', hex: '#1abc9c', rgb: { r: 26, g: 188, b: 156 } }
      };
      break;
  }

  return {
    id,
    name,
    theme,
    colors,
    isCustom: theme === 'Customizado',
    createdAt
  };
}
