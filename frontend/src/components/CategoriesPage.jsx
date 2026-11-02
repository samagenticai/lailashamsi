import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { SparklesIcon } from './Icons';

export default function CategoriesPage({
  products,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  selectedCurrency
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const displayCategories = CATEGORIES.filter(c => c.id !== 'all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return selectedCategory === 'all' || p.category === selectedCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return (a.id || 0) - (b.id || 0);
    });
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A1A] pt-28 pb-20">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] border border-[#B76E79]/40 text-[#B76E79] text-[10px] uppercase font-mono tracking-widest font-semibold mb-3">
          <SparklesIcon className="w-3.5 h-3.5 text-[#B76E79]" />
          Signature Edits & Silhouettes
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-wide">
          Atelier Collections
        </h1>
        <div className="w-20 h-0.5 bg-[#B76E79] mx-auto mt-4 mb-4" />
        <p className="text-xs sm:text-sm text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
          From ethereal breezy daytime chiffons to majestic bridal zardozi ensembles, explore silhouettes crafted with pure Korean silks and artisan mastery.
        </p>
      </section>

      {/* 4 Signature Visual Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${
                  isSelected ? 'border-[#B76E79] ring-2 ring-[#B76E79]' : 'border-gray-200'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#E6B8BF] font-semibold">
                    {cat.count} Designs
                  </span>
                  <h3 className="font-cinzel text-lg font-bold uppercase tracking-wider mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </p>
                  <span className="text-[10px] uppercase font-semibold text-[#B76E79] group-hover:text-white mt-2 flex items-center gap-1 transition-colors">
                    {isSelected ? '✓ Viewing Collection' : 'Select Edit →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Filter Tabs & Sort Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#B76E79]'
              }`}
            >
              All Categories
            </button>
            {displayCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === c.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#B76E79]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-mono">{filteredProducts.length} Outfits</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-xs rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#B76E79] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Garment Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onQuickView={() => onQuickView(product)}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              selectedCurrency={selectedCurrency}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
