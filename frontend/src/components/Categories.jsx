import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRightIcon } from './Icons';

export default function Categories({ onSelectCategory, activeCategory, onExploreAll }) {
  const displayCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="py-20 bg-[#FAF5EC] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89B62] font-semibold">
            Discover Timeless Pakistani Elegance
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#641E32] mt-2 mb-3">
            Discover Our Collections
          </h2>
          <div className="w-16 h-0.5 bg-[#B89B62] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#282321]/80 font-normal leading-relaxed">
            Find your perfect look with our collection of Pakistani suits, embroidered outfits, and timeless Eastern essentials.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {displayCategories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                }}
                className={`group relative h-[380px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 border ${
                  isActive ? 'border-[#164B3C] ring-2 ring-[#164B3C]' : 'border-[#E8DCCB]'
                }`}
              >
                {/* Background Image with Smooth Zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#282321]/90 via-[#282321]/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-[#FAF5EC]">

                  {/* Outfit count */}
                  <span className="inline-block text-[10px] uppercase tracking-[0.18em] text-[#B89B62] mb-1 font-semibold">
                    {cat.count} Designs
                  </span>

                  <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-[#FAF5EC] group-hover:text-[#E8DCCB] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-[#E8DCCB]/90 font-normal mt-1 mb-4 line-clamp-2">
                    {cat.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#B89B62] group-hover:text-[#FAF5EC] group-hover:translate-x-1 transition-all">
                    <span>Shop the Collection</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Soft border accent */}
                <div className="absolute inset-3 border border-[#B89B62]/30 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Explore All Categories Action Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#641E32] hover:bg-[#164B3C] text-[#FAF5EC] text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>Shop the Collection</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
