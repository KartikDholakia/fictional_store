const express = require('express');
const { verifyToken } = require('../middleware/verifyTokenHandler');
const { placeOrder, getAllOrders } = require('../controller/orderController');
const { paginateResults } = require('../middleware/paginateResults');
const Order = require('../models/orderModel');
const router = express.Router();

router.get('/', paginateResults(Order), getAllOrders);
router.post('/', verifyToken, placeOrder);

module.exports = router;