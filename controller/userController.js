const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * @desc Register a new user
 * @route POST /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async(req, res) => {
	const { name, email, password, isAdmin } = req.body;
	if (!name || !email | !password) {
		res.status(400);
		throw new Error("All fields are mandatory!!");
	}

	// Check if this email is already registered:
	const userAvailable = await Users.findOne({ email });
	if (userAvailable) {
		res.status(400);
		throw new Error("This email is already registered!!");
	}

	// Hash Password before storing it on database:
	const hashPassword = await bcrypt.hash(password, 10);
	// save to database:
	const user = await Users.create({
		name,
		email,
		password: hashPassword,
		isAdmin
	});

	if (user) {
		res.status(201).json({ _id: user.id, email: user.email });
	} else {
		res.status(400);
		throw new Error("User data is not valid!!");
	}
});


/**
 * @desc Login user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async(req, res) => {

	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory!!");
	}

	const user = await Users.findOne({ email });
	
	// check if user exists and if its password matches:
	if (user && (await bcrypt.compare(password, user.password))) {
		
		const accessToken = jwt.sign(
			{
				user: {
					name: user.name,
					email: user.email,
					id: user.id
				}, 
			}, 
			process.env.ACCESS_TOKEN,
			{ expiresIn: '15m'}
		);

		res.status(200).json({ accessToken });
	}
	else {
		res.status(401);
		throw new Error("Username or password is invalid!");
	}

});


module.exports = { registerUser, loginUser };