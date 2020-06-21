/** DEFINICIONES */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');



/** MIDDLEWARES */
app.use(bodyParser.json());




/**
 * IMPORT ROUTES
 */
const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');



// ROUTES
app.use('/users', userRoutes); // /users es el comun a todas por el q use router
app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);



//SERVIDOR
app.listen(3000, () => {
    console.log((new Date()).toISOString() + " - Server Iniciado")
});

