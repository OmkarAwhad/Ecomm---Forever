const express = require("express");
const {
	placeOrder,
	userOrders,
	allOrders,
	updateStatus,
	placeOrderStripe,
	placeOrderRazorpay,
	verifyStripe,
	verifyRazorpay,
} = require("../controllers/orders.controller");
const router = express.Router();
const { auth, isAdmin, isUser } = require("../middlewares/auth");

router.post("/userorders", auth, isUser, userOrders);
router.post("/place", auth, isUser, placeOrder);
router.post("/stripe", auth, isUser, placeOrderStripe);
router.post("/verifyStripe", auth, isUser, verifyStripe);
router.post("/razorpay", auth, isUser, placeOrderRazorpay);
router.post("/verifyRazorpay", auth, isUser, verifyRazorpay);

router.get("/list", auth, isAdmin, allOrders);
router.post("/status", auth, isAdmin, updateStatus);

module.exports = router;
