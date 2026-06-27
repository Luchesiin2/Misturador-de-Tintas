import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Heart, 
  CheckCircle, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Info,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { GuideStage } from '../types';
import { GUIDE_STAGES } from '../data/guide';

interface BeginnerGuideProps {
  completedStages: number[];
  onToggleCompleted: (stageId: number) => void;
  favoriteStages: number[];
  onToggleFavorite: (stageId: number) => void;
}

export default function BeginnerGuide({
  completedStages,
  onToggleCompleted,
  favoriteStages,
  onToggleFavorite
}: BeginnerGuideProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState<boolean>(false);
  const [expandedStageId, setExpandedStageId] = useState<number | null>(1); // Step 1 expanded by default

  const totalStages = GUIDE_STAGES.length;
  const completedCount = completedStages.length;
  const progressPercent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

  // Filter list
  const filteredStages = GUIDE_STAGES.filter(stage => {
    const matchesSearch = stage.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          stage.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorite = !filterFavoritesOnly || favoriteStages.includes(stage.id);
    return matchesSearch && matchesFavorite;
  });

  // Unique illustrative SVGs for each stage
  const renderStageIllustration = (id: number) => {
    switch (id) {
      case 1: // Materiais
        return (
          <svg className="h-12 w-12 text-purple-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 16v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v3m4 3H10" />
          </svg>
        );
      case 2: // Preparação
        return (
          <svg className="h-12 w-12 text-teal-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 3: // Primer
        return (
          <svg className="h-12 w-12 text-indigo-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case 4: // Camada Base
        return (
          <svg className="h-12 w-12 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3M16 3H9v4h7V3z" />
          </svg>
        );
      case 5: // Sombras
        return (
          <svg className="h-12 w-12 text-blue-900 dark:text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10V2z" />
          </svg>
        );
      case 6: // Luzes
        return (
          <svg className="h-12 w-12 text-yellow-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 17a5 5 0 100-10 5 5 0 000 10z" />
          </svg>
        );
      case 7: // Dry Brush
        return (
          <svg className="h-12 w-12 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 8: // Wash
        return (
          <svg className="h-12 w-12 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21V5a2 2 0 00-2-2h12a2 2 0 002 2v10.21z" />
          </svg>
        );
      case 9: // Detalhamento
        return (
          <svg className="h-12 w-12 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 10: // Verniz
        return (
          <svg className="h-12 w-12 text-violet-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg className="h-12 w-12 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getDifficultyBadge = (diff: string) => {
    if (diff === 'Fácil') {
      return 'bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400';
    }
    if (diff === 'Médio') {
      return 'bg-amber-100/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400';
    }
    return 'bg-rose-100/80 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400';
  };

  return (
    <div className="space-y-6">
      {/* Educational Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-teal-700 p-6 text-white shadow-md">
        <div className="absolute right-0 bottom-0 -mb-10 -mr-10 h-36 w-36 rounded-full bg-white/10 blur-xl"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Compass className="h-3.5 w-3.5 text-teal-300 animate-spin-slow" /> Guia Técnico de Pintura
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold md:text-3xl">Guia do Pintor Iniciante</h1>
            <p className="mt-1 text-xs text-purple-100 leading-relaxed">
              Domine as técnicas cruciais para dar vida e realismo aos seus modelos 3D, passo a passo, do primeiro acabamento à camada protetora final.
            </p>
          </div>

          {/* Progress Circle Graphic */}
          <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl backdrop-blur-md shrink-0">
            <div className="relative h-16 w-16 shrink-0 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle cx="32" cy="32" r="28" className="stroke-white/10 fill-none" strokeWidth="5" />
                <circle 
                  cx="32" cy="32" r="28" 
                  className="stroke-teal-400 fill-none transition-all duration-500" 
                  strokeWidth="5" 
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercent / 100)}`}
                />
              </svg>
              <span className="absolute font-mono text-sm font-black">{progressPercent}%</span>
            </div>
            <div>
              <p className="text-xs font-bold">Progresso das Etapas</p>
              <p className="text-[10px] text-teal-200 mt-0.5">{completedCount} de {totalStages} concluídas</p>
              {completedCount === totalStages && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[9px] px-1.5 py-0.5 font-bold mt-1">
                  <Award className="h-2.5 w-2.5 fill-teal-400" /> Mestre Pintor!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por técnicas, erros comuns, primer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white dark:bg-gray-900 pl-10 pr-4 py-2 text-xs font-semibold text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:outline-none dark:border-gray-800 dark:text-white"
          />
        </div>

        {/* Favorite Filtering */}
        <button
          onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 w-full sm:w-auto justify-center ${
            filterFavoritesOnly 
              ? 'bg-rose-500 text-white shadow-xs' 
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <Heart className={`h-4 w-4 ${filterFavoritesOnly ? 'fill-white' : 'text-rose-500'}`} />
          {filterFavoritesOnly ? 'Apenas Favoritos' : 'Filtrar Favoritos'}
        </button>
      </div>

      {/* Checklist / Curriculum */}
      <div className="space-y-3">
        {filteredStages.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs rounded-xl border border-dashed border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
            Nenhuma etapa corresponde aos filtros aplicados.
          </div>
        ) : (
          filteredStages.map((stage) => {
            const isExpanded = expandedStageId === stage.id;
            const isDone = completedStages.includes(stage.id);
            const isFav = favoriteStages.includes(stage.id);

            return (
              <div 
                key={stage.id}
                className={`rounded-2xl border transition duration-200 overflow-hidden bg-white dark:bg-gray-900/60 ${
                  isExpanded 
                    ? 'border-purple-500/40 shadow-sm' 
                    : 'border-gray-100 dark:border-gray-850 hover:border-gray-200 dark:hover:border-gray-800'
                }`}
              >
                {/* Header Strip */}
                <div 
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer select-none ${
                    isExpanded ? 'bg-purple-50/20 dark:bg-purple-950/10' : ''
                  }`}
                  onClick={() => setExpandedStageId(isExpanded ? null : stage.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Completion Checkmark Clickable */}
                    <button
                      id={`guide-chk-${stage.id}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid expanding
                        onToggleCompleted(stage.id);
                      }}
                      className={`h-6 w-6 rounded-full flex items-center justify-center transition shrink-0 cursor-pointer ${
                        isDone 
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                          : 'border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                      }`}
                      title={isDone ? 'Marcar como não concluído' : 'Marcar como concluído'}
                    >
                      {isDone && <CheckCircle className="h-4 w-4 fill-emerald-500 stroke-white" />}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-gray-400">Etapa {String(stage.id).padStart(2, '0')}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase ${getDifficultyBadge(stage.difficulty)}`}>
                          Dificuldade: {stage.difficulty}
                        </span>
                      </div>
                      <h3 className={`font-display text-sm font-bold truncate mt-0.5 ${isDone ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Favorite Heart Toggle */}
                    <button
                      id={`guide-fav-${stage.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(stage.id);
                      }}
                      className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 flex items-center justify-center transition cursor-pointer"
                    >
                      <Heart className={`h-4 w-4 transition-all duration-300 ${isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-gray-400 hover:text-rose-500'}`} />
                    </button>

                    {/* Expand Chevron */}
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </div>
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="p-5 border-t border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-900/20 space-y-5 animate-fade-in text-xs">
                    
                    {/* Explicacao & Ilustracao */}
                    <div className="flex flex-col md:flex-row gap-5 items-start">
                      <div className="flex-1 space-y-2">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-500">O que é e como funciona</span>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">{stage.explanation}</p>
                      </div>
                      
                      {/* Visual Graphic Box */}
                      <div className="w-full md:w-32 h-24 bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                        {renderStageIllustration(stage.id)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Dicas Profissionais */}
                      <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" /> Dicas de Mestre
                        </span>
                        <ul className="space-y-1.5">
                          {stage.tips.map((tip, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed pl-3.5 relative">
                              <span className="absolute left-0 text-emerald-500">•</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Erros Comuns */}
                      <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1">
                          <AlertTriangle className="h-3.5 w-3.5" /> Erros Comuns para Evitar
                        </span>
                        <ul className="space-y-1.5">
                          {stage.commonErrors.map((err, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed pl-3.5 relative">
                              <span className="absolute left-0 text-red-500">•</span> {err}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Completion Banner inside card if not checked */}
                    {!isDone && (
                      <div className="flex items-center justify-between bg-purple-500/5 border border-purple-500/10 p-3.5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-purple-500 shrink-0" />
                          <span className="text-gray-500">Praticou esta técnica em suas miniaturas?</span>
                        </div>
                        <button
                          onClick={() => onToggleCompleted(stage.id)}
                          className="bg-purple-600 text-white px-3.5 py-1.5 rounded-lg font-bold hover:bg-purple-700 transition cursor-pointer"
                        >
                          Concluir Etapa
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
