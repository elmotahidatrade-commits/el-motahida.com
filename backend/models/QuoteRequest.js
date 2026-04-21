const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  machineMake: { type: String },
  machineType: { type: String },
  partsRequired: { type: String },
  message: { type: String },
  status: {
    type: String,
    enum: ['new', 'in-review', 'replied', 'closed'],
    default: 'new'
  },
  adminNotes: { type: String }
}, { timestamps: true });

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
module.exports = QuoteRequest;
