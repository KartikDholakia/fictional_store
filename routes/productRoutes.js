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
const { paginateResults } = require('../middleware/paginateResults');

const Products = require('../models/productModel');

router.get('/', paginateResults(Products), getAllProducts);
router.post('/', verifyTokenAndAdmin, createProdcut);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);
router.get('/search', searchProduct);

module.exports = router;