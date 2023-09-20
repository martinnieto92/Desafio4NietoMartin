const express = require('express');
const router = express.Router();
const CarritoManager = require('../carritoManager'); // Importa la clase CarritoManager


// Crear una instancia de CarritoManager
const path2 = '../archivos/textoSincrono2.json'; // 
const carritoManager = new CarritoManager(path2);


// Ruta raíz para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = []; // Inicializa newCart como una matriz vacía
    carritoManager.addCarrito(newCart);
    res.status(201).json(newCart);
});


// Ruta para listar los productos que pertenecen a un carrito específico
router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carritoManager.getCarritoById(cartId);

    if (!cart) {
        res.status(404).json({ error: `No se encontró ningún carriasdto con el ID ${cartId}` });
    } else {
        res.json(cart.products);
    }
});

// Ruta para listar los productos que pertenecen a un carrito específico
router.get('/', (req, res) => {
    const cart = carritoManager.getCarrito();

    if (!cart) {
        res.status(404).json({ error: `No se encontró ningún carriasdto con el ID ${cartId}` });
    } else {
        res.json(cart);
    }
});

// Eliminar un carrito por su ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    carritoManager.deleteCarrito(id);
    res.sendStatus(204);
});



// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity } = req.body;

    const cart = carritoManager.getCarritoById(cartId);
    const productToAdd = productManager.getProductById(productId);

    console.log('Cart:', cart);
    console.log('Product:', productToAdd);
    console.log('ProductId:', productId);

    if (!cart) {
        res.status(404).json({ error: `No se encontró ningún c44arrito con el ID ${cartId}` });
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

module.exports = router;
