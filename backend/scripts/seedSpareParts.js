const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const SparePart = require('../models/SparePart');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sparePartsData = [
  { partName: '26 agate & Pin', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/26 agate & Pin.jpg'], partNumber: 'EMT-26-AGP', description: 'Technical spare part: 26 agate & Pin.' },
  { partName: 'Agate', machineType: 'Machining Center', machineMake: 'EMT', images: ['/uploads/Agate.jpg'], partNumber: 'EMT-AG', description: 'Industrial tool component: Agate.' },
  { partName: 'Cap Felter', machineType: 'Quality Control', machineMake: 'EMT', images: ['/uploads/Cap Felter.jpg'], partNumber: 'EMT-CPF', description: 'Spare part component: Cap Felter.' },
  { partName: 'Case Felter', machineType: 'Manufacturing Facility', machineMake: 'EMT', images: ['/uploads/Case Felter.jpg'], partNumber: 'EMT-CSF', description: 'Precision equipment: Case Felter.' },
  { partName: 'Circular Knife', machineType: 'Slitting & Rewinding', machineMake: 'EMT', images: ['/uploads/Circular Knife.jpg'], partNumber: 'EMT-CN', description: 'Industrial cutting tool: Circular Knife.' },
  { partName: 'Coated Teflon Mould', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Coated Teflon Mould.jpg'], partNumber: 'EMT-CTM', description: 'High-precision coated teflon mould.' },
  { partName: 'Coated Teflon Mould2', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Coated Teflon Mould2.jpg'], partNumber: 'EMT-CTM2', description: 'Secondary specification coated teflon mould.' },
  { partName: 'Felter Press Cap', machineType: 'Press Section', machineMake: 'EMT', images: ['/uploads/Felter Press Cap.jpg'], partNumber: 'EMT-FPC', description: 'Operational component: Felter Press Cap.' },
  { partName: 'Fine industrial Pin', machineType: 'Precision Parts', machineMake: 'EMT', images: ['/uploads/Fine industrial Pin.jpg'], partNumber: 'EMT-FIP', description: 'Micro-component: Fine industrial Pin.' },
  { partName: 'Holder 8 holes', machineType: 'Assembly line', machineMake: 'EMT', images: ['/uploads/Holder 8 holes.jpg'], partNumber: 'EMT-H08', description: 'Industrial part holder with 8 holes.' },
  { partName: 'Holders Four Holes', machineType: 'Assembly line', machineMake: 'EMT', images: ['/uploads/Holders Four Holes.jpg'], partNumber: 'EMT-H04', description: 'Precision part holder set (4 holes).' },
  { partName: 'Male Press', machineType: 'Press Section', machineMake: 'EMT', images: ['/uploads/Male Press.jpg'], partNumber: 'EMT-MPS', description: 'Core machinery unit: Male Press.' },
  { partName: 'Mould', machineType: 'Molded Fiber Tech', machineMake: 'EMT', images: ['/uploads/Mould.jpg'], partNumber: 'EMT-MLD', description: 'General industrial moulding tool.' },
  { partName: 'Retainer', machineType: 'Mechanical Seals', machineMake: 'EMT', images: ['/uploads/Retainer.jpg'], partNumber: 'EMT-RET', description: 'Technical seal component: Retainer.' },
  { partName: 'Set of Agate & Pin 19 Holes', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/Set of Agate & Pin 19 Holes.jpg'], partNumber: 'EMT-AGP-19', description: 'Specialized 19-hole set of agate and pin.' },
  { partName: 'Set of Agate & Pin 7 Holes', machineType: 'Casting Unit', machineMake: 'EMT', images: ['/uploads/Set of Agate & Pin 7 Holes.jpg'], partNumber: 'EMT-AGP-07', description: 'Precision 7-hole set of agate and pin.' },
  { partName: 'Very Fine tools Mechanical very fine equipments', machineType: 'Precision Tools', machineMake: 'EMT', images: ['/uploads/Very Fine tools Mechanical very fine equipments.jpg'], partNumber: 'EMT-VFT', description: 'High-precision mechanical fine equipment set.' },
  { partName: 'palette', machineType: 'Materials handling', machineMake: 'EMT', images: ['/uploads/palette.jpg'], partNumber: 'EMT-PAL', description: 'Durable industrial palette.' },
  { partName: 'special Plastic Product', machineType: 'Molded Products', machineMake: 'EMT', images: ['/uploads/special Plastic Product.jpg'], partNumber: 'EMT-SPP', description: 'Unique specialized plastic product mould.' },
  { partName: 'Comlete Press', machineType: 'Machinery Video', machineMake: 'EMT', images: ['/uploads/Comlete Press.mp4'], partNumber: 'EMT-VID-01', description: 'Video demonstration of the complete press unit.' },
  { partName: 'Comlete Press2', machineType: 'Machinery Video', machineMake: 'EMT', images: ['/uploads/Comlete Press2.mp4'], partNumber: 'EMT-VID-02', description: 'Operational overview video of the complete press.' }
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
