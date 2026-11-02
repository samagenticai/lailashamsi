import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { SparklesIcon } from './Icons';

export default function CategoriesPage({
  products,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  selectedCurrency,
  subFilter = 'all'
}) {
  const [selectedCategory, setSelectedCategory] = useState(subFilter || 'all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (subFilter) {
      setSelectedCategory(subFilter);
    }
  }, [subFilter]);

  const displayCategories = CATEGORIES.filter(c => c.id !== 'all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory === 'all') return true;
      
      if (selectedCategory === 'stitched') {
        return p.stitchType === 'stitched' || p.category === 'ready-to-wear' || p.category === 'silk-coords' || p.category === 'luxury-formals';
      }
      if (selectedCategory === 'unstitched') {
        return p.stitchType === 'unstitched' || p.category === 'festive-26';
      }
      if (selectedCategory === 'babies') {
        return p.category === 'babies' || p.stitchType === 'babies' || p.title?.toLowerCase().includes('princess') || p.title?.toLowerCase().includes('babies');
      }

      return p.category === selectedCategory || p.stitchType === selectedCategory;
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] border border-[#B76E79]/40 text-[#B76E79] text-[10px] uppercase font-mono tracking-widest font-semibold mb-3">
          <SparklesIcon className="w-3.5 h-3.5 text-[#B76E79]" />
          Signature Edits & Silhouettes
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-wide">
          Atelier Categories
        </h1>
        <div className="w-20 h-0.5 bg-[#B76E79] mx-auto mt-4 mb-3" />
        <p className="text-xs sm:text-sm text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
          From stitched ready-to-wear pret to ethereal unstitched raw silks and little princess heirlooms, discover silhouettes crafted with artisan mastery.
        </p>
      </section>

      {/* Main 3 High-Level Category Cards (Stitched, Unstitched, Babies) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stitched */}
          <div
            onClick={() => setSelectedCategory(selectedCategory === 'stitched' ? 'all' : 'stitched')}
            className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${
              selectedCategory === 'stitched' ? 'border-[#B76E79] ring-2 ring-[#B76E79]' : 'border-gray-200'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=900&auto=format&fit=crop"
              alt="Stitched Pret"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#E6B8BF] font-semibold">
                Signature Collection
              </span>
              <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider mt-1">
                Stitched Pret
              </h3>
              <p className="text-xs text-gray-300 font-light mt-1">
                Tailored ready-to-wear ensembles & luxury formal gowns
              </p>
              <span className="text-[10px] uppercase font-semibold text-[#B76E79] group-hover:text-white mt-2 flex items-center gap-1">
                {selectedCategory === 'stitched' ? '✓ Filter Active' : 'Explore Stitched →'}
              </span>
            </div>
          </div>

          {/* Unstitched */}
          <div
            onClick={() => setSelectedCategory(selectedCategory === 'unstitched' ? 'all' : 'unstitched')}
            className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${
              selectedCategory === 'unstitched' ? 'border-[#B76E79] ring-2 ring-[#B76E79]' : 'border-gray-200'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop"
              alt="Unstitched Fabric"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#E6B8BF] font-semibold">
                Pure Handloomed Cuts
              </span>
              <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider mt-1">
                Unstitched Fabric
              </h3>
              <p className="text-xs text-gray-300 font-light mt-1">
                Pure raw silks, embroidered chiffons & organza dupattas
              </p>
              <span className="text-[10px] uppercase font-semibold text-[#B76E79] group-hover:text-white mt-2 flex items-center gap-1">
                {selectedCategory === 'unstitched' ? '✓ Filter Active' : 'Explore Unstitched →'}
              </span>
            </div>
          </div>

          {/* Babies */}
          <div
            onClick={() => setSelectedCategory(selectedCategory === 'babies' ? 'all' : 'babies')}
            className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${
              selectedCategory === 'babies' ? 'border-[#B76E79] ring-2 ring-[#B76E79]' : 'border-gray-200'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=900&auto=format&fit=crop"
              alt="Babies Couture"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#E6B8BF] font-semibold">
                Little Princess
              </span>
              <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider mt-1">
                Babies Couture
              </h3>
              <p className="text-xs text-gray-300 font-light mt-1">
                Soft heirloom frocks & festive angrakhas for toddlers & infants
              </p>
              <span className="text-[10px] uppercase font-semibold text-[#B76E79] group-hover:text-white mt-2 flex items-center gap-1">
                {selectedCategory === 'babies' ? '✓ Filter Active' : 'Explore Babies →'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Filter Tabs & Sort Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'stitched', label: 'Stitched Pret' },
              { id: 'unstitched', label: 'Unstitched' },
              { id: 'babies', label: 'Babies' },
              { id: 'luxury-formals', label: 'Festive Formals' },
              { id: 'ready-to-wear', label: 'Ready To Wear' },
              { id: 'silk-coords', label: 'Silk Co-ords' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#B76E79]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-mono">{filteredProducts.length} Pieces</span>
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
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
            <p className="font-cinzel text-lg text-gray-700">No garments found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 px-6 py-2.5 bg-[#B76E79] text-white rounded-xl text-xs uppercase tracking-wider font-semibold"
            >
              Reset to All
            </button>
          </div>
        ) : (
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
        )}
      </section>

    </div>
  );
}
