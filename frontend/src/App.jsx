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

import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import SearchModal from './components/SearchModal';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel';

import { PRODUCTS } from './data/products';
import { SparklesIcon } from './components/Icons';
import { fetchProducts } from './services/api';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
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
    loadProducts();
  }, []);
  
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
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchQuery('');
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedCurrency={selectedCurrency}
        onChangeCurrency={setSelectedCurrency}
      />

      <main className="flex-1">
        {/* Full-Screen Cinematic Slow-Zoom Hero */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onLookbookClick={() => {
            const el = document.getElementById('philosophy');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Minimalist Luxury Value Props */}
        <ValueProps />

        {/* Signature Categories */}
        <Categories
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            setSearchQuery('');
          }}
        />

        {/* Asymmetrical Modern Masonry Grid */}
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

        {/* Split Screen Brand Story & Philosophy */}
        <LookbookBanner
          onShopLook={() => {
            if (products.length > 0) setQuickViewProduct(products[0]);
          }}
        />

        {/* Customer Reviews & International Press */}
        <ReviewsSection />

        {/* Instagram Lookbook Community */}
        <InstagramFeed />
      </main>

      {/* Minimalist Dark Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchQuery('');
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        onApplySearchQuery={(q) => {
          setSearchQuery(q);
          const el = document.getElementById('collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
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
        onClose={() => setIsAdminOpen(false)}
        onProductsUpdated={loadProducts}
      />

    </div>
  );
}
