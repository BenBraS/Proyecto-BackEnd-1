// socket.js
import { Server } from 'socket.io';
import ProductManager from '../services/ProductManager.js';

// Instancia de ProductManager
const productManager = new ProductManager();

let socketServer;

export default function configureSocket(httpServer) {
  if (socketServer) return socketServer; // Devuelve la instancia existente

  socketServer = new Server(httpServer);
  socketServer.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar la lista de productos actual a un nuevo cliente
    const products = await productManager.getAllProducts();
    socket.emit('updateProducts', { products, message: '' });

    socket.on('productAdded', async (product) => {
      try {
        await productManager.addProduct(product);
        const updatedProducts = await productManager.getAllProducts();
        socketServer.emit('updateProducts', { products: updatedProducts, message: 'Producto agregado exitosamente' });
      } catch (error) {
        socketServer.emit('updateProducts', { products: [], message: 'Error al agregar el producto' });
      }
    });

    socket.on('productDeleted', async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        const updatedProducts = await productManager.getAllProducts();
        socketServer.emit('updateProducts', { products: updatedProducts, message: 'Producto eliminado exitosamente' });
      } catch (error) {
        socketServer.emit('updateProducts', { products: [], message: 'Error al eliminar el producto' });
      }
    });
  });

  return socketServer;
}

