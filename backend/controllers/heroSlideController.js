const HeroSlide = require('../models/HeroSlide');

// @desc    Fetch all hero slides
// @route   GET /api/hero-slides
// @access  Public
const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a hero slide
// @route   POST /api/hero-slides
// @access  Private/Admin
const createHeroSlide = async (req, res) => {
  try {
    const slide = new HeroSlide(req.body);
    const createdSlide = await slide.save();
    res.status(201).json(createdSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a hero slide
// @route   PUT /api/hero-slides/:id
// @access  Private/Admin
const updateHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (slide) {
      Object.assign(slide, req.body);
      const updatedSlide = await slide.save();
      res.json(updatedSlide);
    } else {
      res.status(404).json({ message: 'Hero slide not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a hero slide
// @route   DELETE /api/hero-slides/:id
// @access  Private/Admin
const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    if (slide) {
      await slide.deleteOne();
      res.json({ message: 'Hero slide removed' });
    } else {
      res.status(404).json({ message: 'Hero slide not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Reorder hero slides 
// @route   PATCH /api/hero-slides/reorder
// @access  Private/Admin
const reorderHeroSlides = async (req, res) => {
    try {
        const { slideIds } = req.body;
        // slideIds is an array of IDs in the new order
        for (let i = 0; i < slideIds.length; i++) {
            await HeroSlide.findByIdAndUpdate(slideIds[i], { order: i });
        }
        res.json({ message: 'Order updated' });
    } catch(err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  reorderHeroSlides
};
