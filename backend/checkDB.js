const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Hamed:Hamed%401975@cluster0.zlg2wwk.mongodb.net/elmotahida?retryWrites=true&w=majority&appName=Cluster0';

const SiteSettingsSchema = new mongoose.Schema({
    images: { type: Map, of: String }
}, { strict: false });
const SiteSettings = mongoose.model('SiteSettings', SiteSettingsSchema, 'settings');

async function check() {
    try {
        await mongoose.connect(MONGO_URI);
        const settings = await SiteSettings.findOne();
        if (settings) {
            console.log('--- CURRENT DB IMAGE KEYS ---');
            const keys = Array.from(settings.images.keys());
            keys.sort().forEach(k => {
                const url = settings.images.get(k);
                const isBroken = url.startsWith('/uploads');
                console.log(`${isBroken ? '❌' : '✅'} ${k}: ${url}`);
            });
        } else {
            console.log('No settings found');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
