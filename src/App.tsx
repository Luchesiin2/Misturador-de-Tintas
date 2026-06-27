import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Palette as PaletteIcon, 
  Paintbrush, 
  BookOpen, 
  Library, 
  Bookmark, 
  Layers, 
  FileSpreadsheet, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  Info
} from 'lucide-react';

// Import Types
import { Palette, SavedRecipe, PaintingSheet, PaintingHistoryItem } from './types';

// Import Components
import Dashboard from './components/Dashboard';
import PaletteGenerator from './components/PaletteGenerator';
import PaintMixer from './components/PaintMixer';
import BeginnerGuide from './components/BeginnerGuide';
import ColorLibrary from './components/ColorLibrary';
import RecipeLibrary from './components/RecipeLibrary';
import PremadeCatalog from './components/PremadeCatalog';
import PaintingSheetComponent from './components/PaintingSheet';

// Import Storage helpers
import { 
  initializeStorage,
  getSavedTheme,
  saveTheme as persistTheme,
  getSavedPalettes,
  savePalette as persistPalette,
  deletePalette as persistDeletePalette,
  getSavedRecipes,
  saveRecipe as persistRecipe,
  deleteRecipe as persistDeleteRecipe,
  getPaintingSheets,
  savePaintingSheet as persistPaintingSheet,
  deletePaintingSheet as persistDeletePaintingSheet,
  getHistory,
  getFavoritePaints,
  toggleFavoritePaint as persistToggleFavoritePaint,
  getPersonalCollection,
  togglePersonalCollection as persistTogglePersonalCollection,
  getCompletedGuideStages,
  toggleGuideStageCompleted as persistToggleGuideStageCompleted,
  getFavoriteGuideStages,
  toggleGuideStageFavorite as persistToggleGuideStageFavorite
} from './utils/storage';

