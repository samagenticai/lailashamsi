import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { SparklesIcon } from './Icons';

export default function ProductSection({
  products,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  selectedCurrency,
  searchQuery,
  onClearSearch
}) {
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-20 bg-[#FAFAFA] border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 text-[#B76E79] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Couture & Pret '26 Drop</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#1A1A1A] uppercase tracking-wide">
              The Curated Collection
            </h2>
          </div>

          {/* Sort Dropdown */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">Sort By:</span>
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

        {/* Minimalist Filter Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${isSelected
                    ? 'bg-[#1A1A1A] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#B76E79] hover:text-[#B76E79]'
                  }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search Feedback */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-white border border-[#B76E79]/30 rounded-xl flex items-center justify-between text-xs shadow-sm">
            <span className="text-gray-700">
              Active query: <strong className="text-[#1A1A1A]">"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={onClearSearch}
              className="text-[#B76E79] font-bold hover:underline"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* ========================================================
            BALANCED 4-COLUMN LUXURY BOUTIQUE PRODUCT GRID
            ======================================================== */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 sm:gap-x-5 gap-y-10 max-w-7xl mx-auto">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
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
            <h3 className="font-cinzel text-lg font-bold text-[#1A1A1A]">No Outfits Found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              We couldn't find any designs matching your criteria.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onClearSearch();
              }}
              className="px-6 py-2 bg-[#1A1A1A] text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-[#B76E79] transition-colors"
            >
              View Full Collection
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
