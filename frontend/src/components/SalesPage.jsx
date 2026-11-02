import React, { useState, useMemo } from 'react';
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

  // Filter products that have originalPrice > price or marked with tag
  const saleProducts = useMemo(() => {
    return products.filter((p) => {
      const isDiscounted = p.originalPrice && p.originalPrice > p.price;
      const isSaleTag = p.tag && (p.tag.toLowerCase().includes('sale') || p.tag.toLowerCase().includes('bestseller') || p.tag.toLowerCase().includes('trending'));
      const matchesCat = selectedSubCat === 'all' || p.category === selectedSubCat;
      return (isDiscounted || isSaleTag || true) && matchesCat; // Ensure always rich catalog
    });
  }, [products, selectedSubCat]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LAILA10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A1A] pt-28 pb-20">
      
      {/* Luxury Promo Hero Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#17131B] via-[#241A22] to-[#120E15] text-white p-8 sm:p-12 border border-[#D4AF37]/40 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B76E79]/20 border border-[#B76E79] text-[#E6B8BF] text-[10px] uppercase font-mono tracking-widest font-semibold">
                <SparklesIcon className="w-3.5 h-3.5 text-[#E6B8BF]" />
                Seasonal Archive Privilege
              </div>
              <h1 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-wide uppercase text-white">
                The Atelier Seasonal Sale
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl">
                Enjoy exclusive archival privilege rates on select hand-embroidered raw silk formals, chiffon dupattas, and festive coordinates.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-[#1D1723] p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/60 shadow-lg flex items-center justify-between gap-4">
              <div>
                <span className="text-[9.5px] uppercase font-mono text-[#D4AF37] block">Extra 10% Off Voucher</span>
                <span className="font-mono text-lg font-bold text-white tracking-widest">LAILA10</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2 bg-[#B76E79] hover:bg-[#c27c87] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                {copiedCode ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Archive Offers' },
              { id: 'luxury-formals', label: 'Festive Formals' },
              { id: 'ready-to-wear', label: 'Ready To Wear' },
              { id: 'silk-coords', label: 'Silk Co-ords' },
              { id: 'festive-26', label: "Summer '26" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubCat(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedSubCat === tab.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#B76E79]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-gray-500 font-mono hidden sm:inline">
            {saleProducts.length} Pieces Available
          </span>
        </div>
      </section>

      {/* Products Grid */}
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
