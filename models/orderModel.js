const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
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
	], 
	amount: { type: Number, required: true}, 
	address: { type: Object, required: true},
	status: { type: String, default: "Pending"}
}, {
	timestamps: true
});

// Export the schema:
module.exports = mongoose.model("Order", OrderSchema);