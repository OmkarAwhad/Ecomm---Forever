const express = require("express");
const {
	loginUser,
	registerUser,
	adminLogin,
	forgetPassword,
	verifyOTP,
	changePassword,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/login", loginUser);
router.post("/sign-up", registerUser);
router.post("/admin", adminLogin);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/change-password", changePassword);

module.exports = router;
