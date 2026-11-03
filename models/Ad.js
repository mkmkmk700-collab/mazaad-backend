const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },       // عنوان الإعلان
  description: { type: String, required: true }, // وصف السلعة
  price: { type: Number, required: true },       // السعر
  city: { type: String, required: true },        // المحافظة السورية (دمشق، حلب، حمص، إلخ)
  category: { type: String, required: true },    // القسم (سيارات، عقارات، إلكترونيات، إلخ)
  imageUrl: { type: String },                    // رابط الصورة
  createdAt: { type: Date, default: Date.now }   // تاريخ النشر
});

module.exports = mongoose.model('Ad', adSchema);