const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders');
const auth = require('../controllers/authorizations');
const validations = require('../controllers/validations')


// Routes

router.get('/',auth.admin, controller.showAllOrders); 
router.get('/myOrders',auth.user, controller.showUserOrders); 
router.post('/',auth.admin, validations.requireDataCreateOrder, validations.ProductsIdExistCreateOrder, validations.UserIdExistCreateOrder,controller.createOrder); //esto va con auth us
router.patch('/:id', auth.admin, validations.requireDataModifyOrderStatus, controller.modifyOrderStatus);





module.exports = router;