const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true, default: '#000000' }
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category identifier is required'],
    trim: true
  },
  categoryLabel: {
    type: String,
    default: function() {
      // Auto capitalize category if categoryLabel is not provided
      if (!this.category) return 'Luxury Pret';
      return this.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    default: null
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 1,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  tag: {
    type: String,
    default: ''
  },
  tagColor: {
    type: String,
    default: 'bg-[#4A0E17] text-[#FAF7F2]'
  },
  images: {
    type: [String],
    default: []
  },
  fabric: {
    type: String,
    default: 'Pure Organza & Raw Silk'
  },
  pieces: {
    type: String,
    default: '3 Piece'
  },
  colors: {
    type: [colorSchema],
    default: []
  },
  sizes: {
    type: [String],
    default: ['XS', 'S', 'M', 'L', 'XL']
  },
  description: {
    type: String,
    default: ''
  },
  isNew: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 25
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      return ret;
    }
  }
});

module.exports = mongoose.model('Product', productSchema);
