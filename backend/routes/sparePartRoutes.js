const express = require('express');
const router = express.Router();
const {
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
} = require('../controllers/sparePartController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSpareParts)
  .post(protect, admin, createSparePart);

router.route('/:id')
  .get(getSparePartById)
  .put(protect, admin, updateSparePart)
  .delete(protect, admin, deleteSparePart);

module.exports = router;
