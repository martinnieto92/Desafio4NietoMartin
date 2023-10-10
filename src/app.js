const express = require('express');
//const fs = require('fs');
const productRoutes = require('./routes/productRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const app = express();
const port = 8080; // 
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')



const path = require('path') 


// Configura Handlebars como motor de plantillas

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Sirve archivos estáticos desde la carpeta 'public'


app.use(express.static(path.join(__dirname +'/public')));

app.use('/api/products', productRoutes)
// Sirve los archivos estáticos, incluido socket.io.js
app.use('/api/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

app.use('/api/carts', cartRoutes)



const socketIo = require("socket.io");
// Iniciar el servidor
const httpServer = app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});

const io = new socketIo.Server(httpServer);



// // Iniciar el servidor
// const serverExpress = app.listen(port, () => console.log(`Servidor Express escuchando en el puerto ${port}`))
// const io = new Server (serverExpress)
// require('socket.io')(io);



