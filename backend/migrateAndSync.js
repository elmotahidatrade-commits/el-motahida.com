const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dz6rktqng',
  api_key: '555364853382621',
  api_secret: 'NPuVvw5lUjyrTL6y4ZFSXzvClUw'
});

async function run() {
    try {
        console.log('--- RE-GENERATING CLOUDINARY MAPPING ---');
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            console.error('Uploads directory not found!');
            process.exit(1);
        }
        
        const files = fs.readdirSync(uploadsDir).filter(f => !f.endsWith('.py'));
        const mapping = {};

        for (const file of files) {
            const filePath = path.join(uploadsDir, file);
            if (fs.statSync(filePath).isDirectory()) continue;

            console.log(`Checking/Uploading: ${file}...`);
            const options = {
                folder: 'elmotahida_production',
                use_filename: true,
                unique_filename: false,
                resource_type: file.endsWith('.mp4') ? 'video' : 'image'
            };

            const result = await cloudinary.uploader.upload(filePath, options);
            const safeKey = file.split('.')[0];
            mapping[safeKey] = result.secure_url;
            mapping[file] = result.secure_url;
        }

        console.log('Sending sanitized mapping to Railway...');
        const response = await fetch('https://el-motahidacom-production.up.railway.app/api/dev/sync-cloudinary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mapping)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ SYNC SUCCESS!', result);
        } else {
            console.error('❌ SYNC FAILED:', await response.text());
        }
        process.exit(0);
    } catch (error) {
        console.error('💥 ERROR:', error.message);
        process.exit(1);
    }
}

run();
