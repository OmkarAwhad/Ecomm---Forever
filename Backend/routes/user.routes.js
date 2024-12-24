const express = require("express");
const {
	loginUser,
	registerUser,
	adminLogin,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/login", loginUser);
router.post("/sign-up", registerUser);
router.post("/admin", adminLogin);

module.exports = router;
