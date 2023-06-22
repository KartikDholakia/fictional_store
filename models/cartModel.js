const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
	userId: { type: String, required: true }, 

	products: [
		{
			prodcutId: {
				type: String
			}, 
			quantity: {
				type: Number,
				default: 1
			}
		}
	]
}, {
	timestamps: true
});

// Export the schema:
module.exports = mongoose.model("Cart", CartSchema);