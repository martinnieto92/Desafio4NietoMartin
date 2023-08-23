const express = require('express');
const fs = require('fs');
const ProductManager = require('./productManager'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

// Crear una instancia de ProductManager
const path = '../archivos/textoSincrono.json'; // Asegúrate de que la ruta sea correcta
const productManager = new ProductManager(path);

app.use(express.json());

// Obtener la lista de productos con posibilidad de límite
app.get('/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts();
    
    if (limit !== undefined) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});

// Obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}` });
    }
});

// Agregar un nuevo producto
app.post('/products', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.sendStatus(201);
});

// Actualizar un producto por su ID
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { field, value } = req.body;
    productManager.updateProduct(id, field, value);
    res.sendStatus(200);
});

// Eliminar un producto por su ID
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productManager.deleteProduct(id);
    res.sendStatus(204);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
