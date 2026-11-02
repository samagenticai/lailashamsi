import React, { useEffect, useRef, useState } from 'react';
import { TruckIcon, ShieldCheckIcon, SparklesIcon, RefreshCwIcon } from './Icons';

export default function ValueProps() {
  const perks = [
    {
      icon: SparklesIcon,
      title: 'Pakistani Craftsmanship',
      desc: 'Artisan tilla, resham & zardozi embroidery on every outfit'
    },
    {
      icon: TruckIcon,
      title: 'Nationwide & Global Delivery',
      desc: 'Express shipping across Pakistan, UK, USA, UAE & Canada'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Pure Natural Fabrics',
      desc: 'Fine Pakistani lawn, pure raw silk, chiffon & organza'
    },
    {
      icon: RefreshCwIcon,
      title: 'Tailored Perfection',
      desc: 'Refined Eastern cuts with effortless 14-day exchanges'
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
      className="relative bg-[#FAF5EC] py-12 sm:py-14 border-b border-[#E8DCCB]"
    >
      <span
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#B89B62]/60 to-transparent transition-all duration-[1400ms] ease-out ${
          visible ? 'w-full' : 'w-0'
        }`}
      />
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#B89B62]/60 to-transparent transition-all duration-[1400ms] ease-out ${
          visible ? 'w-full' : 'w-0'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-[#E8DCCB]">
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
                <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-dashed border-[#B89B62]/60 transition-transform duration-[1200ms] ease-out group-hover:rotate-180 group-hover:border-[#641E32]" />
                  <span className="absolute inset-[5px] rounded-full bg-white shadow-sm transition-all duration-500 group-hover:bg-[#641E32]" />
                  <Icon className="relative w-5 h-5 text-[#641E32] transition-all duration-500 group-hover:text-[#FAF5EC] group-hover:scale-110" />
                </div>

                <h3 className="font-cinzel text-[13px] sm:text-sm font-bold text-[#641E32]">
                  {perk.title}
                </h3>

                <span className="block h-px w-6 bg-[#B89B62] my-2.5 transition-all duration-500 group-hover:w-14" />

                <p className="text-[11.5px] sm:text-xs text-[#282321]/80 font-normal leading-relaxed max-w-[220px]">
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
