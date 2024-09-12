import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import views from '../src/routes/views.js';
import cartsRouter from './routes/carts.router.js';
import configureSocket from './WebSocket/socket.js';

// Configuración Servidor
const PORT = 9090;
const app = express();
const httpServer = app.listen(PORT, () =>
    console.log("Servidor escuchando por el puerto: " + PORT));



// CONFIGURACIONES HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars');

// WebSocket
const socketServer = configureSocket(httpServer)

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración para archivos públicos
app.use(express.static(__dirname + '/public/'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
//Vistas
app.use('/', views);


