const validations = {}


//valido que el usuario ingrese todos los datos pedidos como corresponde
validations.requireDataRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
 
    if (typeof(username) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso del usuario'
        });
    }
    else if (typeof(password) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso de la contraseña'
        });
    }else if (typeof(fullName) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso de la contraseña'
        });
    }else if (typeof(email) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso de la contraseña'
    });
    }else if (typeof(phoneNumber) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso del telefono'
    });   
    }else {
        next()
    }
}
 

//valido que el usuario ingrese todos los datos pedidos como corresponde
validations.requireDataLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
 
    if (typeof(username) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso del usuario'
        });
    }
    else if (typeof(password) !== "string") {
        res.status(404).json({
            mensaje: 'problema con el ingreso de la contraseña'
        });

    }else {
        next()

    }
}
 

module.exports = validations