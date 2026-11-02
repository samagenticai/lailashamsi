import React, { useState } from 'react';
import { HeartIcon, CheckIcon } from './Icons';
import { CURRENCY_RATES } from '../data/products';

/**
 * Editorial luxury product card (Zara / Sana Safinaz style):
 * flat sharp image, no boxy borders or pill badges, minimal typography,
 * slim "Add to Bag" bar that slides up on hover.
 */
export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  selectedCurrency = 'USD',
  staggerClass = 'stagger-1'
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [heartPopping, setHeartPopping] = useState(false);

  const curr = CURRENCY_RATES[selectedCurrency] || CURRENCY_RATES.USD;
  const convertedPrice = Math.round(product.price * curr.rate);
  const convertedOriginalPrice = Math.round(product.originalPrice * curr.rate);
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setHeartPopping(true);
    onToggleWishlist(product.id);
    setTimeout(() => setHeartPopping(false), 500);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      convertedPrice,
      quantity: 1
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowSizePicker(false);
    }, 1200);
  };

  return (
    <article
      className={`group relative flex flex-col ${staggerClass} animate-card-glide`}
      onMouseLeave={() => setShowSizePicker(false)}
    >
      {/* ================= IMAGE ================= */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-[#F3F1ED] cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:opacity-0"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={`${product.title} alternate view`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[900ms] ease-out scale-[1.04] group-hover:scale-100 opacity-0 group-hover:opacity-100"
        />

        {/* Minimal tag */}
        {(discount > 0 || product.tag) && (
          <span className="absolute top-3 left-3 z-10 bg-white/95 text-[#1A1A1A] text-[9px] font-medium uppercase tracking-[0.2em] px-2 py-1">
            {discount > 0 ? `-${discount}%` : product.tag}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleHeartClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 transition-all duration-300 ${heartPopping ? 'animate-heart-pop' : ''
            } ${isWishlisted
              ? 'text-[#B76E79] opacity-100'
              : 'text-[#1A1A1A] opacity-70 sm:opacity-0 group-hover:opacity-100 hover:text-[#B76E79]'
            }`}
        >
          <HeartIcon className="w-[18px] h-[18px] drop-shadow-sm" filled={isWishlisted} />
        </button>

        {/* Slide-up action bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          {showSizePicker ? (
            <div className="bg-white/97 backdrop-blur-sm px-3 py-3 animate-reveal-up">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2 text-center">
                Select Size
              </p>
              <div className="flex justify-center flex-wrap gap-1 mb-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[30px] h-7 px-1.5 text-[10px] tracking-wider border transition-colors ${selectedSize === sz
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-[#1A1A1A]'
                      }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <button
                onClick={handleQuickAdd}
                disabled={justAdded}
                className={`w-full h-8 text-[10px] font-medium uppercase tracking-[0.22em] flex items-center justify-center gap-1.5 transition-colors ${justAdded ? 'bg-[#B76E79] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#B76E79]'
                  }`}
              >
                {justAdded ? (
                  <>
                    <CheckIcon className="w-3 h-3" /> Added
                  </>
                ) : (
                  'Add to Bag'
                )}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 divide-x divide-gray-200 bg-white/95 backdrop-blur-sm">
              <button
                onClick={() => onQuickView(product)}
                className="h-10 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Quick View
              </button>
              <button
                onClick={() => setShowSizePicker(true)}
                className="h-10 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Add to Bag
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="pt-3.5 flex flex-col gap-1">
        <p className="text-[9.5px] uppercase tracking-[0.22em] text-gray-400">
          {product.categoryLabel}
        </p>

        <h3
          onClick={() => onQuickView(product)}
          className="font-serif text-[14px] leading-snug text-[#1A1A1A] cursor-pointer line-clamp-1 transition-colors group-hover:text-[#B76E79]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-medium text-[#1A1A1A] tracking-wide">
              {curr.symbol}{convertedPrice.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-[11px] text-gray-400 line-through">
                {curr.symbol}{convertedOriginalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
                className={`w-2.5 h-2.5 rounded-full transition-all ${selectedColor.name === color.name
                    ? 'ring-1 ring-offset-2 ring-[#1A1A1A]'
                    : 'ring-1 ring-gray-200'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
