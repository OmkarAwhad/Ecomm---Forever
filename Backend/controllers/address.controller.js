const Address = require("../models/address.model");
const User = require("../models/user.model");

module.exports.getUserAddresses = async (req, res) => {
	try {
		const { userId } = req.body;

		const addresses = await Address.find({ userId }).sort({
			isDefault: -1,
			createdAt: -1,
		});

		return res.status(200).json({
			success: true,
			message: "Addresses fetched successfully",
			response: addresses,
		});
	} catch (error) {
		console.log("Error in fetching addresses", error);
		return res.status(500).json({
			success: false,
			message: "Error in fetching addresses",
		});
	}
};

module.exports.addAddress = async (req, res) => {
	try {
		const {
			userId,
			firstName,
			lastName,
			email,
			street,
			city,
			state,
			zipcode,
			country,
			phone,
			isDefault,
			label,
		} = req.body;

		const existingAddresses = await Address.find({ userId });
		const shouldBeDefault = existingAddresses.length === 0 || isDefault;

		const newAddress = await Address.create({
			userId,
			firstName,
			lastName,
			email,
			street,
			city,
			state,
			zipcode,
			country,
			phone,
			isDefault: shouldBeDefault,
			label: label || "Home",
		});

		return res.status(201).json({
			success: true,
			message: "Address added successfully",
			response: newAddress,
		});
	} catch (error) {
		console.log("Error in adding address", error);
		return res.status(500).json({
			success: false,
			message: "Error in adding address",
		});
	}
};

module.exports.updateAddress = async (req, res) => {
	try {
		const { addressId, ...updateData } = req.body;

		const updatedAddress = await Address.findByIdAndUpdate(
			addressId,
			updateData,
			{ new: true }
		);

		if (!updatedAddress) {
			return res.status(404).json({
				success: false,
				message: "Address not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Address updated successfully",
			response: updatedAddress,
		});
	} catch (error) {
		console.log("Error in updating address", error);
		return res.status(500).json({
			success: false,
			message: "Error in updating address",
		});
	}
};

module.exports.deleteAddress = async (req, res) => {
	try {
		const { addressId, userId } = req.body;

		const address = await Address.findById(addressId);
		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found",
			});
		}

		if (address.isDefault) {
			const otherAddress = await Address.findOne({
				userId,
				_id: { $ne: addressId },
			});
			if (otherAddress) {
				otherAddress.isDefault = true;
				await otherAddress.save();
			}
		}

		await Address.findByIdAndDelete(addressId);

		return res.status(200).json({
			success: true,
			message: "Address deleted successfully",
		});
	} catch (error) {
		console.log("Error in deleting address", error);
		return res.status(500).json({
			success: false,
			message: "Error in deleting address",
		});
	}
};

module.exports.setDefaultAddress = async (req, res) => {
	try {
		const { addressId, userId } = req.body;

		// Remove default from all user addresses
		await Address.updateMany({ userId }, { isDefault: false });

		// Set new default
		const updatedAddress = await Address.findByIdAndUpdate(
			addressId,
			{ isDefault: true },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Default address updated successfully",
			response: updatedAddress,
		});
	} catch (error) {
		console.log("Error in setting default address", error);
		return res.status(500).json({
			success: false,
			message: "Error in setting default address",
		});
	}
};
