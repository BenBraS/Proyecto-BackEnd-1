import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();
const p = new ProductManager()

router.get('/', async (req, res) => {
    try {
       
        const products = await p.getAllProducts();
        res.render('home', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});

// Ruta para la vista "realTimeProducts"
router.get('/realtimeproducts', async (req, res) => {
    const products = await p.getAllProducts();
    res.render('realTimeProducts', { products });
});


export default router;
