import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');

export default class CartManager {
    constructor() {
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    // Método para guardar los carritos en el archivo JSON
    saveToFile() {
        fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }

    // Método para obtener todos los carritos
    getAllCarts() {
        return this.carts;
    }

    // Método para obtener un carrito por su ID
    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    // Método para crear un nuevo carrito
    addCart() {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []
        };
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    // Método para agregar un producto a un carrito
    addProductToCart(cartId, productId) {
        const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) return null;

        const productInCart = this.carts[cartIndex].products.find(product => product.id === productId);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            this.carts[cartIndex].products.push({ id: productId, quantity: 1 });
        }

        this.saveToFile();
        return this.carts[cartIndex];
    }

    // Método para eliminar un carrito por su ID
    deleteCart(id) {
        const cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex === -1) return null;

        const deletedCart = this.carts.splice(cartIndex, 1);
        this.saveToFile();
        return deletedCart[0];
    }
}
