import React, { useState } from 'react';
import { 
  Library, 
  Search, 
  Filter, 
  Heart, 
  Check, 
  Layers, 
  ChevronRight, 
  Sparkles,
  Info,
  Dna,
  Boxes
} from 'lucide-react';
import { Paint } from '../types';
import { MINIATURE_PAINTS } from '../data/colors';

interface ColorLibraryProps {
  favoritePaints: string[];
  onToggleFavoritePaint: (paintId: string) => void;
  personalCollection: string[];
  onTogglePersonalCollection: (paintId: string) => void;
  onNavigateToComparator: (paintId: string) => void;
}

const BRANDS = ['Todas', 'Citadel', 'Vallejo', 'AK Interactive', 'Army Painter', 'Scale75', 'Tamiya', 'Acrilex', 'Corfix'];
const CATEGORIES = [
  'Todas',
  'Vermelhos',
  'Azuis',
  'Verdes',
  'Amarelos',
  'Pretos',
  'Brancos',
  'Tons de Pele',
  'Metálicos',
  'Couro',
  'Madeira',
  'Fantasia',
  'Efeitos Especiais'
];

export default function ColorLibrary({
  favoritePaints,
  onToggleFavoritePaint,
  personalCollection,
  onTogglePersonalCollection,
  onNavigateToComparator
}: ColorLibraryProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [filterInventoryOnly, setFilterInventoryOnly] = useState<boolean>(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState<boolean>(false);

  // Filter Catalog
  const filteredPaints = MINIATURE_PAINTS.filter(paint => {
    const matchesSearch = paint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          paint.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          paint.recommendedUse.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = selectedBrand === 'Todas' || paint.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'Todas' || paint.category === selectedCategory;
    const matchesInventory = !filterInventoryOnly || personalCollection.includes(paint.id);
    const matchesFavorite = !filterFavoritesOnly || favoritePaints.includes(paint.id);

    return matchesSearch && matchesBrand && matchesCategory && matchesInventory && matchesFavorite;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Library className="h-6 w-6 text-emerald-500" /> Biblioteca de Cores para Miniaturas
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Catálogo profissional de tintas acrílicas das maiores marcas do mundo do modelismo e pintura 3D.
          </p>
        </div>

        {/* Collection stats */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/10 rounded-xl px-4 py-2 shrink-0">
          <Boxes className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div className="text-left text-xs">
            <span className="font-bold text-gray-800 dark:text-gray-200">Minha Coleção</span>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono mt-0.5">{personalCollection.length} de {MINIATURE_PAINTS.length} tintas em estoque</p>
          </div>
        </div>
      </div>

      {/* Grid de Filtros */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="flex items-center gap-1.5"><Filter className="h-3.5 w-3.5" /> Filtros e Pesquisa</span>
          <button 
            id="lib-btn-reset"
            onClick={() => {
              setSearchTerm('');
              setSelectedBrand('Todas');
              setSelectedCategory('Todas');
              setFilterInventoryOnly(false);
              setFilterFavoritesOnly(false);
            }}
            className="text-[10px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Nome, Código ou Palavra-chave</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ex: Mephiston, 70.957, base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-9 pr-3 py-2 text-xs font-semibold text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Marca</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {BRANDS.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Gama de Cor</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Fast Toggles */}
          <div className="space-y-1.5 flex flex-col justify-end gap-2 pt-2 sm:pt-0">
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={filterInventoryOnly}
                  onChange={(e) => setFilterInventoryOnly(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-650 peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Apenas estoque pessoal</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={filterFavoritesOnly}
                  onChange={(e) => setFilterFavoritesOnly(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-650 peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Apenas favoritadas</span>
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPaints.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400 text-xs rounded-xl border border-dashed border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
            Nenhuma tinta corresponde aos filtros ou pesquisa informada.
          </div>
        ) : (
          filteredPaints.map((paint) => {
            const isFav = favoritePaints.includes(paint.id);
            const inInventory = personalCollection.includes(paint.id);

            return (
              <div 
                key={paint.id}
                className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-4 shadow-xs transition duration-200 hover:border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  {/* Swatch & Brand Title header */}
                  <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Color Circle swatch */}
                      <div 
                        className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-inner shrink-0" 
                        style={{ backgroundColor: paint.hex }}
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">{paint.brand}</span>
                        <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white truncate">{paint.name}</h3>
                      </div>
                    </div>

                    {/* Actions button strip inside card */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {/* Favorite button */}
                      <button
                        id={`lib-btn-fav-${paint.id}`}
                        onClick={() => onToggleFavoritePaint(paint.id)}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 flex items-center justify-center text-gray-400 hover:text-rose-500 transition cursor-pointer"
                        title="Favoritar tinta"
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      {/* Add to Personal Collection checkbox icon */}
                      <button
                        id={`lib-btn-stock-${paint.id}`}
                        onClick={() => onTogglePersonalCollection(paint.id)}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
                          inInventory 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-400 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800/40'
                        }`}
                        title={inInventory ? 'Remover do meu estoque pessoal' : 'Adicionar ao meu estoque pessoal'}
                      >
                        <Check className={`h-4 w-4 ${inInventory ? 'stroke-3' : 'opacity-40 group-hover:opacity-100'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Informações da tinta */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-gray-100 dark:border-gray-800/60">
                    <div>
                      <span className="text-gray-400 font-medium">Código Comercial</span>
                      <p className="font-mono font-bold text-gray-700 dark:text-gray-300 mt-0.5">{paint.code}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Tipo & Acabamento</span>
                      <p className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5 truncate">{paint.type} / {paint.finish}</p>
                    </div>
                  </div>

                  {/* Uso recomendado */}
                  <div className="mt-3 text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Aplicações Recomendadas:</span>
                    <p className="mt-0.5">{paint.recommendedUse}</p>
                  </div>
                </div>

                {/* Compare / Bottom actions inside card */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-gray-400">{paint.hex.toUpperCase()}</span>
                  
                  <button
                    id={`lib-btn-comp-${paint.id}`}
                    onClick={() => onNavigateToComparator(paint.id)}
                    className="flex items-center gap-1 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-gray-400 text-[10px] font-bold px-2.5 py-1.5 transition cursor-pointer"
                  >
                    <Dna className="h-3 w-3 text-emerald-500" /> Comparar Tinta
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
