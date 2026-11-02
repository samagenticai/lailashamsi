const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyAdmin } = require('../middleware/auth');

/**
 * @route   POST /api/orders
 * @desc    Place a new bespoke order from storefront
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      shippingFee,
      grandTotal,
      currency,
      paymentMethod
    } = req.body;

    if (!customer || !customer.fullName || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, email, phone, and delivery address are required.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item.'
      });
    }

    // Generate unique order reference (e.g. LS-749216)
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `LS-${randomSuffix}`;

    const newOrder = new Order({
      orderNumber,
      customer,
      items,
      subtotal: Number(subtotal || grandTotal),
      shippingFee: Number(shippingFee || 0),
      grandTotal: Number(grandTotal),
      currency: currency || 'USD',
      paymentMethod: paymentMethod || 'cod',
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: savedOrder,
      orderNumber: savedOrder.orderNumber
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders
 * @access  Protected (Admin only)
 */
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { orderNumber: regex },
        { 'customer.fullName': regex },
        { 'customer.email': regex },
        { 'customer.phone': regex }
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order details
 * @access  Protected (Admin only)
 */
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving order',
      error: error.message
    });
  }
});

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status
 * @access  Protected (Admin only)
 */
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Order ${order.orderNumber} status updated to ${status}`,
      order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete order
 * @access  Protected (Admin only)
 */
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Order ${order.orderNumber} deleted successfully.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message
    });
  }
});

module.exports = router;

