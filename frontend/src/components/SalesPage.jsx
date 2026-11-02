import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { SparklesIcon } from './Icons';

export default function SalesPage({
  products,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  selectedCurrency
}) {
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const saleProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = selectedSubCat === 'all' || p.category === selectedSubCat || p.stitchType === selectedSubCat;
      return matchesCat;
    });
  }, [products, selectedSubCat]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LAILA10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-[#FAF5EC] text-[#282321] pt-36 pb-20">
      
      {/* Promo Hero Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="relative rounded-3xl overflow-hidden bg-[#641E32] text-[#FAF5EC] p-8 sm:p-12 border border-[#B89B62]/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC]/10 border border-[#B89B62] text-[#B89B62] text-[10px] uppercase tracking-widest font-semibold">
                <SparklesIcon className="w-3.5 h-3.5 text-[#B89B62]" />
                Discover Timeless Pakistani Elegance
              </div>
              <h1 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-wide text-[#FAF5EC]">
                Customer Favourites & Seasonal Offers
              </h1>
              <p className="text-xs sm:text-sm text-[#E8DCCB] font-normal max-w-xl">
                Find your perfect look with our collection of Pakistani suits, embroidered outfits, and timeless Eastern essentials.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-[#282321] p-4 sm:p-5 rounded-2xl border border-[#B89B62]/60 shadow-lg flex items-center justify-between gap-4">
              <div>
                <span className="text-[9.5px] uppercase text-[#B89B62] block">Extra 10% Off Voucher</span>
                <span className="text-lg font-bold text-[#FAF5EC] tracking-widest">LAILA10</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2 bg-[#164B3C] hover:bg-[#B89B62] hover:text-[#282321] text-[#FAF5EC] text-[11px] font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                {copiedCode ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubCat(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedSubCat === tab.id
                    ? 'bg-[#164B3C] text-[#FAF5EC] shadow-sm'
                    : 'bg-white border border-[#E8DCCB] text-[#282321] hover:border-[#641E32]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#282321]/60 hidden sm:inline">
            {saleProducts.length} Pieces Available
          </span>
        </div>
      </section>

      {/* Sale Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {saleProducts.map((product) => (
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
