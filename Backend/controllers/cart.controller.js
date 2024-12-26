const User = require("../models/user.model");

module.exports.addToCart = async (req, res) => {
	try {
		const { userId, itemId, size } = req.body;

		const userData = await User.findById({ _id: userId });

		let cartData = await userData.cartData;
		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		await User.findByIdAndUpdate(userId, { cartData });

		res.status(201).json({
			message: "Added to Cart",
			success: true,
		});
	} catch (error) {
		console.log("Error in adding product to cart");
		return res.status(500).json({
			success: false,
			message: "Error in adding product to cart",
		});
	}
};

module.exports.updateCart = async (req, res) => {
	try {
		const { userId, itemId, size, quantity } = req.body;

		const userData = await User.findById({ _id: userId });

		let cartData = await userData.cartData;
		cartData[itemId][size] = quantity;

		await User.findByIdAndUpdate(userId, { cartData });

		res.status(201).json({
			message: "Cart updated",
			success: true,
		});
	} catch (error) {
		console.log("Error in Updating product from the cart");
		return res.status(500).json({
			success: false,
			message: "Error in updating product from the cart",
		});
	}
};

module.exports.getUserCart = async (req, res) => {
	try {
		const { userId } = req.body;

		const userData = await User.findById({ _id: userId });
		let cartData = await userData.cartData;

		res.status(201).json({
			success: true,
			cartData: cartData,
		});
	} catch (error) {
		console.log("Error in fetching details of user cart");
		return res.status(500).json({
			success: false,
			message: "Error in fetching details of user cart",
		});
	}
};
