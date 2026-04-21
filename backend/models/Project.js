const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  capacity: { type: String },
  location: { type: String },
  country: { type: String },
  description: {
    ar: { type: String, required: true },
    en: { type: String, required: true }
  },
  images: [{ type: String }],
  completionYear: { type: Number },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
