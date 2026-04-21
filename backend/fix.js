const mongoose = require('mongoose');

// The script requested by the user / ChatGPT
mongoose.connect('mongodb+srv://Hamed:Hamed%401975@cluster0.zlg2wwk.mongodb.net/elmotahida?retryWrites=true&w=majority&appName=Cluster0');

setTimeout(async () => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    for (const col of collections) {
      const c = db.collection(col.name);
      const docs = await c.find({}).toArray();
      
      for (const doc of docs) {
        const update = {};
        for (const [key, val] of Object.entries(doc)) {
          if (typeof val === 'string' && val.includes('localhost:5000')) {
            update[key] = val.replace(/http:\/\/localhost:5000/g, 'https://el-motahidacom-production.up.railway.app');
          }
        }
        if (Object.keys(update).length > 0) {
          await c.updateOne({ _id: doc._id }, { $set: update });
          console.log('Fixed doc in:', col.name);
        }
      }
    }
    
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error("Crash during fix:", err.message);
    process.exit(1);
  }
}, 3000);
