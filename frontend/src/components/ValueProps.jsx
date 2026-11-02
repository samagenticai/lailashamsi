import React, { useEffect, useRef, useState } from 'react';
import { TruckIcon, ShieldCheckIcon, SparklesIcon, RefreshCwIcon } from './Icons';

/**
 * Brand service promises — editorial strip with thin dividers,
 * scroll-triggered staggered reveal and refined hover micro-animations.
 */
export default function ValueProps() {
  const perks = [
    {
      icon: SparklesIcon,
      title: 'Handcrafted Artistry',
      desc: '80+ hours of artisan tilla, pearl & zardozi work'
    },
    {
      icon: TruckIcon,
      title: 'Worldwide Express',
      desc: 'Delivered to UK, USA, UAE & Canada in 3–5 days'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Certified Pure Fabrics',
      desc: 'Korean raw silk, glass organza & Swiss lawn'
    },
    {
      icon: RefreshCwIcon,
      title: 'Bespoke Alterations',
      desc: 'Complimentary tailoring & 14-day exchange'
    }
  ];

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Our promises"
      className="relative bg-[#FAFAFA] py-12 sm:py-14"
    >
      {/* Top & bottom hairlines that draw in from the center */}
      <span
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#B76E79]/50 to-transparent transition-all duration-[1400ms] ease-out ${
          visible ? 'w-full' : 'w-0'
        }`}
      />
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#B76E79]/50 to-transparent transition-all duration-[1400ms] ease-out ${
          visible ? 'w-full' : 'w-0'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-gray-200">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                style={{ transitionDelay: `${index * 140}ms` }}
                className={`group flex flex-col items-center text-center px-4 sm:px-6 cursor-default transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {/* Icon with rotating dashed ring */}
                <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-dashed border-[#B76E79]/40 transition-transform duration-[1200ms] ease-out group-hover:rotate-180 group-hover:border-[#B76E79]" />
                  <span className="absolute inset-[5px] rounded-full bg-white shadow-[0_4px_14px_-6px_rgba(183,110,121,0.35)] transition-all duration-500 group-hover:bg-[#1A1A1A]" />
                  <Icon className="relative w-5 h-5 text-[#B76E79] transition-all duration-500 group-hover:text-[#E6B8BF] group-hover:scale-110" />
                </div>

                <h3 className="font-cinzel text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]">
                  {perk.title}
                </h3>

                {/* Gold underline that grows on hover */}
                <span className="block h-px w-6 bg-[#B76E79] my-2.5 transition-all duration-500 group-hover:w-14" />

                <p className="text-[11.5px] sm:text-xs text-gray-500 font-light leading-relaxed max-w-[220px]">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
