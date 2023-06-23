const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Products = require('../models/productModel');


/**
 * @desc View cart
 * @route GET /api/cart/
 * @private
 */
const viewCart = asyncHandler(async (req, res) => {
	// Find cart of the logged-in user:
	const cart = await Cart.find({ userId: req.user.id });

	// If it is not present in database:
	if (!cart) {
		res.status(200).json({ message: "Cart is Empty!!"});
	}
	else {
		res.status(200).json(cart);
	}
});


/**
 * @desc Add to cart
 * @route POST /api/cart/
 * @private
 */
const addToCart = asyncHandler(async (req, res) => {
	const { product_id, quantity } = req.body;

	// check if given product exists:
	const product = await Products.findById(product_id);
	if (!product) {
		res.status(400);
		throw new Error("Product is not available!!");
	}
	else {
		// Fetch the cart of object of logged-in user:
		const cart = await Cart.findOne({ userId: req.user.id });

		// if it is the first item in the cart:
		if (!cart) {
			const newCart = await Cart.create({
				userId: req.user.id,
				products: [{
					prodcutId: product_id,
					quantity
				}]
			});

			res.status(201).json({ message: "Item added to the cart!!", newCart});
		}

		// check if given product is already present in the cart:
		const productIndex = cart.products.findIndex((object) => object.prodcutId == product_id);

		if (productIndex != -1) {
			// If this product is already present in the cart:
			// update the quantity of that product, instead of adding new object

			cart.products[productIndex].quantity = cart.products[productIndex].quantity + quantity;
			console.log("Updated cart: ", cart);

			const updatedCart = await Cart.findByIdAndUpdate(
				cart._id,
				{
					userId: cart.userId,
					products: cart.products
				},
				{ new: true }
			);

			res.status(200).json({ message: "Trying to add same product again", updatedCart });
		}

		else {
			// If the product is not already present in the cart, simply add it:

			cart.products.push({ prodcutId: product_id, quantity });
			// console.log(cart.body);
			const updatedCart = await Cart.findByIdAndUpdate(
				cart._id,
				{
					userId: cart.userId,
					products: cart.products
				},
				{ new: true }
			);
			res.status(201).json({ message: "Cart Updated", updatedCart });	
		}
	}
});

module.exports = { viewCart, addToCart };