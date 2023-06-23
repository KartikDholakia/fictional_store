/**
 * Routes to perform CRUD operations on Products
 */

const express = require('express');
const router = express.Router();

const { 
	createProdcut, 
	getAllProducts, 
	updateProduct, 
	deleteProduct,
	searchProduct
} = require('../controller/productController');

const { verifyTokenAndAdmin } = require('../middleware/verifyTokenHandler');

router.get('/', getAllProducts);
router.post('/', verifyTokenAndAdmin, createProdcut);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);
router.get('/search', searchProduct);

module.exports = router;