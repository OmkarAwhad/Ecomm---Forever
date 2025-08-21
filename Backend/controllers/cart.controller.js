const User = require("../models/user.model");
const Cart = require("../models/cart.model"); // Assuming the Cart model file is named cart.model.js

module.exports.addToCart = async (req, res) => {
	try {
		const { userId, itemId, size } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Create new Cart item
		const newCartItem = new Cart({
			product: itemId,
			size,
			quantity: 1,
		});
		await newCartItem.save();

		// Add to user's cartData
		user.cartData.push(newCartItem._id);
		await user.save();

		res.status(201).json({
			message: "Added to Cart",
			success: true,
		});
	} catch (error) {
		console.log("Error in adding product to cart", error);
		return res.status(500).json({
			success: false,
			message: "Error in adding product to cart",
		});
	}
};

module.exports.updateCart = async (req, res) => {
	try {
		const { userId, cartItemId, quantity } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Ensure the cartItemId is in user's cartData
		const itemIndex = user.cartData.findIndex(
			(id) => id.toString() === cartItemId
		);
		if (itemIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Cart item not found in user's cart",
			});
		}

		if (quantity <= 0) {
			user.cartData.splice(itemIndex, 1);
			await user.save();
			await Cart.findByIdAndDelete(cartItemId);
		} else {
			// Update quantity in Cart doc
			await Cart.findByIdAndUpdate(cartItemId, { quantity });
		}

		res.status(200).json({
			message: "Cart updated",
			success: true,
		});
	} catch (error) {
		console.log("Error in updating product from the cart", error);
		return res.status(500).json({
			success: false,
			message: "Error in updating product from the cart",
		});
	}
};

module.exports.getUserCart = async (req, res) => {
	try {
		const { userId } = req.body;
		// console.log("1")

		const user = await User.findById(userId).populate({
			path: "cartData",
			populate: { path: "product" },
		});
		// console.log("1")
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// console.log("1")

		res.status(200).json({
			success: true,
			cartData: user.cartData,
		});
	} catch (error) {
		console.log("Error in fetching details of user cart", error);
		return res.status(500).json({
			success: false,
			message: "Error in fetching details of user cart",
		});
	}
};
