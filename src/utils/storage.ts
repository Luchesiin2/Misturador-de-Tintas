import { Palette, SavedRecipe, PaintingSheet, PaintingHistoryItem } from '../types';

// LocalStorage Keys
const KEYS = {
  PALETTES: 'c3d_palettes',
  RECIPES: 'c3d_recipes',
  SHEETS: 'c3d_sheets',
  HISTORY: 'c3d_history',
  FAVORITE_PAINTS: 'c3d_fav_paints',
  FAVORITE_RECIPES: 'c3d_fav_recipes',
  COMPLETED_GUIDE_STAGES: 'c3d_completed_guide',
  FAVORITE_GUIDE_STAGES: 'c3d_fav_guide',
  FAVORITE_SHEETS: 'c3d_fav_sheets',
  THEME: 'c3d_theme'
};

// Initial Sample Data to seed LocalStorage if empty
const SAMPLE_PALETTES: Palette[] = [
  {
    id: 'p-sample-1',
    name: 'Guerreiro Orc da Floresta',
    theme: 'Fantasia',
    colors: {
      principal: { name: 'Verde Orc Base', hex: '#2e7a3c', rgb: { r: 46, g: 122, b: 60 } },
      base: { name: 'Verde Catinga', hex: '#1d6f2d', rgb: { r: 29, g: 111, b: 45 } },
      sombra: { name: 'Verde Sombra Profunda', hex: '#114a1e', rgb: { r: 17, g: 74, b: 30 } },
      luz: { name: 'Luz Verde Tóxica', hex: '#39b54a', rgb: { r: 57, g: 181, b: 74 } },
      destaque: { name: 'Destaque Amarelo Ácido', hex: '#fff200', rgb: { r: 255, g: 242, b: 0 } },
      metalica: { name: 'Cota de Malha Escura', hex: '#818285', rgb: { r: 129, g: 130, b: 133 } },
      detalhes: { name: 'Couro Vermelho Sangue', hex: '#9a1115', rgb: { r: 154, g: 17, b: 21 } }
    },
    isCustom: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
  },
  {
    id: 'p-sample-2',
    name: 'Necromante Morto-Vivo',
    theme: 'Terror',
    colors: {
      principal: { name: 'Roxo Ritual', hex: '#5c2d91', rgb: { r: 92, g: 45, b: 145 } },
      base: { name: 'Pele Cadavérica', hex: '#a3ab7c', rgb: { r: 163, g: 171, b: 124 } },
      sombra: { name: 'Preto Abissal', hex: '#1d1d1b', rgb: { r: 29, g: 29, b: 27 } },
      luz: { name: 'Osso Envelhecido', hex: '#ded4bc', rgb: { r: 222, g: 212, b: 188 } },
      destaque: { name: 'Fogo Fátuo Verde', hex: '#41ded5', rgb: { r: 65, g: 222, b: 213 } },
      metalica: { name: 'Bronze Arqueológico', hex: '#c49c4d', rgb: { r: 196, g: 156, b: 77 } },
      detalhes: { name: 'Sangue Coagulado', hex: '#520608', rgb: { r: 82, g: 6, b: 8 } }
    },
    isCustom: false,
    createdAt: new Date().toISOString()
  }
];

