const database = require('../database/connection'); 
const { response } = require('express');
const validations = {}


//valido que el usuario ingrese todos los datos pedidos como corresponde para registrarse
validations.requireDataUserRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const address = req.body.address
    const phoneNumber = req.body.phoneNumber;

    if (typeof(username) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the username'
        });
    }
    else if (typeof(password) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the password'
        });
    }else if (typeof(fullName) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the name'
        });
    }else if (typeof(email) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the email'
    });
    }else if (typeof(address) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the adress'
    });
    }else if (typeof(phoneNumber) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the phone number'
    });   
    }else {
        next()
    }
}


//valido que el usuario ingrese todos los datos pedidos como corresponde para el inicio de sesión
validations.requireDataUserLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (typeof(username) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the username'
        });
    }
    else if (typeof(password) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the password'
        });
    }else {
        next()
    }
}


//valido que se ingresen todos los campos necesarios para crear un producto
validations.requireDataCreateProduct = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imageSrc = req.body.imageSrc;

    
    if (typeof(name) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the name'
        });
    }
    else if (typeof(description) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the description'
        });
    }else if (typeof(price) !== "number") {
        res.status(400).json({
            mensaje: 'There was a problem with the price'
        });
    }else if (typeof(imageSrc) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the image source'
    });   
    }else {
        next()
    }
}

//valido que los datos sean del tipo correspondiente, si es que fueron incluidos en la query y no son undefined
validations.requireDataModifyProduct = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imageSrc = req.body.imageSrc;

    console.log(typeof(name))
    
    if (typeof(name) !== "string" && typeof(name) !== "undefined") {
        res.status(400).json({
            mensaje: 'There was a problem with the name'
        });
    }
    else if (typeof(description) !== "string" && typeof(description) !== "undefined") {
        res.status(400).json({
            mensaje: 'There was a problem with the description'
        });
    }else if (typeof(price) !== "number" && typeof(price) !== "undefined") {
        res.status(400).json({
            mensaje: 'There was a problem with the price'
        });
    }else if (typeof(imageSrc) !== "string" && typeof(imageSrc) !== "undefined") {
        res.status(400).json({
            mensaje: 'There was a problem with the image source'
    });   
    }else {
        next()
    }
}

//valido que se ingresen correctamente todos los campos necesarios para crear una orden
validations.requireDataCreateOrder = (req, res, next) => {
    const paymentMethod = req.body.paymentMethod;
    if (typeof(paymentMethod) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the payment method'
        }); 
    } else if (!Array.isArray(req.body.products)) {
        res.status(400).json({
            mensaje: 'There was a problem with the products'
        }); 
    } else {
        next()
    }
}

//valido que se ingrese correcatamente un nuevo estado de orden 
validations.requireDataModifyOrderStatus = (req, res, next) => {
    const state = req.body.state;
    if (typeof(state) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the state'
        });
    }
    else{
        next()
    }
}


//valido que existan los productos que se cargán en la orden. 
validations.ProductsIdExistCreateOrder = (req, res, next) => {
    const productsArray = req.body.products;
    const productsIds = productsArray.map(product => product.id);
    const productsWhere = `WHERE ${productsIds.map(productId => `id=${productId}`).join(' OR ')}`;
    database
        .query(`SELECT * FROM products ${productsWhere}`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(products => {
            if (products.length !== productsArray.length) {
                res.status(404).json({
                    response: {
                        message: 'One or more products not found',
                    }
                });
            } else {
                //guardo en req.locals los id de los productos que forman parte de la orden 
                req.locals = {
                    ...req.locals,
                    products
                }
                next();
            }
        })
        .catch(err => res.status(500).json(err))
}


//valido que exista el usuario que realize la orden 
validations.UserIdExistCreateOrder = (req, res, next) => {
    database.query( 
        'SELECT * FROM users where id= :userId',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                userId: req.body.id_user
            }
        }
    ).then(response => {
        if (response.length !==0){
            next()
        }else{
           res.status(404).json({
               mensaje: 'User not found'
           });
        }})
}
module.exports = validations