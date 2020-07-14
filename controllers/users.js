/** DEFINICIONES*/
const JWT = require('jsonwebtoken');
const JWTSign = 'SeCrEt2020.';
const controller = {}; //guardo todas las funciones a exportar en este controlador
const database = require('../database/connection'); 


/** MIDDLWARES */

//-----Generales-----
const catchSQLError = (res, err) => {
    console.log(err)
    res.status(500).json({
        mensaje : "Ocurrio un error",
        error: err
   });
};

 


/** FUNCIONES */

//----registro un usuario----
controller.registerUser = (req, res) => {
    const newUser = req.body

    database.query( 
        'SELECT * FROM users where username=:username',
         {
            type: sequelize.QueryTypes.SELECT,
            replacements : {
                username: newUser.username
            }
        }
    ).then(response => {
        //valido que no exista ya ese username
        if (response.length !==0){
            res.status(401).json({
                response: {
                    message: 'User already existes',
                }
            });
        }else{
            database.query(
                `INSERT INTO users (username,password,fullName,email, address,phoneNumber)
                VALUES (:username, :password, :fullName, :email,:address, :phoneNumber)`,
                {
                    replacements: newUser
                }
            ).then (rta => {
                console.log(rta)
                res.status(201).json({
                    response: {
                        message: 'User created successfully:',
                    }
                });
            }).catch(err => catchSQLError(res, err))
        }
    }).catch(error => catchSQLError(res, error))
}

 
//----login usuario----
controller.validateUserLogin = (req, res) => {
     const reqUser = req.body

     database.query( 
         'SELECT * FROM users where username=:username AND password=:password',
          {
             type: sequelize.QueryTypes.SELECT,
             replacements : {
                 username: reqUser.username,
                 password: reqUser.password
             }
         }
     ).then(response => {
         //si encontro uno en la tabla de datos, creo el token de inicio de sesión del usuario 
         if (response.length !==0){
            const idUser= response[0].id //guardo el id de usuario
            const isAdmin= response[0].isAdmin //guardo si es administrador o no 
            const token = JWT.sign({
                idUser : idUser,
                isAdmin : isAdmin
            }, JWTSign);
            res.status(200).json({
                token
            });
         }else{
            res.status(400).json({
                mensaje: 'Username or password is incorrect'
            });
         }})
}
 

module.exports = controller; 