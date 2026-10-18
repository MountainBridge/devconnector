const mongoose = require('mongoose');
const db = process.env.MONGO_URI;
if (!db) throw new Error('Set MONGO_URI before starting the server.');
mongoose.set('strictQuery', false);
module.exports = async function connectDB() {
  try { await mongoose.connect(db); console.log('Connected to MongoDB'); }
  catch (err) { console.error(err.message); process.exit(1); }
};
