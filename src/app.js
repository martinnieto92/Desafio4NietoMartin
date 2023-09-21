const express = require('express');
//const fs = require('fs');
const productRoutes = require('./routes/productRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const app = express();
const port = 8080; // 
const handlebars = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path') 


// Configura Handlebars como motor de plantillas

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'/public')));

app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)


// Escuchar conexiones de clientes de socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado por WebSocket');

    // Cuando un producto se agrega o elimina, emite un evento 'productChange' a todos los clientes
    socket.on('productChange', () => {
        // Obtener la lista actualizada de productos
        const updatedProducts = productManager.getProducts();

        // Emitir la lista actualizada a todos los clientes conectados
        io.emit('updatedProducts', updatedProducts);
    });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});



