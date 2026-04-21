const QuoteRequest = require('../models/QuoteRequest');

// @desc    Create a quote request
// @route   POST /api/quotes
// @access  Public
const createQuoteRequest = async (req, res) => {
  try {
    const quote = new QuoteRequest(req.body);
    const createdQuote = await quote.save();
    
    // TODO: Trigger Nodemailer to send email to Admin
    // TODO: Trigger Nodemailer to send confirmation to user

    res.status(201).json(createdQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private/Admin
const getQuoteRequests = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const quotes = await QuoteRequest.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update quote request status
// @route   PATCH /api/quotes/:id/status
// @access  Private/Admin
const updateQuoteStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const quote = await QuoteRequest.findById(req.params.id);

    if (quote) {
      if (status) quote.status = status;
      if (adminNotes !== undefined) quote.adminNotes = adminNotes;
      const updatedQuote = await quote.save();
      res.json(updatedQuote);
    } else {
      res.status(404).json({ message: 'Quote request not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createQuoteRequest,
  getQuoteRequests,
  updateQuoteStatus,
};
