import React, { useState, useEffect } from 'react';
import { SparklesIcon, CheckIcon, CloseIcon } from './Icons';

const FONT_THEMES = [
  {
    id: 'playfair',
    name: 'Playfair & Outfit',
    tag: 'Haute Couture Editorial (Vogue / Net-A-Porter)',
    preview: 'Ag Timeless Elegance',
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Outfit', sans-serif"
  },
  {
    id: 'cormorant',
    name: 'Cormorant & Tenor',
    tag: 'Royal Heritage & Bridal Atelier',
    preview: 'Ag Regal Heritage Craft',
    headingFont: "'Cormorant Garamond', Georgia, serif",
    bodyFont: "'Tenor Sans', sans-serif"
  },
  {
    id: 'cinzel',
    name: 'Cinzel & Montserrat',
    tag: 'Imperial Roman & Classic Luxury',
    preview: 'AG IMPERIAL MAJESTY',
    headingFont: "'Cinzel', Georgia, serif",
    bodyFont: "'Montserrat', sans-serif"
  },
  {
    id: 'italiana',
    name: 'Italiana & Outfit',
    tag: 'Milano Runway & Fashion Week',
    preview: 'Ag Contemporary Runway',
    headingFont: "'Italiana', Georgia, serif",
    bodyFont: "'Outfit', sans-serif"
  },
  {
    id: 'outfit',
    name: 'Modern Outfit',
    tag: 'Ultra-Clean Contemporary Minimalist',
    preview: 'Ag Modern Designer Pret',
    headingFont: "'Outfit', sans-serif",
    bodyFont: "'Outfit', sans-serif"
  }
];

export default function FontSwitcher() {
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('laila_font_theme') || 'playfair';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-theme', activeTheme);
    localStorage.setItem('laila_font_theme', activeTheme);
  }, [activeTheme]);

  return (
    <aside aria-label="Typography Themes" className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Pill Toggle Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1A1A]/95 text-white shadow-2xl border border-[#B76E79]/50 hover:border-[#B76E79] hover:bg-black transition-all transform hover:-translate-y-0.5 text-xs font-semibold backdrop-blur-md group"
          title="Customize Brand Font Family"
        >
          <SparklesIcon className="w-4 h-4 text-[#B76E79] group-hover:rotate-12 transition-transform" />
          <span className="tracking-wide">Font Style: <strong className="text-[#E6B8BF] capitalize">{activeTheme}</strong></span>
        </button>
      ) : (
        /* Expanded Drawer Menu */
        <div className="w-80 sm:w-88 bg-white/98 text-[#1A1A1A] rounded-3xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.35)] border border-gray-200 p-5 animate-reveal-up backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-150 mb-3">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-[#B76E79]" />
              <h3 className="text-sm font-bold text-[#1A1A1A]">Curated Typography Suite</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 transition-colors"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
            Click any font family below to test and transform the entire website live:
          </p>

          {/* Theme List */}
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {FONT_THEMES.map((theme) => {
              const isSelected = activeTheme === theme.id;

              return (
                <div
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#B76E79] bg-[#FAF3F4] shadow-sm ring-1 ring-[#B76E79]'
                      : 'border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1A1A1A]">{theme.name}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#B76E79] uppercase">
                        <CheckIcon className="w-3.5 h-3.5" />
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-gray-500 mb-2">{theme.tag}</p>

                  {/* Visual Live Font Sample */}
                  <div 
                    className="p-2 rounded-xl bg-white border border-gray-200 text-sm font-medium tracking-wide text-gray-800"
                    style={{ fontFamily: theme.headingFont }}
                  >
                    {theme.preview}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-gray-150 flex items-center justify-between text-[11px] text-gray-400">
            <span>Selection is auto-saved</span>
            <button
              onClick={() => setIsOpen(false)}
              className="font-bold text-[#B76E79] hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
