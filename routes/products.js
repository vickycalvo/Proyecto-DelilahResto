const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const auth = require('../middlewares/authorizations');
const validations = require('../middlewares/validations');


// Routes
router.get('/', auth.both, controller.showProducts);
router.post('/',auth.admin, validations.requireDataCreateProduct, controller.createProduct); 
router.delete('/:id', auth.admin, controller.deactivateProduct);
router.put('/:id', auth.admin, validations.requireDataModifyProduct, controller.modifyProduct)


module.exports = router;