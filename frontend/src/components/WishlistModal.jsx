import React from 'react';
import { CloseIcon, HeartIcon, ShoppingBagIcon, TrashIcon } from './Icons';
import { CURRENCY_RATES } from '../data/products';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onAddToCart,
  onRemoveFromWishlist,
  selectedCurrency = 'USD'
}) {
  if (!isOpen) return null;

  const curr = CURRENCY_RATES[selectedCurrency] || CURRENCY_RATES.USD;
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#E8DFC5]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8DFC5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-[#4A0E17]" filled={true} />
              <h3 className="font-serif text-xl font-bold text-[#24171A]">Saved Wishlist</h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#4A0E17] border border-[#E8DFC5]">
                {wishlistedProducts.length}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-black rounded-full"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF3EB] text-[#4A0E17] flex items-center justify-center mx-auto border border-[#E8DFC5]">
                  <HeartIcon className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-gray-800">Your wishlist is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Click the heart icon on any outfit to curate your personal luxury wishlist.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#2A161B] text-[#FAF7F2] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#4A0E17] transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const convertedPrice = Math.round(product.price * curr.rate);

                return (
                  <div 
                    key={product.id}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-[#EBE3D5] shadow-sm items-center"
                  >
                    <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-24">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-sm font-bold text-[#24171A] line-clamp-1">{product.title}</h4>
                          <button 
                            onClick={() => onRemoveFromWishlist(product.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Remove from wishlist"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#C59B27] font-serif font-bold mt-1">
                          {curr.symbol}{convertedPrice.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart({
                            ...product,
                            selectedSize: product.sizes[0],
                            selectedColor: product.colors[0],
                            convertedPrice,
                            quantity: 1
                          });
                          onRemoveFromWishlist(product.id);
                        }}
                        className="py-1.5 px-3 bg-[#2A161B] text-[#FAF7F2] text-xs rounded-lg hover:bg-[#4A0E17] transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider font-semibold"
                      >
                        <ShoppingBagIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Move To Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-[#E8DFC5] text-center">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#FAF7F2] text-gray-700 border border-[#E8DFC5] rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-gray-100 transition-colors"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
