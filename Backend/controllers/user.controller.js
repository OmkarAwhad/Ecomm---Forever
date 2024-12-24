const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator"); // for validating email n all
const jwt = require("jsonwebtoken");
require("dotenv").config();

// creating token
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(401).json({
				success: false,
				message: "Every field is required",
			});
		}

		const userData = await User.findOne({ email: email });
		if (!userData) {
			return res.status(401).json({
				success: false,
				message: "User does not exists",
			});
		}

		const passMatch = await bcrypt.compare(password, userData.password);
		if (!passMatch) {
			return res.status(401).json({
				success: false,
				message: "Password does not match",
			});
		}
		const token = createToken(userData._id);
		return res.status(201).json({
			success: true,
			message: "User successfully logged in",
			token: token,
		});
	} catch (error) {
		console.log("Error in user login");
		return res.status(500).json({
			success: false,
			message: "Error in user login",
		});
	}
};

module.exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(401).json({
				success: false,
				message: "Every field is required",
			});
		}

		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.status(401).json({
				success: false,
				message: "User already exists",
			});
		}

		// validate
		if (!validator.isEmail(email)) {
			return res.status(401).json({
				success: false,
				message: "Email is not valid",
			});
		}

		if (password.length < 8) {
			return res.status(401).json({
				success: false,
				message: "Password must be atleast of 8 characters",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const response = await User.create({
			name: name,
			email: email,
			password: hashedPassword,
		});

		const token = createToken(response._id);

		return res.status(201).json({
			success: true,
			token: token,
		});
	} catch (error) {
		console.log("Error in signing up");
		return res.status(500).json({
			success: false,
			message: "Error in signing up",
		});
	}
};

module.exports.adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (
			email !== process.env.ADMIN_EMAIL ||
			password !== process.env.ADMIN_PASSWORD
		) {
			return res.status(401).json({
				success: false,
				message: "Incorrect data",
			});
		}

		const token = jwt.sign(email + password, process.env.JWT_SECRET);
		return res.status(201).json({
			success: true,
			token: token,
		});
	} catch (error) {
		console.log("Error in admin login");
		return res.status(500).json({
			success: false,
			message: "Error in admin login",
		});
	}
};
