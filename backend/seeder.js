const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const SiteSettings = require('./models/SiteSettings');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data to prevent duplicates during initial seed
    await User.deleteMany();
    await SiteSettings.deleteMany();

    // 1. Create Super Admin User
    const superAdmin = new User({
      name: 'Super Admin',
      email: 'admin@elmotahida.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'superadmin',
    });
    await superAdmin.save();

    // 2. Insert User-Provided Site Settings
    const settings = new SiteSettings({
      siteName: { en: 'EL-Motahida Trade', ar: 'شركة المتحده للتجارة' },
      email: 'Hamedsamaha75@gmail.com',
      phone: '+201118964175',
      landline: '0473861560',
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
        'client-logo-04': '/uploads/photo_7_2026-04-20_20-13-20.jpg',
        'client-logo-05': '/uploads/photo_8_2026-04-20_20-12-55.jpg',
        'client-logo-06': '/uploads/photo_8_2026-04-20_20-12-59.jpg',
        'onestop-hero': '/uploads/photo_9_2026-04-20_20-13-08.jpg',
        'site-video': '/uploads/intro.mp4',
        'site-logo': '/uploads/site-logo.png',
        'site-logo-light': '/uploads/site-logo.png',
        'extra-01': '/uploads/photo_7_2026-04-20_20-13-20.jpg',
        'extra-02': '/uploads/photo_8_2026-04-20_20-12-55.jpg',
        'extra-03': '/uploads/photo_8_2026-04-20_20-12-59.jpg',
        'extra-04': '/uploads/photo_8_2026-04-20_20-13-08.jpg',
        'extra-05': '/uploads/photo_8_2026-04-20_20-13-12.jpg',
        'extra-06': '/uploads/photo_8_2026-04-20_20-13-15.jpg',
        'extra-07': '/uploads/photo_9_2026-04-20_20-12-59.jpg',
        'extra-08': '/uploads/photo_9_2026-04-20_20-13-08.jpg',
        'extra-09': '/uploads/photo_9_2026-04-20_20-13-12.jpg',
        'extra-10': '/uploads/photo_9_2026-04-20_20-13-15.jpg'
      }
    });
    await settings.save();

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
