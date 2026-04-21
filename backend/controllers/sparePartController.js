const SparePart = require('../models/SparePart');

// @desc    Fetch all spare parts
// @route   GET /api/spare-parts
// @access  Public
const getSpareParts = async (req, res) => {
  try {
    const spareParts = await SparePart.find({ isActive: true });
    res.json(spareParts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single spare part
// @route   GET /api/spare-parts/:id
// @access  Public
const getSparePartById = async (req, res) => {
  try {
    const sparePart = await SparePart.findById(req.params.id);
    if (sparePart) {
      res.json(sparePart);
    } else {
      res.status(404).json({ message: 'Spare part not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a spare part
// @route   POST /api/spare-parts
// @access  Private/Admin
const createSparePart = async (req, res) => {
  try {
    const sparePart = new SparePart(req.body);
    const createdSparePart = await sparePart.save();
    res.status(201).json(createdSparePart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a spare part
// @route   PUT /api/spare-parts/:id
// @access  Private/Admin
const updateSparePart = async (req, res) => {
  try {
    const sparePart = await SparePart.findById(req.params.id);
    if (sparePart) {
      Object.assign(sparePart, req.body);
      const updatedSparePart = await sparePart.save();
      res.json(updatedSparePart);
    } else {
      res.status(404).json({ message: 'Spare part not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a spare part
// @route   DELETE /api/spare-parts/:id
// @access  Private/Admin
const deleteSparePart = async (req, res) => {
  try {
    const sparePart = await SparePart.findById(req.params.id);
    if (sparePart) {
      await sparePart.deleteOne();
      res.json({ message: 'Spare part removed' });
    } else {
      res.status(404).json({ message: 'Spare part not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
};