const SAMPLE_RECIPES: SavedRecipe[] = [
  {
    id: 'r-sample-1',
    name: 'Pele Orc Realista',
    category: 'Tons de Pele',
    colors: [
      {
        paint: {
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
        percentage: 57.1,
        drops: 8
      },
      {
        paint: {
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
        percentage: 28.6,
        drops: 4
      },
      {
        paint: {
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
        percentage: 14.3,
        drops: 2
      }
    ],
    finalHex: '#455f2f',
    totalDrops: 14,
    isFavorite: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    notes: 'Base perfeita para Orcs mais sombrios e brutais de Warhammer Fantasy.'
  },
  {
    id: 'r-sample-2',
    name: 'Armadura de Cavaleiro Enferrujada',
    category: 'Weathering',
    colors: [
      {
        paint: {
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
        percentage: 60,
        drops: 6
      },
      {
        paint: {
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
        percentage: 30,
        drops: 3
      },
      {
        paint: {
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
        percentage: 10,
        drops: 1
      }
    ],
    finalHex: '#715545',
    totalDrops: 10,
    isFavorite: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    notes: 'Diluir em 1:1 de água para aplicar como wash sobre as placas de aço do cavaleiro morto.'
  }
];

const SAMPLE_SHEETS: PaintingSheet[] = [
  {
    id: 's-sample-1',
    title: 'Guerreiro Orc Shaman',
    miniatureName: 'Orc Shaman Bust',
    brandOrCreator: 'Artisan Guild',
    sections: [
      {
        area: 'PELE DO ORC',
        recipeName: 'Pele Orc Realista',
        description: '8 gotas Sick Green (Vallejo) + 4 gotas Leather Brown (Vallejo) + 2 gotas Flash Gitz (Citadel). Diluído em 1 gota de água.',
        hex: '#455f2f'
      },
      {
        area: 'CABELO & ADORNOS',
        recipeName: 'Preto Rúnico Profundo',
        description: '5 gotas Abaddon Black + 1 gota Macragge Blue para sombras azuladas frias.',
        hex: '#1b2636'
      },
      {
        area: 'ARMADURA E MACHADO',
        recipeName: 'Aço Escuro de Combate',
        description: '6 gotas Leadbelcher (Citadel) + 2 gotas Abaddon Black (Citadel). Finalizar com Wash de Nuln Oil puro nos vãos.',
        hex: '#515354'
      }
    ],
    isFavorite: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  }
];

const SAMPLE_HISTORY: PaintingHistoryItem[] = [
  {
    id: 'h-1',
    type: 'ficha',
    title: 'Ficha de Pintura criada',
    description: 'Criou a ficha de pintura "Guerreiro Orc Shaman" para impressão da Artisan Guild.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'h-2',
    type: 'receita',
    title: 'Receita "Pele Orc Realista" salva',
    description: 'Salvou receita de mistura com proporções de 8:4:2 gotas.',
    hex: '#455f2f',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'h-3',
    type: 'paleta',
    title: 'Paleta "Guerreiro Orc da Floresta" salva',
    description: 'Gerada paleta temática de Fantasia e favoritada com sucesso.',
    hex: '#2e7a3c',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

// Helper to safely load JSON from storage or return default
const load = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Error loading from local storage for key ${key}`, e);
    return defaultValue;
  }
};

const save = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving to local storage for key ${key}`, e);
  }
};

// INITIALIZER
export const initializeStorage = (): void => {
  if (!localStorage.getItem(KEYS.PALETTES)) {
    save(KEYS.PALETTES, SAMPLE_PALETTES);
  }
  if (!localStorage.getItem(KEYS.RECIPES)) {
    save(KEYS.RECIPES, SAMPLE_RECIPES);
  }
  if (!localStorage.getItem(KEYS.SHEETS)) {
    save(KEYS.SHEETS, SAMPLE_SHEETS);
  }
  if (!localStorage.getItem(KEYS.HISTORY)) {
    save(KEYS.HISTORY, SAMPLE_HISTORY);
  }
  if (!localStorage.getItem(KEYS.THEME)) {
    save(KEYS.THEME, 'dark');
  }
};

// THEME
export const getSavedTheme = (): 'light' | 'dark' => {
  return load<'light' | 'dark'>(KEYS.THEME, 'dark');
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  save(KEYS.THEME, theme);
};

// PALETTES
export const getSavedPalettes = (): Palette[] => {
  return load<Palette[]>(KEYS.PALETTES, []);
};

export const savePalette = (palette: Palette): Palette[] => {
  const current = getSavedPalettes();
  const index = current.findIndex(p => p.id === palette.id);
  if (index >= 0) {
    current[index] = palette;
  } else {
    current.unshift(palette);
  }
  save(KEYS.PALETTES, current);
  addHistoryItem({
    id: 'h-' + Date.now(),
    type: 'paleta',
    title: 'Paleta salva',
    description: `Paleta "${palette.name}" (${palette.theme}) salva com sucesso.`,
    hex: palette.colors.principal.hex,
    createdAt: new Date().toISOString()
  });
  return current;
};

export const deletePalette = (id: string): Palette[] => {
  const current = getSavedPalettes();
  const filtered = current.filter(p => p.id !== id);
  save(KEYS.PALETTES, filtered);
  return filtered;
};

// RECIPES
export const getSavedRecipes = (): SavedRecipe[] => {
  return load<SavedRecipe[]>(KEYS.RECIPES, []);
};

export const saveRecipe = (recipe: SavedRecipe): SavedRecipe[] => {
  const current = getSavedRecipes();
  const index = current.findIndex(r => r.id === recipe.id);
  if (index >= 0) {
    current[index] = recipe;
  } else {
    current.unshift(recipe);
  }
  save(KEYS.RECIPES, current);
  addHistoryItem({
    id: 'h-' + Date.now(),
    type: 'receita',
    title: index >= 0 ? 'Receita editada' : 'Receita salva',
    description: `Receita "${recipe.name}" salva na biblioteca de receitas.`,
    hex: recipe.finalHex,
    createdAt: new Date().toISOString()
  });
  return current;
};

export const deleteRecipe = (id: string): SavedRecipe[] => {
  const current = getSavedRecipes();
  const filtered = current.filter(r => r.id !== id);
  save(KEYS.RECIPES, filtered);
  return filtered;
};

// SHEETS (Fichas de Pintura)
export const getPaintingSheets = (): PaintingSheet[] => {
  return load<PaintingSheet[]>(KEYS.SHEETS, []);
};

export const savePaintingSheet = (sheet: PaintingSheet): PaintingSheet[] => {
  const current = getPaintingSheets();
  const index = current.findIndex(s => s.id === sheet.id);
  if (index >= 0) {
    current[index] = sheet;
  } else {
    current.unshift(sheet);
  }
  save(KEYS.SHEETS, current);
  addHistoryItem({
    id: 'h-' + Date.now(),
    type: 'ficha',
    title: index >= 0 ? 'Ficha editada' : 'Ficha de Pintura criada',
    description: `Ficha da miniatura "${sheet.title}" atualizada com sucesso.`,
    hex: sheet.sections[0]?.hex || '#4f46e5',
    createdAt: new Date().toISOString()
  });
  return current;
};

export const deletePaintingSheet = (id: string): PaintingSheet[] => {
  const current = getPaintingSheets();
  const filtered = current.filter(s => s.id !== id);
  save(KEYS.SHEETS, filtered);
  return filtered;
};

// HISTORY
export const getHistory = (): PaintingHistoryItem[] => {
  return load<PaintingHistoryItem[]>(KEYS.HISTORY, []);
};

export const addHistoryItem = (item: PaintingHistoryItem): void => {
  const current = getHistory();
  current.unshift(item);
  // Limit to 40 items
  if (current.length > 40) current.pop();
  save(KEYS.HISTORY, current);
};

export const clearHistory = (): void => {
  save(KEYS.HISTORY, []);
};

// FAVORITE PAINTS (Cores favoritas do catálogo)
export const getFavoritePaints = (): string[] => {
  return load<string[]>(KEYS.FAVORITE_PAINTS, []);
};

export const toggleFavoritePaint = (paintId: string): string[] => {
  const current = getFavoritePaints();
  const index = current.indexOf(paintId);
  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(paintId);
  }
  save(KEYS.FAVORITE_PAINTS, current);
  return current;
};

// PERSONAL COLOR COLLECTION
export const getPersonalCollection = (): string[] => {
  return load<string[]>('c3d_personal_collection', []);
};

export const togglePersonalCollection = (paintId: string): string[] => {
  const current = getPersonalCollection();
  const index = current.indexOf(paintId);
  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(paintId);
  }
  save('c3d_personal_collection', current);
  return current;
};

// COMPLETED GUIDE STAGES
export const getCompletedGuideStages = (): number[] => {
  return load<number[]>(KEYS.COMPLETED_GUIDE_STAGES, []);
};

export const toggleGuideStageCompleted = (stageId: number): number[] => {
  const current = getCompletedGuideStages();
  const index = current.indexOf(stageId);
  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(stageId);
  }
  save(KEYS.COMPLETED_GUIDE_STAGES, current);
  return current;
};

// FAVORITE GUIDE STAGES
export const getFavoriteGuideStages = (): number[] => {
  return load<number[]>(KEYS.FAVORITE_GUIDE_STAGES, []);
};

export const toggleGuideStageFavorite = (stageId: number): number[] => {
  const current = getFavoriteGuideStages();
  const index = current.indexOf(stageId);
  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(stageId);
  }
  save(KEYS.FAVORITE_GUIDE_STAGES, current);
  return current;
};
