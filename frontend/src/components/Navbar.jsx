import React, { useState, useEffect } from 'react';
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  SearchIcon, 
  MenuIcon, 
  CloseIcon, 
  UserIcon,
  ChevronDownIcon
} from './Icons';
import BrandLogo from './BrandLogo';
import { CURRENCY_RATES } from '../data/products';

export default function Navbar({ 
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenSearch, 
  onOpenAdmin,
  activeCategory, 
  onSelectCategory,
  selectedCurrency,
  onChangeCurrency
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'New Arrivals', id: 'all' },
    { label: 'Festive Pret', id: 'festive-26' },
    { label: 'Couture', id: 'luxury-formals' },
    { label: 'Silk Co-ords', id: 'silk-coords' },
    { label: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
      
      {/* Floating Glassmorphism Navbar (Transparent at top -> Solid White on scroll) */}
      <nav className={`w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 text-[#1A1A1A] backdrop-blur-md shadow-md py-3.5 border-b border-gray-200/60' 
          : 'bg-black/25 text-white backdrop-blur-sm py-5 border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Left Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.id) onSelectCategory(link.id);
                  if (link.href) {
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`relative py-1 transition-colors duration-300 group ${
                  isScrolled ? 'hover:text-[#B76E79]' : 'hover:text-[#E6B8BF]'
                } ${
                  activeCategory === link.id ? (isScrolled ? 'text-[#B76E79] font-bold' : 'text-[#E6B8BF] font-bold') : ''
                }`}
              >
                <span>{link.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                  activeCategory === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 transition-colors hover:text-[#B76E79]"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Brand Emblem & Logo */}
          <div 
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center cursor-pointer group px-2 py-0.5"
            title="Laila Shamsi"
          >
            <div className="relative flex items-center justify-center">
              <img 
                src="/Logo.jpeg" 
                alt="Laila Shamsi Logo" 
                className={`transition-all duration-300 rounded-xl object-contain border border-[#D4AF37]/50 group-hover:scale-105 group-hover:border-[#D4AF37] ${
                  isScrolled 
                    ? 'h-11 w-11 sm:h-13 sm:w-13 shadow-md' 
                    : 'h-12 w-12 sm:h-16 sm:w-16 shadow-[0_0_25px_rgba(212,175,55,0.35)]'
                }`}
              />
            </div>
          </div>

          {/* Right Desktop Nav Links + Icons (Cart, Search, Profile) */}
          <div className="flex items-center space-x-6 sm:space-x-7">
            
            {/* Desktop right link */}
            <div className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium mr-2">
              {navLinks.slice(3).map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.id) onSelectCategory(link.id);
                    if (link.href) {
                      const el = document.querySelector(link.href);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`relative py-1 transition-colors duration-300 group ${
                    isScrolled ? 'hover:text-[#B76E79]' : 'hover:text-[#E6B8BF]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B76E79] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ))}
            </div>

            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className={`flex items-center gap-1 text-[11px] font-mono tracking-wider transition-colors py-1 px-2 rounded-full border ${
                  isScrolled 
                    ? 'border-gray-200 text-gray-700 hover:border-[#B76E79]' 
                    : 'border-white/20 text-white/90 hover:border-white'
                }`}
              >
                <span>{selectedCurrency}</span>
                <ChevronDownIcon className="w-2.5 h-2.5 text-[#B76E79]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#1A1A1A] border border-[#B76E79]/40 rounded-xl shadow-2xl py-1 z-50 animate-reveal-up text-white">
                  {Object.keys(CURRENCY_RATES).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onChangeCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#B76E79]/20 transition-colors ${
                        selectedCurrency === curr ? 'text-[#B76E79] font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button 
              onClick={onOpenSearch}
              className={`p-1.5 transition-colors rounded-full ${
                isScrolled ? 'hover:text-[#B76E79]' : 'hover:text-[#E6B8BF]'
              }`}
              title="Search Collection"
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            {/* Wishlist / Profile Icon */}
            <button 
              onClick={onOpenWishlist}
              className={`relative p-1.5 transition-colors rounded-full ${
                isScrolled ? 'hover:text-[#B76E79]' : 'hover:text-[#E6B8BF]'
              }`}
              title="Your Wishlist"
            >
              <HeartIcon className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#B76E79] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon (Minimalist with glowing badge) */}
            <button 
              onClick={onOpenCart}
              className={`relative p-2 rounded-full transition-all group flex items-center gap-1.5 ${
                isScrolled 
                  ? 'bg-[#1A1A1A] text-white hover:bg-[#B76E79]' 
                  : 'bg-white/20 text-white backdrop-blur-md hover:bg-[#B76E79]'
              }`}
              title="Shopping Cart"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              <span className="w-4 h-4 bg-[#B76E79] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[#1A1A1A] text-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto p-6 border-r border-[#333333]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#333]">
                <div className="flex items-center gap-3">
                  <img 
                    src="/Logo.jpeg" 
                    alt="Laila Shamsi Logo" 
                    className="h-11 w-11 rounded-xl object-contain border border-[#D4AF37]/50 shadow-md"
                  />
                  <div>
                    <h3 className="font-cinzel text-lg font-bold tracking-wider text-white">LAILA SHAMSI</h3>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#B76E79]">Haute Couture & Pret</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-full"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="my-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-gray-400 text-xs text-left"
                >
                  <SearchIcon className="w-4 h-4 text-[#B76E79]" />
                  <span>Search luxury pret & couture...</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.id) onSelectCategory(link.id);
                      if (link.href) {
                        const el = document.querySelector(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                      activeCategory === link.id 
                        ? 'bg-[#B76E79] text-white' 
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#333] text-xs text-gray-400 space-y-2">
              <div className="flex items-center justify-between py-1">
                <span>Active Currency:</span>
                <span className="font-bold text-[#B76E79] font-mono">{selectedCurrency} ({CURRENCY_RATES[selectedCurrency].symbol})</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Pure Korean raw silk, organza & handcrafted zardozi embroidery.
              </p>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
