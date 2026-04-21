const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const SiteSettings = require('../models/SiteSettings');
const Product = require('../models/Product');
const Project = require('../models/Project');
const HeroSlide = require('../models/HeroSlide');
const Client = require('../models/Client');
const SparePart = require('../models/SparePart');

router.get('/nuke-and-seed', async (req, res) => {
  try {
    console.log('Initiating nuclear wipe...');
    await User.deleteMany();
    await SiteSettings.deleteMany();
    await Product.deleteMany();
    await Project.deleteMany();
    await HeroSlide.deleteMany();
    await Client.deleteMany();
    await SparePart.deleteMany();
    
    console.log('Wipe complete. Triggering seeder...');
    
    // We can execute seeder locally from here by importing it, but seeder has process.exit!
    // So we just call autoProvision logic but without the exit clause.
    // Instead of copying seeder here, we just insert the absolute basics so they can use the Admin Panel!
    
    const superAdmin = new User({
      name: 'Super Admin',
      email: 'admin@elmotahida.com',
      password: 'password123',
      role: 'superadmin',
    });
    await superAdmin.save();

    const settings = new SiteSettings({
      siteName: { en: 'EL-Motahida Trade', ar: 'شركة المتحده للتجارة' },
      email: 'elmotahidatrade@gmail.com',
      phone: '+201068846536',
      landline: '+201507887486',
      address: {
        en: 'Industrial Area, Cairo, Egypt',
        ar: 'المنطقة الصناعية، القاهرة، مصر'
      },
      socialLinks: {
          facebook: 'https://facebook.com/elmotahida',
          linkedin: 'https://linkedin.com/company/elmotahida',
          twitter: 'https://twitter.com/elmotahida'
      },
      stats: [
        { value: '5+', label_en: 'Decades', label_ar: 'عقود' },
        { value: '52+', label_en: 'Projects', label_ar: 'مشاريع' },
        { value: '75+', label_en: 'Countries', label_ar: 'دولة' },
      ],
      images: {
        'site-logo': '/uploads/site-logo.png',
        'site-video': '/uploads/intro.mp4',
        'hero-bg-01': '/uploads/hero-bg-01.jpg',
        'hero-bg-02': '/uploads/hero-bg-02.jpg',
        'gallery-01-casting-unit': '/uploads/gallery-01-casting-unit.jpg',
        'gallery-02-machining-center': '/uploads/gallery-02-machining-center.jpg',
        'gallery-03-quality-control': '/uploads/gallery-03-quality-control.jpg',
        'gallery-04-assembly-line': '/uploads/gallery-04-assembly-line.jpg',
        'gallery-05-testing-lab': '/uploads/gallery-05-testing-lab.jpg',
        'gallery-06-shipping': '/uploads/gallery-06-shipping.jpg',
        'gallery-07-rd-facility': '/uploads/gallery-07-rd-facility.jpg',
        'expertise-01-pulp-machinery': '/uploads/expertise-01-pulp-machinery.jpg',
        'expertise-02-paper-machine-solutions': '/uploads/expertise-02-paper-machine-solutions.jpg',
        'expertise-03-molded-fiber-tech': '/uploads/expertise-03-molded-fiber-tech.jpg',
        'expertise-04-refining-systems': '/uploads/expertise-04-refining-systems.jpg',
        'expertise-05-agitators-screens': '/uploads/expertise-05-agitators-screens.jpg',
        'product-01-double-disc-refiner': '/uploads/product-01-double-disc-refiner.jpg',
        'product-02-pressure-screen': '/uploads/product-02-pressure-screen.jpg',
        'product-03-high-density-cleaner': '/uploads/product-03-high-density-cleaner.jpg',
        'product-04-pulper-automation': '/uploads/product-04-pulper-automation.jpg',
        'trusted-01-turnkey-installations': '/uploads/trusted-01-turnkey-installations.jpg',
        'trusted-02-custom-heavy-machinery': '/uploads/trusted-02-custom-heavy-machinery.jpg',
        'trusted-03-modernization-upgrades': '/uploads/trusted-03-modernization-upgrades.jpg',
        'trusted-04-automation-control': '/uploads/trusted-04-automation-control.jpg',
        'trusted-05-preventative-maintenance': '/uploads/trusted-05-preventative-maintenance.jpg',
        'trusted-06-global-spares-delivery': '/uploads/trusted-06-global-spares-delivery.jpg',
        'project-01-paper-mill-mena': '/uploads/project-01-paper-mill-mena.jpg',
        'project-02': '/uploads/project-02.jpg',
        'project-03': '/uploads/project-03.jpg',
        'project-04': '/uploads/project-04.jpg',
        'project-05': '/uploads/project-05.jpg',
        'project-06': '/uploads/project-06.jpg',
        'project-07': '/uploads/project-07.jpg',
        'project-08': '/uploads/project-08.jpg',
        'explore-01-technical-papers': '/uploads/explore-01-technical-papers.jpg',
        'explore-02-case-studies': '/uploads/explore-02-case-studies.jpg',
        'explore-03-sustainability': '/uploads/explore-03-sustainability.jpg',
        'explore-04-career-opportunities': '/uploads/explore-04-career-opportunities.jpg',
        'client-logo-01': '/uploads/client-logo-01.jpg',
        'client-logo-02': '/uploads/client-logo-02.jpg',
        'client-logo-03': '/uploads/client-logo-03.jpg',
        'onestop-hero': '/uploads/photo_9_2026-04-20_20-13-08.jpg'
      }
    });
    await settings.save();
    
    res.json({ message: 'Nuclear wipe & base seed successful!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/inspect-settings', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync-cloudinary', async (req, res) => {
  try {
    const mapping = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings({ images: {} });
    }

    // Comprehensive mapping: Save everything provided in the mapping to the images Map
    // This ensures that even if keys like 'gallery-04-assembly-line' weren't in our hardcoded list,
    // they get updated if they exist in the Cloudinary response.
    Object.keys(mapping).forEach(key => {
        // We trim extensions or handle specific naming conventions if needed
        // but generally we want to trust the mapping keys.
        settings.images.set(key, mapping[key]);
    });

    // Handle specific high-priority aliases
    if (mapping['intro']) settings.images.set('site-video', mapping['intro']);
    if (mapping['site-logo']) settings.images.set('site-logo', mapping['site-logo']);

    await settings.save();
    res.json({ message: 'Cloudinary sync successful!', count: settings.images.size });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
