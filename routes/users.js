//Use the express.Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route-prefix
const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../controllers/authorizations'); 
const validations = require('../controllers/validations')


// Routes

router.post('/register',validations.requireDataRegister, controller.registerUser);
router.post('/login', validations.requireDataLogin, controller.validateUserLogin);
router.delete('/delete', auth.user, controller.deleteUser); //agregar auth q esto solo lo puede hacer el usuario




module.exports = router;  