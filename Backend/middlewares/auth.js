const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { default: tokens } = require("razorpay/dist/types/tokens");
require("dotenv").config();

module.exports.auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.headers.token ||
			(req.header("Authorization") &&
				req.header("Authorization").replace("Bearer ", ""));

		// console.log("Auth user token : ", token);

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Not authorized, Login again",
			});
		}

		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.body.userId = decode.id;
			req.body.role = decode.role;
			// console.log(decode)
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Invalid token",
			});
		}

		next();
	} catch (error) {
		console.log("Error in authenticating user", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error during authentication",
		});
	}
};

exports.isUser = async (req, res, next) => {
	try {
		const role = req.body.role;
		if (role.trim() !== "User") {
			return res.status(401).json({
				success: false,
				message: "This is a protected route for Users only",
			});
		}
		next();
	} catch (error) {
		console.log("Error in User auth ", error.message);
		return res.status(500).json({
			success: false,
			message: "Error in User authorization",
		});
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const role = req.body.role;
		// console.log("Role in isAdmin  : ",role.trim())
		if (role.trim() !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a protected route for Admins only",
			});
		}
		next();
	} catch (error) {
		console.log("Error in Admin auth ", error.message);
		return res.status(500).json({
			success: false,
			message: "Error in Admin authorization",
		});
	}
};
