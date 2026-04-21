const express = require('express');
const router = express.Router();
const {
  createQuoteRequest,
  getQuoteRequests,
  updateQuoteStatus,
} = require('../controllers/quoteController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(createQuoteRequest).get(protect, admin, getQuoteRequests);
router.route('/:id/status').patch(protect, admin, updateQuoteStatus);

module.exports = router;
