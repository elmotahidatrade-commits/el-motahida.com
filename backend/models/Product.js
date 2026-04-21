const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  category: { type: String, required: true },
  subcategory: { type: String },
  images: [{ type: String }],
  specs: { type: Map, of: String },
  pdfCatalog: { type: String },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
