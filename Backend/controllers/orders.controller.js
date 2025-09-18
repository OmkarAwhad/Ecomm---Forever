const Order = require("../models/orders.models");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Address = require("../models/address.model");
require("dotenv").config();
const Stripe = require("stripe");
const Razorpay = require("razorpay");
const currency = "inr";
const deliveryCharge = 10;

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
		const { userId, items, amount, addressId } = req.body;
		const { origin } = req.headers;
		const address = await Address.findById(addressId);
		if (!address)
			return res
				.status(404)
				.json({ success: false, message: "Address not found" });

		const line_items = items.map((item) => ({
			price_data: {
				currency,
				product_data: { name: item.name },
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		}));

		line_items.push({
			price_data: {
				currency,
				product_data: { name: "Delivery charges" },
				unit_amount: deliveryCharge * 100,
			},
			quantity: 1,
		});

		const session = await stripe.checkout.sessions.create({
			success_url: `${origin}/verify?success=true`,
			cancel_url: `${origin}/verify?success=false`,
			line_items,
			mode: "payment",
			metadata: {
				userId,
				items: JSON.stringify(items),
				amount,
				address: JSON.stringify(address),
			},
		});

		res.status(201).json({
			success: true,
			session: session,
		});
	} catch (error) {
		console.log("Error in placing stripe order", error);
		res.status(500).json({
			success: false,
			message: "Error in placing stripe order",
		});
	}
};

module.exports.verifyStripe = async (req, res) => {
	try {
		const { sessionId } = req.body;

		const session = await stripe.checkout.sessions.retrieve(sessionId);
		if (session.payment_status === "paid") {
			const userId = session.metadata.userId;
			const items = JSON.parse(session.metadata.items);
			const amount = session.metadata.amount;
			const address = JSON.parse(session.metadata.address);

			const orderData = {
				userId,
				items,
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
				amount,
				payment: true,
				paymentMethod: "Stripe",
				date: Date.now(),
			};

			const newOrder = await Order.create(orderData);

			const user = await User.findByIdAndUpdate(userId, {
				$push: { orders: newOrder._id },
			});
			await Cart.deleteMany({ _id: { $in: user.cartData } });
			user.cartData = [];
			await user.save();

			res.json({ success: true });
		} else {
			res.json({ success: false });
		}
	} catch (error) {
		console.log("Error in verifying stripe payment", error);
		res.status(500).json({
			success: false,
			message: "Error in verifying stripe payment",
		});
	}
};

module.exports.placeOrderRazorpay = async (req, res) => {
	try {
		const { userId, items, amount, addressId } = req.body;

		const address = await Address.findById(addressId);
		if (!address)
			return res
				.status(404)
				.json({ success: false, message: "Address not found" });

		const options = {
			amount: 1 * 100,
			currency: currency.toUpperCase(),
			receipt: Date.now().toString(),
			// metadata: { userId, items, amount, ...address }  // If Razorpay supports
		};

		razorpay.orders.create(options, (error, order) => {
			if (error)
				return res
					.status(401)
					.json({ success: false, message: error.message });
			res.status(201).json({
				success: true,
				order: order,
				temp_order_data: {
					userId,
					items,
					amount,
					address,
					receipt: options.receipt,
				},
			});
		});
	} catch (error) {
		console.log("Error in placing razorpay order", error);
		res.status(500).json({
			success: false,
			message: "Error in placing razorpay order",
		});
	}
};

module.exports.verifyRazorpay = async (req, res) => {
	try {
		const { userId, items, amount, address, rzp_order_id } = req.body;
		const orderData = await razorpay.orders.fetch(rzp_order_id);

		if (orderData.status === "paid") {
			// Create Order in DB
			const orderDbData = {
				userId,
				items,
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
				amount,
				payment: true,
				paymentMethod: "Razorpay",
				date: Date.now(),
			};

			const newOrder = await Order.create(orderDbData);

			const user = await User.findByIdAndUpdate(userId, {
				$push: { orders: newOrder._id },
			});
			await Cart.deleteMany({ _id: { $in: user.cartData } });
			user.cartData = [];
			await user.save();

			res.json({ success: true, message: "Payment successful" });
		} else {
			res.json({ success: false, message: "Payment failed" });
		}
	} catch (error) {
		console.log("Error in verifying razorpay payment", error);
		res.status(500).json({
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
