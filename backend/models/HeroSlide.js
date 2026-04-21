const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  subtitle: { type: String },
  backgroundImage: { type: String, required: true },
  badgeText: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
module.exports = HeroSlide;
