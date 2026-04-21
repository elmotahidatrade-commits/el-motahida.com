const User = require('../models/User');
const SiteSettings = require('../models/SiteSettings');

const seedDataInternal = async () => {
  try {
    console.log('Seeding Internal Memory Database...');
    
    // Clear existing
    await User.deleteMany();
    await SiteSettings.deleteMany();

    // 1. Admin
    await User.create({
      name: 'Super Admin',
      email: 'admin@elmotahida.com',
      password: 'password123', // Model usually hashes on save/create
      isAdmin: true
    });

    // 2. Settings & Images
    await SiteSettings.create({
      siteName: { en: 'EL-Motahida Trade', ar: 'شركة المتحده للتجارة' },
      email: 'Hamedsamaha75@gmail.com',
      phone: '+201118964175',
      landline: '0473861560',
      address: 'Industrial Area, Cairo, Egypt',
      socialLinks: {
          facebook: 'https://facebook.com/elmotahida',
          linkedin: 'https://linkedin.com/company/elmotahida',
          twitter: 'https://twitter.com/elmotahida'
      },
      images: {
        'hero-bg-01': '/uploads/hero-bg-01.jpg',
        'hero-bg-02': '/uploads/hero-bg-02.jpg',
        'gallery-01-casting-unit': '/uploads/gallery-01-casting-unit.jpg',
        'gallery-02-machining-center': '/uploads/gallery-02-machining-center.jpg',
        'gallery-03-quality-control': '/uploads/gallery-03-quality-control.jpg',
        'expertise-01-pulp-machinery': '/uploads/expertise-01-pulp-machinery.jpg',
        'expertise-02-paper-machine-solutions': '/uploads/expertise-02-paper-machine-solutions.jpg',
        'product-01-double-disc-refiner': '/uploads/product-01-double-disc-refiner.jpg',
        'product-02-pressure-screen': '/uploads/product-02-pressure-screen.jpg',
        'trusted-01-turnkey-installations': '/uploads/trusted-01-turnkey-installations.jpg',
        'trusted-02-custom-heavy-machinery': '/uploads/trusted-02-custom-heavy-machinery.jpg',
        'project-01-paper-mill-mena': '/uploads/project-01-paper-mill-mena.jpg',
        'explore-01-technical-papers': '/uploads/explore-01-technical-papers.jpg',
        'explore-02-case-studies': '/uploads/explore-02-case-studies.jpg',
        'client-logo-02': '/uploads/client-logo-02.jpg',
        'client-logo-03': '/uploads/client-logo-03.jpg',
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

    console.log('Internal Seeding Complete.');
  } catch (err) {
    console.error('Internal Seeding Failed:', err);
  }
};

module.exports = { seedDataInternal };
