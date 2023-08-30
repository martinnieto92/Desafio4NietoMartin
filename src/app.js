const express = require('express');
const fs = require('fs');
const ProductManager = require('./productManager'); // 
const CarritoManager = require ('./carritoManager');

const app = express();
const port = 8080; // 

// Crear una instancia de ProductManager
const path = '../archivos/textoSincrono.json'; // 
const productManager = new ProductManager(path);
// Crear una instancia de CarritoManager
const path2 = '../archivos/textoSincrono2.json'; // 
const carritoManager = new CarritoManager(path2);

app.use(express.json());

// Obtener la lista de productos con posibilidad de límite
app.get('/api/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts();

    if (limit !== undefined) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});

// Obtener un producto por su ID
app.get('/api/products/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}` });
    }
});

// Agregar un nuevo producto
app.post('/api/products', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.sendStatus(201);
});

// Actualizar un producto por su ID
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { field, value } = req.body;
    productManager.updateProduct(id, field, value);
    res.sendStatus(200);
});

// Eliminar un producto por su ID
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productManager.deleteProduct(id);
    res.sendStatus(204);
});


// Agregar un nuevo carrito
app.post('/api/carts', (req, res) => {
    const { products } = req.body;
    carritoManager.addCarrito(products);
    res.sendStatus(201);
});

// Obtener la lista de productos con posibilidad de límite
app.get('/api/carts', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const carrito = carritoManager.getCarrito();

    if (limit !== undefined) {
        res.json(carrito.slice(0, limit));
    } else {
        res.json(carrito);
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
