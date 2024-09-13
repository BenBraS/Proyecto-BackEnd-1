import mongoose from 'mongoose';

// Definir el esquema para los carritos
const carritoSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Relación con el modelo Producto
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

// Crear el modelo de Mongoose
const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;