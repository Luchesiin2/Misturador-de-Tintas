import React, { useState, useEffect } from 'react';
import { 
  Paintbrush, 
  Droplets, 
  Dna, 
  FlaskConical, 
  Ruler, 
  Plus, 
  Trash2, 
  Save, 
  Share2, 
  Copy, 
  Check, 
  Heart, 
  ArrowRight, 
  Info,
  Scale,
  RefreshCw,
  Download,
  Printer,
  Sparkles
} from 'lucide-react';
import { Paint, SavedRecipe, MixComponent } from '../types';
import { MINIATURE_PAINTS } from '../data/colors';
import { mixColors, getColorSimilarity, hexToRgb } from '../utils/colorMath';

interface PaintMixerProps {
  onSaveRecipe: (recipe: SavedRecipe) => void;
  savedRecipes: SavedRecipe[];
  onToggleFavoriteRecipe: (id: string) => void;
  preselectedPaintId?: string | null;
  onClearPreselected?: () => void;
}

type SubTab = 'porcentagem' | 'gotas' | 'comparador' | 'diluicao' | 'calculadora';

export default function PaintMixer({
  onSaveRecipe,
  savedRecipes,
  onToggleFavoriteRecipe,
  preselectedPaintId,
  onClearPreselected
}: PaintMixerProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('porcentagem');

  // Common UI State
  const [copiedState, setCopiedState] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // ==========================================
  // STATE 1 - MISTURA POR PORCENTAGEM
  // ==========================================
  const [pctColors, setPctColors] = useState<Array<{ paintId: string; customHex: string; isCustom: boolean; ratio: number }>>([
    { paintId: 'cit-01', customHex: '#ff0000', isCustom: false, ratio: 70 },
    { paintId: 'cit-06', customHex: '#ffffff', isCustom: false, ratio: 20 },
    { paintId: 'cit-05', customHex: '#000000', isCustom: false, ratio: 10 }
  ]);
  const [pctRecipeName, setPctRecipeName] = useState<string>('Mistura Rosa Choque');

  // ==========================================
  // STATE 2 - MISTURA POR GOTAS
  // ==========================================
  const [dropColors, setDropColors] = useState<Array<{ paintId: string; customHex: string; isCustom: boolean; drops: number }>>([
    { paintId: 'cit-02', customHex: '#0000ff', isCustom: false, drops: 12 },
    { paintId: 'cit-06', customHex: '#ffffff', isCustom: false, drops: 4 },
    { paintId: 'cit-05', customHex: '#000000', isCustom: false, drops: 2 }
  ]);
  const [dropRecipeName, setDropRecipeName] = useState<string>('Azul Celeste por Gotas');

  // ==========================================
  // STATE 3 - COMPARADOR DE CORES
  // ==========================================
  const [compPaint1Id, setCompPaint1Id] = useState<string>('cit-01');
  const [compPaint2Id, setCompPaint2Id] = useState<string>('val-01');
  const [compPaint3Id, setCompPaint3Id] = useState<string>('ak-01');

  // Auto-load comparison on mount/update if navigated from catalog
  useEffect(() => {
    if (preselectedPaintId) {
      setActiveSubTab('comparador');
      setCompPaint1Id(preselectedPaintId);
      if (onClearPreselected) {
        onClearPreselected();
      }
    }
  }, [preselectedPaintId, onClearPreselected]);

  // ==========================================
  // STATE 4 - CALCULADORA DE DILUIÇÃO
  // ==========================================
  const [dilutionPaint, setDilutionPaint] = useState<number>(5);
  const [dilutionWater, setDilutionWater] = useState<number>(2);
  const [dilutionThinner, setDilutionThinner] = useState<number>(0);
  const [dilutionFlow, setDilutionFlow] = useState<number>(1);

  // ==========================================
  // STATE 5 - CALCULADORA DE TINTA
  // ==========================================
  const [miniHeight, setMiniHeight] = useState<number>(32); // Standard 32mm scale
  const [miniCount, setMiniCount] = useState<number>(5);    // Squad of 5

  // Helpers
  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const getPaintById = (id: string): Paint | undefined => {
    return MINIATURE_PAINTS.find(p => p.id === id);
  };

  const getPaintColorHex = (item: { paintId: string; customHex: string; isCustom: boolean }): string => {
    if (item.isCustom) return item.customHex;
    const p = getPaintById(item.paintId);
    return p ? p.hex : '#808080';
  };

  const getPaintName = (item: { paintId: string; customHex: string; isCustom: boolean }): string => {
    if (item.isCustom) return 'Cor Customizada';
    const p = getPaintById(item.paintId);
    return p ? `${p.brand} - ${p.name}` : 'Tinta';
  };

  // ==========================================
  // MIXERS CALCULATIONS
  // ==========================================

  // Blending Pct
  const [pctResult, setPctResult] = useState<{ hex: string; rgb: { r: number; g: number; b: number } }>({ hex: '#808080', rgb: { r: 128, g: 128, b: 128 } });
  const [pctCloseMatches, setPctCloseMatches] = useState<Array<{ paint: Paint; similarity: number }>>([]);

  useEffect(() => {
    const blendInput = pctColors.map(c => ({
      hex: getPaintColorHex(c),
      parts: c.ratio
    }));
    const mixed = mixColors(blendInput);
    setPctResult(mixed);

    // Closest retail brand matches (Advanced Brand Simulator)
    const matches = MINIATURE_PAINTS.map(p => {
      const sim = getColorSimilarity(mixed.hex, p.hex);
      return { paint: p, similarity: sim };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

    setPctCloseMatches(matches);
  }, [pctColors]);

  // Blending Drops
  const [dropResult, setDropResult] = useState<{ hex: string; rgb: { r: number; g: number; b: number } }>({ hex: '#808080', rgb: { r: 128, g: 128, b: 128 } });
  const totalDropsCount = dropColors.reduce((sum, c) => sum + c.drops, 0);

  useEffect(() => {
    const blendInput = dropColors.map(c => ({
      hex: getPaintColorHex(c),
      parts: c.drops
    }));
    const mixed = mixColors(blendInput);
    setDropResult(mixed);
  }, [dropColors]);

  // ==========================================
  // HANDLERS FOR SAVE
  // ==========================================
  const handleSavePctRecipe = () => {
    const mixComponents: MixComponent[] = pctColors.map(c => {
      const paintObj: Paint = c.isCustom 
        ? { id: 'custom', name: 'Personalizada', code: 'Custom', brand: 'Filtro', hex: c.customHex, type: 'Base', finish: 'Fosco', category: 'Custom', recommendedUse: '' }
        : getPaintById(c.paintId)!;
      return {
        paint: paintObj,
        percentage: parseFloat((c.ratio / pctColors.reduce((s, i) => s + i.ratio, 0) * 100).toFixed(1)),
        drops: 0
      };
    });

    const newRecipe: SavedRecipe = {
      id: 'r-' + Date.now(),
      name: pctRecipeName || 'Receita por %',
      category: 'Fórmula',
      colors: mixComponents,
      finalHex: pctResult.hex,
      totalDrops: 0,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    onSaveRecipe(newRecipe);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveDropRecipe = () => {
    const mixComponents: MixComponent[] = dropColors.map(c => {
      const total = totalDropsCount || 1;
      const paintObj: Paint = c.isCustom 
        ? { id: 'custom', name: 'Personalizada', code: 'Custom', brand: 'Filtro', hex: c.customHex, type: 'Base', finish: 'Fosco', category: 'Custom', recommendedUse: '' }
        : getPaintById(c.paintId)!;
      return {
        paint: paintObj,
        percentage: parseFloat((c.drops / total * 100).toFixed(1)),
        drops: c.drops
      };
    });

    const newRecipe: SavedRecipe = {
      id: 'r-' + Date.now(),
      name: dropRecipeName || 'Receita por Gotas',
      category: 'Gotas',
      colors: mixComponents,
      finalHex: dropResult.hex,
      totalDrops: totalDropsCount,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    onSaveRecipe(newRecipe);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Duplicate drop recipe
  const handleDuplicateDrop = () => {
    setDropColors(dropColors.map(c => ({ ...c, drops: c.drops * 2 })));
    setDropRecipeName(dropRecipeName + ' (Duplicado)');
  };

  // ==========================================
  // DILUTION CALCULATOR CALCULATIONS
  // ==========================================
  const totalDilutionDrops = dilutionPaint + dilutionWater + dilutionThinner + dilutionFlow;
  const dilutionPct = totalDilutionDrops > 0 
    ? parseFloat(((dilutionWater + dilutionThinner + dilutionFlow) / totalDilutionDrops * 100).toFixed(1))
    : 0;

  const getDilutionIndication = (pct: number) => {
    if (pct === 0) return { label: 'Tinta Pura / Muito Espessa', color: 'text-amber-600 dark:text-amber-400', desc: 'Perigo de cobrir e sumir com os detalhes finos da escultura da peça.' };
    if (pct > 0 && pct <= 15) return { label: 'Excelente para Base Coat (Camada Principal)', color: 'text-emerald-600 dark:text-emerald-400', desc: 'Alta opacidade e boa cobertura primária na peça.' };
    if (pct > 15 && pct <= 35) return { label: 'Ideal para Layering (Transições / Luzes)', color: 'text-teal-600 dark:text-teal-400', desc: 'Consistência fina excelente para construir degradês e luzes suaves nas bordas.' };
    if (pct > 35 && pct <= 55) return { label: 'Ideal para Glaze (Veladuras)', color: 'text-sky-600 dark:text-sky-400', desc: 'Tinta translúcida para alterar o tom do modelo devagar sem cobrir a sombra.' };
    if (pct > 55 && pct <= 80) return { label: 'Ideal para Wash / Sombreamento de Fendas', color: 'text-purple-600 dark:text-purple-400', desc: 'Tinta extremamente fluida que corre direto para as ranhuras profundas.' };
    return { label: 'Ideal para Airbrush (Aerografia)', color: 'text-blue-600 dark:text-blue-400', desc: 'Mistura muito líquida, perfeita para fluir na ponta da agulha do aerógrafo sem entupir.' };
  };

  const dilutionIndication = getDilutionIndication(dilutionPct);

  // ==========================================
  // PAINT ESTIMATOR CALCULATIONS
  // ==========================================
  // Assumptions per 32mm humanoid miniature:
  // Primer: ~0.8ml per miniature (approx 16 drops of brush primer or standard coating)
  // Paint: ~1.2ml per miniature (approx 24 drops across all areas)
  // Varnish: ~0.5ml per miniature (approx 10 drops)
  const calculateEstimates = (height: number, count: number) => {
    // Scale factor relative to 32mm standard
    const scaleFactor = Math.pow(height / 32, 3); // Cubic scaling for 3D volumes!
    
    const primerDrops = Math.round(16 * scaleFactor * count);
    const paintDrops = Math.round(24 * scaleFactor * count);
    const varnishDrops = Math.round(10 * scaleFactor * count);

    const primerMl = (primerDrops * 0.05).toFixed(1); // 1 drop ~ 0.05ml
    const paintMl = (paintDrops * 0.05).toFixed(1);
    const varnishMl = (varnishDrops * 0.05).toFixed(1);

    return {
      primer: { drops: primerDrops, ml: primerMl },
      paint: { drops: paintDrops, ml: paintMl },
      varnish: { drops: varnishDrops, ml: varnishMl }
    };
  };

  const estimates = calculateEstimates(miniHeight, miniCount);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-emerald-500" /> Laboratório de Tintas & Misturas
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Misture tintas virtualmente por porcentagens ou gotas, calcule diluições de tintas acrílicas e estime volumes para impressão 3D.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap border-b border-gray-100 dark:border-gray-800 gap-1">
        <button
          onClick={() => setActiveSubTab('porcentagem')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'porcentagem'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Scale className="h-4 w-4" /> Mistura por Porcentagem (%)
        </button>
        <button
          onClick={() => setActiveSubTab('gotas')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'gotas'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Droplets className="h-4 w-4" /> Mistura por Gotas (💧)
        </button>
        <button
          onClick={() => setActiveSubTab('comparador')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'comparador'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Dna className="h-4 w-4" /> Comparador de Cores (🔍)
        </button>
        <button
          onClick={() => setActiveSubTab('diluicao')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'diluicao'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <FlaskConical className="h-4 w-4" /> Calculadora de Diluição (🧪)
        </button>
        <button
          onClick={() => setActiveSubTab('calculadora')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'calculadora'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Ruler className="h-4 w-4" /> Calculadora de Tinta (📏)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. MISTURA POR PORCENTAGEM (%) */}
      {/* ========================================================================= */}
      {activeSubTab === 'porcentagem' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Selecione as cores da Mistura</h3>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-full font-semibold">Proporções Ativas</span>
              </div>

              {pctColors.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg">
                  {/* Select Paint Bottle */}
                  <div className="w-full sm:w-1/2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Tinta {index + 1}</label>
                    <div className="flex gap-2">
                      <select
                        value={item.paintId}
                        onChange={(e) => {
                          const updated = [...pctColors];
                          updated[index] = { ...item, paintId: e.target.value, isCustom: false };
                          setPctColors(updated);
                        }}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
                      >
                        {MINIATURE_PAINTS.map(p => (
                          <option key={p.id} value={p.id}>
                            [{p.brand}] {p.name} ({p.code})
                          </option>
                        ))}
                      </select>
                      {/* Color Block indicator */}
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700 shrink-0" 
                        style={{ backgroundColor: getPaintColorHex(item) }} 
                      />
                    </div>
                  </div>

                  {/* Percentage Slider */}
                  <div className="w-full sm:w-1/2 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase mb-1">
                        <span>Intensidade / Proporção</span>
                        <span>{item.ratio}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={item.ratio}
                        onChange={(e) => {
                          const updated = [...pctColors];
                          updated[index].ratio = parseInt(e.target.value);
                          setPctColors(updated);
                        }}
                        className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                    {/* Delete entry */}
                    {pctColors.length > 1 && (
                      <button
                        onClick={() => {
                          setPctColors(pctColors.filter((_, i) => i !== index));
                        }}
                        className="h-8 w-8 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-center shrink-0 mt-3 sm:mt-0 cursor-pointer"
                        title="Remover cor"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {pctColors.length < 3 && (
                <button
                  id="mixer-pct-btn-add"
                  onClick={() => {
                    setPctColors([...pctColors, { paintId: 'cit-06', customHex: '#ffffff', isCustom: false, ratio: 20 }]);
                  }}
                  className="w-full py-2.5 border border-dashed border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-800/10"
                >
                  <Plus className="h-4 w-4" /> Adicionar Tinta à Mistura (Máx. 3)
                </button>
              )}
            </div>

            {/* Nome da Receita */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 flex flex-col sm:flex-row items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Nome da Receita</label>
                <input
                  type="text"
                  value={pctRecipeName}
                  onChange={(e) => setPctRecipeName(e.target.value)}
                  placeholder="Nomeie seu resultado para salvar..."
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none dark:border-gray-800 dark:text-white"
                />
              </div>
              <button
                id="mixer-pct-btn-save"
                onClick={handleSavePctRecipe}
                className="w-full sm:w-auto bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {saveSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {saveSuccess ? 'Salvo!' : 'Salvar Receita'}
              </button>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 text-center flex flex-col items-center">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Cor Final Simulada</h3>
              
              {/* Mixed Color Beaker Swatch */}
              <div 
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center relative overflow-hidden transition-all duration-300"
                style={{ backgroundColor: pctResult.hex }}
              >
                {/* Visual Glass Ripple reflection overlay */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 -skew-y-12"></div>
                <div className="relative z-10 text-white font-bold text-xs select-none bg-black/40 px-2 py-0.5 rounded-full filter drop-shadow-md">
                  {pctResult.hex.toUpperCase()}
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <span className="block text-sm font-bold text-gray-800 dark:text-white">{pctRecipeName}</span>
                <span className="block font-mono text-xs text-gray-500">rgb({pctResult.rgb.r}, {pctResult.rgb.g}, {pctResult.rgb.b})</span>
              </div>

              <div className="mt-6 w-full pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 justify-center">
                <button
                  onClick={() => triggerCopy(pctResult.hex)}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  {copiedState ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-emerald-500" />}
                  {copiedState ? 'Copiado!' : 'Copiar HEX'}
                </button>
              </div>
            </div>

            {/* Advanced Brand Matcher */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Simulação de Tintas Reais
              </h3>
              <p className="text-[10px] text-gray-400 leading-snug mb-3">Encontramos os frascos comerciais mais próximos do resultado de sua mistura:</p>
              
              <div className="space-y-2">
                {pctCloseMatches.map((match, i) => (
                  <div key={match.paint.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/40 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-4 w-4 rounded-full border border-gray-200 dark:border-gray-700 shrink-0" style={{ backgroundColor: match.paint.hex }} />
                      <div className="truncate">
                        <p className="font-semibold text-gray-700 dark:text-gray-300 truncate">{match.paint.brand} - {match.paint.name}</p>
                        <p className="text-[10px] text-gray-400">{match.paint.code} ({match.paint.finish})</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {match.similarity}% similar
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MISTURA POR GOTAS (💧) */}
      {/* ========================================================================= */}
      {activeSubTab === 'gotas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Misturar por Gotas (Volume)</h3>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-full font-semibold">
                  Total de Gotas: {totalDropsCount} gotas
                </span>
              </div>

              {dropColors.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg">
                  {/* Select Paint */}
                  <div className="w-full sm:w-1/2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Garrafa {index + 1}</label>
                    <div className="flex gap-2">
                      <select
                        value={item.paintId}
                        onChange={(e) => {
                          const updated = [...dropColors];
                          updated[index] = { ...item, paintId: e.target.value, isCustom: false };
                          setDropColors(updated);
                        }}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
                      >
                        {MINIATURE_PAINTS.map(p => (
                          <option key={p.id} value={p.id}>
                            [{p.brand}] {p.name}
                          </option>
                        ))}
                      </select>
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700 shrink-0" 
                        style={{ backgroundColor: getPaintColorHex(item) }} 
                      />
                    </div>
                  </div>

                  {/* Drops Input */}
                  <div className="w-full sm:w-1/2 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase mb-1">
                        <span>Quantidade de Gotas</span>
                        <span>{item.drops} gts</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.drops}
                        onChange={(e) => {
                          const updated = [...dropColors];
                          updated[index].drops = Math.max(0, parseInt(e.target.value) || 0);
                          setDropColors(updated);
                        }}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    {/* Delete entry */}
                    {dropColors.length > 1 && (
                      <button
                        onClick={() => {
                          setDropColors(dropColors.filter((_, i) => i !== index));
                        }}
                        className="h-8 w-8 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-center shrink-0 mt-3 sm:mt-0 cursor-pointer"
                        title="Remover cor"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {dropColors.length < 4 && (
                <button
                  id="mixer-drop-btn-add"
                  onClick={() => {
                    setDropColors([...dropColors, { paintId: 'cit-06', customHex: '#ffffff', isCustom: false, drops: 2 }]);
                  }}
                  className="w-full py-2.5 border border-dashed border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-800/10"
                >
                  <Plus className="h-4 w-4" /> Adicionar Tinta à Receita (Máx. 4)
                </button>
              )}
            </div>

            {/* Nome da Receita */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 flex flex-col sm:flex-row items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Nome da Receita</label>
                <input
                  type="text"
                  value={dropRecipeName}
                  onChange={(e) => setDropRecipeName(e.target.value)}
                  placeholder="Nomeie seu resultado para salvar..."
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none dark:border-gray-800 dark:text-white"
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  id="mixer-drop-btn-dup"
                  onClick={handleDuplicateDrop}
                  className="flex-1 sm:flex-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center gap-1 cursor-pointer"
                  title="Duplicar porção inteira para dobrar volume"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-blue-500" /> Duplicar Gotas
                </button>
                <button
                  id="mixer-drop-btn-save"
                  onClick={handleSaveDropRecipe}
                  className="flex-1 sm:flex-none bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  {saveSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                  {saveSuccess ? 'Salvo!' : 'Salvar Receita'}
                </button>
              </div>
            </div>
          </div>

          {/* Result Output */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 text-center flex flex-col items-center">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Gota Final Simulada</h3>
              
              {/* mixed color dripping dropper */}
              <div className="relative">
                <div 
                  className="h-28 w-28 rounded-full border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center relative overflow-hidden transition-all duration-300"
                  style={{ backgroundColor: dropResult.hex }}
                >
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 -skew-y-12"></div>
                </div>
                {/* Drip overlay badge */}
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md shrink-0 flex items-center gap-0.5 animate-bounce">
                  <Droplets className="h-3 w-3 fill-white" /> {totalDropsCount} gts
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <span className="block text-sm font-bold text-gray-800 dark:text-white">{dropRecipeName}</span>
                <span className="block font-mono text-xs text-gray-500">{dropResult.hex.toUpperCase()}</span>
              </div>

              {/* AUTOMATIC GOTAS -> PORCENTAGEM CONVERSION (Módulo 2.1) */}
              <div className="mt-6 w-full pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 text-left">Fórmula Proporcional Equivalente</span>
                
                <div className="space-y-1.5 text-xs text-left">
                  {dropColors.map((c, i) => {
                    const pct = totalDropsCount > 0 ? ((c.drops / totalDropsCount) * 100).toFixed(1) : '0.0';
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: getPaintColorHex(c) }} />
                          <span className="truncate text-gray-700 dark:text-gray-300">{getPaintName(c)}</span>
                        </div>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{c.drops} gts ({pct}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COMPARADOR DE CORES (🔍) */}
      {/* ========================================================================= */}
      {activeSubTab === 'comparador' && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-6">
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-1.5">
            <Dna className="h-4 w-4 text-emerald-500" /> Comparar Tintas Comerciais Lado a Lado
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Color 1 Selector */}
            <div className="space-y-2 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Tinta A</label>
              <select
                value={compPaint1Id}
                onChange={(e) => setCompPaint1Id(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                {MINIATURE_PAINTS.map(p => (
                  <option key={p.id} value={p.id}>[{p.brand}] {p.name}</option>
                ))}
              </select>
              
              {/* Swatch 1 */}
              {getPaintById(compPaint1Id) && (
                <div className="pt-2 text-center">
                  <div 
                    className="h-20 w-full rounded-lg shadow-inner mb-2 border border-gray-200 dark:border-gray-700" 
                    style={{ backgroundColor: getPaintById(compPaint1Id)!.hex }}
                  />
                  <span className="block text-xs font-bold text-gray-800 dark:text-white">{getPaintById(compPaint1Id)!.name}</span>
                  <span className="block text-[10px] text-gray-400">{getPaintById(compPaint1Id)!.brand} ({getPaintById(compPaint1Id)!.code})</span>
                  <span className="block font-mono text-[10px] text-gray-500 mt-1">{getPaintById(compPaint1Id)!.hex.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Color 2 Selector */}
            <div className="space-y-2 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Tinta B</label>
              <select
                value={compPaint2Id}
                onChange={(e) => setCompPaint2Id(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                {MINIATURE_PAINTS.map(p => (
                  <option key={p.id} value={p.id}>[{p.brand}] {p.name}</option>
                ))}
              </select>
              
              {/* Swatch 2 */}
              {getPaintById(compPaint2Id) && (
                <div className="pt-2 text-center">
                  <div 
                    className="h-20 w-full rounded-lg shadow-inner mb-2 border border-gray-200 dark:border-gray-700" 
                    style={{ backgroundColor: getPaintById(compPaint2Id)!.hex }}
                  />
                  <span className="block text-xs font-bold text-gray-800 dark:text-white">{getPaintById(compPaint2Id)!.name}</span>
                  <span className="block text-[10px] text-gray-400">{getPaintById(compPaint2Id)!.brand} ({getPaintById(compPaint2Id)!.code})</span>
                  <span className="block font-mono text-[10px] text-gray-500 mt-1">{getPaintById(compPaint2Id)!.hex.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Color 3 Selector */}
            <div className="space-y-2 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Tinta C</label>
              <select
                value={compPaint3Id}
                onChange={(e) => setCompPaint3Id(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                {MINIATURE_PAINTS.map(p => (
                  <option key={p.id} value={p.id}>[{p.brand}] {p.name}</option>
                ))}
              </select>
              
              {/* Swatch 3 */}
              {getPaintById(compPaint3Id) && (
                <div className="pt-2 text-center">
                  <div 
                    className="h-20 w-full rounded-lg shadow-inner mb-2 border border-gray-200 dark:border-gray-700" 
                    style={{ backgroundColor: getPaintById(compPaint3Id)!.hex }}
                  />
                  <span className="block text-xs font-bold text-gray-800 dark:text-white">{getPaintById(compPaint3Id)!.name}</span>
                  <span className="block text-[10px] text-gray-400">{getPaintById(compPaint3Id)!.brand} ({getPaintById(compPaint3Id)!.code})</span>
                  <span className="block font-mono text-[10px] text-gray-500 mt-1">{getPaintById(compPaint3Id)!.hex.toUpperCase()}</span>
                </div>
              )}
            </div>

          </div>

          {/* Similarity Results analysis */}
          <div className="mt-4 p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/10 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Métricas de Similaridade Cromática</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-white dark:bg-gray-950 flex flex-col justify-between border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Tinta A vs Tinta B</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-display font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    {getPaintById(compPaint1Id) && getPaintById(compPaint2Id) 
                      ? `${getColorSimilarity(getPaintById(compPaint1Id)!.hex, getPaintById(compPaint2Id)!.hex)}%`
                      : '0%'
                    }
                  </span>
                  <span className="text-[10px] text-gray-400">Similaridade</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-gray-950 flex flex-col justify-between border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Tinta B vs Tinta C</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-display font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    {getPaintById(compPaint2Id) && getPaintById(compPaint3Id) 
                      ? `${getColorSimilarity(getPaintById(compPaint2Id)!.hex, getPaintById(compPaint3Id)!.hex)}%`
                      : '0%'
                    }
                  </span>
                  <span className="text-[10px] text-gray-400">Similaridade</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-gray-950 flex flex-col justify-between border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Tinta A vs Tinta C</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-display font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    {getPaintById(compPaint1Id) && getPaintById(compPaint3Id) 
                      ? `${getColorSimilarity(getPaintById(compPaint1Id)!.hex, getPaintById(compPaint3Id)!.hex)}%`
                      : '0%'
                    }
                  </span>
                  <span className="text-[10px] text-gray-400">Similaridade</span>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400 leading-snug">
              Nota: Valores acima de 90% significam similaridade visual muito próxima na escala real. Tintas acima de 95% podem ser perfeitamente substituídas no modelo sem alteração dramática no resultado visual da pintura.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CALCULADORA DE DILUIÇÃO (🧪) */}
      {/* ========================================================================= */}
      {activeSubTab === 'diluicao' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-4">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Fórmula de Diluição</h3>
              <p className="text-[11px] text-gray-400">Insira a quantidade de gotas de cada componente adicionado na sua paleta:</p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Paint Drops */}
                <div className="bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Gotas de Tinta Acrílica</label>
                  <input
                    type="number"
                    min="1"
                    value={dilutionPaint}
                    onChange={(e) => setDilutionPaint(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Water Drops */}
                <div className="bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Gotas de Água</label>
                  <input
                    type="number"
                    min="0"
                    value={dilutionWater}
                    onChange={(e) => setDilutionWater(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Thinner Drops */}
                <div className="bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Gotas de Thinner (Diluente)</label>
                  <input
                    type="number"
                    min="0"
                    value={dilutionThinner}
                    onChange={(e) => setDilutionThinner(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Flow Improver Drops */}
                <div className="bg-gray-50 dark:bg-gray-800/20 p-3 rounded-lg">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Gotas de Flow Improver</label>
                  <input
                    type="number"
                    min="0"
                    value={dilutionFlow}
                    onChange={(e) => setDilutionFlow(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Output analysis */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 text-center flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Resultado da Diluição</h3>
              
              <div className="font-display text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {dilutionPct}%
              </div>
              <span className="block text-[10px] text-gray-400 mt-1">Porcentagem de Diluente Adicionado</span>
              
              <div className="mt-4 py-2 border-y border-gray-100 dark:border-gray-800 text-xs font-mono font-semibold text-gray-700 dark:text-gray-300">
                Proporção: {dilutionPaint} : {dilutionWater + dilutionThinner + dilutionFlow}
                <span className="block text-[10px] font-normal text-gray-400 mt-0.5">Tinta : Solução Líquida</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-left">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">Classificação Automática</span>
              <p className={`text-xs font-bold ${dilutionIndication.color}`}>{dilutionIndication.label}</p>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{dilutionIndication.desc}</p>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CALCULADORA DE TINTA (📏) */}
      {/* ========================================================================= */}
      {activeSubTab === 'calculadora' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-4">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Cálculo de Consumo para Miniaturas</h3>
              <p className="text-[11px] text-gray-400">Informe o tamanho de suas peças impressas 3D para estimarmos o gasto médio:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Miniature Height */}
                <div className="bg-gray-50 dark:bg-gray-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase mb-2">
                    <span>Altura da Miniatura</span>
                    <span className="text-emerald-500">{miniHeight} mm</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="150"
                    value={miniHeight}
                    onChange={(e) => setMiniHeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-mono">
                    <span>15mm (Goblin)</span>
                    <span>32mm (Padrão)</span>
                    <span>75mm (Busto)</span>
                    <span>150mm (Estátua)</span>
                  </div>
                </div>

                {/* Quantity of pieces */}
                <div className="bg-gray-50 dark:bg-gray-800/20 p-4 rounded-lg flex flex-col justify-between">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Quantidade de Peças / Lote</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={miniCount}
                    onChange={(e) => setMiniCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="block text-[9px] text-gray-400 mt-1">Multiplica o consumo total para exércitos inteiros de Wargames.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Output Estimates */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 flex flex-col justify-between">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Volume Estimado Necessário</h3>
            
            <div className="space-y-4">
              
              {/* Primer estimate */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Quantidade de Primer</span>
                  <span className="block text-[10px] text-gray-400">Camada base de aderência</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{estimates.primer.ml} ml</span>
                  <span className="block text-[10px] text-gray-400">~{estimates.primer.drops} gotas</span>
                </div>
              </div>

              {/* Paint estimate */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Quantidade de Tinta</span>
                  <span className="block text-[10px] text-gray-400">Somando todas as demãos gerais</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{estimates.paint.ml} ml</span>
                  <span className="block text-[10px] text-gray-400">~{estimates.paint.drops} gotas</span>
                </div>
              </div>

              {/* Varnish estimate */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Quantidade de Verniz</span>
                  <span className="block text-[10px] text-gray-400">Proteção final anti-descasque</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{estimates.varnish.ml} ml</span>
                  <span className="block text-[10px] text-gray-400">~{estimates.varnish.drops} gotas</span>
                </div>
              </div>

            </div>

            <div className="mt-6 p-3 rounded-lg bg-teal-500/10 text-[10px] text-teal-800 dark:text-teal-400 flex items-start gap-2">
              <Info className="h-4 w-4 shrink-0" />
              <span>Estas estimativas consideram volumes líquidos e aplicação com pincel. Se usar aerógrafo, o desperdício é um pouco maior, aumente em 20% os valores.</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
