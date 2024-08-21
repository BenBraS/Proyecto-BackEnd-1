import {Router} from 'express'
import CartManager from '../services/CartManager.js'

const router = Router();
const cartManager = new CartManager();

// Ruta raíz POST /api/carts/ - Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.addCart();
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

// Ruta GET /api/carts/:cid - Obtener los productos de un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const carrito = cartManager.getCartById(parseInt(req.params.cid));

        if (carrito) {
            res.json(carrito.products);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Ruta POST /api/carts/:cid/product/:pid - Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const carritoActualizado = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));

        if (carritoActualizado) {
            res.json(carritoActualizado);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

// Ruta DELETE /api/carts/:cid - Eliminar un carrito por su ID
router.delete('/:cid', async (req, res) => {
    try {
        const carritoEliminado = cartManager.deleteCart(parseInt(req.params.cid));

        if (carritoEliminado) {
            res.json({ message: 'Carrito eliminado con éxito', carritoEliminado });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito' });
    }
});

export default router;
