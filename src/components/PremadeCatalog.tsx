import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  Filter, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  Layers,
  Sparkles,
  ArrowRight,
  Import,
  BookmarkCheck
} from 'lucide-react';
import { PremadeRecipe, SavedRecipe, MixComponent } from '../types';
import { PREMADE_RECIPES } from '../data/recipes';

interface PremadeCatalogProps {
  onImportToRecipes: (recipe: SavedRecipe) => void;
  savedRecipes: SavedRecipe[];
}

const CATEGORIES = [
  'Todas',
  'Tons de Pele',
  'Metálicos',
  'Couro',
  'Madeira',
  'Ossos',
  'Monstros',
  'Fantasia',
  'Sci-Fi',
  'Militar',
  'Weathering',
  'Ferrugem',
  'Sangue',
  'Lava',
  'Pedra'
];

export default function PremadeCatalog({
  onImportToRecipes,
  savedRecipes
}: PremadeCatalogProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importSuccessId, setImportSuccessId] = useState<string | null>(null);

  // Filter recipes
  const filteredRecipes = PREMADE_RECIPES.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.colors.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todas' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShareRecipe = (recipe: PremadeRecipe) => {
    const ingredients = recipe.colors.map(c => `${c.parts} partes [${c.brand}] ${c.name}`).join('\n• ');
    const text = `🎨 *RECEITA PRONTA: ${recipe.name}* (${recipe.category})
Resultado final: ${recipe.finalHex.toUpperCase()}

Ingredientes:
• ${ingredients}

Descrição: ${recipe.description}
Encontre mais na Central de Pintura 3D!`;

    navigator.clipboard.writeText(text);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImport = (recipe: PremadeRecipe) => {
    // Map Premade colors to MixComponent representation
    const mixColors: MixComponent[] = recipe.colors.map(c => {
      // Create a dummy Paint object with matching details
      return {
        paint: {
          id: 'imported-' + Math.random().toString(36).substr(2, 4),
          name: c.name,
          code: 'Parts',
          brand: c.brand,
          hex: c.hex,
          type: 'Base',
          finish: 'Fosco',
          category: 'Custom',
          recommendedUse: ''
        },
        percentage: 0, // calculate relative %
        drops: c.parts
      };
    });

    // Calculate percentages
    const totalParts = recipe.colors.reduce((s, i) => s + i.parts, 0);
    mixColors.forEach(c => {
      c.percentage = parseFloat(((c.drops / totalParts) * 100).toFixed(1));
    });

    const newSavedRecipe: SavedRecipe = {
      id: 'r-imported-' + Date.now(),
      name: recipe.name + ' (Importada)',
      category: recipe.category,
      colors: mixColors,
      finalHex: recipe.finalHex,
      totalDrops: totalParts,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      notes: recipe.description
    };

    onImportToRecipes(newSavedRecipe);
    setImportSuccessId(recipe.id);
    setTimeout(() => setImportSuccessId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-emerald-500" /> Catálogo de Receitas Prontas
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Inicie imediatamente com nossa biblioteca de fórmulas profissionais de pintura para temas de fantasia, sci-fi e modelismo militar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Lado Esquerdo: Filtros de Categoria */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 h-fit space-y-4">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">Categorias Públicas</h3>
          <div className="flex flex-col gap-1.5 max-h-[360px] overflow-y-auto pr-1">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-left px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lado Direito: Grid de Receitas e Busca */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar receitas prontas por nome, marca de tinta ou ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white dark:bg-gray-900 pl-10 pr-4 py-2.5 text-xs font-semibold text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none dark:border-gray-800 dark:text-white"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRecipes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-400 text-xs rounded-xl border border-dashed border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
                Nenhuma receita encontrada correspondente à categoria ou busca.
              </div>
            ) : (
              filteredRecipes.map((recipe) => (
                <div 
                  key={recipe.id}
                  className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-4 shadow-xs hover:border-emerald-500/30 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Color Result Swatch & Title */}
                    <div className="flex items-start gap-3 justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Resulting Color Circle */}
                        <div 
                          className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-inner shrink-0" 
                          style={{ backgroundColor: recipe.finalHex }}
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{recipe.category}</span>
                          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white truncate mt-1">{recipe.name}</h3>
                        </div>
                      </div>

                      {/* Share Icon button */}
                      <button
                        id={`premade-share-${recipe.id}`}
                        onClick={() => handleShareRecipe(recipe)}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-500 transition cursor-pointer shrink-0"
                        title="Copiar fórmula para compartilhar"
                      >
                        {copiedId === recipe.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Descricao */}
                    <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400 leading-normal border-b border-gray-100 dark:border-gray-800 pb-3 font-sans">
                      {recipe.description}
                    </p>

                    {/* Ingredientes / Partes */}
                    <div className="mt-3 space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Proporção por Partes (Gotas)</span>
                      
                      <div className="space-y-1 text-xs">
                        {recipe.colors.map((color, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color.hex }} />
                              <span className="truncate text-gray-600 dark:text-gray-300">[{color.brand}] {color.name}</span>
                            </div>
                            <span className="font-mono font-bold text-gray-900 dark:text-white shrink-0">{color.parts} partes</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-gray-400 uppercase">{recipe.finalHex}</span>
                    
                    <button
                      id={`premade-import-${recipe.id}`}
                      onClick={() => handleImport(recipe)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer shadow-xs ${
                        importSuccessId === recipe.id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {importSuccessId === recipe.id ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Import className="h-3.5 w-3.5" />}
                      {importSuccessId === recipe.id ? 'Importada com sucesso!' : 'Importar para Minha Biblioteca'}
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
