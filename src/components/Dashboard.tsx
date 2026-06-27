import React from 'react';
import { 
  Paintbrush, 
  Palette as PaletteIcon, 
  BookOpen, 
  Layers, 
  Heart, 
  History, 
  Plus, 
  TrendingUp, 
  CheckCircle, 
  Bookmark, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Palette, SavedRecipe, PaintingSheet, PaintingHistoryItem } from '../types';

interface DashboardProps {
  palettesCount: number;
  recipesCount: number;
  sheetsCount: number;
  personalInventoryCount: number;
  totalPaintsCount: number;
  guideProgress: number; // e.g., 30 (30%)
  history: PaintingHistoryItem[];
  favorites: {
    recipes: SavedRecipe[];
    sheets: PaintingSheet[];
    palettes: Palette[];
  };
  onNavigate: (tab: string) => void;
  onSelectSheet: (sheet: PaintingSheet) => void;
  onSelectRecipe: (recipe: SavedRecipe) => void;
  onSelectPalette: (palette: Palette) => void;
}

export default function Dashboard({
  palettesCount,
  recipesCount,
  sheetsCount,
  personalInventoryCount,
  totalPaintsCount,
  guideProgress,
  history,
  favorites,
  onNavigate,
  onSelectSheet,
  onSelectRecipe,
  onSelectPalette
}: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#151518] via-[#111114] to-[#0A0A0B] border border-white/10 p-6 text-white shadow-lg md:p-8">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-cyan-400 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" /> Ateliê Digital de Colecionáveis
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl text-white">
            Central de Pintura 3D
          </h1>
          <p className="mt-2 text-white/70 text-sm md:text-base leading-relaxed">
            Bem-vindo ao seu painel profissional de pintura de miniaturas, action figures e impressões 3D. 
            Crie paletas de cores harmônicas, simule misturas exatas por gotas ou porcentagens e mantenha suas fichas de pintura organizadas para sempre.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              id="dash-btn-mix"
              onClick={() => onNavigate('misturar')}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 px-4 py-2.5 text-xs font-bold text-white transition shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <Paintbrush className="h-4 w-4" /> Nova Mistura de Tinta
            </button>
            <button
              id="dash-btn-sheet"
              onClick={() => onNavigate('fichas')}
              className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Criar Ficha de Pintura
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Estatísticas */}
      <div>
        <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" /> Estatísticas do Ateliê
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 transition hover:border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Receitas Salvas</span>
              <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-2 text-emerald-600 dark:text-emerald-400">
                <Layers className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4">
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">{recipesCount}</span>
              <p className="text-[11px] text-gray-400 mt-1">Sua biblioteca de fórmulas</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 transition hover:border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Fichas de Miniaturas</span>
              <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950/40 p-2 text-indigo-600 dark:text-indigo-400">
                <Paintbrush className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4">
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">{sheetsCount}</span>
              <p className="text-[11px] text-gray-400 mt-1">Projetos catalogados</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 transition hover:border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Paletas de Temas</span>
              <span className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-2 text-amber-600 dark:text-amber-400">
                <PaletteIcon className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4">
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">{palettesCount}</span>
              <p className="text-[11px] text-gray-400 mt-1">Gemas cromáticas salvas</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 transition hover:border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Coleção de Tintas</span>
              <span className="rounded-lg bg-teal-50 dark:bg-teal-950/40 p-2 text-teal-600 dark:text-teal-400">
                <CheckCircle className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4">
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                {personalInventoryCount} <span className="text-xs font-normal text-gray-400">/ {totalPaintsCount}</span>
              </span>
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-500" 
                  style={{ width: `${Math.min(100, (personalInventoryCount / totalPaintsCount) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Seção Principal de Conteúdo Duplo */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Lado Esquerdo/Centro: Progresso do Guia & Favoritos */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Barra de Progresso do Guia */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/40 p-3 text-purple-600 dark:text-purple-400 mt-1">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-base">Guia de Pintura para Iniciantes</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Domine as técnicas fundamentais, do Primer ao Verniz.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{guideProgress}% concluído</span>
                  <p className="text-[10px] text-gray-400">Treinamento prático</p>
                </div>
                <button
                  id="dash-btn-guide"
                  onClick={() => onNavigate('guia')}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white transition hover:bg-purple-700 cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500" 
                style={{ width: `${guideProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Favoritos */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-800 pb-2">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" /> Meus Favoritos Recentes
            </h3>

            {favorites.recipes.length === 0 && favorites.sheets.length === 0 && favorites.palettes.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-xs">
                Nenhum item marcado como favorito ainda. Explore os módulos e clique no ícone de coração!
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Receitas Favoritas */}
                {favorites.recipes.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                      <Bookmark className="h-3 w-3" /> Receitas Favoritas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {favorites.recipes.slice(0, 4).map(recipe => (
                        <div 
                          key={recipe.id}
                          onClick={() => onSelectRecipe(recipe)}
                          className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800/40 p-2.5 hover:bg-emerald-500/10 transition cursor-pointer border border-transparent hover:border-emerald-500/20"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div 
                              className="h-4 w-4 rounded-full border border-gray-200 dark:border-gray-700 shrink-0 shadow-xs" 
                              style={{ backgroundColor: recipe.finalHex }}
                            />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{recipe.name}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded-full shrink-0">
                            {recipe.totalDrops} gts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fichas Favoritas */}
                {favorites.sheets.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                      <Paintbrush className="h-3 w-3" /> Fichas de Pintura Favoritas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {favorites.sheets.slice(0, 4).map(sheet => (
                        <div 
                          key={sheet.id}
                          onClick={() => onSelectSheet(sheet)}
                          className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800/40 p-2.5 hover:bg-indigo-500/10 transition cursor-pointer border border-transparent hover:border-indigo-500/20"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{sheet.title}</p>
                            <p className="text-[10px] text-gray-400 truncate">{sheet.miniatureName}</p>
                          </div>
                          <span className="text-[10px] bg-indigo-100/60 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 px-2 py-0.5 rounded-full shrink-0">
                            {sheet.sections.length} áreas
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paletas Favoritas */}
                {favorites.palettes.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                      <PaletteIcon className="h-3 w-3" /> Paletas de Cores Favoritas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {favorites.palettes.slice(0, 4).map(palette => (
                        <div 
                          key={palette.id}
                          onClick={() => onSelectPalette(palette)}
                          className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800/40 p-2.5 hover:bg-amber-500/10 transition cursor-pointer border border-transparent hover:border-amber-500/20"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{palette.name}</p>
                            <p className="text-[10px] text-gray-400 truncate">{palette.theme}</p>
                          </div>
                          <div className="flex gap-0.5 shrink-0">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.colors.principal.hex }} />
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.colors.base.hex }} />
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.colors.luz.hex }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>

        {/* Lado Direito: Histórico de Pinturas Recentes */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 flex flex-col h-full">
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-800 pb-2">
            <History className="h-4 w-4 text-emerald-500" /> Atividades Recentes
          </h3>
          
          {history.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 text-xs py-12">
              <History className="h-8 w-8 text-gray-300 dark:text-gray-700 mb-2" />
              Sua jornada de pintura aparecerá aqui. Comece criando receitas ou fichas!
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[360px]">
              {history.slice(0, 8).map((item) => (
                <div key={item.id} className="relative pl-6 pb-2 border-l-2 border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  {/* Dot Icon Indicator */}
                  <div className="absolute -left-[6px] top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white dark:border-gray-900" />
                  
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{item.description}</p>
                    </div>
                    {item.hex && (
                      <div 
                        className="h-3.5 w-3.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-xs shrink-0" 
                        style={{ backgroundColor: item.hex }} 
                      />
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 block mt-1">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.createdAt).toLocaleDateString([], { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Dica Rápida Dinâmica no Rodapé */}
      <div className="rounded-xl border border-teal-500/10 bg-teal-50/50 p-4 dark:border-teal-950/50 dark:bg-teal-950/20 text-xs text-teal-800 dark:text-teal-300 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Dica Profissional do Ateliê:</span> Lembre-se sempre de agitar muito bem as tintas metálicas e os washes antes de colocar na paleta. Os pigmentos pesados de metal e o médium líquido tendem a decantar no fundo do frasco se ficarem parados por alguns dias!
        </div>
      </div>

    </div>
  );
}
