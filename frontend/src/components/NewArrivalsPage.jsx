import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
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
        return p.category === selectedCategory || p.stitchType === selectedCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        return (b.id || 0) - (a.id || 0);
      });
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="bg-[#FAF5EC] text-[#282321] pt-36 pb-20">

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-[#641E32] text-[#FAF5EC] p-8 sm:p-12 border border-[#B89B62]/40 shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC]/10 border border-[#B89B62] text-[#B89B62] text-[10px] uppercase tracking-widest font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
              Discover Timeless Pakistani Elegance
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF5EC]">
              New Season, New Elegance
            </h1>
            <p className="text-xs sm:text-sm text-[#E8DCCB] font-normal leading-relaxed">
              Find your perfect look with our collection of Pakistani suits, embroidered outfits, and timeless Eastern essentials.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Sort Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-5">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-[#164B3C] text-[#FAF5EC] shadow-sm'
                    : 'bg-white border border-[#E8DCCB] text-[#282321] hover:border-[#641E32] hover:text-[#641E32]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#282321]/75 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E8DCCB] text-xs rounded-full px-4 py-2 text-[#282321] focus:outline-none focus:border-[#641E32] font-medium shadow-sm transition-colors cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Favourites</option>
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
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#E8DCCB] max-w-lg mx-auto p-8 shadow-sm">
            <SparklesIcon className="w-8 h-8 text-[#B89B62] mx-auto mb-3 animate-pulse" />
            <h3 className="font-cinzel text-lg font-bold text-[#641E32]">No Outfits Found</h3>
            <p className="text-xs text-[#282321]/75 mt-1 mb-4">
              Try adjusting your category filter to view all designs.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-2.5 bg-[#641E32] text-[#FAF5EC] rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-[#164B3C] transition-colors"
            >
              Shop the Collection
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
