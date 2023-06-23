const express = require('express');
const { viewCart, addToCart } = require('../controller/cartController');
const { verifyToken } = require('../middleware/verifyTokenHandler');
const router = express.Router();

router.get('/', verifyToken, viewCart);
router.post('/', verifyToken, addToCart);

module.exports = router;