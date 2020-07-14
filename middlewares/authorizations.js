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
        mensaje : "An error ocurred",
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
              //decoded contiene la información almacenada en el token verificado
            if (decoded.isAdmin === 0){
                req.locals = {
                    ...req.locals,
                    idUser: decoded.idUser,
                    isAdmin: !!decoded.isAdmin
                }
                next();
            }
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
              //decoded contiene la información almacenada en el token verificado
            if (decoded.isAdmin === 1){
                req.locals = {
                    ...req.locals,
                    idUser: decoded.idUser,
                    isAdmin: !!decoded.isAdmin
                }
                next();
            }
            else{
                res.status(403).json({ error: 'Do not have admin permissions' })
            }}
        });
     }
    catch {(err) => catchAuthError(res, err)} 
};


//--- autorizo a ambos ---
auth.both = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const tokenVerified = JWT.verify(token, JWTSign, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                //decoded contine la información almacenada en el token verificado
                if (decoded.isAdmin === 0 || decoded.isAdmin === 1){
                    req.locals = {
                        ...req.locals,
                        idUser: decoded.idUser,
                        isAdmin: !!decoded.isAdmin
                    }
                    next();
                }
                else {
                    res.status(403).json({error})
                }
            }
        });
     }
    catch {(err) => catchAuthError(res, err)} 
};


module.exports = auth;