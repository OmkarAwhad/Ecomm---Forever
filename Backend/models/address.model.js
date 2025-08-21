const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		street: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
		},
		zipcode: {
			type: String,
			required: true,
			trim: true,
		},
		country: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		isDefault: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			enum: ["Home", "Work", "Other"],
			default: "Home",
		},
	},
	{
		timestamps: true,
	}
);

addressSchema.pre("save", async function (next) {
	if (this.isDefault) {
		await this.constructor.updateMany(
			{ userId: this.userId, _id: { $ne: this._id } },
			{ isDefault: false }
		);
	}
	next();
});

module.exports = mongoose.model("Address", addressSchema);
