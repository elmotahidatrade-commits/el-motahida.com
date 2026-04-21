const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
const autoProvision = require('./provision');
const startServer = async () => {
  await connectDB();
  await autoProvision();
};
startServer();

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true })); 
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));

// Mock Mode Logic (for Live Test when DB is offline)
app.use((req, res, next) => {
  // Persistent Memory Database (Mock Mode)
  // This ensures "no fake info" while still functioning without an actual MongoDB installation.
  if (mongoose.connection.readyState !== 1 && req.path.startsWith('/api')) {
    
    // We bind these to the app object to persist across requests
    if (!app.locals.memoryDb) {
      app.locals.memoryDb = {
        quotes: [],
        users: [{
          _id: 'mock-admin-id',
          name: 'Super Admin (Mock)',
          email: 'admin@elmotahida.com',
          password: 'password123',
          role: 'superadmin',
        }]
      };
    }
    const db = app.locals.memoryDb;

    // Mock Login
    if (req.path === '/api/auth/login' && req.method === 'POST') {
      const { email, password } = req.body;
      const user = db.users.find(u => u.email === email && u.password === password);
      if (user) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: 'mock-jwt-token' // Auth middleware bypass handles this
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // Quote Requests (Full CRUD)
    if (req.path === '/api/quotes') {
      if (req.method === 'POST') {
        const newQuote = {
          _id: Math.random().toString(36).substr(2, 9),
          ...req.body,
          status: 'new',
          createdAt: new Date().toISOString()
        };
        db.quotes.push(newQuote);
        return res.status(201).json(newQuote);
      }
      if (req.method === 'GET') {
        return res.json(db.quotes.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    }

    // Settings (Static baseline to prevent visual crashes)
    if (req.path === '/api/settings') {
      return res.json({
        siteName: { en: 'EL-Motahida Trade', ar: 'شركة المتحده للتجارة' },
        email: 'elmotahidatrade@gmail.com',
        phone: '+201068846536',
        landline: '+201507887486',
        address: { en: 'Industrial Zone, Egypt', ar: 'المنطقة الصناعية، مصر' },
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
    }

    // Empty responses for other endpoints to prevent "fake info" but avoid crashes
    if (req.path === '/api/products') return res.json([]);
    if (req.path === '/api/projects') return res.json([]);
    if (req.path === '/api/clients') return res.json([]);
    if (req.path === '/api/spare-parts') return res.json([]);
    if (req.path === '/api/hero-slides') return res.json([]);
  }
  next();
});

// Static folder for local uploads (if not using cloudinary initially)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger setup
// const swaggerDocument = yaml.load('./swagger.yaml');
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Welcome route
app.get('/', (req, res) => {
  res.send('EL-Motahida Trade API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const projectRoutes = require('./routes/projectRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const sparePartRoutes = require('./routes/sparePartRoutes');
const heroSlideRoutes = require('./routes/heroSlideRoutes');
const clientRoutes = require('./routes/clientRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const devRoutes = require('./routes/devRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/spare-parts', sparePartRoutes);
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dev', devRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
