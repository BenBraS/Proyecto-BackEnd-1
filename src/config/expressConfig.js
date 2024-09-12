import handlebars from 'express-handlebars';
import productsRouter from '../routes/products.router.js';
import views from '../routes/views.js';
import cartsRouter from '../routes/carts.router.js';
import express from 'express'


export default function expressConfig(app, __dirname) {
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

  // Vistas
  app.use('/', views);
}