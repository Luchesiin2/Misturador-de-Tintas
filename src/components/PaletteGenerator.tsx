import React, { useState, useEffect } from 'react';
import { 
  Palette as PaletteIcon, 
  Copy, 
  Check, 
  Save, 
  Download, 
  Share2, 
  Printer, 
  Shuffle, 
  Sliders, 
  Bookmark, 
  Trash2,
  Undo
} from 'lucide-react';
import { Palette, ColorSpec } from '../types';
import { generatePaletteByTheme, hexToRgb, rgbToHex } from '../utils/colorMath';

interface PaletteGeneratorProps {
  savedPalettes: Palette[];
  onSavePalette: (palette: Palette) => void;
  onDeletePalette: (id: string) => void;
  selectedPaletteFromDashboard: Palette | null;
  clearSelectedPaletteFromDashboard: () => void;
}

const THEMES = [
  'Fantasia',
  'Medieval',
  'Anime',
  'Super-heróis',
  'Terror',
  'Ficção Científica',
  'Militar',
  'Customizado'
];

export default function PaletteGenerator({
  savedPalettes,
  onSavePalette,
  onDeletePalette,
  selectedPaletteFromDashboard,
  clearSelectedPaletteFromDashboard
}: PaletteGeneratorProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('Fantasia');
  const [paletteName, setPaletteName] = useState<string>('Nova Paleta Élfica');
  const [colors, setColors] = useState<Palette['colors']>({
    principal: { name: 'Verde Élfico Florido', hex: '#2c8a4f', rgb: { r: 44, g: 138, b: 79 } },
    base: { name: 'Pele Élfica', hex: '#dfb293', rgb: { r: 223, g: 178, b: 147 } },
    sombra: { name: 'Sombra Verde Musgo', hex: '#164d2b', rgb: { r: 22, g: 77, b: 43 } },
    luz: { name: 'Luz de Lua Élfica', hex: '#a6edd0', rgb: { r: 166, g: 237, b: 208 } },
    destaque: { name: 'Rosa Mágico Pixie', hex: '#e95c8f', rgb: { r: 233, g: 92, b: 143 } },
    metalica: { name: 'Prata Élfica Brilhante', hex: '#d1d8e0', rgb: { r: 209, g: 216, b: 224 } },
    detalhes: { name: 'Azul Celeste Místico', hex: '#4b9cd3', rgb: { r: 75, g: 156, b: 211 } }
  });

  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Sync palette if selected from Dashboard
  useEffect(() => {
    if (selectedPaletteFromDashboard) {
      setSelectedTheme(selectedPaletteFromDashboard.theme);
      setPaletteName(selectedPaletteFromDashboard.name);
      setColors(selectedPaletteFromDashboard.colors);
      clearSelectedPaletteFromDashboard();
    }
  }, [selectedPaletteFromDashboard, clearSelectedPaletteFromDashboard]);

  // Handle theme trigger
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    let defaultName = `Paleta Temática ${theme}`;
    if (theme === 'Fantasia') defaultName = 'Nova Paleta Élfica';
    if (theme === 'Medieval') defaultName = 'Forte do Cavaleiro';
    if (theme === 'Anime') defaultName = 'Visual Otaku Shonen';
    if (theme === 'Super-heróis') defaultName = 'Protetor Metropolitano';
    if (theme === 'Terror') defaultName = 'Catacumba do Vampiro';
    if (theme === 'Ficção Científica') defaultName = 'Posto Avançado Starship';
    if (theme === 'Militar') defaultName = 'Operações na Selva';
    if (theme === 'Customizado') defaultName = 'Minha Paleta Personalizada';

    setPaletteName(defaultName);
    const generated = generatePaletteByTheme(theme, defaultName);
    setColors(generated.colors);
  };

  // Copy Color HEX to clipboard
  const handleCopyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Modify individual color (For Custom theme)
  const handleColorChange = (key: keyof Palette['colors'], field: keyof ColorSpec, value: string) => {
    const updatedColors = { ...colors };
    if (field === 'hex') {
      const rgb = hexToRgb(value);
      updatedColors[key] = {
        ...updatedColors[key],
        hex: value,
        rgb
      };
    } else if (field === 'name') {
      updatedColors[key] = {
        ...updatedColors[key],
        name: value
      };
    }
    setColors(updatedColors);

    // If not already in custom, switch theme indicator
    if (selectedTheme !== 'Customizado') {
      setSelectedTheme('Customizado');
    }
  };

  // Save palette to Storage
  const handleSave = () => {
    const newPalette: Palette = {
      id: 'p-' + Date.now(),
      name: paletteName || 'Minha Paleta',
      theme: selectedTheme,
      colors,
      isCustom: selectedTheme === 'Customizado',
      createdAt: new Date().toISOString()
    };
    onSavePalette(newPalette);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Generate PNG Export via Canvas
  const handleExportPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGradient.addColorStop(0, '#111827');
    bgGradient.addColorStop(1, '#1f2937');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Header Text
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('CENTRAL DE PINTURA 3D', 80, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Arial';
    ctx.fillText(paletteName, 80, 130);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '18px Arial';
    ctx.fillText(`Tema: ${selectedTheme}  |  Gerada em: ${new Date().toLocaleDateString()}`, 80, 170);

    // Draw Colors
    const colorKeys: Array<{ key: keyof Palette['colors']; label: string }> = [
      { key: 'principal', label: 'Principal' },
      { key: 'base', label: 'Cor Base' },
      { key: 'sombra', label: 'Cor Sombra' },
      { key: 'luz', label: 'Cor de Luz' },
      { key: 'destaque', label: 'Cor Destaque' },
      { key: 'metalica', label: 'Cor Metálica' },
      { key: 'detalhes', label: 'Detalhes' }
    ];

    const cardWidth = 140;
    const cardHeight = 380;
    const startX = 80;
    const startY = 220;
    const gap = 15;

    colorKeys.forEach((item, index) => {
      const colorSpec = colors[item.key];
      const x = startX + index * (cardWidth + gap);
      const y = startY;

      // Color Box
      ctx.fillStyle = colorSpec.hex;
      // Rounded rect function
      ctx.beginPath();
      ctx.roundRect?.(x, y, cardWidth, 200, 16);
      ctx.fill();

      // Border around light colors
      if (colorSpec.hex.toLowerCase() === '#ffffff' || colorSpec.hex.toLowerCase() === '#fff') {
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Label Category
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px Arial';
      ctx.fillText(item.label.toUpperCase(), x, y + 230);

      // Color Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px Arial';
      // Wrap text if needed
      const words = colorSpec.name.split(' ');
      let line = '';
      let textY = y + 255;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > cardWidth && n > 0) {
          ctx.fillText(line, x, textY);
          line = words[n] + ' ';
          textY += 18;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, textY);

      // HEX
      ctx.fillStyle = '#9ca3af';
      ctx.font = 'bold 13px Courier New';
      ctx.fillText(colorSpec.hex.toUpperCase(), x, y + 320);

      // RGB
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px Courier New';
      ctx.fillText(`R:${colorSpec.rgb.r} G:${colorSpec.rgb.g} B:${colorSpec.rgb.b}`, x, y + 340);
    });

    // Footer
    ctx.fillStyle = '#4b5563';
    ctx.font = '12px Arial';
    ctx.fillText('Central de Pintura 3D - Seu ateliê digital de miniaturas e colecionáveis', 80, 740);

    // Create Download Link
    const link = document.createElement('a');
    link.download = `${paletteName.toLowerCase().replace(/\s+/g, '_')}_paleta.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Share via clipboard copy
  const handleShare = () => {
    const text = `🎨 *CENTRAL DE PINTURA 3D* 🎨
Paleta: *${paletteName}*
Tema: *${selectedTheme}*

Colaboradores e Fórmulas de Pintura:
• PRINCIPAL: ${colors.principal.name} (${colors.principal.hex} | RGB: ${colors.principal.rgb.r}, ${colors.principal.rgb.g}, ${colors.principal.rgb.b})
• COR BASE: ${colors.base.name} (${colors.base.hex} | RGB: ${colors.base.rgb.r}, ${colors.base.rgb.g}, ${colors.base.rgb.b})
• SOMBRA: ${colors.sombra.name} (${colors.sombra.hex} | RGB: ${colors.sombra.rgb.r}, ${colors.sombra.rgb.g}, ${colors.sombra.rgb.b})
• COR DE LUZ: ${colors.luz.name} (${colors.luz.hex} | RGB: ${colors.luz.rgb.r}, ${colors.luz.rgb.g}, ${colors.luz.rgb.b})
• DESTAQUE: ${colors.destaque.name} (${colors.destaque.hex} | RGB: ${colors.destaque.rgb.r}, ${colors.destaque.rgb.g}, ${colors.destaque.rgb.b})
• METÁLICA: ${colors.metalica.name} (${colors.metalica.hex} | RGB: ${colors.metalica.rgb.r}, ${colors.metalica.rgb.g}, ${colors.metalica.rgb.b})
• DETALHES: ${colors.detalhes.name} (${colors.detalhes.hex} | RGB: ${colors.detalhes.rgb.r}, ${colors.detalhes.rgb.g}, ${colors.detalhes.rgb.b})

Gerado na Central de Pintura 3D!`;

    navigator.clipboard.writeText(text);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // Trigger browser print styles
  const handlePrint = () => {
    window.print();
  };

  const loadSavedPaletteToView = (palette: Palette) => {
    setSelectedTheme(palette.theme);
    setPaletteName(palette.name);
    setColors(palette.colors);
  };

  const getThemeClass = (theme: string) => {
    if (selectedTheme === theme) {
      return 'bg-emerald-600 text-white shadow-sm';
    }
    return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';
  };

  const colorFields: Array<{ key: keyof Palette['colors']; label: string; desc: string }> = [
    { key: 'principal', label: 'Paleta Principal', desc: 'Identidade e cor central' },
    { key: 'base', label: 'Cor Base', desc: 'Primeira demão geral' },
    { key: 'sombra', label: 'Cor de Sombra', desc: 'Zonas escuras e recessos' },
    { key: 'luz', label: 'Cor de Luz', desc: 'Arestas e pontos elevados' },
    { key: 'destaque', label: 'Cor de Destaque', desc: 'Efeitos OSL, runas ou olhos' },
    { key: 'metalica', label: 'Metálica Recomendada', desc: 'Fivelas, armas e ornamentações' },
    { key: 'detalhes', label: 'Cor para Detalhes', desc: 'Cintos de couro, joias, bolsas' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <PaletteIcon className="h-6 w-6 text-emerald-500" /> Gerador de Paletas de Cores
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Escolha um tema temático ou crie sua própria paleta de harmonização cromática para miniaturas.
          </p>
        </div>
        
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="pal-btn-copy-share"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            {shareSuccess ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5 text-emerald-500" />}
            {shareSuccess ? 'Copiado!' : 'Compartilhar'}
          </button>
          
          <button
            id="pal-btn-export-png"
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-blue-500" /> Exportar PNG
          </button>

          <button
            id="pal-btn-print"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-purple-500" /> Imprimir / PDF
          </button>

          <button
            id="pal-btn-save"
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition shadow-xs cursor-pointer"
          >
            {saveSuccess ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            {saveSuccess ? 'Salvo!' : 'Salvar Paleta'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Lado Esquerdo: Temas & Paletas Salvas */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Seletor de Temas */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">Selecionar Tema</h3>
            <div className="flex flex-col gap-1.5">
              {THEMES.map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${getThemeClass(theme)}`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Paletas Salvas */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span>Paletas Salvas</span>
              <span className="font-mono bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                {savedPalettes.length}
              </span>
            </h3>
            
            {savedPalettes.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">Nenhuma paleta salva ainda.</p>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {savedPalettes.map(palette => (
                  <div 
                    key={palette.id}
                    className="group flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition text-xs border border-transparent hover:border-emerald-500/10"
                  >
                    <div 
                      onClick={() => loadSavedPaletteToView(palette)}
                      className="min-w-0 flex-1 cursor-pointer"
                    >
                      <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{palette.name}</p>
                      <span className="text-[10px] text-gray-400">{palette.theme}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5 mr-1 shrink-0">
                        <div className="h-3 w-3 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: palette.colors.principal.hex }} />
                        <div className="h-3 w-3 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: palette.colors.base.hex }} />
                        <div className="h-3 w-3 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: palette.colors.luz.hex }} />
                      </div>
                      <button
                        onClick={() => onDeletePalette(palette.id)}
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center transition cursor-pointer shrink-0"
                        title="Deletar Paleta"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Lado Direito: Editor de Cores e Visualização da Paleta */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Nome da Paleta */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900/60">
            <div className="max-w-md">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Nome da Paleta</label>
              <input
                type="text"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                placeholder="Ex: Guerreiro de Ferro, Dragon Slayer..."
                className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none dark:border-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Visualização de Impressão e Preview em Cards */}
          <div className="print-target rounded-xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900/60">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">
              Visualização Cromática da Paleta
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {colorFields.map((field) => {
                const colorSpec = colors[field.key];
                return (
                  <div 
                    key={field.key} 
                    className="flex flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 p-3 hover:border-emerald-500/20 transition relative group"
                  >
                    <div>
                      {/* Color Block */}
                      <div 
                        className="w-full h-24 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner flex items-center justify-center cursor-pointer transition active:scale-95"
                        style={{ backgroundColor: colorSpec.hex }}
                        onClick={() => handleCopyHex(colorSpec.hex, field.label)}
                        title="Clique para copiar o código HEX"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition duration-200 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 select-none">
                          <Copy className="h-2.5 w-2.5" /> HEX
                        </span>
                      </div>

                      {/* Category Label */}
                      <span className="block mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                        {field.label}
                      </span>

                      {/* Color Name Input / Text */}
                      <input
                        type="text"
                        value={colorSpec.name}
                        onChange={(e) => handleColorChange(field.key, 'name', e.target.value)}
                        className="mt-1 w-full text-xs font-semibold text-gray-800 dark:text-white bg-transparent border-b border-transparent focus:border-emerald-500 focus:outline-none truncate"
                        title="Clique para renomear esta cor"
                        placeholder="Nome da cor"
                      />

                      {/* Descrição curta da função */}
                      <span className="block text-[9px] text-gray-400 mt-0.5 leading-none">{field.desc}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                      {/* Interactive Native Color Picker */}
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="font-mono text-xs font-semibold text-gray-600 dark:text-gray-300">
                          {colorSpec.hex.toUpperCase()}
                        </span>
                        
                        <div className="relative h-5 w-5 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 shrink-0 cursor-pointer">
                          <input 
                            type="color" 
                            value={colorSpec.hex} 
                            onChange={(e) => handleColorChange(field.key, 'hex', e.target.value)}
                            className="absolute -top-1 -left-1 h-8 w-8 cursor-pointer border-none p-0 bg-transparent"
                            style={{ WebkitAppearance: 'none' }}
                          />
                        </div>
                      </div>

                      {/* RGB Info */}
                      <span className="block font-mono text-[9px] text-gray-400">
                        rgb({colorSpec.rgb.r}, {colorSpec.rgb.g}, {colorSpec.rgb.b})
                      </span>
                    </div>

                    {copiedColor === field.label && (
                      <div className="absolute inset-x-0 top-3 mx-auto w-max bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm animate-fade-in pointer-events-none">
                        Copiado!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dica do Módulo */}
            <div className="mt-8 text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2 bg-gray-50 dark:bg-gray-800/20 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
              <Sliders className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Dica de Customização:</p>
                <p className="mt-0.5">Você pode clicar no quadrado seletor de cores no canto inferior de cada card para ajustar o tom exato com precisão milimétrica. O tema mudará automaticamente para <strong className="text-emerald-500">Customizado</strong> e você poderá salvar, duplicar ou exportar sua nova versão!</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Estilo para Print de Página Inteira */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-target, .print-target * {
            visibility: visible;
          }
          .print-target {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          input {
            border: none !important;
            background: transparent !important;
            color: black !important;
          }
        }
      `}</style>

    </div>
  );
}
