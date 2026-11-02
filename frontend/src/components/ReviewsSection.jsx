import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { StarIcon, SparklesIcon } from './Icons';

export default function ReviewsSection() {
  const pressLogos = [
    { name: 'UNSTITCHED SUITS', quote: '"Breathable fine Pakistani lawn and pure chiffon dupattas."' },
    { name: 'READY TO WEAR', quote: '"Effortlessly tailored shalwar kameez for modern grace."' },
    { name: 'LUXURY PRET', quote: '"Delicate hand-embroidery that honours traditional artistry."' },
    { name: 'EID COLLECTION', quote: '"Timeless festive silhouettes crafted for cherished moments."' }
  ];

  return (
    <section className="py-20 bg-[#FAF5EC] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Highlights Strip */}
        <div className="mb-20 pb-12 border-b border-[#E8DCCB]">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold mb-8">
            Discover Timeless Pakistani Elegance
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {pressLogos.map((press, i) => (
              <div key={i} className="space-y-2 p-4 rounded-xl bg-white/60 hover:bg-white transition-colors border border-[#E8DCCB]">
                <h4 className="font-cinzel text-base font-bold tracking-[0.12em] text-[#641E32]">
                  {press.name}
                </h4>
                <p className="text-xs text-[#282321]/80 italic leading-snug">
                  {press.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#164B3C] text-xs font-semibold uppercase tracking-widest mb-2">
            <SparklesIcon className="w-4 h-4 text-[#B89B62]" />
            <span>Verified Client Reviews</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#641E32]">
            Customer Favourites
          </h2>
          <div className="w-16 h-0.5 bg-[#B89B62] mx-auto mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-[#282321]/80">
            Read authentic experiences from women who chose our Pakistani Eastern Wear for their festive celebrations and everyday elegance.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id}
              className="bg-white rounded-3xl p-8 border border-[#E8DCCB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote marks */}
              <span className="font-cinzel text-6xl text-[#E8DCCB] absolute top-4 right-6 pointer-events-none select-none group-hover:text-[#B89B62]/50 transition-colors">
                “
              </span>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-[#B89B62] text-[#B89B62]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#282321]/85 leading-relaxed font-normal mb-6 italic">
                  "{test.comment}"
                </p>
              </div>

              {/* Author & Outfit */}
              <div className="pt-4 border-t border-[#E8DCCB] flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-[#641E32]">{test.name}</h4>
                  <p className="text-[10px] text-[#282321]/60 uppercase tracking-wider">{test.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#164B3C] bg-[#FAF5EC] border border-[#E8DCCB] px-2.5 py-1 rounded-full font-medium">
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
