const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
  updateImageSlot
} = require('../controllers/settingsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSettings)
  .put(protect, admin, updateSettings);

router.route('/images/:key')
  .patch(protect, admin, updateImageSlot);

module.exports = router;
