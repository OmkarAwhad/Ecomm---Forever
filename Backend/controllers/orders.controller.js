const Order = require("../models/orders.models");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Address = require("../models/address.model");
require("dotenv").config();
const Stripe = require("stripe");
const Razorpay = require("razorpay");

//vars
const currency = "inr";
const deliveryCharge = 10;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.placeOrder = async (req, res) => {
	try {
		const { userId, items, amount, addressId } = req.body;

		// Fetch the address
		const address = await Address.findById(addressId);
		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found",
			});
		}

		const orderData = {
			userId,
			items,
			amount,
			address: {
				firstName: address.firstName,
				lastName: address.lastName,
				email: address.email,
				street: address.street,
				city: address.city,
				state: address.state,
				zipcode: address.zipcode,
				country: address.country,
				phone: address.phone,
			},
			paymentMethod: "COD",
			payment: false,
			date: Date.now(),
		};

		const newOrder = await Order.create(orderData);

		const user = await User.findByIdAndUpdate(userId, {
			$push: { orders: newOrder._id },
		});

		await Cart.deleteMany({ _id: { $in: user.cartData } });
		user.cartData = [];
		await user.save();

		return res.status(201).json({
			success: true,
			message: "Order placed successfully",
		});
	} catch (error) {
		console.log("Error in placing the order", error);
		return res.status(500).json({
			success: false,
			message: "Error in placing the order",
		});
	}
};

module.exports.placeOrderStripe = async (req, res) => {
	try {
		const { userId, items, amount, address } = req.body;
		const { origin } = req.headers;

		const orderData = {
			userId,
			items,
			address,
			amount,
			payment: false,
			paymentMethod: "Stripe",
			date: Date.now(),
		};

		const newOrder = await Order.create(orderData);

		// Update user's orders array
		await User.findByIdAndUpdate(userId, {
			$push: { orders: newOrder._id },
		});

		const line_items = items.map((item) => ({
			price_data: {
				currency: currency,
				product_data: {
					name: item.name,
				},
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		}));

		line_items.push({
			price_data: {
				currency: currency,
				product_data: {
					name: "Delivery charges",
				},
				unit_amount: deliveryCharge * 100,
			},
			quantity: 1,
		});

		const session = await stripe.checkout.sessions.create({
			success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
			cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
			line_items,
			mode: "payment",
		});

		res.status(201).json({
			success: true,
			session: session,
		});
	} catch (error) {
		console.log("Error in placing the order on stripe", error);
		return res.status(500).json({
			success: false,
			message: "Error in placing the order on stripe",
		});
	}
};

module.exports.verifyStripe = async (req, res) => {
	try {
		const { orderId, success, userId } = req.body;
		if (success === "true") {
			await Order.findByIdAndUpdate(orderId, { payment: true });

			// Empty the cart
			const user = await User.findById(userId);
			await Cart.deleteMany({ _id: { $in: user.cartData } });
			user.cartData = [];
			await user.save();

			res.json({
				success: true,
			});
		} else {
			await Order.findByIdAndDelete(orderId);
			res.json({
				success: false,
			});
		}
	} catch (error) {
		console.log("Error in verifying stripe payment", error);
		return res.status(500).json({
			success: false,
			message: "Error in verifying stripe payment",
		});
	}
};

module.exports.placeOrderRazorpay = async (req, res) => {
	try {
		const { userId, items, amount, address } = req.body;
		const orderData = {
			userId,
			items,
			amount,
			address,
			payment: false,
			paymentMethod: "Razorpay",
			date: Date.now(),
		};

		const newOrder = await Order.create(orderData);

		// Update user's orders array
		await User.findByIdAndUpdate(userId, {
			$push: { orders: newOrder._id },
		});

		const options = {
			amount: amount * 10000,
			currency: currency.toUpperCase(),
			receipt: newOrder._id.toString(),
		};

		await razorpay.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res
					.status(401)
					.json({ success: false, message: error.message });
			}
			return res.status(201).json({
				success: true,
				order: order,
			});
		});
	} catch (error) {
		console.log("Error in placing the order on razorpay", error);
		return res.status(500).json({
			success: false,
			message: "Error in placing the order on razorpay",
		});
	}
};

module.exports.verifyRazorpay = async (req, res) => {
	try {
		const { userId, rzp_order_id } = req.body;
		const orderData = await razorpay.orders.fetch(rzp_order_id);
		if (orderData.status === "paid") {
			await Order.findByIdAndUpdate(orderData.receipt, {
				payment: true,
			});

			// Empty the cart
			const user = await User.findById(userId);
			await Cart.deleteMany({ _id: { $in: user.cartData } });
			user.cartData = [];
			await user.save();

			res.json({
				success: true,
				message: "Payment successful",
			});
		} else {
			await Order.findByIdAndDelete(orderData.receipt);
			res.json({
				success: false,
				message: "Payment failed",
			});
		}
	} catch (error) {
		console.log("Error in verifying razorpay payment", error);
		return res.status(500).json({
			success: false,
			message: "Error in verifying razorpay payment",
		});
	}
};

module.exports.userOrders = async (req, res) => {
	try {
		const { userId } = req.body;

		const user = await User.findById({ _id: userId }).populate({
			path: "orders",
			populate: {
				path: "items.product",
				model: "Product",
			},
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "User orders fetched",
			response: user.orders,
		});
	} catch (error) {
		console.log("Error in fetching user orders", error);
		return res.status(500).json({
			success: false,
			message: "Error in fetching user orders",
		});
	}
};

//Admin
module.exports.allOrders = async (req, res) => {
	try {
		const response = await Order.find({}).sort({ date: -1 });
		return res.status(200).json({
			success: true,
			message: "All orders fetched",
			response: response,
		});
	} catch (error) {
		console.log("Error in fetching all orders", error);
		return res.status(500).json({
			success: false,
			message: "Error in fetching all orders",
		});
	}
};

//Admin
module.exports.updateStatus = async (req, res) => {
	try {
		const { orderId, status } = req.body;
		await Order.findByIdAndUpdate(orderId, { status });
		res.status(200).json({
			success: true,
			message: "Status updated",
		});
	} catch (error) {
		console.log("Error in updating status", error);
		return res.status(500).json({
			success: false,
			message: "Error in updating status",
		});
	}
};
