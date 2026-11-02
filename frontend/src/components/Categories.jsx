import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRightIcon } from './Icons';

export default function Categories({ onSelectCategory, activeCategory, onExploreAll }) {
  const displayCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#B76E79] font-bold">
            Curated For Every Occasion
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2 mb-3 uppercase tracking-wide">
            Shop By Signature Edit
          </h2>
          <div className="w-16 h-0.5 bg-[#B76E79] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-gray-500 font-light">
            From breezy daytime raw silks to majestic evening zardozi formals, discover silhouettes sculpted for feminine grace.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                }}
                className={`group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${
                  isActive ? 'border-[#B76E79] ring-2 ring-[#B76E79]' : 'border-gray-200/80'
                }`}
              >
                {/* Background Image with Smooth Zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">

                  {/* Outfit count */}
                  <span className="inline-block text-[9.5px] uppercase tracking-[0.2em] text-[#E6B8BF] font-mono mb-1.5 font-semibold">
                    {cat.count} Designs Curated
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-[#E6B8BF] transition-colors uppercase">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-300 font-light mt-1 mb-4 opacity-90 line-clamp-1">
                    {cat.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-[#B76E79] group-hover:text-white group-hover:translate-x-1 transition-all">
                    <span>Explore Edit</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Soft border accent */}
                <div className="absolute inset-3 border border-white/20 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Explore All Categories Action Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#B76E79] text-white text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>Explore All Categories</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
