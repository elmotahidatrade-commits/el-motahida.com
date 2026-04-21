const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dz6rktqng',
  api_key: '555364853382621',
  api_secret: 'NPuVvw5lUjyrTL6y4ZFSXzvClUw'
});

async function migrate() {
    try {
        console.log('--- STARTING IMAGE UPLOAD TO CLOUDINARY (NO DB) ---');
        
        const uploadsDir = path.join(__dirname, 'uploads');
        const files = fs.readdirSync(uploadsDir).filter(f => !f.endsWith('.py'));
        console.log(`Found ${files.length} files to upload.`);

        const mapping = {};

        for (const file of files) {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) continue;

            console.log(`Uploading: ${file}...`);
            try {
                const options = {
                    folder: 'elmotahida_production',
                    use_filename: true,
                    unique_filename: false,
                    resource_type: file.endsWith('.mp4') ? 'video' : 'image'
                };

                const result = await cloudinary.uploader.upload(filePath, options);
                
                const key = file.replace(/\.[^/.]+$/, ""); // strip extension
                mapping[key] = result.secure_url;
                mapping[file] = result.secure_url;

                console.log(`  ✅ Done: ${file} -> ${result.secure_url}`);
            } catch (err) {
                console.error(`  ❌ Failed to upload ${file}:`, err.message);
            }
        }

        fs.writeFileSync('cloudinary_mapping.json', JSON.stringify(mapping, null, 2));
        console.log('\n✅ MAPPING SAVED TO cloudinary_mapping.json');
        process.exit(0);
    } catch (error) {
        console.error('💥 FATAL ERROR:', error);
        process.exit(1);
    }
}

migrate();
