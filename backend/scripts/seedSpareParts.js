const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const SparePart = require('../models/SparePart');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sparePartsData = [
  { partName: 'Precision Agate & Pin Set (26 Units)', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/26 agate & Pin.jpg'], partNumber: 'EMT-26-AGP', description: 'Advanced technical spare part system including 26 precision agate and pin components.' },
  { partName: 'Industrial Agate Component', machineType: 'Machining Center', machineMake: 'EMT', images: ['/uploads/Agate.jpg'], partNumber: 'EMT-AG', description: 'High-performance industrial agate tool component for machining systems.' },
  { partName: 'High-Precision Cap Felter', machineType: 'Quality Control', machineMake: 'EMT', images: ['/uploads/Cap Felter.jpg'], partNumber: 'EMT-CPF', description: 'Precision-engineered cap felter for quality control and operational consistency.' },
  { partName: 'Professional Case Felter Unit', machineType: 'Manufacturing Facility', machineMake: 'EMT', images: ['/uploads/Case Felter.jpg'], partNumber: 'EMT-CSF', description: 'High-durability case felter unit for industrial manufacturing facilities.' },
  { partName: 'Heavy-Duty Circular Knife', machineType: 'Slitting & Rewinding', machineMake: 'EMT', images: ['/uploads/Circular Knife.jpg'], partNumber: 'EMT-CN', description: 'Industrial-grade circular cutting knife for high-volume slitting and rewinding.' },
  { partName: 'Advanced Teflon Coated Mould', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Coated Teflon Mould.jpg'], partNumber: 'EMT-CTM', description: 'High-precision industrial mould with advanced teflon coating for superior durability.' },
  { partName: 'Specialized Teflon Coated Mould (Type B)', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Coated Teflon Mould2.jpg'], partNumber: 'EMT-CTM2', description: 'Secondary specification coated teflon mould for specialized molded fiber applications.' },
  { partName: 'Press Section Felter Cap', machineType: 'Press Section', machineMake: 'EMT', images: ['/uploads/Felter Press Cap.jpg'], partNumber: 'EMT-FPC', description: 'Operational press section component: Heavy-duty Felter Press Cap.' },
  { partName: 'Micro-Precision Industrial Pin', machineType: 'Precision Parts', machineMake: 'EMT', images: ['/uploads/Fine industrial Pin.jpg'], partNumber: 'EMT-FIP', description: 'Specialized micro-component industrial pin for precision machinery assemblies.' },
  { partName: 'Eight-Hole Part Holder', machineType: 'Assembly line', machineMake: 'EMT', images: ['/uploads/Holder 8 holes.jpg'], partNumber: 'EMT-H08', description: 'Durable industrial part holder featuring a standardized 8-hole configuration.' },
  { partName: 'Precision Four-Hole Holders', machineType: 'Assembly line', machineMake: 'EMT', images: ['/uploads/Holders Four Holes.jpg'], partNumber: 'EMT-H04', description: 'Custom-designed precision part holder set with four-hole configuration.' },
  { partName: 'Core Male Press System', machineType: 'Press Section', machineMake: 'EMT', images: ['/uploads/Male Press.jpg'], partNumber: 'EMT-MPS', description: 'Core industrial machinery unit: High-performance Male Press system.' },
  { partName: 'Industrial Moulding Unit', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Mould.jpg'], partNumber: 'EMT-MLD', description: 'General specification industrial moulding tool for fiber-based production.' },
  { partName: 'Precision Mechanical Retainer', machineType: 'Mechanical Seals', machineMake: 'EMT', images: ['/uploads/Retainer.jpg'], partNumber: 'EMT-RET', description: 'High-accuracy technical retainer for industrial mechanical seal assemblies.' },
  { partName: '19-Hole Agate & Pin Assembly', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/Set of Agate & Pin 19 Holes.jpg'], partNumber: 'EMT-AGP-19', description: 'Specialized 19-hole industrial assembly for agate and pin configurations.' },
  { partName: '7-Hole Agate & Pin Assembly', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/Set of Agate & Pin 7 Holes.jpg'], partNumber: 'EMT-AGP-07', description: 'Precision 7-hole technical assembly for standard agate and pin sets.' },
  { partName: 'Precision Mechanical Engineering Tools', machineType: 'Precision Tools', machineMake: 'EMT', images: ['/uploads/Very Fine tools Mechanical very fine equipments.jpg'], partNumber: 'EMT-VFT', description: 'Comprehensive high-precision mechanical engineering tool and equipment set.' },
  { partName: 'Heavy-Duty Industrial Palette', machineType: 'Materials handling', machineMake: 'EMT', images: ['/uploads/palette.jpg'], partNumber: 'EMT-PAL', description: 'Durable industrial-grade palette engineered for heavy load materials handling.' },
  { partName: 'Specialized Industrial Plastic Product', machineType: 'Molded Products', machineMake: 'EMT', images: ['/uploads/special Plastic Product.jpg'], partNumber: 'EMT-SPP', description: 'Unique specialized plastic product and mould for custom manufacturing projects.' },
  { partName: 'Complete Press Unit Overview', machineType: 'Machinery Video', machineMake: 'EMT', images: ['/uploads/Comlete Press.mp4'], partNumber: 'EMT-VID-01', description: 'Technical video demonstration and overview of the complete press system.' },
  { partName: 'Complete Press Unit Operation', machineType: 'Machinery Video', machineMake: 'EMT', images: ['/uploads/Comlete Press2.mp4'], partNumber: 'EMT-VID-02', description: 'Detailed operational overview video of the press unit in a production environment.' }
];

const seedSpareParts = async () => {
  try {
    await connectDB();
    await SparePart.deleteMany();
    const createdParts = await SparePart.insertMany(sparePartsData);
    console.log(`Success: Full sync of ${createdParts.length} assets completed with exact names.`);
    process.exit();
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedSpareParts();
