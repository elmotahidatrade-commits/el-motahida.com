const fs = require('fs');

async function sync() {
    try {
        console.log('Reading cloudinary_mapping.json...');
        const mapping = JSON.parse(fs.readFileSync('cloudinary_mapping.json', 'utf8'));
        
        console.log('Sending mapping to Railway production server...');
        const response = await fetch('https://el-motahidacom-production.up.railway.app/api/dev/sync-cloudinary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mapping)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ SYNC SUCCESS!', result);
        } else {
            const error = await response.text();
            console.log('❌ SYNC FAILED:', error);
        }
    } catch (err) {
        console.error('💥 ERROR during sync:', err.message);
    }
}

sync();
