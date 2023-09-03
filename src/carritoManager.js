const fs = require('fs');

class CarritoManager {
    constructor(filePath) {
        this.Carrito = this.readJson(filePath);
        this.path = filePath;
    }

    readJson(filePath) {
        return JSON.parse(fs.readFileSync(filePath));
    }

    saveCarrito() {
        fs.writeFileSync(this.path, JSON.stringify(this.Carrito, null, '\t'));
    }

    updateProduct(id, field, value) {
        const productToUpdate = this.Carrito.find(product => product.id === id);
        if (!productToUpdate) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }
        productToUpdate[field] = value;
        this.saveCarrito();
    }

    deleteProduct(id) {
        const indexToDelete = this.Carrito.findIndex(product => product.id === id);
        if (indexToDelete === -1) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }

        this.Carrito.splice(indexToDelete, 1);
        this.saveCarrito();
    }

    getCarrito() {
        return this.Carrito;
    }

    getCarritoById(id) {
        return this.Carrito.find(cart => cart.id === id);
    }

    addCarrito(products) {
        const newCart = {
            id: this.Carrito.length === 0 ? 1 : this.Carrito.length + 1,
            products
        };
    
        this.Carrito.push(newCart);
        this.saveCarrito();
    }
    
}

module.exports = CarritoManager;
