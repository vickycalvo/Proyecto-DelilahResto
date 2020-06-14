// en este archvio valido por ejmplo los casos en que solo un usuario o un admis puede hacer algo 

/** DEFINICIONES*/
const JWT = require('jsonwebtoken');
const JWTSign = 'SeCrEt2020.';
const auth = {}; //guardo todas las funciones a exportar en este controlador


/** Middlewares */

//decodificar token
function jwtDecode(token) {
    const decodificado = jwt.verify(token, secret)
    return decodificado;
}


//error en autenticación 
const catchAuthError = (res, err) => {
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
        const verifyToken = jwtDecode(token);
        
        if (verifyToken) {
            if (verifyToken.type === 'user'){
                //TENGO Q PASARLE ALGO ACA???
                next();
            }
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }
        }
    }
    catch {(err) => catchAuthError(res, err)} 
};

//---autorizo solo a admin---
auth.admin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwtDecode(token);
        
        if (verifyToken) {
            if (verifyToken.type === 'admin'){
                next();
            }
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }
        }
    }
    catch {(err) => catchAuthError(res, err)} 
};

//--- autorizo a ambos ---
auth.both = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwtDecode(token);
        
        if (verifyToken) {
            if (verifyToken.type === 'admin' || verifyToken.type === 'user'){
                next();
            }
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }
        }
    }
    catch {(err) => catchAuthError(res, err)} 
};


module.exports = auth;