const express = require("express");
const {
	getUserAddresses,
	addAddress,
	updateAddress,
	deleteAddress,
	setDefaultAddress,
} = require("../controllers/address.controller");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/list", auth, getUserAddresses);
router.post("/add", auth, addAddress);
router.post("/update", auth, updateAddress);
router.post("/delete", auth, deleteAddress);
router.post("/setDefault", auth, setDefaultAddress);

module.exports = router;
