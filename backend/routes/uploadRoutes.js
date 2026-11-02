const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { verifyAdmin } = require('../middleware/auth');

/**
 * @route   POST /api/upload
 * @desc    Upload product image
 * @access  Protected (Admin only)
 */
router.post('/', verifyAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully!',
      imageUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
});

module.exports = router;

