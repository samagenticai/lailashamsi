import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { ArrowRightIcon, SparklesIcon } from './Icons';

export default function HomeSalesSection({
  products = [],
  onQuickView,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
  selectedCurrency = 'USD',
  onExploreAll
}) {
  const saleProducts = useMemo(() => {
    const discounted = products.filter(
      (p) => (p.originalPrice && p.originalPrice > p.price) || 
             (p.tag && (p.tag.toLowerCase().includes('sale') || p.tag.toLowerCase().includes('favourite')))
    );

    if (discounted.length >= 4) {
      return discounted.slice(0, 4);
    }

    const fallbackList = products.map((p, idx) => {
      if (p.originalPrice && p.originalPrice > p.price) return p;
      return {
        ...p,
        originalPrice: p.originalPrice || Math.round(p.price * 1.25),
        tag: idx % 2 === 0 ? 'Customer Favourite' : 'Seasonal Offer'
      };
    });

    return fallbackList.slice(0, 4);
  }, [products]);

  return (
    <section className="py-20 bg-[#FAF5EC] border-b border-[#E8DCCB] relative overflow-hidden">
      
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#641E32]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B89B62]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8DCCB]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B89B62]/15 text-[#641E32] text-xs font-semibold uppercase tracking-[0.2em] mb-3 border border-[#B89B62]/40">
              <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
              <span>Most Loved Eastern Wear</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#641E32] tracking-wide">
              Customer Favourites
            </h2>
            <p className="text-xs sm:text-sm text-[#282321]/80 font-normal mt-2 max-w-xl">
              Find your perfect look with our collection of Pakistani suits, embroidered outfits, and timeless Eastern essentials.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-[11px] uppercase tracking-widest text-[#164B3C] font-semibold bg-white border border-[#E8DCCB] px-3.5 py-1.5 rounded-full shadow-sm">
              Seasonal Privileges Available
            </span>
          </div>
        </div>

        {/* 4-Item Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {saleProducts.map((product, index) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              selectedCurrency={selectedCurrency}
              staggerClass={`stagger-${index + 1}`}
            />
          ))}
        </div>

        {/* Explore All Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#641E32] hover:bg-[#164B3C] text-[#FAF5EC] text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>Explore New Arrivals</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
