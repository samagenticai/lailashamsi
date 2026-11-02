import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from './Icons';

/**
 * Brand Philosophy — editorial split layout.
 * Scroll-triggered reveals: image curtain wipe, staggered text, counting stats.
 */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function CountUp({ end, suffix = '', start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end]);
  return <>{val}{suffix}</>;
}

export default function LookbookBanner({ onShopLook }) {
  const [ref, inView] = useInView();

  const reveal = (delay) => ({
    style: { transitionDelay: `${delay}ms` },
    className: `transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`
  });

  const pillars = [
    { no: '01', title: 'Zero Synthetic Blends', desc: 'Pure Korean raw silk, glass organza & handwoven cotton.' },
    { no: '02', title: 'Heirloom Zardozi', desc: 'Metallic tilla, Japanese cutdana & hand-strung pearls.' }
  ];

  const stats = [
    { end: 120, suffix: '+', label: 'Hand-hours per piece' },
    { end: 16, suffix: 'th', label: 'Century Mughal craft' },
    { end: 100, suffix: '%', label: 'Natural fabrics' }
  ];

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative py-20 sm:py-28 bg-[#FAF8F5] overflow-hidden"
    >
      {/* Giant watermark */}
      <span
        aria-hidden="true"
        className={`pointer-events-none select-none absolute -right-10 top-10 font-cinzel text-[180px] leading-none text-[#B76E79]/[0.05] transition-all duration-[1800ms] ${
          inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
      >
        LS
      </span>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* ============ IMAGE ============ */}
        <div className="lg:col-span-5 relative">
          {/* Offset frame */}
          <div
            className={`absolute -top-4 -left-4 w-full h-full border border-[#B76E79]/40 transition-all duration-[1400ms] delay-500 ${
              inView ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 translate-y-4'
            }`}
          />

          <div className="relative aspect-[4/5] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=85&w=1200&auto=format&fit=crop"
              alt="Laila Shamsi atelier model in hand-embroidered chiffon"
              className={`w-full h-full object-cover transition-transform duration-[2200ms] ease-out group-hover:scale-105 ${
                inView ? 'scale-100' : 'scale-125'
              }`}
            />
            {/* Curtain wipe */}
            <div
              className={`absolute inset-0 bg-[#1A1A1A] origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
                inView ? 'scale-y-0' : 'scale-y-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Caption */}
            <div
              style={{ transitionDelay: '900ms' }}
              className={`absolute bottom-0 inset-x-0 p-6 text-white transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="font-serif-luxury italic text-[15px] leading-snug">
                “We don’t make clothes to blend into the room — we sculpt heirlooms so you own it.”
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#E6B8BF]">
                Laila Shamsi · Creative Director
              </p>
            </div>
          </div>
        </div>

        {/* ============ TEXT ============ */}
        <div className="lg:col-span-7">
          <div {...reveal(200)}>
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#B76E79] font-semibold">
              <span className={`h-px bg-[#B76E79] transition-all duration-1000 delay-500 ${inView ? 'w-10' : 'w-0'}`} />
              Brand Philosophy
            </span>
          </div>

          <h2 {...reveal(350)}>
            <span className="block font-cinzel text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#1A1A1A] uppercase leading-[1.08] mt-5">
              Ancient Karigari
            </span>
            <span className="block font-serif-luxury italic text-3xl sm:text-4xl lg:text-[44px] text-[#B76E79] mt-2">
              meets modern sovereignty
            </span>
          </h2>

          <p {...reveal(500)}>
            <span className="block mt-7 max-w-xl text-[15px] leading-[1.85] text-gray-600">
              Laila Shamsi merges 16th-century Mughal needlework with razor-sharp modern tailoring —
              every ensemble cut exclusively from natural raw silks, ethereal organza and Swiss lawns.
            </span>
          </p>

          {/* Pillars */}
          <div className="mt-10 grid sm:grid-cols-2 border-t border-gray-200">
            {pillars.map((p, i) => (
              <div
                key={p.no}
                {...reveal(650 + i * 150)}
              >
                <div className={`group relative py-6 ${i === 0 ? 'sm:pr-8' : 'sm:pl-8 sm:border-l border-gray-200'} cursor-default`}>
                  <span className="absolute top-0 left-0 h-px w-0 bg-[#B76E79] transition-all duration-700 group-hover:w-full" />
                  <span className="font-cinzel text-xs text-[#B76E79] tracking-widest">{p.no}</span>
                  <h3 className="mt-2 font-cinzel text-[15px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A] transition-transform duration-500 group-hover:translate-x-1">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div {...reveal(950)}>
            <div className="grid grid-cols-3 gap-4 py-7 border-y border-gray-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-cinzel text-3xl sm:text-4xl text-[#1A1A1A]">
                    <CountUp end={s.end} suffix={s.suffix} start={inView} />
                  </div>
                  <div className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div {...reveal(1100)}>
            <button
              onClick={onShopLook}
              className="group mt-9 inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.28em] font-semibold text-[#1A1A1A]"
            >
              <span className="relative">
                Explore the Atelier Story
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#1A1A1A] origin-left transition-transform duration-500 group-hover:scale-x-0" />
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#B76E79] origin-right scale-x-0 transition-transform duration-500 delay-150 group-hover:scale-x-100 group-hover:origin-left" />
              </span>
              <span className="w-11 h-11 rounded-full border border-[#1A1A1A] flex items-center justify-center transition-all duration-500 group-hover:bg-[#B76E79] group-hover:border-[#B76E79] group-hover:text-white">
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
