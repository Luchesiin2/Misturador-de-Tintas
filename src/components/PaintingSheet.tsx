import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  Share2, 
  Copy, 
  Check, 
  Heart, 
  Printer, 
  Download, 
  Sparkles, 
  FolderPlus, 
  RefreshCw,
  PlusCircle,
  FileSpreadsheet,
  X,
  Import
} from 'lucide-react';
import { PaintingSheet, PaintingSheetSection, SavedRecipe } from '../types';

interface PaintingSheetProps {
  sheets: PaintingSheet[];
  onSaveSheet: (sheet: PaintingSheet) => void;
  onDeleteSheet: (id: string) => void;
  savedRecipes: SavedRecipe[];
}

export default function PaintingSheetComponent({
  sheets,
  onSaveSheet,
  onDeleteSheet,
  savedRecipes
}: PaintingSheetProps) {
  // Form State for creating/editing sheets
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState<string>('');
  const [formMiniName, setFormMiniName] = useState<string>('');
  const [formCreator, setFormCreator] = useState<string>('');
  const [formSections, setFormSections] = useState<PaintingSheetSection[]>([
    { area: 'PELE', recipeName: '', description: '8 gotas de Verde + 2 gotas de Marrom', hex: '#455f2f' }
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Open Form to Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormTitle('');
    setFormMiniName('');
    setFormCreator('');
    setFormSections([
      { area: 'PELE', recipeName: '', description: '', hex: '#2e7a3c' }
    ]);
    setIsFormOpen(true);
  };

  // Open Form to Edit
  const handleOpenEdit = (sheet: PaintingSheet) => {
    setEditingId(sheet.id);
    setFormTitle(sheet.title);
    setFormMiniName(sheet.miniatureName);
    setFormCreator(sheet.brandOrCreator || '');
    setFormSections([...sheet.sections]);
    setIsFormOpen(true);
  };

  // Save Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newSheet: PaintingSheet = {
      id: editingId || 's-' + Date.now(),
      title: formTitle,
      miniatureName: formMiniName || 'Busto / Miniatura 3D',
      brandOrCreator: formCreator,
      sections: formSections,
      isFavorite: editingId ? (sheets.find(s => s.id === editingId)?.isFavorite || false) : false,
      createdAt: editingId ? (sheets.find(s => s.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString()
    };

    onSaveSheet(newSheet);
    setIsFormOpen(false);
    setEditingId(null);
  };

  // Duplicate entire sheet
  const handleDuplicate = (sheet: PaintingSheet) => {
    const dup: PaintingSheet = {
      ...sheet,
      id: 's-' + Date.now(),
      title: `Cópia de ${sheet.title}`,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };
    onSaveSheet(dup);
  };

  // Toggle favorite status on sheet list
  const handleToggleFavorite = (sheet: PaintingSheet) => {
    onSaveSheet({
      ...sheet,
      isFavorite: !sheet.isFavorite
    });
  };

  // Clipboard copy formatted
  const handleShare = (sheet: PaintingSheet) => {
    const sectionText = sheet.sections.map(s => `• Área: *${s.area}*\n  Receita: ${s.recipeName || 'Customizada'} (${s.hex})\n  Fórmula: ${s.description}`).join('\n\n');
    const text = `🎨 *FICHA DE PINTURA DA MINIATURA* 🎨
Projeto: *${sheet.title}*
Modelo: ${sheet.miniatureName}
Designer: ${sheet.brandOrCreator || 'Não informado'}

Fórmula de Cores por Áreas:
${sectionText}

Salvo na Central de Pintura 3D!`;

    navigator.clipboard.writeText(text);
    setCopiedId(sheet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Dynamically import user's saved recipe ingredients into a specific section index!
  const handleImportRecipeToSection = (sectionIndex: number, recipeId: string) => {
    const rec = savedRecipes.find(r => r.id === recipeId);
    if (!rec) return;

    const updated = [...formSections];
    const ingredients = rec.colors.map(c => `${c.drops > 0 ? `${c.drops} gts` : `${c.percentage}%`} ${c.paint.name}`).join(' + ');
    
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      recipeName: rec.name,
      hex: rec.finalHex,
      description: ingredients
    };
    setFormSections(updated);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-emerald-500" /> Fichas de Pintura de Miniaturas
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Crie um registro permanente para consultar quais proporções de gotas de tinta utilizou em cada área de suas miniaturas.
          </p>
        </div>

        {!isFormOpen && (
          <button
            id="sheet-btn-create-trigger"
            onClick={handleOpenCreate}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FolderPlus className="h-4 w-4" /> Criar Nova Ficha de Pintura
          </button>
        )}
      </div>

      {/* 1. INTERACTIVE SHEET FORM PANEL (MODAL/CARD IN-PLACE) */}
      {isFormOpen && (
        <div className="rounded-2xl border-2 border-emerald-500/20 bg-white dark:bg-gray-900 p-6 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-emerald-500" /> 
              {editingId ? 'Editar Ficha de Pintura' : 'Criar Nova Ficha de Pintura'}
            </h3>
            <button
              id="sheet-btn-cancel"
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-5">
            {/* Metadata row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Nome do Projeto *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Guerreiro Orc de Ferro"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-2 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Miniatura / Modelo</label>
                <input
                  type="text"
                  value={formMiniName}
                  onChange={(e) => setFormMiniName(e.target.value)}
                  placeholder="Ex: Orc Warlord Bust"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-2 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Designer / Estúdio</label>
                <input
                  type="text"
                  value={formCreator}
                  onChange={(e) => setFormCreator(e.target.value)}
                  placeholder="Ex: Artisan Guild, Mammoth"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-2 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Dynamic Sections builder */}
            <div className="space-y-4">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-1">
                Fórmulas por Áreas de Pintura
              </span>

              {formSections.map((sect, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800 relative group">
                  
                  {/* Area label */}
                  <div className="md:col-span-3 space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Área da Miniatura</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: PELE, ARMADURA, CAPA"
                      value={sect.area}
                      onChange={(e) => {
                        const updated = [...formSections];
                        updated[index].area = e.target.value.toUpperCase();
                        setFormSections(updated);
                      }}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-bold text-gray-800 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Recipe and Formula details */}
                  <div className="md:col-span-6 space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase">Mistura / Fórmula</label>
                      {/* Optional recipe import dropdown */}
                      {savedRecipes.length > 0 && (
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleImportRecipeToSection(index, e.target.value);
                              e.target.value = ''; // Reset select
                            }
                          }}
                          className="text-[9px] font-bold text-emerald-500 bg-transparent focus:outline-none max-w-44 truncate"
                        >
                          <option value="">Importar Receita...</option>
                          {savedRecipes.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 8 gotas Sick Green + 2 gotas Leather Brown"
                      value={sect.description}
                      onChange={(e) => {
                        const updated = [...formSections];
                        updated[index].description = e.target.value;
                        setFormSections(updated);
                      }}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-800 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Color swatch picker */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Visualização da Cor</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-500">{sect.hex.toUpperCase()}</span>
                      <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 shrink-0 cursor-pointer">
                        <input
                          type="color"
                          value={sect.hex}
                          onChange={(e) => {
                            const updated = [...formSections];
                            updated[index].hex = e.target.value;
                            setFormSections(updated);
                          }}
                          className="absolute -top-1 -left-1 h-10 w-10 cursor-pointer border-none p-0 bg-transparent"
                          style={{ WebkitAppearance: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delete Section button */}
                  <div className="md:col-span-1 flex items-center justify-end pt-3 md:pt-1">
                    {formSections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormSections(formSections.filter((_, i) => i !== index));
                        }}
                        className="text-red-500 hover:text-red-700 h-8 w-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-center cursor-pointer mt-3 md:mt-0 shrink-0"
                        title="Remover Área"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                </div>
              ))}

              <button
                type="button"
                id="sheet-form-btn-add"
                onClick={() => {
                  setFormSections([...formSections, { area: 'NOVA ÁREA', recipeName: '', description: '', hex: '#808080' }]);
                }}
                className="w-full py-2 border border-dashed border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/10 transition"
              >
                <Plus className="h-4 w-4" /> Adicionar Área à Miniatura
              </button>
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                id="sheet-form-btn-submit"
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Save className="h-4 w-4" /> Salvar Ficha de Pintura
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. LIST OF SAVED MINIATURE SHEETS */}
      {!isFormOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sheets.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400 text-xs rounded-2xl border border-dashed border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40 flex flex-col items-center justify-center">
              <FileSpreadsheet className="h-10 w-10 text-gray-300 dark:text-gray-700 mb-2" />
              Nenhuma ficha de pintura de miniatura catalogada ainda.
              <p className="mt-1 text-[11px] text-gray-500">Crie uma ficha agora clicando no botão "Criar Nova Ficha de Pintura" no canto superior!</p>
            </div>
          ) : (
            sheets.map((sheet) => (
              <div 
                key={sheet.id}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3 mb-3">
                    <div className="min-w-0">
                      <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Ficha de Pintura</span>
                      <h3 className="font-display text-base font-bold text-gray-900 dark:text-white truncate mt-1.5">{sheet.title}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">{sheet.miniatureName} {sheet.brandOrCreator ? `• por ${sheet.brandOrCreator}` : ''}</p>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      {/* Favorite button */}
                      <button
                        id={`sheet-btn-fav-${sheet.id}`}
                        onClick={() => handleToggleFavorite(sheet)}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 flex items-center justify-center text-gray-400 hover:text-rose-500 transition cursor-pointer"
                        title="Favoritar ficha"
                      >
                        <Heart className={`h-4 w-4 ${sheet.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      {/* Share button */}
                      <button
                        id={`sheet-btn-share-${sheet.id}`}
                        onClick={() => handleShare(sheet)}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-500 transition cursor-pointer"
                        title="Compartilhar Ficha"
                      >
                        {copiedId === sheet.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Areas Render list */}
                  <div className="space-y-2.5">
                    {sheet.sections.map((sect, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-850/40 p-2.5 rounded-xl text-xs">
                        {/* Result swatch circle */}
                        <div 
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 shrink-0 shadow-inner" 
                          style={{ backgroundColor: sect.hex }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] tracking-wide uppercase">{sect.area}</span>
                            {sect.recipeName && (
                              <span className="text-[9px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-md font-semibold truncate max-w-28">
                                Ref: {sect.recipeName}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mt-0.5 leading-snug truncate">{sect.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom operations row */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {/* Delete button */}
                    <button
                      id={`sheet-btn-del-${sheet.id}`}
                      onClick={() => onDeleteSheet(sheet.id)}
                      className="text-red-500 hover:text-red-700 h-8 px-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold flex items-center gap-0.5 cursor-pointer transition"
                      title="Excluir ficha"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Excluir
                    </button>

                    {/* Edit trigger */}
                    <button
                      onClick={() => handleOpenEdit(sheet)}
                      className="text-gray-500 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800/40 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      Editar Ficha
                    </button>
                  </div>

                  <div className="flex gap-1">
                    {/* Duplicate trigger */}
                    <button
                      onClick={() => handleDuplicate(sheet)}
                      className="text-gray-400 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800/40 text-xs font-bold p-2 rounded-lg cursor-pointer"
                      title="Duplicar ficha de pintura"
                    >
                      Duplicar
                    </button>

                    {/* Trigger Print Layout of sheet */}
                    <button
                      onClick={() => window.print()}
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-500/10 text-xs font-bold p-2 rounded-lg flex items-center gap-0.5 cursor-pointer"
                      title="Imprimir / Salvar PDF"
                    >
                      <Printer className="h-3.5 w-3.5" /> Imprimir
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
