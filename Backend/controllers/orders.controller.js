const Order = require("../models/orders.models");
const User = require("../models/user.model");

module.exports.placeOrder = async (req, res) => {
	try {
		const { userId, items, amount, address } = req.body;

		const orderData = {
			userId,
			items,
			amount,
			address,
			paymentMethod: "COD",
			payment: false,
			date: Date.now(),
		};

		const response = await Order.create(orderData);

		await User.findByIdAndUpdate(userId, { cartData: {} }); // emptying the cart after order is placed

		return res.status(201).json({
			success: true,
			message: "Order placed successfully",
		});
	} catch (error) {
		console.log("Error in placing the order");
		return res.status(500).json({
			success: false,
			message: "Error in placing the order",
		});
	}
};

module.exports.placeOrderStripe = async (req, res) => {
	try {
	} catch (error) {
		console.log("Error in placing the order on stripe");
		return res.status(500).json({
			success: false,
			message: "Error in placing the order on stripe",
		});
	}
};

module.exports.placeOrderRazorpay = async (req, res) => {
	try {
	} catch (error) {
		console.log("Error in placing the order on razorpay");
		return res.status(500).json({
			success: false,
			message: "Error in placing the order on razorpay",
		});
	}
};

module.exports.userOrders = async (req, res) => {
	try {
      const {userId} = req.body;
      const userData = await Order.find({userId})

      return res.status(201).json({
         success:true,
         message:"User orders fetched",
         response:userData,
      })
	} catch (error) {
		console.log("Error in fetching user orders");
		return res.status(500).json({
			success: false,
			message: "Error in fetching user orders",
		});
	}
};

//Admin
module.exports.allOrders = async (req, res) => {
	try {
	} catch (error) {
		console.log("Error in fetching all orders");
		return res.status(500).json({
			success: false,
			message: "Error in fetching all orders",
		});
	}
};

//Admin
module.exports.updateStatus = async (req, res) => {
	try {
	} catch (error) {
		console.log("Error in updating status");
		return res.status(500).json({
			success: false,
			message: "Error in updating status",
		});
	}
};
