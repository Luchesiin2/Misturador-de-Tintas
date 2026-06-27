export interface ColorSpec {
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
}

export interface Palette {
  id: string;
  name: string;
  theme: string;
  colors: {
    principal: ColorSpec;
    base: ColorSpec;
    sombra: ColorSpec;
    luz: ColorSpec;
    destaque: ColorSpec;
    metalica: ColorSpec;
    detalhes: ColorSpec;
  };
  isCustom: boolean;
  createdAt: string;
}

export interface Paint {
  id: string;
  name: string;
  code: string;
  brand: string;
  hex: string;
  type: string; // 'Base' | 'Layer' | 'Shade' | 'Wash' | 'Contrast' | 'Dry' | 'Metallic' | 'Technical'
  finish: string; // 'Fosco' | 'Acetinado' | 'Brilhante' | 'Metálico' | 'Semi-brilho'
  category: string; // 'Vermelhos' | 'Azuis' | 'Verdes' | 'Amarelos' | 'Pretos' | 'Brancos' | 'Tons de Pele' | 'Metálicos' | 'Couro' | 'Madeira' | 'Fantasia' | 'Efeitos Especiais'
  recommendedUse: string;
}

export interface MixComponent {
  paint: Paint;
  percentage: number;
  drops: number;
}

export interface SavedRecipe {
  id: string;
  name: string;
  category: string;
  colors: MixComponent[];
  finalHex: string;
  totalDrops: number;
  isFavorite: boolean;
  createdAt: string;
  notes?: string;
}

export interface PremadeRecipe {
  id: string;
  name: string;
  category: string;
  finalHex: string;
  colors: { name: string; brand: string; hex: string; parts: number }[];
  description: string;
}

export interface GuideStage {
  id: number;
  title: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  explanation: string;
  tips: string[];
  commonErrors: string[];
  isCompleted: boolean;
  isFavorite: boolean;
}

export interface PaintingSheetSection {
  area: string; // PELE, ARMADURA, CAPA
  recipeName?: string;
  description: string; // "8 gotas Verde, 2 gotas Marrom" ou "Prata + Wash Preto"
  hex: string;
}

export interface PaintingSheet {
  id: string;
  title: string; // "Guerreiro Orc"
  miniatureName: string;
  brandOrCreator?: string;
  sections: PaintingSheetSection[];
  isFavorite: boolean;
  createdAt: string;
}

export interface PaintingHistoryItem {
  id: string;
  type: 'mistura' | 'receita' | 'ficha' | 'paleta';
  title: string;
  description: string;
  hex?: string;
  createdAt: string;
}
