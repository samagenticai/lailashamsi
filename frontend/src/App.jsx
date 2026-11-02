import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Categories from './components/Categories';
import ProductSection from './components/ProductSection';
import LookbookBanner from './components/LookbookBanner';
import ReviewsSection from './components/ReviewsSection';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

import CategoriesPage from './components/CategoriesPage';
import SalesPage from './components/SalesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import NewArrivalsPage from './components/NewArrivalsPage';
import HomeSalesSection from './components/HomeSalesSection';

import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel';
import FontSwitcher from './components/FontSwitcher';

import { PRODUCTS } from './data/products';
import { SparklesIcon } from './components/Icons';
import { fetchProducts } from './services/api';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // -----------------------------------------------------------
  // URL ROUTING & NAVIGATION (Supports /, /new-arrivals, /categories, /sales, /about, /contact)
  // -----------------------------------------------------------
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/new-arrivals' || path === '/newarrivals') return '/new-arrivals';
    if (path === '/categories') return '/categories';
    if (path === '/sales' || path === '/sale') return '/sales';
    if (path === '/about') return '/about';
    if (path === '/contact') return '/contact';
    return '/'; // Clean Home root route
  });
  const [currentSubFilter, setCurrentSubFilter] = useState('all');

  const navigateTo = (route, subFilter = null) => {
    setCurrentRoute(route);
    if (subFilter) {
      setCurrentSubFilter(subFilter);
    }
    window.history.pushState({}, '', route);
    
    // Starting fresh from top on home click or smooth scroll on other pages
    if (route === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    if (route === '/new-arrivals') {
      document.title = 'New Arrivals | LAILA SHAMSI Haute Couture';
    } else if (route === '/categories') {
      document.title = 'Categories | LAILA SHAMSI Haute Couture';
    } else if (route === '/sales') {
      document.title = 'Seasonal Archive Sale | LAILA SHAMSI';
    } else if (route === '/about') {
      document.title = 'Atelier Heritage & Craft | LAILA SHAMSI';
    } else if (route === '/contact') {
      document.title = 'Private Appointments & Contact | LAILA SHAMSI';
    } else {
      document.title = 'LAILA SHAMSI | Luxury Pret & Couture For Women';
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/new-arrivals' || path === '/newarrivals') setCurrentRoute('/new-arrivals');
      else if (path === '/categories') setCurrentRoute('/categories');
      else if (path === '/sales' || path === '/sale') setCurrentRoute('/sales');
      else if (path === '/about') setCurrentRoute('/about');
      else if (path === '/contact') setCurrentRoute('/contact');
      else setCurrentRoute('/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Load dynamic catalog from MongoDB backend
  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      if (res && res.products && res.products.length > 0) {
        setProducts(res.products);
      }
    } catch (err) {
      console.warn('Using fallback catalog data:', err.message);
    }
  };

  useEffect(() => {
    // 1. Force browser not to restore previous scroll position (prevents jumping to footer)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Clear any lingering hash on initial mount
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 3. Immediately scroll to the top of the storefront (Hero section)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 4. Double-check after DOM hydration
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);

    loadProducts();

    return () => clearTimeout(timer);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };
  
  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      selectedSize: 'S',
      selectedColor: PRODUCTS[0].colors[0],
      quantity: 1,
      convertedPrice: PRODUCTS[0].price
    }
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState([2]);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Add to Cart handler
  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.selectedSize === newItem.selectedSize && 
          item.selectedColor?.name === newItem.selectedColor?.name
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      } else {
        return [...prevItems, newItem];
      }
    });

    showToast(`Added "${newItem.title}" (${newItem.selectedSize}) to Bag!`);
  };

  // Update quantity in Cart
  const handleUpdateQuantity = (targetItem, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) => 
      prev.map((item) => {
        if (
          item.id === targetItem.id && 
          item.selectedSize === targetItem.selectedSize && 
          item.selectedColor?.name === targetItem.selectedColor?.name
        ) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove item from Cart
  const handleRemoveFromCart = (targetItem) => {
    setCartItems((prev) => 
      prev.filter((item) => !(
        item.id === targetItem.id && 
        item.selectedSize === targetItem.selectedSize && 
        item.selectedColor?.name === targetItem.selectedColor?.name
      ))
    );
    showToast(`Removed from Bag`);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A1A] font-body selection:bg-[#B76E79] selection:text-white">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1A1A1A] text-white shadow-2xl border border-[#B76E79]/50 animate-reveal-up text-xs font-semibold tracking-wide">
          <SparklesIcon className="w-4 h-4 text-[#B76E79]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Floating Glassmorphic Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <main className="flex-1">
        {/* VIEW 1: HOME STOREFRONT */}
        {currentRoute === '/' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('collection');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onLookbookClick={() => navigateTo('/about')}
            />

            {/* 2. Categories Section (Directly under Hero) */}
            <Categories
              activeCategory={activeCategory}
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                setSearchQuery('');
                navigateTo('/categories', catId);
              }}
              onExploreAll={() => navigateTo('/categories')}
            />

            {/* 3. New Arrivals Collection Section */}
            <ProductSection
              products={products}
              activeCategory={activeCategory}
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                setSearchQuery('');
              }}
              onQuickView={(product) => setQuickViewProduct(product)}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              selectedCurrency={selectedCurrency}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />

            {/* 4. Sales Section with Garment Cards & Explore All Sales Button */}
            <HomeSalesSection
              products={products}
              onQuickView={(product) => setQuickViewProduct(product)}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              selectedCurrency={selectedCurrency}
              onExploreAll={() => navigateTo('/sales')}
            />

            {/* 5. Editorial Lookbook Banner */}
            <LookbookBanner
              onShopLook={() => {
                if (products.length > 0) setQuickViewProduct(products[0]);
              }}
            />

            {/* 6. Brand Heritage Value Props */}
            <ValueProps />

            {/* 7. Client Reviews */}
            <ReviewsSection />

            {/* 8. Instagram Community */}
            <InstagramFeed />
          </>
        )}

        {/* VIEW 2: DEDICATED NEW ARRIVALS */}
        {currentRoute === '/new-arrivals' && (
          <NewArrivalsPage
            products={products}
            onQuickView={(product) => setQuickViewProduct(product)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            selectedCurrency={selectedCurrency}
          />
        )}

        {/* VIEW 2: CATEGORIES */}
        {currentRoute === '/categories' && (
          <CategoriesPage
            products={products}
            subFilter={currentSubFilter}
            onQuickView={(product) => setQuickViewProduct(product)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            selectedCurrency={selectedCurrency}
          />
        )}

        {/* VIEW 3: SALES */}
        {currentRoute === '/sales' && (
          <SalesPage
            products={products}
            onQuickView={(product) => setQuickViewProduct(product)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            selectedCurrency={selectedCurrency}
          />
        )}

        {/* VIEW 4: ABOUT */}
        {currentRoute === '/about' && (
          <AboutPage
            onExploreCollection={() => navigateTo('/')}
          />
        )}

        {/* VIEW 5: CONTACT */}
        {currentRoute === '/contact' && (
          <ContactPage
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Minimalist Dark Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={navigateTo}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchQuery('');
          navigateTo('/categories', catId);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        selectedCurrency={selectedCurrency}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={(data) => {
          setIsCartOpen(false);
          setCheckoutData(data);
        }}
        selectedCurrency={selectedCurrency}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        selectedCurrency={selectedCurrency}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={Boolean(checkoutData)}
        onClose={() => setCheckoutData(null)}
        checkoutData={checkoutData}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
        selectedCurrency={selectedCurrency}
      />

      {/* Executive Atelier Admin Portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        onProductsUpdated={loadProducts}
      />

      {/* Floating Luxury Typography Customizer */}
      <FontSwitcher />

    </div>
  );
}
