import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { StarIcon, SparklesIcon } from './Icons';

export default function ReviewsSection() {
  const pressLogos = [
    { name: 'VOGUE ARABIA', quote: '"The undisputed vanguard of contemporary eastern pret."' },
    { name: 'HARPER\'S BAZAAR', quote: '"Heirloom silhouettes tailored for the global tastemaker."' },
    { name: 'GRAZIA', quote: '"Uncompromising luxury finishes that redefine pret-a-porter."' },
    { name: 'ELLE', quote: '"Mastery over raw silks and ethereal pastel palettes."' }
  ];

  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Mentions Strip */}
        <div className="mb-20 pb-12 border-b border-[#E8DFC5]">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#C59B27] font-semibold mb-8">
            As Acclaimed By International Fashion Critics
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {pressLogos.map((press, i) => (
              <div key={i} className="space-y-2 p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-[#E8DFC5]">
                <h4 className="font-serif text-lg font-bold tracking-[0.2em] text-[#24171A]">
                  {press.name}
                </h4>
                <p className="text-xs text-gray-500 italic font-editorial leading-snug">
                  {press.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#4A0E17] text-xs font-semibold uppercase tracking-widest mb-2">
            <SparklesIcon className="w-4 h-4 text-[#C59B27]" />
            <span>Patron Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24171A]">
            Loved By Women Worldwide
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-gray-600">
            Read authentic reviews from patrons who chose Laila Shamsi for their most cherished celebrations and daily elegance.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id}
              className="bg-white rounded-3xl p-8 border border-[#E8DFC5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote marks */}
              <span className="font-serif text-6xl text-[#E8DFC5] absolute top-4 right-6 pointer-events-none select-none group-hover:text-[#D4AF37]/40 transition-colors">
                “
              </span>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light mb-6 italic">
                  "{test.comment}"
                </p>
              </div>

              {/* Author & Outfit */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#24171A]">{test.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{test.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#4A0E17] bg-[#FAF3EB] px-2 py-0.5 rounded font-mono font-medium">
                    {test.outfit}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
