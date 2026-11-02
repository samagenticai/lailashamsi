import React, { useState, useEffect, useMemo } from 'react';
import { 
  CloseIcon, 
  CheckIcon, 
  SparklesIcon, 
  TrashIcon, 
  ChevronRightIcon,
  SearchIcon,
  PlusIcon,
  RefreshCwIcon,
  LockIcon,
  UserIcon,
  DashboardIcon,
  PackageIcon,
  ReceiptIcon,
  LogOutIcon,
  ExternalLinkIcon,
  TrendingUpIcon,
  EditIcon,
  CopyIcon,
  MenuIcon
} from './Icons';
import {
  checkAdminSetup,
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAdminStats,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
  uploadImageFile,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
} from '../services/api';

const DEFAULT_CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'luxury-formals', label: 'Festive Formals' },
  { id: 'ready-to-wear', label: 'Ready To Wear' },
  { id: 'silk-coords', label: 'Silk & Co-ords' },
  { id: 'festive-26', label: "Summer Festive '26" }
];

export default function AdminPanel({ isOpen, onClose, onProductsUpdated }) {
  if (!isOpen) return null;

  // View state: 'loading' | 'register' | 'login' | 'dashboard'
  const [view, setView] = useState('loading');
  
  // Navigation Tab: 'overview' | 'products' | 'orders' | 'database'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mobile sidebar toggle
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Catalog View Mode: 'grid' | 'table'
  const [catalogViewMode, setCatalogViewMode] = useState('grid');
  
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('ls_admin_token') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Forms for Auth
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Dashboard Data
  const [stats, setStats] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [seedingLoading, setSeedingLoading] = useState(false);

  // Filters & Search
  const [globalSearch, setGlobalSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Product Modal (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'luxury-formals',
    categoryLabel: 'Festive Formals',
    price: '',
    originalPrice: '',
    fabric: 'Pure Chiffon & Handcrafted Organza',
    pieces: '3 Piece (Shirt, Slip & Dupatta)',
    tag: 'Bestseller',
    description: '',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Blush Rose', hex: '#F2C6CE' }],
    images: ['']
  });
  const [productFormError, setProductFormError] = useState('');
  const [productSaving, setProductSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Order Details Modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Toast feedback
  const [panelToast, setPanelToast] = useState('');
  const showToast = (msg) => {
    setPanelToast(msg);
    setTimeout(() => setPanelToast(''), 3200);
  };

  // Copy helper
  const handleCopyText = (text, label = 'Copied') => {
    navigator.clipboard.writeText(text);
    showToast(`${label} to clipboard!`);
  };

  // 1. Initial Authentication Check & Lock Body Scroll to kill outer scrollbar
  useEffect(() => {
    initAuth();

    // Prevent body/html from scrolling so there is NO second scrollbar or white track
    document.documentElement.classList.add('admin-modal-open');
    document.body.classList.add('admin-modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.classList.remove('admin-modal-open');
      document.body.classList.remove('admin-modal-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      // AUTOMATIC LOGOUT: Wipe token when user leaves the dashboard
      localStorage.removeItem('ls_admin_token');
    };
  }, []);

  const initAuth = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const savedToken = localStorage.getItem('ls_admin_token');
      if (savedToken) {
        try {
          const profileRes = await getAdminProfile(savedToken);
          if (profileRes.success && profileRes.admin) {
            setToken(savedToken);
            setAdminUser(profileRes.admin);
            setView('dashboard');
            loadDashboardData(savedToken);
            setAuthLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem('ls_admin_token');
          setToken('');
        }
      }

      // Check setup status if no active token
      const setupRes = await checkAdminSetup();
      if (setupRes.hasAdmin) {
        setView('login');
      } else {
        setView('register');
      }
    } catch (err) {
      console.error('Setup check failed', err);
      setView('login');
    } finally {
      setAuthLoading(false);
    }
  };

  // Load Dashboard Data (Stats, Products, Orders)
  const loadDashboardData = async (activeAuthToken = token) => {
    if (!activeAuthToken) return;
    setDataLoading(true);
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        getAdminStats(activeAuthToken).catch(() => ({ stats: null })),
        fetchProducts().catch(() => ({ products: [] })),
        fetchOrders(activeAuthToken).catch(() => ({ orders: [] }))
      ]);

      if (statsRes && statsRes.stats) setStats(statsRes.stats);
      if (productsRes && productsRes.products) setProductsList(productsRes.products);
      if (ordersRes && ordersRes.orders) setOrdersList(ordersRes.orders);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setDataLoading(false);
    }
  };

  // -----------------------------------------------------------
  // AUTH HANDLERS
  // -----------------------------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    if (registerForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await registerAdmin({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password
      });

      if (res.success && res.token) {
        localStorage.setItem('ls_admin_token', res.token);
        setToken(res.token);
        setAdminUser(res.admin);
        setView('dashboard');
        showToast('Master Admin Account successfully created!');
        loadDashboardData(res.token);
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await loginAdmin({
        email: loginForm.email,
        password: loginForm.password
      });

      if (res.success && res.token) {
        localStorage.setItem('ls_admin_token', res.token);
        setToken(res.token);
        setAdminUser(res.admin);
        setView('dashboard');
        showToast('Welcome back, ' + res.admin.name);
        loadDashboardData(res.token);
      }
    } catch (err) {
      setAuthError(err.message || 'Invalid email or password.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ls_admin_token');
    setToken('');
    setAdminUser(null);
    setView('login');
    showToast('Signed out from Executive Console.');
  };

  const handleExitAndLogout = () => {
    localStorage.removeItem('ls_admin_token');
    setToken('');
    setAdminUser(null);
    setView('login');
    onClose();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // -----------------------------------------------------------
  // PRODUCT HANDLERS
  // -----------------------------------------------------------
  const openNewProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      category: 'luxury-formals',
      categoryLabel: 'Festive Formals',
      price: '',
      originalPrice: '',
      fabric: 'Pure Chiffon & Handcrafted Organza',
      pieces: '3 Piece (Shirt, Slip & Dupatta)',
      tag: 'New Season',
      description: '',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Blush Rose', hex: '#F2C6CE' }],
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop']
    });
    setProductFormError('');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product) => {
    setEditingProductId(product._id || product.id);
    setProductForm({
      title: product.title || '',
      category: product.category || 'luxury-formals',
      categoryLabel: product.categoryLabel || 'Festive Formals',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      fabric: product.fabric || '',
      pieces: product.pieces || '3 Piece',
      tag: product.tag || '',
      description: product.description || '',
      sizes: product.sizes && product.sizes.length ? product.sizes : ['XS', 'S', 'M', 'L', 'XL'],
      colors: product.colors && product.colors.length ? product.colors : [{ name: 'Standard Gold', hex: '#D4AF37' }],
      images: product.images && product.images.length ? product.images : ['']
    });
    setProductFormError('');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setProductFormError('');

    if (!productForm.title || !productForm.price) {
      setProductFormError('Please enter product title and price.');
      return;
    }

    setProductSaving(true);
    try {
      const cleanedImages = productForm.images.filter(img => img && img.trim() !== '');
      if (cleanedImages.length === 0) {
        cleanedImages.push('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop');
      }

      const payload = {
        ...productForm,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
        images: cleanedImages
      };

      if (editingProductId) {
        await updateProduct(editingProductId, payload, token);
        showToast('Product updated successfully!');
      } else {
        await createProduct(payload, token);
        showToast('New product added to catalog!');
      }

      setIsProductModalOpen(false);
      loadDashboardData(token);
      if (onProductsUpdated) onProductsUpdated();
    } catch (err) {
      setProductFormError(err.message || 'Failed to save product.');
    } finally {
      setProductSaving(false);
    }
  };

  const handleDeleteProduct = async (productId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteProduct(productId, token);
      showToast(`Product "${title}" removed.`);
      loadDashboardData(token);
      if (onProductsUpdated) onProductsUpdated();
    } catch (err) {
      alert(err.message || 'Failed to delete product.');
    }
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadImageFile(file, token);
      if (res.imageUrl) {
        setProductForm(prev => ({
          ...prev,
          images: [res.imageUrl, ...prev.images.filter(x => x)]
        }));
        showToast('Image uploaded successfully!');
      }
    } catch (err) {
      alert('Upload failed: ' + (err.message || 'Server error'));
    } finally {
      setUploadingImage(false);
    }
  };

  // -----------------------------------------------------------
  // ORDER HANDLERS
  // -----------------------------------------------------------
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      showToast(`Order status updated to ${newStatus}`);
      loadDashboardData(token);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDeleteOrder = async (orderId, orderNum) => {
    if (!window.confirm(`Are you sure you want to delete order ${orderNum}?`)) return;
    try {
      await deleteOrder(orderId, token);
      showToast(`Order ${orderNum} deleted.`);
      loadDashboardData(token);
    } catch (err) {
      alert('Failed to delete order: ' + err.message);
    }
  };

  // Seed DB handler
  const handleSeedProducts = async (force = false) => {
    if (force && !window.confirm('Reset catalog to 8 original signature dresses? This will replace modified items.')) {
      return;
    }
    setSeedingLoading(true);
    try {
      const res = await seedProducts(token, force);
      showToast(res.message || 'Database seeded successfully!');
      loadDashboardData(token);
      if (onProductsUpdated) onProductsUpdated();
    } catch (err) {
      alert(err.message || 'Seeding failed');
    } finally {
      setSeedingLoading(false);
    }
  };

  // -----------------------------------------------------------
  // FILTERED DATA
  // -----------------------------------------------------------
  const filteredProducts = useMemo(() => {
    return productsList.filter(prod => {
      const matchesCategory = productCategoryFilter === 'all' || prod.category === productCategoryFilter;
      const q = globalSearch.toLowerCase().trim();
      const matchesSearch = !q || 
        prod.title?.toLowerCase().includes(q) || 
        prod.fabric?.toLowerCase().includes(q) || 
        prod.categoryLabel?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [productsList, productCategoryFilter, globalSearch]);

  const filteredOrders = useMemo(() => {
    return ordersList.filter(order => {
      const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
      const q = globalSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        order.orderNumber?.toLowerCase().includes(q) ||
        order.customer?.fullName?.toLowerCase().includes(q) ||
        order.customer?.email?.toLowerCase().includes(q) ||
        order.customer?.phone?.includes(q) ||
        order.customer?.city?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [ordersList, orderStatusFilter, globalSearch]);

  // Derived KPI metrics
  const totalRevenue = useMemo(() => {
    return ordersList.reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);
  }, [ordersList]);

  const pendingOrdersCount = useMemo(() => {
    return ordersList.filter(o => o.status === 'Pending').length;
  }, [ordersList]);

  const deliveredOrdersCount = useMemo(() => {
    return ordersList.filter(o => o.status === 'Delivered').length;
  }, [ordersList]);

  const averageOrderValue = useMemo(() => {
    if (ordersList.length === 0) return 0;
    return Math.round(totalRevenue / ordersList.length);
  }, [totalRevenue, ordersList]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#070607] text-[#EDE8E3] flex font-body">
      
      {/* ----------------------------------------------------------- */}
      {/* TOAST FEEDBACK */}
      {/* ----------------------------------------------------------- */}
      {panelToast && (
        <div className="fixed top-5 right-5 z-[70] bg-[#1A181C] text-white px-5 py-3 rounded-2xl border border-[#D4AF37]/80 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-2.5 text-xs font-semibold animate-reveal-up">
          <SparklesIcon className="w-4 h-4 text-[#D4AF37]" />
          <span>{panelToast}</span>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* AUTH SCREENS: REGISTER / LOGIN */}
      {/* ----------------------------------------------------------- */}
      {(view === 'loading' || view === 'register' || view === 'login') && (
        <div className="w-full h-full flex items-center justify-center p-4 bg-radial from-[#1A1115] via-[#0E0B0D] to-[#050405] relative overflow-y-auto">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B76E79]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
            title="Return to Storefront"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* VIEW: LOADING */}
          {view === 'loading' && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs uppercase font-mono tracking-[0.25em] text-gray-400">
                Authenticating Atelier Security...
              </p>
            </div>
          )}

          {/* VIEW: ONE-TIME MASTER ADMIN REGISTRATION */}
          {view === 'register' && (
            <div className="relative w-full max-w-lg bg-[#141216]/95 border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <div className="text-center space-y-2 mb-8">
                <img 
                  src="/Logo.jpeg" 
                  alt="Laila Shamsi" 
                  className="w-14 h-14 rounded-2xl object-contain border border-[#D4AF37]/50 shadow-xl mx-auto"
                />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
                  Master Security Initialization
                </span>
                <h2 className="font-cinzel text-2xl font-bold text-white tracking-wide">
                  Create Master Admin
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Register the permanent administrator for Laila Shamsi Atelier. Once created, registration locks permanently.
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-3.5 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs">
                  {authError}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-gray-300 block mb-1">
                    Administrator Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="e.g. Laila Shamsi"
                    className="w-full bg-[#1C1920] border border-[#332E38] rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-gray-300 block mb-1">
                    Official Admin Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="e.g. admin@lailashamsi.com"
                    className="w-full bg-[#1C1920] border border-[#332E38] rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider text-gray-300 block mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full bg-[#1C1920] border border-[#332E38] rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider text-gray-300 block mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full bg-[#1C1920] border border-[#332E38] rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Initialize Master Admin</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* VIEW: MASTER ADMIN LOGIN */}
          {view === 'login' && (
            <div className="relative w-full max-w-md bg-[#141216]/95 border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <div className="text-center space-y-2 mb-8">
                <img 
                  src="/Logo.jpeg" 
                  alt="Laila Shamsi" 
                  className="w-14 h-14 rounded-2xl object-contain border border-[#D4AF37]/50 shadow-xl mx-auto"
                />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
                  Executive Security
                </span>
                <h2 className="font-cinzel text-2xl font-bold text-white tracking-wide">
                  Atelier Admin Portal
                </h2>
                <p className="text-xs text-gray-400">
                  Enter your credentials to access catalog management and patron orders.
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-3.5 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-gray-300 block mb-1">
                    Admin Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="e.g. admin@lailashamsi.com"
                    className="w-full bg-[#1C1920] border border-[#332E38] rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-gray-300 block mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Enter admin password"
                    className="w-full bg-[#1C1920] border border-[#332E38] rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Sign In to Atelier</span>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* VIEW: MAIN EXECUTIVE DASHBOARD WITH SIDEBAR */}
      {/* ----------------------------------------------------------- */}
      {view === 'dashboard' && (
        <div className="w-full h-full flex overflow-hidden">
          
          {/* Mobile Overlay */}
          {mobileSidebarOpen && (
            <div 
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
            />
          )}

          {/* --------------------------------------------------------- */}
          {/* 1. PROFESSIONAL LUXURY SIDEBAR */}
          {/* --------------------------------------------------------- */}
          <aside className={`
            fixed md:relative inset-y-0 left-0 z-50 w-64 bg-[#0E0C0F] border-r border-[#241F28] flex flex-col justify-between transition-transform duration-300 shadow-2xl
            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            
            {/* Top Brand Header */}
            <div>
              <div className="p-5 border-b border-[#241F28] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src="/Logo.jpeg" 
                    alt="LS" 
                    className="w-9 h-9 rounded-xl object-contain border border-[#D4AF37]/50 shadow-md"
                  />
                  <div>
                    <h1 className="font-cinzel text-sm font-bold text-white tracking-wider leading-none">
                      LAILA SHAMSI
                    </h1>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Admin Portal</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg md:hidden"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items (Clean & Essential Only) */}
              <nav className="p-3 space-y-1">
                {/* 1. Dashboard */}
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#8E4453] text-white shadow-md shadow-[#B76E79]/20'
                      : 'text-gray-400 hover:text-white hover:bg-[#1A161E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <DashboardIcon className={`w-4 h-4 ${activeTab === 'overview' ? 'text-white' : 'text-[#B76E79]'}`} />
                    <span>Dashboard</span>
                  </div>
                  <ChevronRightIcon className={`w-3.5 h-3.5 opacity-60 transition-transform ${activeTab === 'overview' ? 'translate-x-1' : ''}`} />
                </button>

                {/* 2. Products */}
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#8E4453] text-white shadow-md shadow-[#B76E79]/20'
                      : 'text-gray-400 hover:text-white hover:bg-[#1A161E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <PackageIcon className={`w-4 h-4 ${activeTab === 'products' ? 'text-white' : 'text-[#B76E79]'}`} />
                    <span>Products</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-[#221C26] text-gray-400'
                  }`}>
                    {productsList.length}
                  </span>
                </button>

                {/* 3. Orders */}
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#8E4453] text-white shadow-md shadow-[#B76E79]/20'
                      : 'text-gray-400 hover:text-white hover:bg-[#1A161E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ReceiptIcon className={`w-4 h-4 ${activeTab === 'orders' ? 'text-white' : 'text-[#B76E79]'}`} />
                    <span>Orders</span>
                  </div>
                  {pendingOrdersCount > 0 ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                      {pendingOrdersCount} New
                    </span>
                  ) : (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#221C26] text-gray-400'
                    }`}>
                      {ordersList.length}
                    </span>
                  )}
                </button>

                {/* 4. Database */}
                <button
                  onClick={() => {
                    setActiveTab('database');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'database'
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#8E4453] text-white shadow-md shadow-[#B76E79]/20'
                      : 'text-gray-400 hover:text-white hover:bg-[#1A161E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RefreshCwIcon className={`w-4 h-4 ${activeTab === 'database' ? 'text-white' : 'text-[#B76E79]'}`} />
                    <span>Database</span>
                  </div>
                  <ChevronRightIcon className={`w-3.5 h-3.5 opacity-60 transition-transform ${activeTab === 'database' ? 'translate-x-1' : ''}`} />
                </button>
              </nav>
            </div>

            {/* Sidebar Bottom: Admin Profile & Controls */}
            <div className="p-3.5 border-t border-[#241F28] space-y-2.5 bg-[#0B0A0D]">
              {adminUser && (
                <div className="p-2.5 rounded-xl bg-[#141217] border border-[#26202C] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-xs flex-shrink-0">
                    {adminUser.name?.charAt(0) || 'A'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{adminUser.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono truncate">{adminUser.email}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExitAndLogout}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#1A1620] hover:bg-[#25202D] text-gray-300 hover:text-white text-[11px] font-semibold transition-colors border border-[#2D2635]"
                  title="Return to Storefront & Log out"
                >
                  <ExternalLinkIcon className="w-3.5 h-3.5 text-[#B76E79]" />
                  <span>Storefront</span>
                </button>

                <button
                  onClick={handleExitAndLogout}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 hover:text-white text-[11px] font-semibold transition-colors border border-rose-900/30"
                  title="Sign Out & Exit"
                >
                  <LogOutIcon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

          </aside>

          {/* --------------------------------------------------------- */}
          {/* 2. MAIN WORKSPACE / CONTENT AREA */}
          {/* --------------------------------------------------------- */}
          <main className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-[#0F0D12] via-[#09080A] to-[#050507]">
            
            {/* Top Workspace Header Bar */}
            <header className="h-16 px-4 sm:px-8 border-b border-[#201C24] bg-[#0E0C10]/80 backdrop-blur-md flex items-center justify-between gap-4 z-20 flex-shrink-0">
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileSidebarOpen(true)}
                  className="p-2 text-gray-400 hover:text-white rounded-xl bg-[#17141C] md:hidden"
                >
                  <MenuIcon className="w-5 h-5" />
                </button>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 font-mono">Console</span>
                  <span className="text-gray-600">/</span>
                  <span className="font-semibold text-white capitalize tracking-wide">
                    {activeTab === 'overview' && 'Executive Overview'}
                    {activeTab === 'products' && 'Couture Catalog'}
                    {activeTab === 'orders' && 'Client Orders'}
                    {activeTab === 'database' && 'Database & Sync'}
                  </span>
                </div>
              </div>

              {/* Global Search Input */}
              <div className="flex-1 max-w-md hidden sm:block">
                <div className="relative">
                  <SearchIcon className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Search catalog, order number, patron name..."
                    className="w-full bg-[#16131A] border border-[#2B2432] rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-gray-500 focus:border-[#B76E79] focus:outline-none transition-colors"
                  />
                  {globalSearch && (
                    <button 
                      onClick={() => setGlobalSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadDashboardData(token)}
                  disabled={dataLoading}
                  className="p-2 text-gray-400 hover:text-white rounded-full bg-[#18151E] hover:bg-[#25202D] border border-[#292230] transition-colors"
                  title="Reload Live Data"
                >
                  <RefreshCwIcon className={`w-4 h-4 ${dataLoading ? 'animate-spin text-[#B76E79]' : ''}`} />
                </button>
              </div>

            </header>

            {/* Scrollable Main View Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 space-y-8 admin-scrollbar">
              
              {/* ----------------------------------------------------- */}
              {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW */}
              {/* ----------------------------------------------------- */}
              {activeTab === 'overview' && (
                <div className="space-y-8 max-w-7xl mx-auto">
                  
                  {/* Hero Greeting Card */}
                  <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-[#20151C] via-[#161219] to-[#0F0C12] border border-[#B76E79]/30 shadow-2xl">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B76E79]/15 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                            Executive Console Active
                          </span>
                        </div>
                        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                          Welcome, {adminUser?.name || 'Administrator'}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl leading-relaxed">
                          Monitor real-time patron bookings, manage bespoke handcrafted pret collections, and control the Laila Shamsi inventory.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => setActiveTab('orders')}
                          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xl shadow-[#B76E79]/20 flex items-center gap-2"
                        >
                          <ReceiptIcon className="w-4 h-4" />
                          <span>View Orders ({ordersList.length})</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('products')}
                          className="px-5 py-3 rounded-2xl bg-[#1C1722] hover:bg-[#282130] text-gray-200 text-xs font-semibold uppercase tracking-wider transition-all border border-[#332A3B] flex items-center gap-2"
                        >
                          <PackageIcon className="w-4 h-4 text-[#D4AF37]" />
                          <span>Browse Catalog</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4 Luxury KPI Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    
                    {/* Stat 1: Total Gross Revenue */}
                    <div className="bg-[#121015] border border-[#26202C] hover:border-[#B76E79]/50 rounded-3xl p-6 transition-all group shadow-xl">
                      <div className="flex items-center justify-between text-gray-400 mb-3">
                        <span className="text-[11px] uppercase font-mono tracking-wider">Gross Volume</span>
                        <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                          <TrendingUpIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="font-mono text-3xl font-bold text-white tracking-tight">
                        ${totalRevenue.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1F1A24] text-[11px]">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          ● Active
                        </span>
                        <span className="text-gray-500">USD Orders placed</span>
                      </div>
                    </div>

                    {/* Stat 2: Total Orders */}
                    <div className="bg-[#121015] border border-[#26202C] hover:border-[#B76E79]/50 rounded-3xl p-6 transition-all group shadow-xl">
                      <div className="flex items-center justify-between text-gray-400 mb-3">
                        <span className="text-[11px] uppercase font-mono tracking-wider">Client Orders</span>
                        <div className="w-8 h-8 rounded-xl bg-[#B76E79]/15 border border-[#B76E79]/30 flex items-center justify-center text-[#B76E79]">
                          <ReceiptIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="font-mono text-3xl font-bold text-white tracking-tight">
                        {ordersList.length}
                      </p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1F1A24] text-[11px]">
                        <span className="text-amber-400 font-semibold">
                          {pendingOrdersCount} Pending
                        </span>
                        <span className="text-gray-500">• {deliveredOrdersCount} Delivered</span>
                      </div>
                    </div>

                    {/* Stat 3: Total Products in Catalog */}
                    <div className="bg-[#121015] border border-[#26202C] hover:border-[#B76E79]/50 rounded-3xl p-6 transition-all group shadow-xl">
                      <div className="flex items-center justify-between text-gray-400 mb-3">
                        <span className="text-[11px] uppercase font-mono tracking-wider">Couture Ensembles</span>
                        <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                          <PackageIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="font-mono text-3xl font-bold text-white tracking-tight">
                        {productsList.length}
                      </p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1F1A24] text-[11px]">
                        <span className="text-[#E6B8BF] font-semibold">
                          4 Collections
                        </span>
                        <span className="text-gray-500">Live in showcase</span>
                      </div>
                    </div>

                    {/* Stat 4: Average Order Value */}
                    <div className="bg-[#121015] border border-[#26202C] hover:border-[#B76E79]/50 rounded-3xl p-6 transition-all group shadow-xl">
                      <div className="flex items-center justify-between text-gray-400 mb-3">
                        <span className="text-[11px] uppercase font-mono tracking-wider">Average Basket</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <SparklesIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="font-mono text-3xl font-bold text-white tracking-tight">
                        ${averageOrderValue}
                      </p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1F1A24] text-[11px]">
                        <span className="text-emerald-400 font-semibold">
                          High Ticket
                        </span>
                        <span className="text-gray-500">Per patron checkout</span>
                      </div>
                    </div>

                  </div>

                  {/* Order Fulfillment Pipeline Progress Funnel */}
                  <div className="bg-[#121015] border border-[#26202C] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-cinzel text-base font-bold text-white">Order Fulfillment Status</h3>
                        <p className="text-xs text-gray-400">Live booking progression pipeline</p>
                      </div>
                      <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                        Total {ordersList.length} Orders
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="p-4 rounded-2xl bg-[#19151E] border border-amber-500/20 space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">1. Pending</span>
                        <p className="font-mono text-xl font-bold text-white">{ordersList.filter(o => o.status === 'Pending').length}</p>
                        <p className="text-[10px] text-gray-500">Awaiting artisan dispatch</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#19151E] border border-purple-500/20 space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">2. In Process</span>
                        <p className="font-mono text-xl font-bold text-white">{ordersList.filter(o => o.status === 'Processing').length}</p>
                        <p className="text-[10px] text-gray-500">Handcrafted & packed</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#19151E] border border-blue-500/20 space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400">3. Shipped</span>
                        <p className="font-mono text-xl font-bold text-white">{ordersList.filter(o => o.status === 'Shipped').length}</p>
                        <p className="text-[10px] text-gray-500">With luxury courier</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#19151E] border border-emerald-500/20 space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">4. Delivered</span>
                        <p className="font-mono text-xl font-bold text-white">{ordersList.filter(o => o.status === 'Delivered').length}</p>
                        <p className="text-[10px] text-gray-500">Received by patron</p>
                      </div>
                    </div>
                  </div>

                  {/* Two Column Layout: Recent Orders & Catalog Highlights */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Recent Orders Preview (7 Cols) */}
                    <div className="lg:col-span-7 bg-[#121015] border border-[#26202C] rounded-3xl overflow-hidden shadow-xl flex flex-col">
                      <div className="p-6 border-b border-[#201C24] flex items-center justify-between">
                        <div>
                          <h3 className="font-cinzel text-base font-bold text-white">Recent Patron Bookings</h3>
                          <p className="text-xs text-gray-400">Latest online store checkout orders</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('orders')}
                          className="text-xs font-semibold text-[#B76E79] hover:text-[#E6B8BF] transition-colors"
                        >
                          View All ({ordersList.length}) →
                        </button>
                      </div>

                      {ordersList.length === 0 ? (
                        <div className="p-12 text-center text-xs text-gray-500">
                          No client orders recorded in database yet. New purchases from storefront will display here automatically.
                        </div>
                      ) : (
                        <div className="divide-y divide-[#1D1822]">
                          {ordersList.slice(0, 5).map(order => (
                            <div key={order._id || order.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#18141D] transition-colors">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-[#D4AF37]">
                                    {order.orderNumber}
                                  </span>
                                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                                    order.status === 'Delivered' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' :
                                    order.status === 'Shipped' ? 'bg-blue-950/80 text-blue-300 border border-blue-800/40' :
                                    order.status === 'Processing' ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40' :
                                    'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-xs font-medium text-white truncate">
                                  {order.customer?.fullName} • {order.customer?.city || 'Pakistan'}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                  {order.items?.length || 1} item(s) • Total: <strong className="text-white font-mono">${order.grandTotal}</strong>
                                </p>
                              </div>

                              <button
                                onClick={() => setSelectedOrderDetails(order)}
                                className="px-3.5 py-1.5 rounded-xl bg-[#201A26] hover:bg-[#2C2335] text-gray-300 hover:text-white text-xs font-semibold transition-colors flex-shrink-0"
                              >
                                Dossier
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Quick Catalog Showcase (5 Cols) */}
                    <div className="lg:col-span-5 bg-[#121015] border border-[#26202C] rounded-3xl p-6 shadow-xl space-y-6">
                      <div className="flex items-center justify-between border-b border-[#201C24] pb-4">
                        <div>
                          <h3 className="font-cinzel text-base font-bold text-white">Signature Pieces</h3>
                          <p className="text-xs text-gray-400">Recent couture catalog entries</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('products')}
                          className="text-xs font-semibold text-[#B76E79] hover:text-[#E6B8BF]"
                        >
                          All ({productsList.length}) →
                        </button>
                      </div>

                      <div className="space-y-3">
                        {productsList.slice(0, 4).map(product => (
                          <div key={product._id || product.id} className="p-3 rounded-2xl bg-[#17131B] border border-[#231D2A] flex items-center gap-3">
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200'}
                              alt=""
                              className="w-12 h-14 object-cover rounded-xl border border-[#332A3B]"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white truncate">{product.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{product.categoryLabel}</p>
                              <p className="text-xs font-mono font-bold text-[#E6B8BF] mt-0.5">${product.price}</p>
                            </div>
                            <button
                              onClick={() => openEditProductModal(product)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-[#251E2E] rounded-xl transition-colors"
                              title="Edit piece"
                            >
                              <EditIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveTab('products')}
                        className="w-full py-2.5 rounded-2xl bg-[#1A1620] hover:bg-[#25202D] text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-[#2B2332]"
                      >
                        <span>View All Dresses in Catalog →</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* TAB 2: PRODUCTS CATALOG STUDIO */}
              {/* ----------------------------------------------------- */}
              {activeTab === 'products' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  
                  {/* Top Bar with Category Filter Chips & View Mode */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121015] border border-[#26202C] rounded-3xl p-4 sm:p-6 shadow-xl">
                    
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                      {DEFAULT_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setProductCategoryFilter(cat.id)}
                          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
                            productCategoryFilter === cat.id
                              ? 'bg-[#B76E79] text-white shadow-md shadow-[#B76E79]/30'
                              : 'bg-[#1A1620] text-gray-400 hover:text-white hover:bg-[#241E2D]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* View Mode & Add Button */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-[#1A1620] border border-[#2D2635] rounded-2xl p-1">
                        <button
                          onClick={() => setCatalogViewMode('grid')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                            catalogViewMode === 'grid' ? 'bg-[#B76E79] text-white' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Grid
                        </button>
                        <button
                          onClick={() => setCatalogViewMode('table')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                            catalogViewMode === 'table' ? 'bg-[#B76E79] text-white' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Table
                        </button>
                      </div>

                      <button
                        onClick={openNewProductModal}
                        className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#B76E79]/20 flex items-center gap-2"
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                        <span>Add Product</span>
                      </button>
                    </div>

                  </div>

                  {/* Empty State */}
                  {filteredProducts.length === 0 ? (
                    <div className="py-20 text-center space-y-4 bg-[#121015] border border-[#26202C] rounded-3xl p-8">
                      <div className="w-16 h-16 rounded-full bg-[#B76E79]/15 border border-[#B76E79]/30 flex items-center justify-center text-[#B76E79] mx-auto">
                        <PackageIcon className="w-8 h-8" />
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-white">No Dresses Found</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        No products match the selected criteria "{globalSearch || productCategoryFilter}". Adjust filters or add a new piece to the collection.
                      </p>
                      <button
                        onClick={openNewProductModal}
                        className="px-6 py-2.5 bg-[#B76E79] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                      >
                        Create New Piece
                      </button>
                    </div>
                  ) : catalogViewMode === 'grid' ? (
                    
                    /* 1. GRID CARDS VIEW */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map(product => (
                        <div 
                          key={product._id || product.id}
                          className="bg-[#121015] border border-[#26202C] hover:border-[#B76E79]/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1 duration-300"
                        >
                          <div>
                            {/* Product Image */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#18141E]">
                              <img
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600'}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              
                              {/* Tag badge */}
                              {product.tag && (
                                <span className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-[#4A0E17]/90 text-[#FAF7F2] backdrop-blur-md border border-white/20">
                                  {product.tag}
                                </span>
                              )}

                              {/* Category Chip */}
                              <span className="absolute bottom-3 left-3 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/70 text-gray-300 backdrop-blur-md border border-white/10">
                                {product.categoryLabel || product.category}
                              </span>
                            </div>

                            {/* Details */}
                            <div className="p-5 space-y-2">
                              <h4 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-[#E6B8BF] transition-colors">
                                {product.title}
                              </h4>
                              
                              <p className="text-[11px] text-gray-400 line-clamp-1">
                                {product.fabric} • {product.pieces}
                              </p>

                              {/* Available Sizes */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {product.sizes?.map(sz => (
                                  <span key={sz} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1C1722] text-gray-400 border border-[#2D2635]">
                                    {sz}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Footer with Price and Actions */}
                          <div className="p-5 pt-0 border-t border-[#1C1822] mt-2 flex items-center justify-between">
                            <div>
                              <p className="text-[10px] uppercase font-mono text-gray-500">Price</p>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-base font-bold text-[#E6B8BF]">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-xs text-gray-500 line-through font-mono">${product.originalPrice}</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => openEditProductModal(product)}
                                className="p-2 rounded-xl bg-[#1E1925] hover:bg-[#2E2538] text-gray-300 hover:text-white transition-colors"
                                title="Edit Product"
                              >
                                <EditIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id || product.id, product.title)}
                                className="p-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 transition-colors border border-rose-900/40"
                                title="Delete Product"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                  ) : (
                    
                    /* 2. TABLE VIEW */
                    <div className="bg-[#121015] border border-[#26202C] rounded-3xl overflow-hidden shadow-xl">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#18141D] text-gray-400 uppercase tracking-wider text-[10px] font-mono border-b border-[#26202C]">
                            <tr>
                              <th className="p-4 pl-6">Product Item</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Fabric Details</th>
                              <th className="p-4">Sizes</th>
                              <th className="p-4">Price</th>
                              <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1D1822]">
                            {filteredProducts.map(product => (
                              <tr key={product._id || product.id} className="hover:bg-[#18141D]/60 transition-colors">
                                <td className="p-4 pl-6">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200'}
                                      alt=""
                                      className="w-12 h-14 object-cover rounded-xl border border-[#302838]"
                                    />
                                    <div>
                                      <p className="font-semibold text-white line-clamp-1">{product.title}</p>
                                      {product.tag && (
                                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#4A0E17] text-[#FAF7F2]">
                                          {product.tag}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-gray-300 font-medium">
                                  {product.categoryLabel || product.category}
                                </td>
                                <td className="p-4 text-gray-400 max-w-xs truncate">
                                  {product.fabric}
                                </td>
                                <td className="p-4 font-mono text-[11px] text-gray-300">
                                  {product.sizes?.join(', ')}
                                </td>
                                <td className="p-4 font-mono font-bold text-[#E6B8BF]">
                                  ${product.price}
                                  {product.originalPrice && (
                                    <span className="ml-1 text-[10px] text-gray-500 line-through">${product.originalPrice}</span>
                                  )}
                                </td>
                                <td className="p-4 pr-6 text-right space-x-2">
                                  <button
                                    onClick={() => openEditProductModal(product)}
                                    className="px-3.5 py-1.5 rounded-xl bg-[#1E1925] hover:bg-[#2E2538] text-gray-200 transition-colors text-xs font-semibold"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product._id || product.id, product.title)}
                                    className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/40 transition-colors text-xs font-semibold"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  )}

                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* TAB 3: CLIENT ORDERS FULFILLMENT */}
              {/* ----------------------------------------------------- */}
              {activeTab === 'orders' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  
                  {/* Status Filter Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121015] border border-[#26202C] rounded-3xl p-4 sm:p-6 shadow-xl">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                      {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                        <button
                          key={st}
                          onClick={() => setOrderStatusFilter(st)}
                          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
                            orderStatusFilter === st
                              ? 'bg-[#B76E79] text-white shadow-md shadow-[#B76E79]/30'
                              : 'bg-[#1A1620] text-gray-400 hover:text-white hover:bg-[#241E2D]'
                          }`}
                        >
                          {st} ({st === 'All' ? ordersList.length : ordersList.filter(o => o.status === st).length})
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => loadDashboardData(token)}
                      className="px-4 py-2 rounded-2xl bg-[#1A1620] hover:bg-[#25202D] text-gray-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <RefreshCwIcon className="w-3.5 h-3.5" />
                      <span>Refresh Queue</span>
                    </button>
                  </div>

                  {/* Orders Table */}
                  <div className="bg-[#121015] border border-[#26202C] rounded-3xl overflow-hidden shadow-xl">
                    {filteredOrders.length === 0 ? (
                      <div className="py-20 text-center space-y-3 p-8">
                        <ReceiptIcon className="w-12 h-12 text-gray-600 mx-auto" />
                        <h4 className="font-cinzel text-lg font-bold text-white">No Orders in this Status</h4>
                        <p className="text-xs text-gray-400 max-w-sm mx-auto">
                          When users browse your collections and complete checkout on the storefront, their order appears here immediately.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#18141D] text-gray-400 uppercase tracking-wider text-[10px] font-mono border-b border-[#26202C]">
                            <tr>
                              <th className="p-4 pl-6">Order ID</th>
                              <th className="p-4">Customer Dossier</th>
                              <th className="p-4">Delivery City</th>
                              <th className="p-4">Items & Amount</th>
                              <th className="p-4">Fulfillment Status</th>
                              <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1D1822]">
                            {filteredOrders.map(order => (
                              <tr key={order._id || order.id} className="hover:bg-[#18141D]/60 transition-colors">
                                
                                {/* Order ID with 1-click copy */}
                                <td className="p-4 pl-6">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono font-bold text-[#D4AF37] text-sm">
                                      {order.orderNumber}
                                    </span>
                                    <button
                                      onClick={() => handleCopyText(order.orderNumber, 'Order ID')}
                                      className="p-1 text-gray-500 hover:text-white rounded"
                                      title="Copy Order ID"
                                    >
                                      <CopyIcon className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </td>

                                {/* Customer Info */}
                                <td className="p-4">
                                  <p className="font-semibold text-white">{order.customer?.fullName}</p>
                                  <p className="text-[11px] text-gray-400">{order.customer?.phone}</p>
                                  <p className="text-[10px] text-gray-500">{order.customer?.email}</p>
                                </td>

                                {/* City & Destination */}
                                <td className="p-4 text-gray-300">
                                  <p className="font-medium">{order.customer?.city || 'Pakistan'}</p>
                                  <p className="text-[10px] text-gray-500 max-w-[200px] truncate">
                                    {order.customer?.address}
                                  </p>
                                </td>

                                {/* Items & Total */}
                                <td className="p-4">
                                  <p className="font-mono font-bold text-white text-sm">
                                    ${order.grandTotal} {order.currency}
                                  </p>
                                  <p className="text-[10px] text-gray-400">
                                    {order.items?.length || 1} piece(s) ordered
                                  </p>
                                </td>

                                {/* Live Status Selector */}
                                <td className="p-4">
                                  <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id || order.id, e.target.value)}
                                    className={`text-[11px] font-semibold rounded-xl px-3 py-1.5 bg-[#18141D] border ${
                                      order.status === 'Delivered' ? 'border-emerald-700/60 text-emerald-400' :
                                      order.status === 'Shipped' ? 'border-blue-700/60 text-blue-400' :
                                      order.status === 'Processing' ? 'border-purple-700/60 text-purple-400' :
                                      order.status === 'Cancelled' ? 'border-rose-700/60 text-rose-400' :
                                      'border-amber-700/60 text-amber-400'
                                    } focus:outline-none cursor-pointer`}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>

                                {/* Actions */}
                                <td className="p-4 pr-6 text-right space-x-2">
                                  <button
                                    onClick={() => setSelectedOrderDetails(order)}
                                    className="px-3.5 py-1.5 rounded-xl bg-[#1E1925] hover:bg-[#2E2538] text-gray-200 text-xs font-semibold transition-colors"
                                  >
                                    Inspect
                                  </button>
                                  <button
                                    onClick={() => handleDeleteOrder(order._id || order.id, order.orderNumber)}
                                    className="px-2.5 py-1.5 rounded-xl text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 text-xs transition-colors"
                                    title="Delete Order"
                                  >
                                    Delete
                                  </button>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* TAB 4: DATABASE & ATELIER SETTINGS */}
              {/* ----------------------------------------------------- */}
              {activeTab === 'database' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  
                  <div className="bg-[#121015] border border-[#26202C] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="space-y-1 border-b border-[#201C24] pb-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
                        Infrastructure & Persistence
                      </span>
                      <h3 className="font-cinzel text-xl font-bold text-white">MongoDB Atelier Database</h3>
                      <p className="text-xs text-gray-400">
                        Manage catalog collections, seed initial signature collections, and verify system integrity.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-[#17131B] border border-[#241E2B] space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">MongoDB Database</span>
                        <p className="font-mono text-sm font-bold text-emerald-400">lailashamsi (Live)</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#17131B] border border-[#241E2B] space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Registered Ensembles</span>
                        <p className="font-mono text-sm font-bold text-white">{productsList.length} Items</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#17131B] border border-[#241E2B] space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Client Orders Recorded</span>
                        <p className="font-mono text-sm font-bold text-white">{ordersList.length} Orders</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#18131C] border border-[#B76E79]/30 space-y-4">
                      <div>
                        <h4 className="font-cinzel text-base font-bold text-white">Reset & Seed Demo Catalog</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          If you want to reload the 8 original signature dresses (Gul-e-Noor, Zahra Velvet, etc.), click below to seed them into MongoDB.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSeedProducts(true)}
                          disabled={seedingLoading}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                        >
                          {seedingLoading ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <RefreshCwIcon className="w-3.5 h-3.5" />
                          )}
                          <span>Reset & Seed 8 Luxury Dresses</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </main>

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT PRODUCT (COMPACT NON-SCROLLING POPUP) */}
      {/* ----------------------------------------------------------- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full max-w-4xl bg-[#141117] text-white rounded-2xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-3.5 border-b border-[#26202C] bg-[#17131B]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                  {editingProductId ? 'Edit Garment Piece' : 'Add New Couture Piece'}
                </h3>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#251E2E] text-[#D4AF37] border border-[#3E324B]">
                  Atelier Catalog
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-[#201A26] hover:bg-[#2E2437] transition-colors"
                title="Close"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {productFormError && (
              <div className="mx-6 mt-3 px-3 py-2 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs">
                {productFormError}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="p-5 sm:p-6 space-y-4">
              
              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5">
                
                {/* LEFT COLUMN */}
                <div className="space-y-3">
                  
                  {/* Title & Tag */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-2">
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.title}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        placeholder="e.g. Gul-e-Noor Embroidered"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Badge / Tag
                      </label>
                      <input
                        type="text"
                        value={productForm.tag}
                        onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                        placeholder="Bestseller"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Category Key *
                      </label>
                      <select
                        value={productForm.category}
                        onChange={(e) => {
                          const selected = DEFAULT_CATEGORIES.find(c => c.id === e.target.value);
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                            categoryLabel: selected ? selected.label : productForm.categoryLabel
                          });
                        }}
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none cursor-pointer"
                      >
                        <option value="luxury-formals">luxury-formals</option>
                        <option value="ready-to-wear">ready-to-wear</option>
                        <option value="silk-coords">silk-coords</option>
                        <option value="festive-26">festive-26</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Display Category
                      </label>
                      <input
                        type="text"
                        value={productForm.categoryLabel}
                        onChange={(e) => setProductForm({ ...productForm, categoryLabel: e.target.value })}
                        placeholder="Festive Formals"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Price & Original Price */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Price (USD) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        placeholder="185"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Original Price ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                        placeholder="220 (optional)"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Fabric & Pieces */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Fabric Details
                      </label>
                      <input
                        type="text"
                        value={productForm.fabric}
                        onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                        placeholder="Pure Chiffon & Organza"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                        Pieces
                      </label>
                      <input
                        type="text"
                        value={productForm.pieces}
                        onChange={(e) => setProductForm({ ...productForm, pieces: e.target.value })}
                        placeholder="3 Piece (Shirt, Slip, Dupatta)"
                        className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-3">
                  
                  {/* Image Section */}
                  <div className="bg-[#18131E] p-3 rounded-xl border border-[#2B2333] space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                        Product Image
                      </label>
                      <label className="cursor-pointer px-2.5 py-1 bg-[#251E2E] hover:bg-[#342A3F] text-[10px] font-medium text-[#E6B8BF] rounded-lg transition-colors border border-[#3E324B] flex items-center gap-1">
                        {uploadingImage ? 'Uploading...' : '📁 Upload Local File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={productForm.images[0] || ''}
                        onChange={(e) => {
                          const newImgs = [...productForm.images];
                          newImgs[0] = e.target.value;
                          setProductForm({ ...productForm, images: newImgs });
                        }}
                        placeholder="Paste image URL (https://...)"
                        className="flex-1 bg-[#130F17] border border-[#2D2535] rounded-xl px-3 py-1.5 text-xs text-white focus:border-[#B76E79] focus:outline-none"
                      />
                      {productForm.images[0] && (
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#D4AF37]/50 bg-black flex-shrink-0">
                          <img
                            src={productForm.images[0]}
                            alt="preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">
                      Product Description
                    </label>
                    <textarea
                      rows="4"
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      placeholder="Handcrafted embroidery details, silhouette cut, and styling instructions..."
                      className="w-full bg-[#1C1722] border border-[#2F2637] rounded-xl px-3 py-2 text-xs text-white focus:border-[#B76E79] focus:outline-none resize-none"
                    />
                  </div>

                </div>

              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#26202C]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#201A26] hover:bg-[#2A2233] text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={productSaving}
                  className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-[#B76E79] to-[#8E4453] hover:from-[#c27c87] hover:to-[#9f4f5f] text-white uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  {productSaving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Save to Atelier</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ORDER DOSSIER & DETAILS */}
      {/* ----------------------------------------------------------- */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[60] overflow-hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full max-w-xl bg-[#141117] text-white rounded-2xl border border-[#D4AF37]/40 shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto admin-scrollbar space-y-5">
            
            <div className="flex justify-between items-center border-b border-[#26202C] pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  Patron Order Dossier
                </span>
                <h3 className="font-mono text-2xl font-bold text-white mt-0.5">
                  {selectedOrderDetails.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-[#1F1924]"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Customer Box */}
              <div className="bg-[#19141F] p-5 rounded-2xl border border-[#2A2332] space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">
                  Client Information
                </span>
                <p className="text-base font-bold text-white">{selectedOrderDetails.customer?.fullName}</p>
                <p className="text-gray-300">📧 {selectedOrderDetails.customer?.email}</p>
                <p className="text-gray-300">📞 {selectedOrderDetails.customer?.phone}</p>
                <p className="text-gray-300">📍 {selectedOrderDetails.customer?.address}, {selectedOrderDetails.customer?.city}, {selectedOrderDetails.customer?.country}</p>
                {selectedOrderDetails.customer?.deliveryNotes && (
                  <p className="text-amber-300 italic pt-2 border-t border-[#2A2332]">
                    Delivery Notes: "{selectedOrderDetails.customer.deliveryNotes}"
                  </p>
                )}
              </div>

              {/* Items List */}
              <div className="bg-[#19141F] p-5 rounded-2xl border border-[#2A2332] space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">
                  Ordered Garments
                </span>
                {selectedOrderDetails.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b border-[#251E2B] last:border-0">
                    {item.image && (
                      <img src={item.image} alt="" className="w-12 h-14 object-cover rounded-xl border border-[#3E324B]" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-[11px] text-gray-400 font-mono">
                        Size: {item.selectedSize} {item.selectedColor?.name ? `• Color: ${item.selectedColor.name}` : ''} • Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-mono font-bold text-[#E6B8BF]">${item.price}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-between font-mono text-sm font-bold text-white border-t border-[#2A2332]">
                  <span>Total Payable:</span>
                  <span className="text-[#E6B8BF]">${selectedOrderDetails.grandTotal} {selectedOrderDetails.currency}</span>
                </div>
              </div>

              {/* Status Update & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#19141F] p-4 rounded-2xl border border-[#2A2332]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-300">Status:</span>
                  <select
                    value={selectedOrderDetails.status}
                    onChange={(e) => {
                      const newSt = e.target.value;
                      handleStatusChange(selectedOrderDetails._id || selectedOrderDetails.id, newSt);
                      setSelectedOrderDetails({ ...selectedOrderDetails, status: newSt });
                    }}
                    className="bg-[#141118] border border-[#3A3044] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Direct WhatsApp Contact Button */}
                {selectedOrderDetails.customer?.phone && (
                  <a
                    href={`https://wa.me/${selectedOrderDetails.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedOrderDetails.customer.fullName)},%20this%20is%20Laila%20Shamsi%20Atelier%20regarding%20your%20order%20${selectedOrderDetails.orderNumber}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
