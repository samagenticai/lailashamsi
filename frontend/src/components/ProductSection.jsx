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
  onClearSearch,
  title = "New Season, New Elegance",
  badge = "Discover Timeless Pakistani Elegance"
}) {
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory || p.stitchType === activeCategory;
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
    <section id="collection" className="py-20 bg-[#FAF5EC] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8DCCB]">
          <div>
            <div className="inline-flex items-center gap-2 text-[#B89B62] text-xs font-semibold uppercase tracking-[0.22em] mb-2">
              <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
              <span>{badge}</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#641E32] tracking-wide">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#282321]/80 mt-2 max-w-2xl">
              Find your perfect look with our collection of Pakistani suits, embroidered outfits, and timeless Eastern essentials.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.15em] text-[#282321]/75 font-medium">Sort By:</span>
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

        {/* Minimalist Filter Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#164B3C] text-[#FAF5EC] shadow-md'
                    : 'bg-white text-[#282321] border border-[#E8DCCB] hover:border-[#641E32] hover:text-[#641E32]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search Feedback */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-white border border-[#E8DCCB] rounded-xl flex items-center justify-between text-xs shadow-sm">
            <span className="text-[#282321]">
              Active query: <strong className="text-[#641E32]">"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={onClearSearch}
              className="text-[#641E32] font-bold hover:underline"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Product Grid */}
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
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#E8DCCB] max-w-lg mx-auto p-8 shadow-sm">
            <SparklesIcon className="w-8 h-8 text-[#B89B62] mx-auto mb-3 animate-pulse" />
            <h3 className="font-cinzel text-lg font-bold text-[#641E32]">No Outfits Found</h3>
            <p className="text-xs text-[#282321]/75 mt-1 mb-4">
              We could not find any designs matching your selection.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onClearSearch();
              }}
              className="px-6 py-2.5 bg-[#641E32] text-[#FAF5EC] rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-[#164B3C] transition-colors"
            >
              Shop the Collection
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
