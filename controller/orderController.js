const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Products = require('../models/productModel');
const Order = require('../models/orderModel');


/**
 * @desc It iterates through objects in 'cart.products' array and 
 * calculates the total amount. 
 * @param cart object
 * @returns number
 */
const calculateAmount = async (cart) => {
	let totalAmount = 0;
	// console.log("Products: ", cart.products);

	for (let idx = 0; idx < cart.products.length; idx++) {
		// console.log("productObject", cart.products[idx]);
		let productObject = cart.products[idx];
		const product_id = productObject.prodcutId;
		const productModelObject = await Products.findById(product_id);
		const price = productModelObject.price;
		totalAmount = totalAmount + (productObject.quantity * price);
	}

	return totalAmount;
}


/**
 * @desc Place order from the cart. 
 * @route POST /api/order/
 * @private
 */
const placeOrder = asyncHandler(async (req, res) => {
	const { address } = req.body;

	console.log("address: ", address);

	// Check if address is provided:
	if (!address) {
		res.status(400);
		throw new Error("Address not provided!!");
	}

	// Fetch the cart of logged-in user:
	const cart = await Cart.findOne({ userId: req.user.id });

	console.log(cart);

	// if cart is empty:
	if (!cart) {
		res.status(400);
		throw new Error("Cart is empty!! Can't place any order!!");
	}

	// Find out total amount:
	const totalAmount = await calculateAmount(cart);

	console.log("amount: ", totalAmount);

	// Create order object:
	const newOrder = await Order.create({
		userId: req.user.id,
		products: cart.products,
		amount: totalAmount,
		address
	});

	res.status(201).json({ message: "Order Placed!", order_details: newOrder });
});


/**
 * @desc Fetch all orders
 * @route GET /api/order/?page=_&limit=
 * @public
 */
const getAllOrders = asyncHandler(async (req, res) => {
	res.status(200).json({
		pagination: req.pagination,
	});
});

module.exports = { placeOrder, getAllOrders };