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
const { authUser } = require("../middlewares/auth");
const { adminAuth } = require("../middlewares/adminAuth");

router.post("/userorders", authUser, userOrders);

router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

router.post("/place", authUser, placeOrder);

router.post("/stripe", authUser, placeOrderStripe);
router.post("/verifyStripe", authUser, verifyStripe);

router.post("/razorpay", authUser, placeOrderRazorpay);
router.post("/verifyRazorpay", authUser, verifyRazorpay);

module.exports = router;
