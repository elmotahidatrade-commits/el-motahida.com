const SiteSettings = require('../models/SiteSettings');

// @desc    Fetch site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Graceful fallback for empty databases
      return res.json({ 
        aboutTextAr: '', aboutTextEn: '', 
        phone1: '', phone2: '', email: '', 
        facebook: '', twitter: '', linkedin: '',
        images: {}
      });
    }
    // Return document 
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a specific image slot
// @route   PATCH /api/settings/images/:key
// @access  Private/Admin
const updateImageSlot = async (req, res) => {
  try {
    const { key } = req.params;
    const { url } = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) {
        settings = new SiteSettings();
    }
    
    // Explicitly update the Map because Mongoose maps don't always track nested dirtiness nicely
    settings.images.set(key, url);
    await settings.save();
    
    res.json(settings.images);
  } catch(error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  updateImageSlot
};
