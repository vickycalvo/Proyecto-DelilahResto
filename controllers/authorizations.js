// en este archvio valido por ejmplo los casos en que solo un usuario o un admis puede hacer algo 

/** DEFINICIONES*/
const JWT = require('jsonwebtoken');
const JWTSign = 'SeCrEt2020.';
const auth = {}; //guardo todas las funciones a exportar en este controlador


/** Middlewares */

//error en autenticación 
const catchAuthError = (res, err) => {
    console.log(err)
    res.status(500).json({
        mensaje : "Ocurrio un error",
        error: err
   });
};

/** MIDDLWARES AUTORIZACIONES */

// ---autorizo solo a el usuario---
auth.user = (req, res, next) => {
    try {
        const token = req.headers.authorization

        const tokenVerified = JWT.verify(token, JWTSign, function(err, decoded) { 
          if (err) {
            return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
              //decoded contine la información almacenada en el token verificado
            if (decoded.isAdmin === 0){
                req.locals = {
                    ...req.locals,
                    decoded
                }
                next();
            }
            //si no es usuario no puede eliminar
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }}
        });
     }
    catch {(err) => catchAuthError(res, err)} 
};

//---autorizo solo a admin---
auth.admin = (req, res, next) => {   
    try {
        const token = req.headers.authorization

        const tokenVerified = JWT.verify(token, JWTSign, function(err, decoded) { 
          if (err) {
            return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
              //decoded contine la información almacenada en el token verificado
            if (decoded.isAdmin === 1){
                req.locals = {
                    ...req.locals,
                    decoded
                }
                next();
            }
            //si no es administrador no puede eliminar
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }}
        });
     }
    catch {(err) => catchAuthError(res, err)} 
};

//--- autorizo a ambos ---
auth.both = (req, res, next) => {
    try {
        const token = req.headers.authorization

        const tokenVerified = JWT.verify(token, JWTSign, function(err, decoded) { 
          if (err) {
            return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
              //decoded contine la información almacenada en el token verificado
            if (decoded.isAdmin === 0 || decoded.isAdmin === 1){
                req.locals = {
                    ...req.locals,
                    decoded
                }
                next();
            }
            //si no es usuario no puede eliminar
            else{
                res.status(403).json({error})
            }}
        });
     }
    catch {(err) => catchAuthError(res, err)} 
};


module.exports = auth;