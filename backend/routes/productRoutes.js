const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyAdmin } = require('../middleware/auth');
const initialProducts = require('../data/initialProducts');

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering, searching, and sorting
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search keyword in title, description, or fabric
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { fabric: regex },
        { categoryLabel: regex }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };

    const products = await Product.find(query).sort(sortOption);

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Protected (Admin only)
 */
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const {
      title,
      category,
      categoryLabel,
      price,
      originalPrice,
      rating,
      reviewsCount,
      tag,
      tagColor,
      images,
      fabric,
      pieces,
      colors,
      sizes,
      description,
      isNew,
      stock
    } = req.body;

    if (!title || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and price are required fields.'
      });
    }

    // Clean images array
    let processedImages = [];
    if (Array.isArray(images)) {
      processedImages = images.filter(img => img && img.trim() !== '');
    } else if (typeof images === 'string' && images.trim()) {
      processedImages = [images.trim()];
    }

    // Default placeholder image if none provided
    if (processedImages.length === 0) {
      processedImages = ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'];
    }

    const newProduct = new Product({
      title: title.trim(),
      category: category.trim(),
      categoryLabel: categoryLabel || undefined,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      rating: rating ? Number(rating) : 5.0,
      reviewsCount: reviewsCount ? Number(reviewsCount) : 0,
      tag: tag || '',
      tagColor: tagColor || 'bg-[#4A0E17] text-[#FAF7F2]',
      images: processedImages,
      fabric: fabric || 'Pure Silk & Handcrafted Chiffon',
      pieces: pieces || '3 Piece',
      colors: Array.isArray(colors) ? colors : [{ name: 'Classic Gold', hex: '#D4AF37' }],
      sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL'],
      description: description || '',
      isNew: isNew !== undefined ? Boolean(isNew) : true,
      stock: stock ? Number(stock) : 25
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product: savedProduct
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 * @access  Protected (Admin only)
 */
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      product: updatedProduct
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Protected (Admin only)
 */
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product "${product.title}" has been deleted.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/products/seed
 * @desc    Seed initial catalog data
 * @access  Protected (Admin only)
 */
router.post('/seed', verifyAdmin, async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0 && !req.query.force) {
      return res.status(400).json({
        success: false,
        message: `Database already contains ${count} products. Use ?force=true to reset.`
      });
    }

    if (req.query.force) {
      await Product.deleteMany({});
    }

    const inserted = await Product.insertMany(initialProducts);

    return res.status(201).json({
      success: true,
      message: `Successfully seeded ${inserted.length} luxury products into MongoDB!`,
      products: inserted
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to seed products',
      error: error.message
    });
  }
});

module.exports = router;

