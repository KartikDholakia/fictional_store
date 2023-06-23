const express = require('express');
const { verifyToken } = require('../middleware/verifyTokenHandler');
const { placeOrder } = require('../controller/orderController');
const router = express.Router();

router.post('/', verifyToken, placeOrder);

module.exports = router;