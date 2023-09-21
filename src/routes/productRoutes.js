const express = require('express');
const router = express.Router();
const ProductManager = require('../productManager'); // Importa la clase ProductManager


// Crear una instancia de ProductManager
const path = '../archivos/textoSincrono.json'; // 
const productManager = new ProductManager(path);


// Obtener la lista de productos con posibilidad de límite
router.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts();

    if (limit !== undefined) {
        res.setHeader('Content-Type','text/html');
        res.status(200).render('products');
    } else {
        res.setHeader('Content-Type','text/html');
        res.status(200).render('products');
        //res.json(products);
    }
});

// Obtener un producto por su ID
router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}` });
    }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.sendStatus(201);
});

// Actualizar un producto por su ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { field, value } = req.body;
    productManager.updateProduct(id, field, value);
    res.sendStatus(200);
});

// Eliminar un producto por su ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productManager.deleteProduct(id);
    res.sendStatus(204);
});

module.exports = router;
