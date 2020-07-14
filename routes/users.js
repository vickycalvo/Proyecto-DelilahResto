const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const validations = require('../middlewares/validations');

// Routes
router.post('/register',validations.requireDataUserRegister, controller.registerUser);
router.post('/login', validations.requireDataUserLogin, controller.validateUserLogin);


module.exports = router;  