import React from 'react';
import { SparklesIcon, ShieldCheckIcon, CheckIcon, ArrowRightIcon } from './Icons';

export default function AboutPage({ onExploreCollection }) {
  const pillars = [
    {
      no: '01',
      title: 'Zero Synthetic Blends',
      desc: 'We exclusively source genuine Korean raw silks, ethereal glass organzas, pure hand-loomed chiffons, and breathable Swiss lawn.'
    },
    {
      no: '02',
      title: 'Heirloom Zardozi & Tilla',
      desc: 'Each formal ensemble requires up to 120 artisan hours. Master craftsmen hand-apply metallic dabka, Japanese cutdana, and micro-pearls.'
    },
    {
      no: '03',
      title: 'Architectural Silhouettes',
      desc: 'Sculpted cuts and fluid drapes engineered to flatter diverse heights and proportions, melding traditional eastern poise with western runway modernity.'
    },
    {
      no: '04',
      title: 'Slow Fashion Ethics',
      desc: 'Made in ethical atelier studios in Lahore where heritage craftsmen receive sustainable wages, healthcare, and artisanal recognition.'
    }
  ];

  const timeline = [
    { year: '2018', title: 'The Atelier Genesis', desc: 'Founded as a bespoke bridal atelier in Lahore crafting custom trousseaus for discerning private clients.' },
    { year: '2021', title: 'Luxury Pret Launch', desc: 'Introduced ready-to-wear raw silk coordinates and festive formals, expanding across Pakistan.' },
    { year: '2024', title: 'Global Footprint', desc: 'Launched flagship showcases in Dubai City Walk and London Knightsbridge with worldwide express delivery.' },
    { year: '2026', title: 'Digital Flagship', desc: 'Full interactive digital atelier delivering bespoke couture to patrons in over 45 countries worldwide.' }
  ];

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A1A] pt-28 pb-20">
      
      {/* Editorial Hero Banner */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-[#120F15] text-white p-8 sm:p-16 lg:p-20 border border-[#D4AF37]/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B76E79]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201A26] border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase font-mono tracking-widest font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              The House of Laila Shamsi
            </div>
            
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide uppercase leading-tight">
              Haute Couture & Timeless Poise
            </h1>
            
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed pt-2">
              Born from a reverence for 16th-century Mughal needlework and an unapologetic passion for contemporary feminine minimalism. Every silhouette is an heirloom in the making.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="px-7 py-3 bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>View Collection</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 bottom-12 w-72 h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=85&w=800&auto=format&fit=crop"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Craftsmanship Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#B76E79] font-bold">
            The Atelier Code
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2 mb-3 uppercase">
            Artisanal Integrity
          </h2>
          <div className="w-16 h-0.5 bg-[#B76E79] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div 
              key={item.no}
              className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#B76E79]/50 transition-all space-y-3 group"
            >
              <span className="font-mono text-2xl font-bold text-[#D4AF37] group-hover:text-[#B76E79] transition-colors">
                {item.no}
              </span>
              <h3 className="font-cinzel text-base font-bold text-[#1A1A1A] uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand History Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#151218] text-white rounded-3xl p-8 sm:p-14 border border-[#2D2436] shadow-xl">
          <div className="max-w-xl mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Journey
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mt-1 uppercase">
              Milestones of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((step) => (
              <div key={step.year} className="space-y-2 border-l-2 border-[#D4AF37]/50 pl-4">
                <span className="font-mono text-xl font-bold text-[#D4AF37] block">
                  {step.year}
                </span>
                <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wide">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Ateliers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B76E79] font-bold">
          Presence
        </span>
        <h2 className="font-cinzel text-3xl font-bold text-[#1A1A1A] mt-2 mb-10 uppercase">
          Flagship Boutiques
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h4 className="font-cinzel font-bold text-sm text-[#1A1A1A] uppercase">Lahore Atelier</h4>
            <p className="text-xs text-gray-500 mt-1">M.M. Alam Road, Gulberg III</p>
            <p className="text-[11px] text-[#B76E79] font-mono mt-3">Mon – Sat: 11 AM – 9 PM</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h4 className="font-cinzel font-bold text-sm text-[#1A1A1A] uppercase">Karachi Studio</h4>
            <p className="text-xs text-gray-500 mt-1">Bukhari Commercial, DHA Phase VI</p>
            <p className="text-[11px] text-[#B76E79] font-mono mt-3">Mon – Sat: 12 PM – 9 PM</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h4 className="font-cinzel font-bold text-sm text-[#1A1A1A] uppercase">Dubai Showcase</h4>
            <p className="text-xs text-gray-500 mt-1">City Walk, Al Safa, Dubai</p>
            <p className="text-[11px] text-[#B76E79] font-mono mt-3">Daily: 10 AM – 10 PM</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h4 className="font-cinzel font-bold text-sm text-[#1A1A1A] uppercase">London Salon</h4>
            <p className="text-xs text-gray-500 mt-1">Sloane Street, Knightsbridge</p>
            <p className="text-[11px] text-[#B76E79] font-mono mt-3">By Private Appointment</p>
          </div>
        </div>
      </section>

    </div>
  );
}
