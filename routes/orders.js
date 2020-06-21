const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders');
const auth = require('../controllers/authorizations');
const validations = require('../controllers/validations')


// Routes

router.get('/',auth.admin, controller.showAllOrders); 
router.get('/',auth.admin, controller.showAllOrders); 
router.post('/',auth.admin, validations.requireDataCreateOrder, controller.createOrder); 
router.patch('/:id', auth.admin, validations.requireDataModifyOrderStatus, controller.modifyOrderStatus);





module.exports = router;