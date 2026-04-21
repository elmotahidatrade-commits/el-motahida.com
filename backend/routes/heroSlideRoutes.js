const express = require('express');
const router = express.Router();
const {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  reorderHeroSlides
} = require('../controllers/heroSlideController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHeroSlides)
  .post(protect, admin, createHeroSlide);

router.route('/reorder')
  .patch(protect, admin, reorderHeroSlides);

router.route('/:id')
  .put(protect, admin, updateHeroSlide)
  .delete(protect, admin, deleteHeroSlide);

module.exports = router;
