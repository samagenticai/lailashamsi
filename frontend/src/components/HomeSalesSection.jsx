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
  // Find products that have discounts or are designated archive/sale items
  const saleProducts = useMemo(() => {
    const discounted = products.filter(
      (p) => (p.originalPrice && p.originalPrice > p.price) || 
             (p.tag && p.tag.toLowerCase().includes('sale'))
    );

    // If less than 4, fill with featured couture pieces with simulated privilege
    if (discounted.length >= 4) {
      return discounted.slice(0, 4);
    }

    const fallbackList = products.map((p, idx) => {
      if (p.originalPrice && p.originalPrice > p.price) return p;
      // Add archive price privilege for display
      return {
        ...p,
        originalPrice: p.originalPrice || Math.round(p.price * 1.25),
        tag: idx % 2 === 0 ? 'Seasonal Sale' : 'Privilege Archive'
      };
    });

    return fallbackList.slice(0, 4);
  }, [products]);

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F2] to-[#FAFAFA] border-t border-b border-gray-200/60 relative overflow-hidden">
      
      {/* Subtle atmospheric luxury glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B76E79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B76E79]/10 text-[#B76E79] text-xs font-semibold uppercase tracking-[0.22em] mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Privilege Archive Offer</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1A1A1A] uppercase tracking-wide">
              The Seasonal Sale Edit
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light mt-2 max-w-xl">
              Enjoy limited archive rates on handcrafted Korean raw silk formals, organza tissue cuts, and heirloom coordinates.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-[11px] uppercase tracking-widest font-mono text-[#B76E79] font-semibold bg-white border border-[#B76E79]/30 px-3.5 py-1.5 rounded-full shadow-sm">
              Up to 25% Off Archive Edits
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

        {/* Explore All Sales Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#B76E79] text-white text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>Explore All Sales</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}

