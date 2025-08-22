const User = require("../models/user.model");
const { mailSender } = require("../utils/mailSender.utils");
const { newsletterWelcome } = require("../mails/newsLetterBox.template");

module.exports.newsLetterBox = async (req, res) => {
	try {
		const { email } = req.body;

		const userDetails = await User.findOne({ email: email });
		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User doesn't exist",
			});
		}

		try {
			await mailSender(
				email,
				"Welcome to Forever Newsletter - Your 20% Discount Inside! 🎉",
				newsletterWelcome(email, userDetails.name)
			);

			return res.status(200).json({
				success: true,
				message: "Check your email for discount",
			});
		} catch (error) {
			console.log("Error in sending mail", error);
			return res.status(500).json({
				success: false,
				message: "Error in sending mail",
			});
		}
	} catch (error) {
		console.log("Error in sending newsletter to user", error);
		return res.status(500).json({
			success: false,
			message: "Error in sending newsletter to user",
		});
	}
};
