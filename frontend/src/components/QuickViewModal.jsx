import React, { useState } from 'react';
import { 
  CloseIcon, 
  StarIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  RefreshCwIcon, 
  CheckIcon, 
  ShoppingBagIcon, 
  HeartIcon,
  PlusIcon,
  MinusIcon
} from './Icons';
import { CURRENCY_RATES } from '../data/products';

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  selectedCurrency = 'USD'
}) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const curr = CURRENCY_RATES[selectedCurrency] || CURRENCY_RATES.USD;
  const convertedPrice = Math.round(product.price * curr.rate);
  const convertedOriginalPrice = Math.round(product.originalPrice * curr.rate);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
      convertedPrice
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-[#FAFAFA] rounded-3xl shadow-2xl overflow-hidden border border-[#B76E79]/40 z-10 animate-reveal-up">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white text-gray-700 hover:text-black shadow-md transition-all border border-gray-100"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                <img 
                  src={product.images[activeImage] || product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />

                {product.tag && (
                  <span className="absolute top-4 left-4 text-[9.5px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-md bg-[#1A1A1A] text-white border border-[#B76E79]/40">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImage === idx ? 'border-[#B76E79] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Actions */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B76E79]">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-[#B76E79] text-[#B76E79]" />
                    <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase">
                  {product.title}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 my-3">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    {curr.symbol}{convertedPrice.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {curr.symbol}{convertedOriginalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-[#B76E79] bg-[#B76E79]/10 px-2.5 py-0.5 rounded-full font-semibold">
                    In Stock & Ready To Dispatch
                  </span>
                </div>

                {/* Specs Box */}
                <div className="p-3.5 bg-white rounded-2xl border border-gray-200 text-xs space-y-1 mb-4 shadow-sm">
                  <p><strong className="text-[#1A1A1A]">Fabric:</strong> <span className="text-gray-600">{product.fabric}</span></p>
                  <p><strong className="text-[#1A1A1A]">Includes:</strong> <span className="text-gray-600">{product.pieces}</span></p>
                  <p><strong className="text-[#1A1A1A]">Care:</strong> <span className="text-gray-600">Dry Clean Only. Steam Iron with Soft Cotton Barrier.</span></p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mt-5">
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block mb-2">
                    Select Color: <span className="font-normal text-gray-600 capitalize">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor.name === color.name 
                            ? 'border-[#B76E79] scale-110 shadow-md ring-2 ring-[#B76E79]/50' 
                            : 'border-white hover:scale-105'
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      Select Size:
                    </label>
                    <button 
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-[#B76E79] underline hover:text-[#1A1A1A] font-medium"
                    >
                      {showSizeGuide ? 'Hide Size Guide' : 'View Size Chart (Inches)'}
                    </button>
                  </div>

                  {/* Size Guide Table */}
                  {showSizeGuide && (
                    <div className="p-3 mb-3 bg-white rounded-xl border border-[#B76E79]/40 text-[11px] animate-reveal-up overflow-x-auto shadow-sm">
                      <table className="w-full text-center">
                        <thead>
                          <tr className="border-b text-gray-500">
                            <th className="py-1">Size</th>
                            <th className="py-1">Bust</th>
                            <th className="py-1">Waist</th>
                            <th className="py-1">Hip</th>
                            <th className="py-1">Length</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-gray-700">
                          <tr><td className="font-bold">XS</td><td>34"</td><td>27"</td><td>37"</td><td>46"</td></tr>
                          <tr><td className="font-bold">S</td><td>36"</td><td>29"</td><td>39"</td><td>46"</td></tr>
                          <tr><td className="font-bold">M</td><td>39"</td><td>32"</td><td>42"</td><td>47"</td></tr>
                          <tr><td className="font-bold">L</td><td>42"</td><td>35"</td><td>45"</td><td>47"</td></tr>
                          <tr><td className="font-bold">XL</td><td>45"</td><td>38"</td><td>48"</td><td>48"</td></tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-12 h-10 rounded-xl text-xs font-mono font-bold transition-all ${
                          selectedSize === sz 
                            ? 'bg-[#B76E79] text-white shadow-md scale-105' 
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-black'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center gap-4 mt-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-gray-200 rounded-2xl bg-white p-1 shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-600 hover:text-black"
                    >
                      <MinusIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-bold font-mono text-gray-800">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-600 hover:text-black"
                    >
                      <PlusIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button with liquid hover */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg flex items-center justify-center gap-2 liquid-btn ${
                      addedSuccess 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#B76E79] text-white hover:bg-[#1A1A1A]'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        <span>Added to Your Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="w-4 h-4" />
                        <span>Add To Bag • {curr.symbol}{(convertedPrice * quantity).toLocaleString()}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3.5 rounded-full border transition-all ${
                      isWishlisted 
                        ? 'bg-[#B76E79] text-white border-[#B76E79]' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <HeartIcon className="w-4 h-4" filled={isWishlisted} />
                  </button>
                </div>

              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-500">
                <div className="flex flex-col items-center gap-1">
                  <TruckIcon className="w-4 h-4 text-[#B76E79]" />
                  <span>3-5 Days Express</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheckIcon className="w-4 h-4 text-[#B76E79]" />
                  <span>100% Pure Silks</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCwIcon className="w-4 h-4 text-[#B76E79]" />
                  <span>14-Day Exchanges</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
