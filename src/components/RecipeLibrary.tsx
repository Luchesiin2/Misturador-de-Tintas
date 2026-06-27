import React, { useState } from 'react';
import { 
  Layers, 
  Trash2, 
  Heart, 
  Copy, 
  Check, 
  Share2, 
  Download, 
  Printer, 
  Sparkles,
  Calendar,
  FileText,
  PlusCircle,
  Droplets
} from 'lucide-react';
import { SavedRecipe } from '../types';

interface RecipeLibraryProps {
  savedRecipes: SavedRecipe[];
  onDeleteRecipe: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAddRecipe: (recipe: SavedRecipe) => void;
}

export default function RecipeLibrary({
  savedRecipes,
  onDeleteRecipe,
  onToggleFavorite,
  onAddRecipe
}: RecipeLibraryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedNotes, setEditedNotes] = useState<string>('');
  const [editedName, setEditedName] = useState<string>('');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (recipe: SavedRecipe) => {
    const ingredients = recipe.colors.map(c => `${c.drops > 0 ? `${c.drops} gotas` : `${c.percentage}%`} [${c.paint.brand}] ${c.paint.name}`).join('\n• ');
    const text = `🎨 *MINHA RECEITA: ${recipe.name}*
Resultado final: ${recipe.finalHex.toUpperCase()}
Total: ${recipe.totalDrops > 0 ? `${recipe.totalDrops} gotas` : 'Mistura proporcional'}

Ingredientes:
• ${ingredients}

${recipe.notes ? `Notas: ${recipe.notes}` : ''}
Criado na Central de Pintura 3D!`;

    navigator.clipboard.writeText(text);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDuplicate = (recipe: SavedRecipe) => {
    const duplicate: SavedRecipe = {
      ...recipe,
      id: 'r-' + Date.now(),
      name: `Cópia de ${recipe.name}`,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };
    onAddRecipe(duplicate);
  };

  const handleStartEdit = (recipe: SavedRecipe) => {
    setEditingId(recipe.id);
    setEditedName(recipe.name);
    setEditedNotes(recipe.notes || '');
  };

  const handleSaveEdit = (recipe: SavedRecipe) => {
    const updated: SavedRecipe = {
      ...recipe,
      name: editedName || recipe.name,
      notes: editedNotes
    };
    onAddRecipe(updated); // save to storage
    setEditingId(null);
  };

  const handleExportPNG = (recipe: SavedRecipe) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 500);
    bgGrad.addColorStop(0, '#111827');
    bgGrad.addColorStop(1, '#1f2937');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Decorative Borders
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 460);

    // Header Title
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('CENTRAL DE PINTURA 3D - RECEITA SALVA', 50, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(recipe.name, 50, 105);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Arial';
    ctx.fillText(`Criada em: ${new Date(recipe.createdAt).toLocaleDateString()}`, 50, 135);

    // Mixed Color Block circle
    ctx.fillStyle = recipe.finalHex;
    ctx.beginPath();
    ctx.arc(620, 150, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // HEX Label on circle
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Courier New';
    ctx.fillText(recipe.finalHex.toUpperCase(), 575, 250);

    // Left Column: Ingredients list
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 15px Arial';
    ctx.fillText('COMPOSIÇÃO DE CORES', 50, 190);

    let ingredientY = 225;
    recipe.colors.forEach((c) => {
      // Color dot indicator
      ctx.fillStyle = c.paint.hex;
      ctx.beginPath();
      ctx.arc(60, ingredientY - 5, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      const label = c.drops > 0 
        ? `${c.drops} gotas de [${c.paint.brand}] ${c.paint.name} (${c.percentage}%)`
        : `${c.percentage}% de [${c.paint.brand}] ${c.paint.name}`;
      ctx.fillText(label, 80, ingredientY);
      ingredientY += 30;
    });

    // Total Drops count if exists
    if (recipe.totalDrops > 0) {
      ctx.fillStyle = '#9ca3af';
      ctx.font = 'bold 13px Arial';
      ctx.fillText(`VOLUME TOTAL: ${recipe.totalDrops} Gotas`, 50, ingredientY + 10);
    }

    // Bottom Notes
    if (recipe.notes) {
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px Arial';
      ctx.fillText('NOTAS DO PINTOR', 50, 380);

      ctx.fillStyle = '#9ca3af';
      ctx.font = 'italic 13px Arial';
      // Wrap text
      const words = recipe.notes.split(' ');
      let line = '';
      let textY = 405;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 700) {
          ctx.fillText(line, 50, textY);
          line = words[n] + ' ';
          textY += 18;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 50, textY);
    }

    // Trigger Download
    const link = document.createElement('a');
    link.download = `receita_${recipe.name.toLowerCase().replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Layers className="h-6 w-6 text-emerald-500" /> Biblioteca de Receitas Pessoais
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Sua fórmula pessoal secreta de pintura de miniaturas. Visualize, edite, duplique ou imprima suas proporções de misturas salvas.
        </p>
      </div>

      {/* Grid of Saved Custom Recipes */}
      {savedRecipes.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-xs rounded-2xl border border-dashed border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40 flex flex-col items-center justify-center">
          <Layers className="h-10 w-10 text-gray-300 dark:text-gray-700 mb-2" />
          Nenhuma receita personalizada salva em sua biblioteca pessoal ainda. 
          <p className="mt-1 text-[11px] text-gray-500">Misture cores no simulador e clique em "Salvar Receita" ou importe do catálogo público!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedRecipes.map((recipe) => {
            const isEditing = editingId === recipe.id;

            return (
              <div 
                key={recipe.id}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Header: Result Swatch, Title, Heart */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Color circle */}
                      <div 
                        className="h-12 w-12 rounded-full border-2 border-white dark:border-gray-850 shadow-md shrink-0" 
                        style={{ backgroundColor: recipe.finalHex }}
                      />
                      <div className="min-w-0">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="text-sm font-bold text-gray-900 dark:text-white border-b border-emerald-500 focus:outline-none bg-transparent"
                          />
                        ) : (
                          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white truncate">{recipe.name}</h3>
                        )}
                        <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                          <Calendar className="h-3 w-3" /> {new Date(recipe.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      {/* Favorite trigger */}
                      <button
                        id={`recipe-lib-fav-${recipe.id}`}
                        onClick={() => onToggleFavorite(recipe.id)}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 flex items-center justify-center text-gray-400 hover:text-rose-500 transition cursor-pointer"
                        title="Favoritar receita"
                      >
                        <Heart className={`h-4 w-4 ${recipe.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      {/* Share trigger */}
                      <button
                        id={`recipe-lib-share-${recipe.id}`}
                        onClick={() => handleShare(recipe)}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-500 transition cursor-pointer"
                        title="Compartilhar"
                      >
                        {copiedId === recipe.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* List of Ingredients */}
                  <div className="mt-4 bg-gray-50 dark:bg-gray-850/40 p-3 rounded-xl border border-gray-100/60 dark:border-gray-800/60 space-y-2">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ingredientes da Fórmula</span>
                    <div className="space-y-1.5 text-xs">
                      {recipe.colors.map((c, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.paint.hex }} />
                            <span className="truncate text-gray-700 dark:text-gray-300">[{c.paint.brand}] {c.paint.name}</span>
                          </div>
                          <span className="font-mono font-bold text-gray-950 dark:text-white shrink-0">
                            {c.drops > 0 ? `${c.drops} gts` : ''} ({c.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                    {recipe.totalDrops > 0 && (
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] font-bold text-gray-400 flex items-center justify-between font-mono">
                        <span>VOLUME TOTAL:</span>
                        <span>{recipe.totalDrops} Gotas</span>
                      </div>
                    )}
                  </div>

                  {/* Notes Area */}
                  <div className="mt-4 space-y-1">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> Notas de Procedimento
                    </span>
                    {isEditing ? (
                      <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        placeholder="Adicione observações, ordem de aplicação das demãos, wash, etc..."
                        className="w-full text-xs font-semibold p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-emerald-500 h-20"
                      />
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal font-sans italic">
                        {recipe.notes || 'Nenhuma nota adicionada.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    {/* Delete button */}
                    <button
                      id={`recipe-lib-del-${recipe.id}`}
                      onClick={() => onDeleteRecipe(recipe.id)}
                      className="h-8 px-2.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                      title="Excluir receita"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Excluir
                    </button>

                    {/* Edit trigger */}
                    {isEditing ? (
                      <button
                        onClick={() => handleSaveEdit(recipe)}
                        className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 cursor-pointer"
                      >
                        Salvar Notas
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(recipe)}
                        className="text-gray-500 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800/40 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Editar Notas
                      </button>
                    )}
                  </div>

                  <div className="flex gap-1">
                    {/* Duplicate button */}
                    <button
                      onClick={() => handleDuplicate(recipe)}
                      className="text-gray-400 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-800/40 text-xs font-bold p-2 rounded-lg cursor-pointer"
                      title="Duplicar receita"
                    >
                      Duplicar
                    </button>

                    {/* PNG Export */}
                    <button
                      onClick={() => handleExportPNG(recipe)}
                      className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 text-xs font-bold p-2 rounded-lg flex items-center gap-0.5 cursor-pointer"
                      title="Exportar imagem PNG"
                    >
                      <Download className="h-3.5 w-3.5" /> PNG
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
