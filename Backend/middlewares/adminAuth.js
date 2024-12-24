const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.adminAuth = async (req, res, next) => {
	try {
		const { token } = req.headers;
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Not authorized , Login again",
			});
		}

		const token_decode = jwt.verify(token, process.env.JWT_SECRET);

		if (
			token_decode !==
			process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
		) {
			return res.status(401).json({
				success: false,
				message: "Not authorized , Login again",
			});
		}

		next();
	} catch (error) {
		console.log("Error in admin auth");
		return res.status(500).json({
			success: false,
			message: "Error in admin auth",
		});
	}
};
