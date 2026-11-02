import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  SearchIcon, 
  MenuIcon, 
  CloseIcon, 
  ChevronDownIcon
} from './Icons';

export default function Navbar({ 
  currentRoute = '/',
  onNavigate,
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenAdmin,
  products = [],
  onSelectProduct
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  // In-Navbar Search States
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter live matching products for in-navbar search
  const searchResults = searchQuery.trim().length > 0 
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleLinkClick = (route, subFilter = null) => {
    if (onNavigate) onNavigate(route, subFilter);
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (onNavigate) onNavigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setMobileMenuOpen(false);
  };

  const isHomeActive = currentRoute === '/';
  const isNewArrivalsActive = currentRoute === '/new-arrivals';
  const isCategoriesActive = currentRoute === '/categories';
  const isSalesActive = currentRoute === '/sales';
  const isAboutActive = currentRoute === '/about';
  const isContactActive = currentRoute === '/contact';

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
      
      {/* Floating Glassmorphism Navbar */}
      <nav className={`w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 text-[#1A1A1A] backdrop-blur-md shadow-md py-3.5 border-b border-gray-200/60' 
          : 'bg-black/35 text-white backdrop-blur-md py-4 sm:py-5 border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* ======================================================== */}
          {/* LEFT: BRAND LOGO (Official Emblem + Wordmark)           */}
          {/* ======================================================== */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden mr-1">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 transition-colors hover:text-[#B76E79]"
                aria-label="Open menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Clickable Brand Logo -> Returns to Home (0, 0) */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer group py-0.5 select-none"
              title="Laila Shamsi - Back to Start"
            >
              <img 
                src="/Logo.jpeg" 
                alt="Laila Shamsi" 
                className={`transition-all duration-300 rounded-xl object-contain border border-[#D4AF37]/50 group-hover:scale-105 group-hover:border-[#D4AF37] ${
                  isScrolled 
                    ? 'h-10 w-10 sm:h-11 sm:w-11 shadow-md' 
                    : 'h-11 w-11 sm:h-12 sm:w-12 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                }`}
              />
              <div className="flex flex-col text-left">
                <span className={`font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] uppercase transition-colors leading-tight ${
                  isScrolled ? 'text-[#1A1A1A] group-hover:text-[#B76E79]' : 'text-white group-hover:text-[#E6B8BF]'
                }`}>
                  LAILA SHAMSI
                </span>
                <span className="text-[7.5px] uppercase tracking-[0.35em] text-[#B76E79] font-semibold mt-0.5">
                  Haute Couture & Pret
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER: NAVIGATION LINKS WITH LUXURY DROPDOWN           */}
          {/* ======================================================== */}
          <div className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium">
            
            {/* 1. HOME */}
            <button
              onClick={() => handleLinkClick('/')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isHomeActive 
                  ? 'text-[#B76E79] font-bold' 
                  : (isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-gray-100')
              }`}
            >
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                isHomeActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 2. NEW ARRIVALS */}
            <button
              onClick={() => handleLinkClick('/new-arrivals')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isNewArrivalsActive 
                  ? 'text-[#B76E79] font-bold' 
                  : (isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-gray-100')
              }`}
            >
              <span>New Arrivals</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                isNewArrivalsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 3. CATEGORIES WITH DROPDOWN (Stitched, Unstitched, Babies) */}
            <div 
              className="relative group py-1.5"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => handleLinkClick('/categories')}
                className={`flex items-center gap-1 transition-colors duration-300 ${
                  isCategoriesActive 
                    ? 'text-[#B76E79] font-bold' 
                    : (isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-gray-100')
                }`}
              >
                <span>Categories</span>
                <ChevronDownIcon className={`w-3 h-3 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180 text-[#B76E79]' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                  isCategoriesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {/* Luxury Glassmorphic Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="w-64 bg-[#141217]/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl shadow-2xl p-2.5 animate-reveal-up text-white">
                    <div className="px-3 py-1.5 border-b border-[#2A2333] mb-1">
                      <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] font-semibold">
                        Curated Categories
                      </span>
                    </div>

                    {/* Stitched */}
                    <button
                      onClick={() => handleLinkClick('/categories', 'stitched')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#251E2E] transition-all flex items-center justify-between group/item"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover/item:text-[#E6B8BF]">Stitched Pret</p>
                        <p className="text-[10px] text-gray-400">Ready to wear & luxury formals</p>
                      </div>
                      <span className="text-[10px] text-[#B76E79] opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                    </button>

                    {/* Unstitched */}
                    <button
                      onClick={() => handleLinkClick('/categories', 'unstitched')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#251E2E] transition-all flex items-center justify-between group/item"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover/item:text-[#E6B8BF]">Unstitched Fabric</p>
                        <p className="text-[10px] text-gray-400">Pure raw silks & chiffon cuts</p>
                      </div>
                      <span className="text-[10px] text-[#B76E79] opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                    </button>

                    {/* Babies */}
                    <button
                      onClick={() => handleLinkClick('/categories', 'babies')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#251E2E] transition-all flex items-center justify-between group/item"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover/item:text-[#E6B8BF]">Babies Couture</p>
                        <p className="text-[10px] text-gray-400">Little princess heirloom festive</p>
                      </div>
                      <span className="text-[10px] text-[#B76E79] opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                    </button>

                    <div className="pt-1.5 mt-1 border-t border-[#2A2333]">
                      <button
                        onClick={() => handleLinkClick('/categories')}
                        className="w-full text-center py-1 text-[11px] text-[#D4AF37] hover:underline font-mono"
                      >
                        Explore All Collections →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. SALES */}
            <button
              onClick={() => handleLinkClick('/sales')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isSalesActive 
                  ? 'text-[#B76E79] font-bold' 
                  : (isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-gray-100')
              }`}
            >
              <span>Sales</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                isSalesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 4. ABOUT */}
            <button
              onClick={() => handleLinkClick('/about')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isAboutActive 
                  ? 'text-[#B76E79] font-bold' 
                  : (isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-gray-100')
              }`}
            >
              <span>About</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                isAboutActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 5. CONTACT */}
            <button
              onClick={() => handleLinkClick('/contact')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isContactActive 
                  ? 'text-[#B76E79] font-bold' 
                  : (isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-gray-100')
              }`}
            >
              <span>Contact</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] transform origin-left transition-transform duration-300 ${
                isContactActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

          </div>

          {/* ======================================================== */}
          {/* RIGHT: INLINE SEARCH + WISHLIST + SHOPPING CART         */}
          {/* ======================================================== */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* 1. PROFESSIONAL INLINE EXPANDABLE SEARCH (NO CLUNKY POPUP) */}
            <div ref={searchContainerRef} className="relative flex items-center">
              {isSearchExpanded ? (
                <div className="flex items-center bg-[#191520]/95 border border-[#D4AF37]/60 rounded-full pl-3.5 pr-2 py-1.5 shadow-xl animate-reveal-up w-56 sm:w-72 md:w-80 transition-all">
                  <SearchIcon className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mr-2" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search couture, silk, pret..."
                    className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className={`p-2 transition-colors rounded-full ${
                    isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-white'
                  }`}
                  title="Search Collection"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              )}

              {/* Floating Instant Search Results Dropdown */}
              {isSearchExpanded && searchQuery.trim().length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-88 bg-[#141217]/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl shadow-2xl p-3 z-50 animate-reveal-up text-white">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2C2335] mb-2 text-[10px] font-mono text-gray-400">
                    <span>LIVE RESULTS</span>
                    <span className="text-[#D4AF37]">{searchResults.length} matches</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 admin-scrollbar">
                    {searchResults.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4">No garments match "{searchQuery}"</p>
                    ) : (
                      searchResults.map((item) => (
                        <div
                          key={item._id || item.id}
                          onClick={() => {
                            if (onSelectProduct) onSelectProduct(item);
                            setIsSearchExpanded(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#251E2E] cursor-pointer transition-colors"
                        >
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200'}
                            alt=""
                            className="w-10 h-12 rounded-lg object-cover border border-[#3E324B]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                            <p className="text-[10px] text-[#D4AF37] font-mono">${item.price} • {item.categoryLabel || item.category}</p>
                          </div>
                          <span className="text-xs text-[#B76E79]">→</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. WISHLIST ICON WITH BADGE */}
            <button 
              onClick={onOpenWishlist}
              className={`relative p-2 transition-colors rounded-full ${
                isScrolled ? 'hover:text-[#B76E79] text-gray-700' : 'hover:text-[#E6B8BF] text-white'
              }`}
              title="Your Wishlist"
            >
              <HeartIcon className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 w-3.5 h-3.5 bg-[#B76E79] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* 3. SHOPPING CART ICON WITH BADGE */}
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

      {/* ======================================================== */}
      {/* MOBILE SLIDE-OVER MENU                                  */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[#141217] text-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto p-6 border-r border-[#2C2434]">
            <div>
              {/* Drawer Header with Logo */}
              <div className="flex items-center justify-between pb-6 border-b border-[#2C2434]">
                <div 
                  onClick={handleLogoClick}
                  className="flex items-center gap-3 cursor-pointer"
                >
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

              {/* Mobile Navigation Links */}
              <div className="space-y-2 mt-6">
                
                {/* Home */}
                <button
                  onClick={() => handleLinkClick('/')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                    isHomeActive ? 'bg-[#B76E79] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>Home</span>
                  {isHomeActive && <span className="text-[10px]">●</span>}
                </button>

                {/* New Arrivals */}
                <button
                  onClick={() => handleLinkClick('/new-arrivals')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                    isNewArrivalsActive ? 'bg-[#B76E79] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>New Arrivals</span>
                  {isNewArrivalsActive && <span className="text-[10px]">●</span>}
                </button>

                {/* Categories with Accordion */}
                <div>
                  <button
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                      isCategoriesActive ? 'bg-[#B76E79]/20 text-[#E6B8BF] border border-[#B76E79]/40' : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${mobileCategoriesOpen ? 'rotate-180 text-[#B76E79]' : ''}`} />
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="ml-4 pl-3 border-l border-[#332A3D] space-y-1.5 py-2">
                      <button
                        onClick={() => handleLinkClick('/categories', 'stitched')}
                        className="w-full text-left py-1.5 text-xs text-gray-300 hover:text-[#E6B8BF]"
                      >
                        • Stitched Pret
                      </button>
                      <button
                        onClick={() => handleLinkClick('/categories', 'unstitched')}
                        className="w-full text-left py-1.5 text-xs text-gray-300 hover:text-[#E6B8BF]"
                      >
                        • Unstitched Fabric
                      </button>
                      <button
                        onClick={() => handleLinkClick('/categories', 'babies')}
                        className="w-full text-left py-1.5 text-xs text-gray-300 hover:text-[#E6B8BF]"
                      >
                        • Babies Couture
                      </button>
                      <button
                        onClick={() => handleLinkClick('/categories')}
                        className="w-full text-left py-1.5 text-xs text-[#D4AF37]"
                      >
                        • All Collections →
                      </button>
                    </div>
                  )}
                </div>

                {/* Sales */}
                <button
                  onClick={() => handleLinkClick('/sales')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                    isSalesActive ? 'bg-[#B76E79] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>Sales</span>
                  {isSalesActive && <span className="text-[10px]">●</span>}
                </button>

                {/* About */}
                <button
                  onClick={() => handleLinkClick('/about')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                    isAboutActive ? 'bg-[#B76E79] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>About</span>
                  {isAboutActive && <span className="text-[10px]">●</span>}
                </button>

                {/* Contact */}
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-between transition-colors ${
                    isContactActive ? 'bg-[#B76E79] text-white' : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>Contact</span>
                  {isContactActive && <span className="text-[10px]">●</span>}
                </button>

              </div>
            </div>

            <div className="pt-6 border-t border-[#2C2434] text-xs text-gray-400 space-y-1">
              <p className="font-semibold text-white">Laila Shamsi Atelier</p>
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
