const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');

// Route to place a new order
router.post('/place-order',  auth, orderController.placeOrder);

// Route to get all orders for a specific user
router.get('/user/:userId', auth, orderController.getUserOrders);

module.exports = router;
