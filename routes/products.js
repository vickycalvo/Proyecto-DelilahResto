const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const auth = require('../controllers/authorizations');
const validations = require('../controllers/validations')


// Routes


router.get('/', controller.showProducts);
router.post('/',auth.admin, validations.requireDataCreateProduct, controller.createProduct); 
router.patch('/:id', auth.admin, controller.deactivateProduct);
router.put('/:id', auth.admin, controller.modifyProduct)





module.exports = router;