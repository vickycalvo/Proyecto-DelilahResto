/** DEFINICIONES*/
const JWT = require('jsonwebtoken');
const JWTSign = 'SeCrEt2020.';
const controller = {}; //guardo todas las funciones a exportar en este controlador

const sequelize = require('../database/connection'); 



let arrayUsuarios = [
    {
        username : "vicky",
        password : "calvo"
    },
    {
        username : "sofi",
        password : "calvo" 
    }
]


/** MIDDLWARES */

//-----Generales-----
const catchSQLError = (res, err) => {
    res.status(500).json({
        mensaje : "Ocurrio un error",
        error: err
   });
};


/** FUNCIONES */

//----registro un usuario----
controller.registerUser = (req, res) => {

    //me fijo que no exista ese usuario
    //TODO hacerlo con base de datos
    const newUser = req.body

    if (arrayUsuarios.find(us => us.username.toLowerCase() === newUser.username.toLowerCase())) {
        return res.status(403).send("El usuario ya existe");
    } else {
        arrayUsuarios.push(newUser)
        return res.status(201).json({
            response: {
                message: 'User created successfully:',
                user: newUser
            }
        });
    }
}



//----valido login usuario----
controller.validateUserLogin = (req, res) => {
     const reqUser = req.body

    //TODO  como valido respecto a la base de datos
    const user = arrayUsuarios.find(user => user.username === reqUser.username && user.password === reqUser.password);
    if (user) {
        const token = JWT.sign({
            username : user.username,
            type : "user"
        }, JWTSign);
        
        res.status(200).json({
            token
        });
    } else {
        res.status(404).json({
            mensaje: 'Username or password is incorrect'
        });
    }
}


//---elimino un usuario----
controller.deleteUser = (req, res) => {
    const id = req.params

    // algo con base de datos que lo borre   
    .then(() => res.status(200).json('User deleted successfully'))
    .catch(err => catchSQLError(res, err))
}


module.exports = controller; 