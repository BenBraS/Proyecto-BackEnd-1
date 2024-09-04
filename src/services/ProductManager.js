import fs from 'fs/promises'
import path from 'path'


const productsFilePath = path.resolve('data', 'productos.json')


export default class ProductManager{
    constructor(){
        this.products = []
        this.init()
    }

    async init(){
        try {
            const data = await fs.readFile(productsFilePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (error) {
            this.products= []
        }
    }

//Métodos

saveToFile(){
    fs.writeFile(productsFilePath, JSON.stringify(this.products, null, 2));
}

getAllProducts(limit){
    if(limit){
        return this.products.slice(0, limit)
    }
    return this.products
}

getProductById(id){
    return this.products.find(product => product.id === id)
}

addProduct(product) {
        // Verifica si el producto ya existe por su código
        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            // Si existe, suma el stock
            existingProduct.stock += product.stock;
            this.saveToFile();
            return existingProduct;
        }

        // Si no existe, crea un nuevo producto
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true
        };
        this.products.push(newProduct);
        this.saveToFile();
        return newProduct;
    }

async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;

    // Verificar si 'stock' está presente en los campos actualizados
    if ('stock' in updatedFields) {
        let currentStock = this.products[productIndex].stock;
        let adjustment = Number(updatedFields.stock); // Convertir a número

        // Calcular el nuevo stock
        let newStock = currentStock + adjustment;
        console.log(`Current stock: ${currentStock}, Adjustment: ${adjustment}, New stock: ${newStock}`);

        // Si el stock resultante es negativo, ajustarlo a 0 y establecer el estado en false
        if (newStock < 0) {
            updatedFields.stock = 0;
            updatedFields.status = false;
        } else {
            updatedFields.stock = newStock;
            updatedFields.status = newStock > 0;
        }
    }

    const updatedProduct = {
        ...this.products[productIndex],
        ...updatedFields,
        id: this.products[productIndex].id // Asegurar que el ID no se actualice
    };

    this.products[productIndex] = updatedProduct;
    await this.saveToFile(); // Guardar los cambios en el archivo
    return updatedProduct;
}
deleteProduct(id){
    const productIndex = this.products.findIndex(product => product.id === id)
 if(productIndex === -1) return null

 const deletedProduct = this.products.splice(productIndex, 1)
  this.saveToFile()
 return deletedProduct[0]
}
}