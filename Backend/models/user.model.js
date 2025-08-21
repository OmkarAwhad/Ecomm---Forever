const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		cartData: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Cart",
			},
		],
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Order",
			},
		],
		role: {
			type: String,
			enum: ["User", "Admin"],
		},
	},
	{ minimize: false }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
