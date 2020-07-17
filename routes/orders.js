const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders');
const auth = require('../middlewares/authorizations');
const validations = require('../middlewares/validations');

// Routes
router.get('/', auth.both, controller.getOrders);
router.get('/:id', auth.both, controller.getOrders);
router.post('/', auth.both, validations.requireDataCreateOrder, validations.ProductsIdExistCreateOrder, controller.createOrder); //esto va con auth us
router.patch('/:id', auth.admin, validations.requireDataModifyOrderStatus, controller.modifyOrderStatus);
router.delete('/:id', auth.admin, controller.deleteOrder)

module.exports = router;