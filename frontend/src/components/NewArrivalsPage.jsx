import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SparklesIcon } from './Icons';

export default function NewArrivalsPage({
  products = [],
  onQuickView,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
  selectedCurrency = 'USD'
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory === 'all') return true;
        return p.category === selectedCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        return (b.id || 0) - (a.id || 0); // Newest first by default
      });
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A1A] pt-28 pb-20">

      {/* Editorial Luxury Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#17131B] via-[#261B24] to-[#120E15] text-white p-8 sm:p-12 border border-[#D4AF37]/40 shadow-2xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B76E79]/20 border border-[#B76E79] text-[#E6B8BF] text-[10px] uppercase font-mono tracking-widest font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-[#E6B8BF]" />
              Spring / Summer '26 Fresh Drop
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-wide uppercase text-white">
              New Arrivals Collection
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Discover the latest silhouettes fresh from the atelier. Handcrafted with bespoke zardozi embroidery, Korean raw silks, and feather-light organza tissue.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#B76E79]/20 to-transparent pointer-events-none hidden md:block" />
        </div>
      </section>

      {/* Filter and Sort Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'all', label: 'All New Drops' },
              { id: 'ready-to-wear', label: 'Ready To Wear' },
              { id: 'luxury-formals', label: 'Luxury Formals' },
              { id: 'silk-coords', label: 'Silk Co-ords' },
              { id: 'festive-26', label: 'Festive Pret' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#B76E79] hover:text-[#B76E79]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-xs rounded-full px-4 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#B76E79] font-medium shadow-sm transition-colors cursor-pointer"
            >
              <option value="featured">Featured Runway</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 sm:gap-x-5 gap-y-10">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                selectedCurrency={selectedCurrency}
                staggerClass={`stagger-${(index % 6) + 1}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 max-w-lg mx-auto p-8 shadow-sm">
            <SparklesIcon className="w-8 h-8 text-[#B76E79] mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-bold text-[#1A1A1A]">No Outfits Found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Try adjusting your category filter to view all drops.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-2 bg-[#1A1A1A] text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-[#B76E79] transition-colors"
            >
              View All Drops
            </button>
          </div>
        )}
      </section>

    </div>
  );
}

