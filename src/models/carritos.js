// Cursos Schema
import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacherName: { type: String, required: true },
  students: { type: [String], required: true },
});

const Carrito = mongoose.model('Course', carritoSchema);

export default Carrito