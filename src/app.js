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


// Ruta raíz para crear un nuevo carrito
app.post('/api/carts', (req, res) => {
    const newCart = {
        products: []
    };
    carritoManager.addCarrito(newCart);
    res.status(201).json(newCart);
});

// Ruta para listar los productos que pertenecen a un carrito específico
app.get('/api/carts/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = carritoManager.getCarritoById(cartId);

    if (!cart) {
        res.status(404).json({ error: `No se encontró ningún carriasdto con el ID ${cartId}` });
    } else {
        res.json(cart.products);
    }
});

// Ruta para agregar un producto al carrito
app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    const cart = carritoManager.getCarritoById(cartId);
    const productToAdd = productManager.getProductById(productId);

    if (!cart) {
        res.status(404).json({ error: `No se encontró ningún carrito con el ID ${cartId}` });
    } else if (!productToAdd) {
        res.status(404).json({ error: `No se encontró ningún producto con el ID ${productId}` });
    } else {
        const existingProduct = cart.products.find(item => item.product === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity || 1;
        } else {
            cart.products.push({ product: productId, quantity: quantity || 1 });
        }

        carritoManager.updateCarrito(cart);

        res.status(201).json(cart);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
