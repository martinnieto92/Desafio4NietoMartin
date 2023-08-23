const fs = require('fs')

class ProductManager {
    constructor(filePath) {
        this.Products = [];
        this.path = filePath;
        
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

let path = '../archivos/textoSincrono.json'


let tm = new ProductManager(path);
console.log(tm.getProducts());


tm.addProduct('mesa', 'cuadrada', 500, 'foto', 123, 500);
tm.addProduct('mate', 'redondo', 200, 'foto', 321, 300);
tm.addProduct('notebook', 'roja', 9500, 'foto', 323, 100);
//tm.addProduct('notebook', 'roja', 9500, 'foto', 323, 100);
console.log(tm.getProducts()); //arreglo vacio

const product = tm.getProductById(3);

if (product !== undefined) {
    console.log("Producto encontrado:", product);
    fs.writeFileSync(path, JSON.stringify(product, null, '\t'))
}

tm.updateProduct(2, 'price', 2500000); // Actualizar el precio del producto con ID 2,, en este caso solo actualizo una variable
console.log(tm)

//tm.deleteProduct(1); // Eliminar el producto con ID 1
console.log(tm)

module.exports = ProductManager;