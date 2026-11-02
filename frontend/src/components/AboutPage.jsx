import React from 'react';
import { SparklesIcon, ArrowRightIcon } from './Icons';

export default function AboutPage({ onExploreCollection }) {
  const pillars = [
    {
      no: '01',
      title: 'Pure Pakistani Textiles',
      desc: 'We source fine Pakistani cotton lawn, pure raw silks, delicate chiffons, and breathable organzas crafted for lasting comfort and grace.'
    },
    {
      no: '02',
      title: 'Traditional Embroidery',
      desc: 'Each formal ensemble honours centuries of Pakistani craftsmanship with intricate tilla, dabka, resham threadwork, and pearl embellishments.'
    },
    {
      no: '03',
      title: 'Graceful Silhouettes',
      desc: 'From classic shalwar kameez and flowy kalidars to contemporary luxury pret cuts designed for modern femininity.'
    },
    {
      no: '04',
      title: 'Artisanal Heritage',
      desc: 'Crafted in our Lahore studios where master artisans preserve timeless Pakistani needlework techniques.'
    }
  ];

  const timeline = [
    { year: '2018', title: 'The Lahore Studio', desc: 'Founded in Lahore with a dedication to authentic Pakistani formal wear and handcrafted bridal silhouettes.' },
    { year: '2021', title: 'Luxury Pret & Lawn', desc: 'Expanded into unstitched lawn suits, embroidered dresses, and ready-to-wear shalwar kameez across Pakistan.' },
    { year: '2024', title: 'International Reach', desc: 'Welcomed patrons across the UK, UAE, USA, and Canada seeking timeless Pakistani Eastern Wear.' },
    { year: '2026', title: 'Timeless Elegance', desc: 'Continuing to celebrate Pakistani fashion with seasonal Eid collections, formal wear, and daily essentials.' }
  ];

  return (
    <div className="bg-[#FAF5EC] text-[#282321] pt-36 pb-20">
      
      {/* Editorial Hero Banner */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-[#641E32] text-[#FAF5EC] p-8 sm:p-16 lg:p-20 border border-[#B89B62]/40 shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC]/10 border border-[#B89B62] text-[#B89B62] text-[10px] uppercase tracking-widest font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
              Discover Timeless Pakistani Elegance
            </div>
            
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-tight text-[#FAF5EC]">
              Rooted in Tradition, Designed for Today
            </h1>
            
            <p className="text-xs sm:text-sm text-[#E8DCCB] font-normal leading-relaxed pt-2">
              Discover a thoughtful selection of Pakistani Eastern Wear that brings together traditional artistry, elegant silhouettes, and contemporary style.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="px-7 py-3.5 bg-[#164B3C] hover:bg-[#B89B62] hover:text-[#282321] text-[#FAF5EC] font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-md flex items-center gap-2"
              >
                <span>Shop the Collection</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 bottom-12 w-72 h-80 rounded-2xl overflow-hidden border border-[#B89B62]/50 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=85&w=800&auto=format&fit=crop"
              alt="Pakistani Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Craftsmanship Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#B89B62] font-bold">
            Our Philosophy
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#641E32] mt-2 mb-3">
            Tradition Woven with Elegance
          </h2>
          <div className="w-16 h-0.5 bg-[#B89B62] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div 
              key={item.no}
              className="bg-white p-7 rounded-2xl border border-[#E8DCCB] shadow-sm hover:shadow-xl hover:border-[#B89B62] transition-all space-y-3 group"
            >
              <span className="font-cinzel text-2xl font-bold text-[#B89B62] group-hover:text-[#641E32] transition-colors">
                {item.no}
              </span>
              <h3 className="font-cinzel text-base font-bold text-[#641E32]">
                {item.title}
              </h3>
              <p className="text-xs text-[#282321]/80 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand History Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#282321] text-[#FAF5EC] rounded-3xl p-8 sm:p-14 border border-[#E8DCCB]/20 shadow-xl">
          <div className="max-w-xl mb-12">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B62] font-semibold">
              Our Heritage
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#FAF5EC] mt-1">
              Celebrating Pakistani Fashion
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((step) => (
              <div key={step.year} className="space-y-2 border-l-2 border-[#B89B62] pl-4">
                <span className="font-cinzel text-xl font-bold text-[#B89B62] block">
                  {step.year}
                </span>
                <h4 className="font-cinzel text-sm font-bold text-[#FAF5EC]">
                  {step.title}
                </h4>
                <p className="text-xs text-[#E8DCCB]/80 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutiques */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B62] font-bold">
          Visit Us
        </span>
        <h2 className="font-cinzel text-3xl font-bold text-[#641E32] mt-2 mb-10">
          Flagship Boutiques
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCB]">
            <h4 className="font-cinzel font-bold text-sm text-[#641E32]">Lahore Boutique</h4>
            <p className="text-xs text-[#282321]/75 mt-1">M.M. Alam Road, Gulberg III</p>
            <p className="text-[11px] text-[#164B3C] font-medium mt-3">Mon – Sat: 11 AM – 9 PM</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCB]">
            <h4 className="font-cinzel font-bold text-sm text-[#641E32]">Karachi Studio</h4>
            <p className="text-xs text-[#282321]/75 mt-1">Bukhari Commercial, DHA Phase VI</p>
            <p className="text-[11px] text-[#164B3C] font-medium mt-3">Mon – Sat: 12 PM – 9 PM</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCB]">
            <h4 className="font-cinzel font-bold text-sm text-[#641E32]">Islamabad Salon</h4>
            <p className="text-xs text-[#282321]/75 mt-1">F-7 Markaz, Islamabad</p>
            <p className="text-[11px] text-[#164B3C] font-medium mt-3">Daily: 11 AM – 9 PM</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E8DCCB]">
            <h4 className="font-cinzel font-bold text-sm text-[#641E32]">London Showcase</h4>
            <p className="text-xs text-[#282321]/75 mt-1">Sloane Street, Knightsbridge</p>
            <p className="text-[11px] text-[#164B3C] font-medium mt-3">By Private Appointment</p>
          </div>
        </div>
      </section>

    </div>
  );
}
