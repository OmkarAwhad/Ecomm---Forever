const express = require("express");
const {
	addToCart,
	getUserCart,
	updateCart,
} = require("../controllers/cart.controller");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/add", authUser, addToCart);
router.post("/get", authUser, getUserCart);
router.post("/update", authUser, updateCart);

module.exports = router;
