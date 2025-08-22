const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator"); // for validating email n all
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const OTP = require("../models/otp.models"); // Add this import (adjust path to your OTP model)

// creating token
const createToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET);
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
		const token = createToken(userData._id, userData.role);
		return res.status(201).cookie("token", token).json({
			success: true,
			message: "User successfully logged in",
			data: userData,
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
			role: "User",
		});

		const token = createToken(response._id, response.role);

		return res.status(201).json({
			success: true,
			data: response,
			token: token,
			message: "User registered successfully",
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

module.exports.forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		// if (!validator.isEmail(email)) {
		//    return res.status(400).json({
		//       success: false,
		//       message: "Invalid email format",
		//    });
		// }

		const checkUserPresent = await User.findOne({ email: email });
		if (!checkUserPresent) {
			return res.status(404).json({
				success: false,
				message: "User does not exist",
			});
		}

		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		// Save OTP to database (this triggers the pre("save") middleware to send email)
		const otpDocument = new OTP({
			email,
			otp,
		});

		await otpDocument.save();

		return res.status(200).json({
			success: true,
			message: "OTP sent successfully to your email",
		});
	} catch (error) {
		console.error("Error in forget password:", error);
		return res.status(500).json({
			success: false,
			message: "Error in sending OTP",
		});
	}
};

module.exports.verifyOTP = async (req, res) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({
				success: false,
				message: "Email and OTP are required",
			});
		}

		const otpDocument = await OTP.findOne({ email, otp });

		if (!otpDocument) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired OTP",
			});
		}

		// Fetch user to generate reset token
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// OTP is valid; you can now allow the user to access the password change UI
		// Optionally, delete the OTP document to prevent reuse
		await OTP.deleteOne({ _id: otpDocument._id });

		// Generate a temporary token to allow password reset
		const resetToken = createToken(user._id);

		return res.status(200).json({
			success: true,
			message: "OTP verified successfully",
			resetToken,
		});
	} catch (error) {
		console.error("Error in OTP verification:", error);
		return res.status(500).json({
			success: false,
			message: "Error in verifying OTP",
		});
	}
};

module.exports.changePassword = async (req, res) => {
	try {
		const { token, newPassword } = req.body;

		if (!newPassword) {
			return res.status(400).json({
				success: false,
				message: "New password is required",
			});
		}

		if (newPassword.length < 8) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 8 characters",
			});
		}

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Invalid or expired token",
			});
		}

		const user = await User.findById(decoded.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		user.password = hashedPassword;
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Password changed successfully",
		});
	} catch (error) {
		console.error("Error in changing password:", error);
		return res.status(500).json({
			success: false,
			message: "Error in changing password",
		});
	}
};
