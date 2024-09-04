import express from 'express';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import views from '../src/routes/views.js';
import cartsRouter from './routes/carts.router.js';
import ProductManager from './services/ProductManager.js';

// Configuración Servidor
const PORT = 9090;
const app = express();
const httpServer = app.listen(PORT, () =>
    console.log("Servidor escuchando por el puerto: " + PORT));
export const socketServer = new Server(httpServer);

// Instancia de ProductManager
const productManager = new ProductManager();

// CONFIGURACIONES HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración para archivos públicos
app.use(express.static(__dirname + '/public/'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', views);

// Ruta para la vista "home"
app.get('/', async (req, res) => {
    const products = await productManager.getAllProducts();
    res.render('home', { products });
});

// Ruta para la vista "realTimeProducts"
app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getAllProducts();
    res.render('realTimeProducts', { products });
});

// WebSockets
socketServer.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar la lista de productos actual a un nuevo cliente
    const products = await productManager.getAllProducts();
    socket.emit('updateProducts', { products, message: '' });

    socket.on('productAdded', async (product) => {
        try {
            await productManager.addProduct(product);
            const products = await productManager.getAllProducts();
            socketServer.emit('updateProducts', { products, message: 'Producto agregado exitosamente' });
        } catch (error) {
            socketServer.emit('updateProducts', { products: [], message: 'Error al agregar el producto' });
        }
    });

   /*  socket.on('productUpdated', async (product) => {
        try {
            await productManager.updateProduct(product.id, product);
            const products = await productManager.getAllProducts();
            socketServer.emit('updateProducts', { products, message: 'Producto actualizado exitosamente' });
        } catch (error) {
            socketServer.emit('updateProducts', { products: [], message: 'Error al actualizar el producto' });
        }
    }); */

    socket.on('productDeleted', async (productId) => {
        try {
            await productManager.deleteProduct(productId);
            const products = await productManager.getAllProducts();
            socketServer.emit('updateProducts', { products, message: 'Producto eliminado exitosamente' });
        } catch (error) {
            socketServer.emit('updateProducts', { products: [], message: 'Error al eliminar el producto' });
        }
    });
});
