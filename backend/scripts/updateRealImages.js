const mongoose = require('mongoose');
require('dotenv').config();

const settingSchema = new mongoose.Schema({
  images: { type: Map, of: String }
}, { strict: false });

const Setting = mongoose.model('Setting', settingSchema);

async function updateSettings() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/elmotahida';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const newImages = {
      'hero-bg-01': '/uploads/hero-bg-01.jpg',
      'hero-bg-02': '/uploads/hero-bg-02.jpg',
      'agate': '/uploads/agate.jpg',
      '26-agate-pin': '/uploads/26-agate-pin.jpg',
      'cap-felter': '/uploads/cap-felter.jpg',
      'coated-teflon-mould': '/uploads/coated-teflon-mould.jpg',
      'case-felter': '/uploads/case-felter.jpg',
      'circular-knife': '/uploads/circular-knife.jpg',
      'holders-four-holes': '/uploads/holders-four-holes.jpg',
      'palette': '/uploads/palette.jpg',
      'special-plastic-product': '/uploads/special-plastic-product.jpg',
      'male-press': '/uploads/male-press.jpg',
      'fine-industrial-pin': '/uploads/fine-industrial-pin.jpg',
      'mould': '/uploads/mould.jpg',
      'explore-01-technical-papers': '/uploads/explore-01-technical-papers.jpg',
      'explore-02-case-studies': '/uploads/explore-02-case-studies.jpg',
      'explore-03-sustainability': '/uploads/explore-03-sustainability.jpg',
      'explore-04-career-opportunities': '/uploads/explore-04-career-opportunities.jpg',
      'project-01-paper-mill-mena': '/uploads/project-01-paper-mill-mena.jpg',
      'project-02': '/uploads/project-02.jpg',
      'project-03': '/uploads/project-03.jpg',
      'project-04': '/uploads/project-04.jpg',
      'project-05': '/uploads/project-05.jpg',
      'project-06': '/uploads/project-06.jpg',
      'project-07': '/uploads/project-07.jpg',
      'project-08': '/uploads/project-08.jpg',
      'client-logo-01': '/uploads/client-logo-01.jpg',
      'client-logo-02': '/uploads/client-logo-02.jpg',
      'client-logo-03': '/uploads/client-logo-03.jpg',
      'about-us-hero': '/uploads/industrial-facility-premium.png',
      'site-video': '/uploads/intro.mp4',
      'site-logo': '/uploads/site-logo.png'
    };

    const setting = await Setting.findOne();
    if (setting) {
      setting.images = newImages;
      await setting.save();
      console.log('Settings updated successfully in database');
    } else {
      await Setting.create({ images: newImages });
      console.log('Settings created successfully in database');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error updating settings:', err);
    process.exit(1);
  }
}

updateSettings();
