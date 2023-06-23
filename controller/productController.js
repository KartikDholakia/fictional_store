const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Products = require('../models/productModel');


/**
 * @desc Create a new Product
 * @route POST /api/prodcuts/
 * @private
 */
const createProdcut = asyncHandler(async (req, res) => {
	const { name, description, category, price } = req.body;

	// Check if all fields are provided:
	if (!name || !description || !category || !price) {
		res.status(400);
		throw new Error("All fields are mandatory!!");
	}

	// Check for duplicate product name:
	const availableProduct = await Products.findOne({ name: name});
	if (availableProduct) {
		res.status(400);
		throw new Error("This product name is already registered!!");
	}

	// Otherwise create product:
	const product = await Products.create({
		name, 
		description,
		category,
		price
	});

	res.status(201).json({ message: "Product Created!!", product_info: product });
});


/**
 * @desc Fetch all prodcuts
 * @route GET /api/products/
 * @public
 */
const getAllProducts = asyncHandler(async (req, res) => {
	const prodcuts = await Products.find();
	res.status(200).json(prodcuts);
});


/**
 * @todo
 * Search Product by name
 * Search Product by category
 */


/**
 * @desc Update a product
 * @route PUT /api/products/:id
 * @private
 */
const updateProduct = asyncHandler(async (req, res) => {
	const product = await Products.findById(req.params.id);

	// Check if product is listed in the database:
	if (!product) {
		res.status(404);
		throw new Error("Product not found!!");
	}

	const updatedProduct = await Products.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);

	res.status(200).json({ message: "Product updated", Product: updatedProduct });
});


/**
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @private
 */
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Products.findById(req.params.id);

	// Check if product is listed in the database:
	if (!product) {
		res.status(404);
		throw new Error("Product not found!!");
	}
	
	// Delete the product:
	const deletedProduct = await Products.findByIdAndDelete(req.params.id);

	res.status(200).json({ message: `Product ${req.params.id} Deleted!!` });
});


module.exports = {
	createProdcut,
	getAllProducts,
	updateProduct,
	deleteProduct
};