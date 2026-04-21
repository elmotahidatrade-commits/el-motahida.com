const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
  partName: { type: String, required: true },
  machineType: { type: String, required: true },
  machineMake: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  partNumber: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const SparePart = mongoose.model('SparePart', sparePartSchema);
module.exports = SparePart;
