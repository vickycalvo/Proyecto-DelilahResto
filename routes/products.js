const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const auth = require('../controllers/authorizations');



// Routes

//tanto usuario como administrador pueden mostrar los productos
router.get('/', controller.showProducts);
router.get('/:Id', controller.showProductById)
//Agregar validación de que esto solo lo hace el administrador desde archivo authorization
router.post('/', controller.createProduct); 
router.delete('/:id', controller.deleteProduct);
router.put('/:id', controller.modifyProduct)





module.exports = router;