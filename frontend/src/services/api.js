const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Handle HTTP response and return JSON or throw error
 */
async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

// ----------------------------------------------------------------------
// ADMIN AUTHENTICATION
// ----------------------------------------------------------------------

/**
 * Check if the initial admin has been registered
 * @returns {Promise<{ success: boolean, hasAdmin: boolean, message: string }>}
 */
export async function checkAdminSetup() {
  const res = await fetch(`${API_BASE_URL}/admin/setup-status`);
  return handleResponse(res);
}

/**
 * One-time registration for the master admin
 */
export async function registerAdmin({ name, email, password }) {
  const res = await fetch(`${API_BASE_URL}/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(res);
}

/**
 * Login for registered admin
 */
export async function loginAdmin({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res);
}

/**
 * Get current admin info using token
 */
export async function getAdminProfile(token) {
  const res = await fetch(`${API_BASE_URL}/admin/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

/**
 * Get dashboard overview metrics
 */
export async function getAdminStats(token) {
  const res = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

// ----------------------------------------------------------------------
// PRODUCTS
// ----------------------------------------------------------------------

/**
 * Fetch all products from backend
 */
export async function fetchProducts({ category = '', search = '', sort = '' } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);

  const url = `${API_BASE_URL}/products${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url);
  return handleResponse(res);
}

/**
 * Fetch single product by ID
 */
export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  return handleResponse(res);
}

/**
 * Create a new product (Admin only)
 */
export async function createProduct(productData, token) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return handleResponse(res);
}

/**
 * Update an existing product (Admin only)
 */
export async function updateProduct(id, productData, token) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return handleResponse(res);
}

/**
 * Delete product (Admin only)
 */
export async function deleteProduct(id, token) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

/**
 * Seed initial catalog data
 */
export async function seedProducts(token, force = false) {
  const res = await fetch(`${API_BASE_URL}/products/seed${force ? '?force=true' : ''}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

// ----------------------------------------------------------------------
// IMAGE UPLOAD
// ----------------------------------------------------------------------

/**
 * Upload image file to server
 */
export async function uploadImageFile(file, token) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  return handleResponse(res);
}

// ----------------------------------------------------------------------
// ORDERS
// ----------------------------------------------------------------------

/**
 * Place a new order (Public)
 */
export async function createOrder(orderData) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return handleResponse(res);
}

/**
 * Fetch orders list (Admin only)
 */
export async function fetchOrders(token, { status = '', search = '' } = {}) {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (search) params.append('search', search);

  const url = `${API_BASE_URL}/orders${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

/**
 * Update order status (Admin only)
 */
export async function updateOrderStatus(id, status, token) {
  const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  return handleResponse(res);
}

/**
 * Delete order (Admin only)
 */
export async function deleteOrder(id, token) {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