import { MINIATURE_PAINTS } from './data/colors';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<string>('painel');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Core App states synchronised with LocalStorage
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [sheets, setSheets] = useState<PaintingSheet[]>([]);
  const [history, setHistory] = useState<PaintingHistoryItem[]>([]);
  const [favoritePaints, setFavoritePaints] = useState<string[]>([]);
  const [personalCollection, setPersonalCollection] = useState<string[]>([]);
  const [completedGuideStages, setCompletedGuideStages] = useState<number[]>([]);
  const [favoriteGuideStages, setFavoriteGuideStages] = useState<number[]>([]);

  // Inter-tab Selection States (e.g., clicking compare, editing from dashboard)
  const [selectedPaintForComparison, setSelectedPaintForComparison] = useState<string | null>(null);
  const [selectedPaletteFromDashboard, setSelectedPaletteFromDashboard] = useState<Palette | null>(null);

  // 1. Initialise and load all persistent structures
  useEffect(() => {
    initializeStorage();
    
    // Load state values
    const savedTheme = getSavedTheme();
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    setPalettes(getSavedPalettes());
    setSavedRecipes(getSavedRecipes());
    setSheets(getPaintingSheets());
    setHistory(getHistory());
    setFavoritePaints(getFavoritePaints());
    setPersonalCollection(getPersonalCollection());
    setCompletedGuideStages(getCompletedGuideStages());
    setFavoriteGuideStages(getFavoriteGuideStages());
  }, []);

  // Update lists from helper results and update local history
  const syncAndSetState = () => {
    setPalettes(getSavedPalettes());
    setSavedRecipes(getSavedRecipes());
    setSheets(getPaintingSheets());
    setHistory(getHistory());
  };

  // Toggle Theme helper
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    persistTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  // State Change Triggers
  const handleSavePalette = (palette: Palette) => {
    persistPalette(palette);
    syncAndSetState();
  };

  const handleDeletePalette = (id: string) => {
    persistDeletePalette(id);
    syncAndSetState();
  };

  const handleSaveRecipe = (recipe: SavedRecipe) => {
    persistRecipe(recipe);
    syncAndSetState();
  };

  const handleDeleteRecipe = (id: string) => {
    persistDeleteRecipe(id);
    syncAndSetState();
  };

  const handleSaveSheet = (sheet: PaintingSheet) => {
    persistPaintingSheet(sheet);
    syncAndSetState();
  };

  const handleDeleteSheet = (id: string) => {
    persistDeletePaintingSheet(id);
    syncAndSetState();
  };

  const handleToggleFavoritePaint = (paintId: string) => {
    const updated = persistToggleFavoritePaint(paintId);
    setFavoritePaints(updated);
  };

  const handleTogglePersonalCollection = (paintId: string) => {
    const updated = persistTogglePersonalCollection(paintId);
    setPersonalCollection(updated);
  };

  const handleToggleGuideCompleted = (stageId: number) => {
    const updated = persistToggleGuideStageCompleted(stageId);
    setCompletedGuideStages(updated);
  };

  const handleToggleGuideFavorite = (stageId: number) => {
    const updated = persistToggleGuideStageFavorite(stageId);
    setFavoriteGuideStages(updated);
  };

  // Inter-tab Navigation Routines
  const handleNavigateToComparator = (paintId: string) => {
    setSelectedPaintForComparison(paintId);
    setActiveTab('misturar');
  };

  // Formulate favorites for Dashboard
  const dashboardFavorites = {
    recipes: savedRecipes.filter(r => r.isFavorite),
    sheets: sheets.filter(s => s.isFavorite),
    palettes: palettes.filter(p => p.isFavorite || false) // fallback
  };

  // Navigation Links definition
  const navItems = [
    { id: 'painel', label: 'Painel Central', icon: LayoutDashboard },
    { id: 'paletas', label: 'Gerador de Paletas', icon: PaletteIcon },
    { id: 'misturar', label: 'Simulador & Calculadora', icon: Paintbrush },
    { id: 'guia', label: 'Guia do Pintor', icon: BookOpen },
    { id: 'cores', label: 'Biblioteca de Cores', icon: Library },
    { id: 'receitas', label: 'Minhas Receitas', icon: Layers },
    { id: 'prontas', label: 'Catálogo de Receitas', icon: Bookmark },
    { id: 'fichas', label: 'Fichas de Pintura', icon: FileSpreadsheet },
  ];

  // Render correct panel based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'painel':
        return (
          <Dashboard
            palettesCount={palettes.length}
            recipesCount={savedRecipes.length}
            sheetsCount={sheets.length}
            personalInventoryCount={personalCollection.length}
            totalPaintsCount={MINIATURE_PAINTS.length}
            guideProgress={completedGuideStages.length > 0 ? Math.round((completedGuideStages.length / 10) * 100) : 0}
            history={history}
            favorites={dashboardFavorites}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo(0, 0);
            }}
            onSelectSheet={(sheet) => {
              setActiveTab('fichas');
              window.scrollTo(0, 0);
            }}
            onSelectRecipe={(recipe) => {
              setActiveTab('receitas');
              window.scrollTo(0, 0);
            }}
            onSelectPalette={(palette) => {
              setSelectedPaletteFromDashboard(palette);
              setActiveTab('paletas');
              window.scrollTo(0, 0);
            }}
          />
        );
      case 'paletas':
        return (
          <PaletteGenerator
            savedPalettes={palettes}
            onSavePalette={handleSavePalette}
            onDeletePalette={handleDeletePalette}
            selectedPaletteFromDashboard={selectedPaletteFromDashboard}
            clearSelectedPaletteFromDashboard={() => setSelectedPaletteFromDashboard(null)}
          />
        );
      case 'misturar':
        return (
          <PaintMixer
            preselectedPaintId={selectedPaintForComparison}
            onClearPreselected={() => setSelectedPaintForComparison(null)}
            onSaveRecipe={handleSaveRecipe}
            savedRecipes={savedRecipes}
            onToggleFavoriteRecipe={(id) => {
              const rec = savedRecipes.find(r => r.id === id);
              if (rec) {
                handleSaveRecipe({ ...rec, isFavorite: !rec.isFavorite });
              }
            }}
          />
        );
      case 'guia':
        return (
          <BeginnerGuide
            completedStages={completedGuideStages}
            onToggleCompleted={handleToggleGuideCompleted}
            favoriteStages={favoriteGuideStages}
            onToggleFavorite={handleToggleGuideFavorite}
          />
        );
      case 'cores':
        return (
          <ColorLibrary
            favoritePaints={favoritePaints}
            onToggleFavoritePaint={handleToggleFavoritePaint}
            personalCollection={personalCollection}
            onTogglePersonalCollection={handleTogglePersonalCollection}
            onNavigateToComparator={handleNavigateToComparator}
          />
        );
      case 'receitas':
        return (
          <RecipeLibrary
            savedRecipes={savedRecipes}
            onDeleteRecipe={handleDeleteRecipe}
            onToggleFavorite={(id) => {
              const rec = savedRecipes.find(r => r.id === id);
              if (rec) {
                handleSaveRecipe({ ...rec, isFavorite: !rec.isFavorite });
              }
            }}
            onAddRecipe={handleSaveRecipe}
          />
        );
      case 'prontas':
        return (
          <PremadeCatalog
            onImportToRecipes={handleSaveRecipe}
            savedRecipes={savedRecipes}
          />
        );
      case 'fichas':
        return (
          <PaintingSheetComponent
            sheets={sheets}
            onSaveSheet={handleSaveSheet}
            onDeleteSheet={handleDeleteSheet}
            savedRecipes={savedRecipes}
          />
        );
      default:
        return <div className="text-center py-12 text-xs">Aba em desenvolvimento.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E1] transition-colors duration-200 flex font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0F0F12] border-r border-white/10 shrink-0">
        {/* Brand Banner */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-white/10 bg-[#111114]">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
            3D
          </div>
          <div>
            <span className="font-display font-semibold text-xs uppercase tracking-widest text-cyan-400">Ateliê 3D</span>
            <h2 className="text-[10px] font-bold text-white/40 -mt-0.5">Central de Pintura</h2>
          </div>
        </div>

        {/* Navigation lists */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isSel = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo(0, 0);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition select-none cursor-pointer border ${
                  isSel 
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]' 
                    : 'text-white/60 hover:text-cyan-400 hover:bg-white/5 border-transparent'
                }`}
              >
                <IconComponent className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer info & user credit line in rail */}
        <div className="p-4 border-t border-white/10 bg-[#111114]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/20">
                JP
              </div>
              <div>
                <span className="block text-[10px] font-bold text-white/70 leading-none">Mestre Pintor</span>
                <span className="text-[8px] text-white/30 font-mono">Guerreiro Orc</span>
              </div>
            </div>
            {/* Theme switcher */}
            <button
              id="sidebar-btn-theme"
              onClick={handleToggleTheme}
              className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-cyan-400 transition cursor-pointer"
              title="Alternar Tema Claro/Escuro"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-white/60" />}
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE FLOATING OVERLAY SIDEBAR */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsSidebarOpen(false)}
          />
          
          <div className="relative w-64 bg-[#0F0F12] border-r border-white/10 flex flex-col z-10 animate-fade-in text-[#E0E0E1]">
            {/* Mobile Sidebar Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-[#111114]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  3D
                </div>
                <span className="font-display font-semibold text-xs text-white">Central de <span className="text-cyan-400">Pintura 3D</span></span>
              </div>
              <button
                id="sidebar-close-mobile"
                onClick={() => setIsSidebarOpen(false)}
                className="text-white/40 hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isSel = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-link-mob-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                      isSel 
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                        : 'text-white/60 hover:text-cyan-400 hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <IconComponent className="h-4.5 w-4.5 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#111114]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/40">Pintor Amador</span>
              <button
                id="sidebar-btn-theme-mob"
                onClick={handleToggleTheme}
                className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-white/60" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile top bar */}
        <header className="lg:hidden h-16 bg-[#111114] border-b border-white/10 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              id="sidebar-toggle-mobile"
              onClick={() => setIsSidebarOpen(true)}
              className="text-white/60 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
              3D
            </div>
            <span className="font-display font-semibold text-xs text-white">Central de <span className="text-cyan-400">Pintura 3D</span></span>
          </div>

          <button
            id="mobile-theme-header"
            onClick={handleToggleTheme}
            className="p-2 text-white/60 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-white/60" />}
          </button>
        </header>

        {/* Content canvas */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>

    </div>
  );
}
