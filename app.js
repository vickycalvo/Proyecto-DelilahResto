/** DEFINICIONES */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/** MIDDLEWARES */
// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/**
 * IMPORT ROUTES
 */
const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');


// ROUTES
app.use('/users', userRoutes); 
app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);


//SERVIDOR
app.listen(3000, () => {
    console.log((new Date()).toISOString() + " - Server Iniciado")
});

