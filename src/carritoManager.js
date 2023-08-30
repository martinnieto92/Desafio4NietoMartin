const fs = require('fs')

class CarritoManager {
    constructor(filePath) {
        this.Carrito = this.readJson(filePath);
        this.path = filePath;
    }

    //Leer JSON
    readJson(filePath) {
        return JSON.parse(fs.readFileSync(filePath));
    }

     // Guardar productos en el archivo
    saveCarrito() {
        fs.writeFileSync(this.path, JSON.stringify(this.Carrito, null, '\t'));
    }

    // Actualizar un campo específico de un producto por su ID
    updateProduct(id, field, value) {
        const productToUpdate = this.Carrito.find(product => product.id === id);
        if (!productToUpdate) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }
        productToUpdate[field] = value; // Actualizar el campo especificado
        this.saveCarrito(); // Guardar cambios después de actualizar
    }

     // Eliminar un producto por su ID
    deleteProduct(id) {
        const indexToDelete = this.Carrito.findIndex(product => product.id === id);
        if (indexToDelete === -1) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }

        this.Carrito.splice(indexToDelete, 1); // Eliminar el producto de la lista
        this.saveCarrito(); // Guardar cambios después de eliminar
    }

    getCarrito() {
        return this.Carrito
    }

    addCarrito(products) {
        
        let nuevoProductoCarrito = {
            products
        }
        if (this.Carrito.length === 0) {
            nuevoProductoCarrito.id = 1
        }
        else
            nuevoProducto.id = this.Carrito.length + 1

        this.Carrito.push(nuevoProductoCarrito)
}

}


module.exports = CarritoManager;