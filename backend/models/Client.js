const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logoUrl: { type: String, required: true },
  country: { type: String },
  region: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;

