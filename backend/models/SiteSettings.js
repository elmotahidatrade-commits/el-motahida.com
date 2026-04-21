const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    ar: { type: String },
    en: { type: String }
  },
  phone: { type: String },
  landline: { type: String },
  email: { type: String },
  address: {
    ar: { type: String },
    en: { type: String }
  },
  socialLinks: { type: Map, of: String },
  metaTags: { type: Map, of: String },
  stats: [{
    value: { type: String },
    label_ar: { type: String },
    label_en: { type: String }
  }],
  images: {
    type: Map,
    of: String,
    default: {}
  }
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
module.exports = SiteSettings;
