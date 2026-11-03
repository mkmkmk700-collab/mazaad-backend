const express = require('express');
const mongoose = require('mongoose');
const Ad = require('./models/Ad');

const app = express();
app.use(express.json()); // السماح بقراءة بيانات JSON المرسلة

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

// الاتصال بقاعدة بيانات MongoDB Atlas
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// الصفحة الرئيسية للتأكد من عمل السيرفر
app.get('/', (req, res) => {
  res.send('Mazaad Syria Backend is running and connected to DB!');
});

// 1. مسار جلب جميع الإعلانات
app.get('/api/ads', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ads' });
  }
});

// 2. مسار إضافة إعلان جديد
app.post('/api/ads', async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create ad', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});