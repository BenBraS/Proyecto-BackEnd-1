// models.js
import mongoose from 'mongoose';

// Productos Schema
const productosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: String, required: true },
  status: { type: Boolean, required: true },
});
const Producto = mongoose.model('Producto', productosSchema);

export default Producto


