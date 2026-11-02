import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightIcon } from './Icons';

/**
 * Editorial luxury hero:
 * - Left-aligned magazine layout with masked line-by-line text reveal
 * - Ken Burns crossfade between slides
 * - Timed progress bars + 01/03 counter + next-slide preview
 */
const SLIDE_MS = 7000;

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=85&w=2200&auto=format&fit=crop',
    tag: "Spring / Summer Couture '26",
    line1: 'Elegance in',
    line2: 'every thread',
    subtitle: 'Pure Korean raw silk & handcrafted Mughal zardozi — hand-finished in Lahore.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=85&w=2200&auto=format&fit=crop',
    tag: 'The Royal Formal Edit',
    line1: 'Poise in',
    line2: 'every drape',
    subtitle: 'Intricate dabka, cutdana & freshwater pearls on luxurious micro velvet.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=2200&auto=format&fit=crop',
    tag: 'Modern Minimalist Silk',
    line1: 'Sculpted for',
    line2: 'modern grace',
    subtitle: 'Effortless fluid cuts designed for the global tastemaker.'
  }
];

export default function Hero({ onExploreClick, onLookbookClick }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i) => setCurrent((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(current + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current, paused, go]);

  const s = slides[current];
  const next = slides[(current + 1) % slides.length];

  return (
    <section
      className="relative w-full h-screen min-h-[620px] max-h-[960px] overflow-hidden bg-[#0E0E0E]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes heroMask { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes heroFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes heroLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes heroProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes heroKen { from { transform: scale(1.15) translateX(1.5%); } to { transform: scale(1.02) translateX(0); } }
        @keyframes heroScroll { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        .h-mask { animation: heroMask 1.1s cubic-bezier(.22,1,.36,1) both; }
        .h-fade { animation: heroFade 1s cubic-bezier(.22,1,.36,1) both; }
        .h-line { animation: heroLine 1s cubic-bezier(.22,1,.36,1) both; transform-origin: left; }
        .h-ken  { animation: heroKen ${SLIDE_MS + 1500}ms ease-out both; }
      `}</style>

      {/* ============ BACKGROUND SLIDES ============ */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            key={i === current ? `active-${current}` : slide.id}
            src={slide.image}
            alt=""
            className={`w-full h-full object-cover object-[center_25%] ${i === current ? 'h-ken' : ''}`}
          />
        </div>
      ))}

      {/* Overlays: left-weighted for legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* ============ CONTENT ============ */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
        <div key={s.id} className="max-w-2xl">
          {/* Tag */}
          <div className="flex items-center gap-4 mb-7">
            <span className="h-px w-12 bg-[#E6B8BF] h-line" style={{ animationDelay: '0.2s' }} />
            <span
              className="h-fade text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#E6B8BF] font-medium"
              style={{ animationDelay: '0.35s' }}
            >
              {s.tag}
            </span>
          </div>

          {/* Headline with masked reveal */}
          <h1 className="text-white">
            <span className="block overflow-hidden pb-1">
              <span
                className="h-mask block font-cinzel text-[42px] sm:text-6xl lg:text-[84px] font-semibold uppercase leading-[1.02] tracking-[0.03em]"
                style={{ animationDelay: '0.45s' }}
              >
                {s.line1}
              </span>
            </span>
            <span className="block overflow-hidden pb-3">
              <span
                className="h-mask block font-serif-luxury italic font-normal text-[40px] sm:text-6xl lg:text-[80px] leading-[1.05] text-[#E6B8BF]"
                style={{ animationDelay: '0.62s' }}
              >
                {s.line2}
              </span>
            </span>
          </h1>

          <p
            className="h-fade mt-5 max-w-md text-[15px] sm:text-base leading-relaxed text-white/80 font-light"
            style={{ animationDelay: '0.9s' }}
          >
            {s.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="h-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ animationDelay: '1.1s' }}
          >
            <button
              onClick={onExploreClick}
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em]"
            >
              <span className="absolute inset-0 bg-[#B76E79] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" />
              <span className="relative transition-colors duration-500 group-hover:text-white">Shop the Collection</span>
              <ArrowRightIcon className="relative w-4 h-4 transition-all duration-500 group-hover:text-white group-hover:translate-x-1" />
            </button>

            <button
              onClick={onLookbookClick}
              className="group relative text-[11px] font-semibold uppercase tracking-[0.28em] text-white py-2"
            >
              Our Philosophy
              <span className="absolute left-0 bottom-0 h-px w-full bg-white/50" />
              <span className="absolute left-0 bottom-0 h-px w-full bg-[#E6B8BF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* ============ BOTTOM BAR: progress + counter + next preview ============ */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-8 flex items-end justify-between gap-6">
          {/* Counter + progress */}
          <div className="flex items-center gap-5">
            <span className="font-cinzel text-white text-lg tabular-nums">
              {String(current + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-[2px] w-10 sm:w-16 bg-white/25 overflow-hidden py-0"
                >
                  <span
                    key={`${current}-${i}`}
                    className="absolute inset-0 bg-[#E6B8BF] origin-left"
                    style={
                      i < current
                        ? { transform: 'scaleX(1)' }
                        : i === current
                        ? {
                            animation: `heroProgress ${SLIDE_MS}ms linear both`,
                            animationPlayState: paused ? 'paused' : 'running'
                          }
                        : { transform: 'scaleX(0)' }
                    }
                  />
                </button>
              ))}
            </div>
            <span className="font-cinzel text-white/50 text-sm tabular-nums">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Next slide preview */}
          <button
            onClick={() => go(current + 1)}
            className="hidden md:flex group items-center gap-4 text-left"
            aria-label="Next slide"
          >
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50">Next</span>
              <span className="block font-serif-luxury italic text-white text-lg">{next.line2}</span>
            </div>
            <div className="relative w-20 h-24 overflow-hidden">
              <img
                src={next.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </button>
        </div>
      </div>

      {/* Vertical scroll cue */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative w-px h-16 bg-white/20 overflow-hidden">
          <span
            className="absolute inset-x-0 h-1/2 bg-[#E6B8BF]"
            style={{ animation: 'heroScroll 2s ease-in-out infinite' }}
          />
        </span>
      </div>
    </section>
  );
}
