const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const Users = require('../models/userModel');


/**
 * Verify JWT Token to authenticate the user.
 */
const verifyToken = asyncHandler(async (req, res, next) => {
	let token;
	let authHeader = req.headers.authorization || req.headers.Authorization;
	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
			if (err) {
				res.status(401);
				throw new Error("User is not authorized!");
			}

			// Appending the decoded user info in req body:
			req.user = decoded.user;
			next();

			console.log("Decoded access token user: ", req.user);
			// console.log(req.user.id);
		});

		if (!token) {
			res.status(401);
			throw new Error("User is not authorized ")
		}
	}
	else {
		console.log("Line 34 verifyTokenHandler.js");
		res.status(401);
		throw new Error("JWT Access Token is missing!!");
	}
});


/**
 * Verify the JWT token and if the user is admin or not.
 * Only admin are allowed to Create, Update and Delete a product
 */
const verifyTokenAndAdmin = asyncHandler(async (req, res, next) => {	

	// Check if Access token was provided in the header:
	let authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader) {
		res.status(403).json({ message: "Access token not provided!!"});
	}

	verifyToken(req, res, async () => {
		// Fetch the isAdmin property from database:
		const user = await Users.findById(req.user.id);
		const isAdmin = user.isAdmin;
		console.log(user);

		if (isAdmin) {
			next();
		}
		else {
			res.status(403).json({ message: "Not Authorized to perform this action!!"});
		}
	});
});


module.exports = { verifyToken, verifyTokenAndAdmin };