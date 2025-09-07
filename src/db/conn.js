// src/db/conn.js
const mongoose = require('mongoose');

const uri =
  (process.env.MONGO_URL && process.env.MONGO_URL.trim()) ||
  (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) ||
  'mongodb://127.0.0.1:27017/devhub'; // local dev fallback

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('[mongo] connected:', uri);
});

mongoose.connection.on('error', (err) => {
  console.error('[mongo] connection error:', err);
});
