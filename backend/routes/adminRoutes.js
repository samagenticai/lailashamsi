const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyAdmin } = require('../middleware/auth');

// Helper to generate JWT
const generateToken = (adminId) => {
  const secret = process.env.JWT_SECRET || 'laila_shamsi_super_secret_jwt_key_2026_ateliere';
  return jwt.sign({ id: adminId }, secret, { expiresIn: '7d' });
};

/**
 * @route   GET /api/admin/setup-status
 * @desc    Check whether the initial admin has been created
 * @access  Public
 */
router.get('/setup-status', async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    return res.status(200).json({
      success: true,
      hasAdmin: adminCount > 0,
      message: adminCount > 0 ? 'Admin exists. Please log in.' : 'No admin found. Setup required.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to check setup status',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/admin/register
 * @desc    One-time Admin Registration. Locked after first admin is registered!
 * @access  Public (One-time only)
 */
router.post('/register', async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();

    // STRICT CHECK: Admin can only be registered once!
    if (adminCount > 0) {
      return res.status(403).json({
        success: false,
        message: 'Registration is permanently closed! An admin is already registered. Please proceed to login.'
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are all required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const newAdmin = new Admin({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    });

    await newAdmin.save();

    const token = generateToken(newAdmin._id);

    return res.status(201).json({
      success: true,
      message: 'Master Admin account initialized successfully!',
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error during admin registration',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/admin/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.'
      });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: 'Welcome back to Laila Shamsi Atelier Admin Portal',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/admin/me
 * @desc    Get current authenticated admin info
 * @access  Protected
 */
router.get('/me', verifyAdmin, async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
});

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard metrics & summary
 * @access  Protected
 */
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue and breakdown by status
    const orders = await Order.find().sort({ createdAt: -1 });
    
    let totalRevenue = 0;
    let pendingOrders = 0;
    let processingOrders = 0;
    let shippedOrders = 0;
    let deliveredOrders = 0;

    orders.forEach(order => {
      totalRevenue += (order.grandTotal || 0);
      if (order.status === 'Pending') pendingOrders++;
      else if (order.status === 'Processing') processingOrders++;
      else if (order.status === 'Shipped') shippedOrders++;
      else if (order.status === 'Delivered') deliveredOrders++;
    });

    const recentOrders = orders.slice(0, 5);

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue: Math.round(totalRevenue),
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        recentOrders
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats',
      error: error.message
    });
  }
});

module.exports = router;

