const validations = {}


//valido que el usuario ingrese todos los datos pedidos como corresponde
validations.requireDataUserRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
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
    }else if (typeof(adress) !== "string") {
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
 

//valido que el usuario ingrese todos los datos pedidos como corresponde
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
 
validations.requireDataCreateOrder = (req, res, next) => {
    const id_user = req.body.id_user;
    const state = req.body.state;
    const createdAt = req.body.createdAt;
    const description = req.body.products;
    const paymentMethod = req.body.paymentMethod;
    const paymentValue = req.body.paymentValue;
    const updatedAt = req.body.updatedAt;

    console.log(typeof(description))

 
    if (typeof(id_user) !== "number") {
        res.status(400).json({
            mensaje: 'There was a problem with the user id'
        });
    }else if (typeof(state) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the state'
        });
    }else if (typeof(createdAt) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the created date and/or time'
    });
    }else if (typeof(description) !== "object") {
        res.status(400).json({
            mensaje: 'There was a problem with the description'
    }); 
    }else if (typeof(paymentMethod) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the payment method'
    }); 
    }else if (typeof(paymentValue) !== "number") {
        res.status(400).json({
            mensaje: 'There was a problem with the payment value'
    });
    }else if (typeof(updatedAt) !== "string") {
        res.status(400).json({
            mensaje: 'There was a problem with the updated date and/or time'
    });      
    }else {
        next()
    }


}

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

validations.ProductsIdExistCreateOrder = (req, res, next) => {
    
    let productsArray = req.body.products
    for (let i = 0; i < productsArray.length; i++) {

        const productId = productsArray[i].id
        let product= {};
        
        database.query('SELECT * FROM products where id=:id',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                id: productId
            }
        }).then (rta => {

            if(rta.length !== 0) {
                next()
            }else{
                res.status(404).json({
                    response: {
                        message: 'Product not found',
                    }
                });
            }

        })
}}


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
        //si encontro uno en la tabla de datos, creo el token de inicio de sesión del usuario 
        if (response.length !==0){
            next()
        }else{
           res.status(404).json({
               mensaje: 'User not found'
           });
        }})
}


module.exports = validations