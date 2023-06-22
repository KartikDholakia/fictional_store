const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Username not filled!"]
	},
	
	email: {
		type: String,
		required: [true, "Email required!!"],
		unique: [true, "Email already registered!!"]
	},
	
	password: {
		type: String,
		required: [true, "Password not filled!"]
	},

	isAdmin: {
		type: Boolean,
		default: false
	},
	
}, {
	timestamps: true
});

// Export the schema:
module.exports = mongoose.model("User", UserSchema);