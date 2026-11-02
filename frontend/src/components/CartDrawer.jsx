import React, { useState } from 'react';
import { 
  CloseIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingBagIcon, 
  ArrowRightIcon, 
  SparklesIcon,
  ShieldCheckIcon
} from './Icons';
import { CURRENCY_RATES } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  selectedCurrency = 'USD'
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const curr = CURRENCY_RATES[selectedCurrency] || CURRENCY_RATES.USD;

  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => {
    return acc + (item.price * curr.rate * item.quantity);
  }, 0);

  // Free shipping threshold = $150
  const freeShippingThreshold = 150 * curr.rate;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Apply discount
  const discountAmount = appliedPromo ? Math.round(subtotal * 0.10) : 0;
  const shippingFee = (subtotal >= freeShippingThreshold || items.length === 0) ? 0 : Math.round(15 * curr.rate);
  const grandTotal = Math.max(0, Math.round(subtotal - discountAmount + shippingFee));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LAILA10') {
      setAppliedPromo({ code: 'LAILA10', discount: 10 });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "LAILA10" for 10% off');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFAFA] shadow-2xl flex flex-col justify-between border-l border-gray-200">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5 text-[#B76E79]" />
                <h3 className="font-cinzel text-lg font-bold text-[#1A1A1A] uppercase">Your Shopping Bag</h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-gray-100 text-[#B76E79]">
                  {items.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-black rounded-full"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="mt-4 p-3 bg-[#FAFAFA] rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#B76E79] font-semibold flex items-center gap-1">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    Unlocked: COMPLIMENTARY SHIPPING!
                  </span>
                ) : (
                  <span className="text-gray-600">
                    Add <strong className="text-[#1A1A1A]">{curr.symbol}{Math.round(amountNeededForFreeShipping)}</strong> more for <strong className="text-[#B76E79]">FREE SHIPPING</strong>
                  </span>
                )}
                <span className="text-[11px] font-mono text-gray-500">{Math.round(shippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#B76E79] transition-all duration-500 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-[#B76E79] flex items-center justify-center mx-auto">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <h4 className="font-cinzel text-base font-bold text-gray-800 uppercase">Your Bag is Empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto font-light">
                  Explore our luxury pret and haute couture collections to curate your dream ensemble.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#1A1A1A] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#B76E79] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = Math.round(item.price * curr.rate);

                return (
                  <div 
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-cinzel text-xs font-bold text-[#1A1A1A] uppercase line-clamp-1">{item.title}</h4>
                          <button 
                            onClick={() => onRemoveItem(item)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                          <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-semibold">
                            Size: {item.selectedSize}
                          </span>
                          <span className="flex items-center gap-1">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-gray-300" 
                              style={{ backgroundColor: item.selectedColor?.hex }}
                            />
                            <span>{item.selectedColor?.name}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-[#FAFAFA]">
                          <button 
                            onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                            className="p-1.5 text-gray-600 hover:bg-gray-200"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono font-bold text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                            className="p-1.5 text-gray-600 hover:bg-gray-200"
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif-luxury font-bold text-sm text-[#1A1A1A]">
                          {curr.symbol}{(itemPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-200 space-y-4 shadow-xl">
              
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code (e.g. LAILA10)"
                  className="flex-1 bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#B76E79]"
                />
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold rounded-xl hover:bg-[#B76E79] transition-colors uppercase tracking-wider liquid-btn"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] text-[#B76E79] flex items-center justify-between bg-[#B76E79]/10 px-3 py-1.5 rounded-lg">
                  <span>Code <strong>LAILA10</strong> applied (10% Privilege)</span>
                  <button onClick={() => setAppliedPromo(null)} className="text-gray-500 hover:text-black">✕</button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-red-600">{promoError}</p>
              )}

              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-gray-900">{curr.symbol}{Math.round(subtotal).toLocaleString()}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#B76E79] font-medium">
                    <span>VIP Privilege (10%)</span>
                    <span>-{curr.symbol}{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Worldwide Courier</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-[#B76E79] font-semibold uppercase">Free</span>
                    ) : (
                      `${curr.symbol}${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-2 border-t border-gray-200">
                  <span className="font-cinzel text-xs uppercase tracking-wider">Estimated Total</span>
                  <span className="font-serif-luxury text-lg text-[#1A1A1A]">{curr.symbol}{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onProceedToCheckout({
                    items,
                    subtotal,
                    discountAmount,
                    shippingFee,
                    grandTotal,
                    appliedPromo
                  });
                }}
                className="w-full py-4 bg-[#B76E79] text-white rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#1A1A1A] transition-all flex items-center justify-center gap-2 shadow-lg liquid-btn group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-[#B76E79]" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
