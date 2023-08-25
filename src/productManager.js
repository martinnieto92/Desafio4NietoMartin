const fs = require('fs')

class ProductManager {
    constructor(filePath) {
        this.Products = this.readJson(filePath);
        this.path = filePath;
    }

    //Leer JSON
    readJson(filePath) {
        return JSON.parse(fs.readFileSync(filePath));
    }

     // Guardar productos en el archivo
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.Products, null, '\t'));
    }

    // Actualizar un campo específico de un producto por su ID
    updateProduct(id, field, value) {
        const productToUpdate = this.Products.find(product => product.id === id);
        if (!productToUpdate) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }
        productToUpdate[field] = value; // Actualizar el campo especificado
        this.saveProducts(); // Guardar cambios después de actualizar
    }

     // Eliminar un producto por su ID
    deleteProduct(id) {
        const indexToDelete = this.Products.findIndex(product => product.id === id);
        if (indexToDelete === -1) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }

        this.Products.splice(indexToDelete, 1); // Eliminar el producto de la lista
        this.saveProducts(); // Guardar cambios después de eliminar
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const productExists = this.Products.some(
            product => product.title === title && product.code === code
        );

        if (productExists) {
            console.log((`Error: Ya existe un producto con el mismo título y código.`));
        }

        let nuevoProducto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (this.Products.length === 0) {
            nuevoProducto.id = 1
        }
        else
            nuevoProducto.id = this.Products.length + 1

        this.Products.push(nuevoProducto)
    }

    getProducts() {
        return this.Products
    }

    getProductById(id) {
        const product = this.Products.find(product => product.id === id);
        if (!product) {
            console.log((`Error: No se encontró ningún producto con el ID ${id}.`));
        }
        return product;
    }

}


module.exports = ProductManager;