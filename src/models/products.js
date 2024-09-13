// models.js
import mongoose from 'mongoose';

// Productos Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true, unique: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: String, required: false},
  status: { type: Boolean, required: true },
});
const Product = mongoose.model('Product', productSchema);

export default Product;


