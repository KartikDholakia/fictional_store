const mongoose = require('mongoose');

const ProdcutSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Username not filled!"],
		unique: [true, "This product is already registered in the database!!"]
	},
	
	description: {
		type: String,
		required: [true, "Email required!!"],
	},
	
	category: {
		type: String,
		required: [true, "Password not filled!"]
	},

	price: {
		type: Number,
		required: [true, "Please mention the price!"]
	}

	/**
	 * @ To do: img_link, seller_name
	 */
}, {
	timestamps: true
});

// Export the schema:
module.exports = mongoose.model("Prodcut", ProdcutSchema);