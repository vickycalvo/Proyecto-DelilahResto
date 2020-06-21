const validations = {}


//valido que el usuario ingrese todos los datos pedidos como corresponde
validations.requireDataUserRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
 
    if (typeof(username) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the username'
        });
    }
    else if (typeof(password) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the password'
        });
    }else if (typeof(fullName) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the name'
        });
    }else if (typeof(email) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the email'
    });
    }else if (typeof(phoneNumber) !== "string") {
        res.status(404).json({
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
        res.status(404).json({
            mensaje: 'There was a problem with the username'
        });
    }
    else if (typeof(password) !== "string") {
        res.status(404).json({
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
        res.status(404).json({
            mensaje: 'There was a problem with the name'
        });
    }
    else if (typeof(description) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the description'
        });
    }else if (typeof(price) !== "number") {
        res.status(404).json({
            mensaje: 'There was a problem with the price'
        });
    }else if (typeof(imageSrc) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the image source'
    });   
    }else {
        next()
    }
}
 
validations.requireDataCreateOrder = (req, res, next) => {
    const id = req.body.id;
    const username = req.body.username;
    const state = req.body.state;
    const timeCreated = req.body.timeCreated;
    const description = req.body.description;
    const paymentMethod = req.body.paymentMethod;
    const paymentValue = req.body.paymentValue;
 
    if (typeof(id) !== "number") {
        res.status(404).json({
            mensaje: 'There was a problem with the id'
        });
    }
    else if (typeof(username) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the username'
        });
    }else if (typeof(state) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the state'
        });
    }else if (typeof(timeCreated) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the time created'
    });
    }else if (typeof(description) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the description'
    }); 
    }else if (typeof(paymentMethod) !== "string") {
        res.status(404).json({
            mensaje: 'There was a problem with the payment method'
    }); 
    }else if (typeof(paymentValue) !== "number") {
        res.status(404).json({
            mensaje: 'There was a problem with the payment value'
    });    
    }else {
        next()
    }


}

validations.requireDataModifyOrderStatus = (req, res, next) => {}







module.exports = validations