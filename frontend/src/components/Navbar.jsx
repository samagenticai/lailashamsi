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

  const dropdownItems = [
    {
      id: 'unstitched',
      title: 'Unstitched Suits',
      subtitle: 'Embroidered lawn suits, raw silks & chiffons'
    },
    {
      id: 'ready-to-wear',
      title: 'Ready to Wear',
      subtitle: 'Tailored shalwar kameez & Eastern essentials'
    },
    {
      id: 'stitched',
      title: 'Luxury Pret',
      subtitle: 'Handcrafted embroidered dresses & silk outfits'
    },
    {
      id: 'luxury-formals',
      title: 'Festive & Formal Wear',
      subtitle: 'Traditional zardozi, tilla & formal ensembles'
    },
    {
      id: 'festive-26',
      title: 'Eid Collection',
      subtitle: 'Timeless festive attire for cherished occasions'
    }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
      {/* Top Announcement Bar */}
      <div className="bg-[#641E32] text-[#FAF5EC] text-[11px] sm:text-xs tracking-[0.18em] uppercase py-2 px-4 text-center font-medium border-b border-[#B89B62]/30">
        Discover Timeless Pakistani Elegance
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#FAF5EC]/95 text-[#282321] backdrop-blur-md shadow-md py-3 border-b border-[#E8DCCB]' 
          : 'bg-[#282321]/55 text-[#FAF5EC] backdrop-blur-md py-3.5 sm:py-4 border-b border-[#FAF5EC]/15'
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
                className="p-1.5 transition-colors hover:text-[#B89B62]"
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
                className={`transition-all duration-300 rounded-xl object-contain border border-[#B89B62]/60 group-hover:scale-105 group-hover:border-[#B89B62] ${
                  isScrolled 
                    ? 'h-10 w-10 sm:h-11 sm:w-11 shadow-sm' 
                    : 'h-11 w-11 sm:h-12 sm:w-12 shadow-[0_0_15px_rgba(184,155,98,0.25)]'
                }`}
              />
              <div className="flex flex-col text-left">
                <span className={`font-cinzel text-lg sm:text-xl font-bold tracking-[0.16em] uppercase transition-colors leading-tight ${
                  isScrolled ? 'text-[#641E32] group-hover:text-[#164B3C]' : 'text-[#FAF5EC] group-hover:text-[#E8DCCB]'
                }`}>
                  LAILA SHAMSI
                </span>
                <span className="text-[8px] uppercase tracking-[0.28em] text-[#B89B62] font-semibold mt-0.5">
                  Pakistani Eastern Wear
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER: NAVIGATION LINKS WITH LUXURY DROPDOWN           */}
          {/* ======================================================== */}
          <div className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.16em] font-medium">
            
            {/* 1. HOME */}
            <button
              onClick={() => handleLinkClick('/')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isHomeActive 
                  ? (isScrolled ? 'text-[#164B3C] font-semibold' : 'text-[#B89B62] font-semibold')
                  : (isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]')
              }`}
            >
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#164B3C] transform origin-left transition-transform duration-300 ${
                isHomeActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 2. NEW ARRIVALS */}
            <button
              onClick={() => handleLinkClick('/new-arrivals')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isNewArrivalsActive 
                  ? (isScrolled ? 'text-[#164B3C] font-semibold' : 'text-[#B89B62] font-semibold')
                  : (isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]')
              }`}
            >
              <span>New Arrivals</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#164B3C] transform origin-left transition-transform duration-300 ${
                isNewArrivalsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 3. CATEGORIES WITH DROPDOWN */}
            <div 
              className="relative group py-1.5"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => handleLinkClick('/categories')}
                className={`flex items-center gap-1 transition-colors duration-300 ${
                  isCategoriesActive 
                    ? (isScrolled ? 'text-[#164B3C] font-semibold' : 'text-[#B89B62] font-semibold')
                    : (isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]')
                }`}
              >
                <span>Categories</span>
                <ChevronDownIcon className={`w-3 h-3 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180 text-[#B89B62]' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#164B3C] transform origin-left transition-transform duration-300 ${
                  isCategoriesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {/* Warm Ivory & Deep Maroon Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                  <div className="w-80 bg-[#FAF5EC] text-[#282321] border border-[#E8DCCB] border-t-2 border-t-[#641E32] rounded-2xl shadow-[0_20px_50px_rgba(40,35,33,0.18)] p-3.5 animate-reveal-up normal-case tracking-normal">
                    <div className="px-3 py-2 border-b border-[#E8DCCB] flex items-center justify-between mb-1.5">
                      <span className="font-cinzel text-sm font-bold text-[#641E32]">
                        Discover Our Collections
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#164B3C] font-semibold bg-[#164B3C]/10 px-2 py-0.5 rounded-full">
                        5 Edits
                      </span>
                    </div>

                    <div className="space-y-1">
                      {dropdownItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleLinkClick('/categories', item.id)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#E8DCCB]/50 transition-all flex items-center justify-between group/item"
                        >
                          <div>
                            <p className="font-cinzel text-sm font-semibold text-[#641E32] group-hover/item:text-[#164B3C] transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-[#282321]/75 mt-0.5 leading-snug">
                              {item.subtitle}
                            </p>
                          </div>
                          <span className="text-xs text-[#B89B62] group-hover/item:text-[#641E32] transform transition-transform group-hover/item:translate-x-1 font-bold pl-2">
                            →
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2.5 mt-2 border-t border-[#E8DCCB]">
                      <button
                        onClick={() => handleLinkClick('/categories')}
                        className="w-full text-center py-2.5 px-4 bg-[#641E32] hover:bg-[#164B3C] text-[#FAF5EC] rounded-xl text-xs font-medium uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>Shop the Collection</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. SALES */}
            <button
              onClick={() => handleLinkClick('/sales')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isSalesActive 
                  ? (isScrolled ? 'text-[#164B3C] font-semibold' : 'text-[#B89B62] font-semibold')
                  : (isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]')
              }`}
            >
              <span>Sales</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#164B3C] transform origin-left transition-transform duration-300 ${
                isSalesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 5. ABOUT */}
            <button
              onClick={() => handleLinkClick('/about')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isAboutActive 
                  ? (isScrolled ? 'text-[#164B3C] font-semibold' : 'text-[#B89B62] font-semibold')
                  : (isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]')
              }`}
            >
              <span>About</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#164B3C] transform origin-left transition-transform duration-300 ${
                isAboutActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

            {/* 6. CONTACT */}
            <button
              onClick={() => handleLinkClick('/contact')}
              className={`relative py-1.5 transition-colors duration-300 group ${
                isContactActive 
                  ? (isScrolled ? 'text-[#164B3C] font-semibold' : 'text-[#B89B62] font-semibold')
                  : (isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]')
              }`}
            >
              <span>Contact</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#164B3C] transform origin-left transition-transform duration-300 ${
                isContactActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>

          </div>

          {/* ======================================================== */}
          {/* RIGHT: INLINE SEARCH + WISHLIST + SHOPPING CART         */}
          {/* ======================================================== */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* 1. INLINE EXPANDABLE SEARCH */}
            <div ref={searchContainerRef} className="relative flex items-center">
              {isSearchExpanded ? (
                <div className="flex items-center bg-[#FAF5EC] border border-[#B89B62] rounded-full pl-3.5 pr-2 py-1.5 shadow-lg animate-reveal-up w-56 sm:w-72 md:w-80 transition-all">
                  <SearchIcon className="w-3.5 h-3.5 text-[#641E32] flex-shrink-0 mr-2" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search lawn suits, pret, formals..."
                    className="w-full bg-transparent text-xs text-[#282321] placeholder-[#282321]/50 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-[#282321]/60 hover:text-[#641E32] text-xs px-1"
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
                    className="p-1 rounded-full text-[#282321]/60 hover:text-[#641E32] hover:bg-[#E8DCCB]/40 transition-colors ml-1"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className={`p-2 transition-colors rounded-full ${
                    isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]'
                  }`}
                  title="Search Collection"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              )}

              {/* Floating Instant Search Results Dropdown */}
              {isSearchExpanded && searchQuery.trim().length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-88 bg-[#FAF5EC] border border-[#E8DCCB] rounded-2xl shadow-2xl p-3 z-50 animate-reveal-up text-[#282321]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCB] mb-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-[#282321]/70">
                    <span>Search Results</span>
                    <span className="text-[#164B3C]">{searchResults.length} matches</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {searchResults.length === 0 ? (
                      <p className="text-xs text-[#282321]/60 text-center py-4">No outfits match "{searchQuery}"</p>
                    ) : (
                      searchResults.map((item) => (
                        <div
                          key={item._id || item.id}
                          onClick={() => {
                            if (onSelectProduct) onSelectProduct(item);
                            setIsSearchExpanded(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#E8DCCB]/50 cursor-pointer transition-colors"
                        >
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200'}
                            alt=""
                            className="w-10 h-12 rounded-lg object-cover border border-[#E8DCCB]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-cinzel text-xs font-semibold text-[#641E32] truncate">{item.title}</p>
                            <p className="text-[11px] font-medium text-[#282321]/75 mt-0.5">${item.price} • {item.categoryLabel || item.category}</p>
                          </div>
                          <span className="text-xs text-[#B89B62]">→</span>
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
                isScrolled ? 'hover:text-[#641E32] text-[#282321]' : 'hover:text-[#E8DCCB] text-[#FAF5EC]'
              }`}
              title="Your Wishlist"
            >
              <HeartIcon className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#641E32] text-[#FAF5EC] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* 3. SHOPPING CART ICON WITH BADGE */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full transition-all group flex items-center gap-1.5 bg-[#641E32] text-[#FAF5EC] hover:bg-[#164B3C]"
              title="Shopping Cart"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              <span className="w-4 h-4 bg-[#B89B62] text-[#282321] text-[10px] font-bold rounded-full flex items-center justify-center">
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
            className="fixed inset-0 bg-[#282321]/70 backdrop-blur-sm transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[#FAF5EC] text-[#282321] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto p-6 border-r border-[#E8DCCB]">
            <div>
              {/* Drawer Header with Logo */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DCCB]">
                <div 
                  onClick={handleLogoClick}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img 
                    src="/Logo.jpeg" 
                    alt="Laila Shamsi Logo" 
                    className="h-11 w-11 rounded-xl object-contain border border-[#B89B62]/60 shadow-sm"
                  />
                  <div>
                    <h3 className="font-cinzel text-lg font-bold tracking-wider text-[#641E32]">LAILA SHAMSI</h3>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#B89B62]">Pakistani Eastern Wear</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#282321]/60 hover:text-[#641E32] rounded-full"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 mt-6">
                
                {/* Home */}
                <button
                  onClick={() => handleLinkClick('/')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                    isHomeActive ? 'bg-[#164B3C] text-[#FAF5EC]' : 'text-[#282321] hover:bg-[#E8DCCB]/50'
                  }`}
                >
                  <span>Home</span>
                  {isHomeActive && <span className="text-[10px]">●</span>}
                </button>

                {/* New Arrivals */}
                <button
                  onClick={() => handleLinkClick('/new-arrivals')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                    isNewArrivalsActive ? 'bg-[#164B3C] text-[#FAF5EC]' : 'text-[#282321] hover:bg-[#E8DCCB]/50'
                  }`}
                >
                  <span>New Arrivals</span>
                  {isNewArrivalsActive && <span className="text-[10px]">●</span>}
                </button>

                {/* Categories with Accordion */}
                <div>
                  <button
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                      isCategoriesActive ? 'bg-[#164B3C] text-[#FAF5EC]' : 'text-[#282321] hover:bg-[#E8DCCB]/50'
                    }`}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${mobileCategoriesOpen ? 'rotate-180 text-[#B89B62]' : ''}`} />
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="ml-4 pl-3 border-l border-[#E8DCCB] space-y-1.5 py-2">
                      {dropdownItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleLinkClick('/categories', item.id)}
                          className="w-full text-left py-1.5 px-2 rounded-lg text-xs text-[#282321] hover:bg-[#E8DCCB]/50 hover:text-[#641E32] font-medium block"
                        >
                          • {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sales */}
                <button
                  onClick={() => handleLinkClick('/sales')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                    isSalesActive ? 'bg-[#164B3C] text-[#FAF5EC]' : 'text-[#282321] hover:bg-[#E8DCCB]/50'
                  }`}
                >
                  <span>Sales</span>
                  {isSalesActive && <span className="text-[10px]">●</span>}
                </button>

                {/* About */}
                <button
                  onClick={() => handleLinkClick('/about')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                    isAboutActive ? 'bg-[#164B3C] text-[#FAF5EC]' : 'text-[#282321] hover:bg-[#E8DCCB]/50'
                  }`}
                >
                  <span>About</span>
                  {isAboutActive && <span className="text-[10px]">●</span>}
                </button>

                {/* Contact */}
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-between transition-colors ${
                    isContactActive ? 'bg-[#164B3C] text-[#FAF5EC]' : 'text-[#282321] hover:bg-[#E8DCCB]/50'
                  }`}
                >
                  <span>Contact</span>
                  {isContactActive && <span className="text-[10px]">●</span>}
                </button>

              </div>
            </div>

            <div className="pt-6 border-t border-[#E8DCCB] text-xs text-[#282321]/75 space-y-1">
              <p className="font-cinzel font-semibold text-[#641E32]">Laila Shamsi</p>
              <p className="text-[11px]">
                Celebrating Pakistani Fashion, One Beautiful Detail at a Time.
              </p>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
