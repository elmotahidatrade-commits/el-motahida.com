const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: 'dz6rktqng',
  api_key: '555364853382621',
  api_secret: 'NPuVvw5lUjyrTL6y4ZFSXzvClUw'
});

async function test() {
  try {
    console.log('Testing Cloudinary Credentials with Cloud Name: dz6rktqng...');
    const result = await cloudinary.uploader.upload(path.join(__dirname, 'uploads/site-logo.png'), {
      folder: 'elmotahida_test'
    });
    console.log('✅ TEST SUCCESS! URL:', result.secure_url);
    process.exit(0);
  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    process.exit(1);
  }
}

test();
