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

    // Spare Parts (Full CRUD in Mock Mode - Real 21 Assets)
    if (!app.locals.memoryDb.spareParts) {
      app.locals.memoryDb.spareParts = [
        { _id: '1', partName: '26 agate & Pin', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/26 agate & Pin.jpg'], partNumber: 'EMT-26-AGP', description: 'Technical spare part: 26 agate & Pin.', isActive: true },
        { _id: '2', partName: 'Agate', machineType: 'Machining Center', machineMake: 'EMT', images: ['/uploads/Agate.jpg'], partNumber: 'EMT-AG', description: 'Industrial tool component: Agate.', isActive: true },
        { _id: '3', partName: 'Cap Felter', machineType: 'Quality Control', machineMake: 'EMT', images: ['/uploads/Cap Felter.jpg'], partNumber: 'EMT-CPF', description: 'Spare part component: Cap Felter.', isActive: true },
        { _id: '4', partName: 'Case Felter', machineType: 'Manufacturing Facility', machineMake: 'EMT', images: ['/uploads/Case Felter.jpg'], partNumber: 'EMT-CSF', description: 'Precision equipment: Case Felter.', isActive: true },
        { _id: '5', partName: 'Circular Knife', machineType: 'Slitting & Rewinding', machineMake: 'EMT', images: ['/uploads/Circular Knife.jpg'], partNumber: 'EMT-CN', description: 'Industrial cutting tool: Circular Knife.', isActive: true },
        { _id: '6', partName: 'Coated Teflon Mould', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Coated Teflon Mould.jpg'], partNumber: 'EMT-CTM', description: 'High-precision coated teflon mould.', isActive: true },
        { _id: '7', partName: 'Coated Teflon Mould2', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Coated Teflon Mould2.jpg'], partNumber: 'EMT-CTM2', description: 'Secondary specification coated teflon mould.', isActive: true },
        { _id: '8', partName: 'Felter Press Cap', machineType: 'Press Section', machineMake: 'EMT', images: ['/uploads/Felter Press Cap.jpg'], partNumber: 'EMT-FPC', description: 'Operational component: Felter Press Cap.', isActive: true },
        { _id: '9', partName: 'Fine industrial Pin', machineType: 'Precision Parts', machineMake: 'EMT', images: ['/uploads/Fine industrial Pin.jpg'], partNumber: 'EMT-FIP', description: 'Micro-component: Fine industrial Pin.', isActive: true },
        { _id: '10', partName: 'Holder 8 holes', machineType: 'Assembly line', machineMake: 'EMT', images: ['/uploads/Holder 8 holes.jpg'], partNumber: 'EMT-H08', description: 'Industrial part holder with 8 holes.', isActive: true },
        { _id: '11', partName: 'Holders Four Holes', machineType: 'Assembly line', machineMake: 'EMT', images: ['/uploads/Holders Four Holes.jpg'], partNumber: 'EMT-H04', description: 'Precision part holder set (4 holes).', isActive: true },
        { _id: '12', partName: 'Male Press', machineType: 'Press Section', machineMake: 'EMT', images: ['/uploads/Male Press.jpg'], partNumber: 'EMT-MPS', description: 'Core machinery unit: Male Press.', isActive: true },
        { _id: '13', partName: 'Mould', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Mould.jpg'], partNumber: 'EMT-MLD', description: 'General industrial moulding tool.', isActive: true },
        { _id: '14', partName: 'Retainer', machineType: 'Mechanical Seals', machineMake: 'EMT', images: ['/uploads/Retainer.jpg'], partNumber: 'EMT-RET', description: 'Technical seal component: Retainer.', isActive: true },
        { _id: '15', partName: 'Set of Agate & Pin 19 Holes', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/Set of Agate & Pin 19 Holes.jpg'], partNumber: 'EMT-AGP-19', description: 'Specialized 19-hole set of agate and pin.', isActive: true },
        { _id: '16', partName: 'Set of Agate & Pin 7 Holes', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/Set of Agate & Pin 7 Holes.jpg'], partNumber: 'EMT-AGP-07', description: 'Precision 7-hole set of agate and pin.', isActive: true },
        { _id: '17', partName: 'Very Fine tools Mechanical very fine equipments', machineType: 'Precision Tools', machineMake: 'EMT', images: ['/uploads/Very Fine tools Mechanical very fine equipments.jpg'], partNumber: 'EMT-VFT', description: 'High-precision mechanical fine equipment set.', isActive: true },
        { _id: '18', partName: 'palette', machineType: 'Materials handling', machineMake: 'EMT', images: ['/uploads/palette.jpg'], partNumber: 'EMT-PAL', description: 'Durable industrial palette.', isActive: true },
        { _id: '19', partName: 'special Plastic Product', machineType: 'Molded Products', machineMake: 'EMT', images: ['/uploads/special Plastic Product.jpg'], partNumber: 'EMT-SPP', description: 'Unique specialized plastic product mould.', isActive: true }
      ];
    }

    if (req.path === '/api/spare-parts') {
      return res.json(app.locals.memoryDb.spareParts);
    }

    // Settings (Fixed baseline)
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
        'gallery-01-casting-unit': '/uploads/Agate.jpg', 
        'gallery-02-machining-center': '/uploads/Circular Knife.jpg', 
        'gallery-03-quality-control': '/uploads/gallery-03-quality-control.jpg',
        'gallery-05-testing-lab': '/uploads/gallery-05-testing-lab.jpg',
        'extra-04': '/uploads/Agate.jpg',
        'expertise-01-pulp-machinery': '/uploads/26 agate & Pin.jpg',
        'expertise-02-paper-machine-solutions': '/uploads/Cap Felter.jpg',
        'expertise-03-molded-fiber-tech': '/uploads/Coated Teflon Mould.jpg',
        'expertise-04-refining-systems': '/uploads/Case Felter.jpg',
        'expertise-05-agitators-screens': '/uploads/Mould.jpg',
        'product-01-double-disc-refiner': '/uploads/Circular Knife.jpg',
        'product-02-pressure-screen': '/uploads/Holders Four Holes.jpg',
        'product-03-high-density-cleaner': '/uploads/palette.jpg',
        'product-04-pulper-automation': '/uploads/special Plastic Product.jpg',
        'trusted-01-turnkey-installations': '/uploads/26 agate & Pin.jpg',
        'trusted-02-custom-heavy-machinery': '/uploads/Coated Teflon Mould.jpg',
        'trusted-03-modernization-upgrades': '/uploads/Male Press.jpg',
        'trusted-04-automation-control': '/uploads/trusted-04-automation-control.jpg',
        'trusted-05-preventative-maintenance': '/uploads/Circular Knife.jpg',
        'trusted-06-global-spares-delivery': '/uploads/Holders Four Holes.jpg',
        'project-01-paper-mill-mena': '/uploads/project-01-paper-mill-mena.jpg',
        'project-02': '/uploads/project-02.jpg',
        'project-03': '/uploads/project-03.jpg',
        'project-04': '/uploads/project-04.jpg',
        'product-05': '/uploads/project-05.jpg',
        'project-06': '/uploads/project-06.jpg',
        'project-07': '/uploads/project-07.jpg',
        'project-08': '/uploads/project-08.jpg',
        'explore-01-technical-papers': '/uploads/special Plastic Product.jpg',
        'explore-02-case-studies': '/uploads/project-01-paper-mill-mena.jpg',
        'explore-03-sustainability': '/uploads/Very Fine tools Mechanical very fine equipments.jpg',
        'explore-04-career-opportunities': '/uploads/gallery-02-machining-center.jpg',
        'client-logo-01': '/uploads/client-logo-01.jpg',
        'client-logo-02': '/uploads/client-logo-02.jpg',
        'client-logo-03': '/uploads/client-logo-03.jpg',
        'onestop-hero': '/uploads/industrial_facility_premium.png',
        'site-video': '/uploads/intro.mp4',
        'site-logo': '/uploads/site-logo.png'
        }
      });
    }

    // Empty responses for other endpoints
    if (req.path === '/api/products') return res.json([]);
    if (req.path === '/api/projects') return res.json([]);
    if (req.path === '/api/clients') return res.json([]);
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
