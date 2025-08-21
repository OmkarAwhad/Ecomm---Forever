const express = require("express");
const {
	addToCart,
	getUserCart,
	updateCart,
} = require("../controllers/cart.controller");
const { auth, isUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/add", auth, isUser, addToCart);
router.post("/get", auth, isUser, getUserCart);
router.post("/update", auth, isUser, updateCart);

module.exports = router;
