const Product = require("../models/product.models");
const cloudinary = require("cloudinary").v2;

module.exports.addProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestSeller,
		} = req.body;

		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!subCategory ||
			!sizes
		) {
			return res.status(401).json({
				success: false,
				message: "Every field is required",
			});
		}

		const image1 = req.files.image1 && req.files.image1[0]; // is the image1 is provided then only store it
		const image2 = req.files.image2 && req.files.image2[0];
		const image3 = req.files.image3 && req.files.image3[0];
		const image4 = req.files.image4 && req.files.image4[0];

		const images = [image1, image2, image3, image4].filter(
			(item) => item !== undefined
		);

		let imagesUrl = await Promise.all(
			images.map(async (item) => {
				let result = await cloudinary.uploader.upload(item.path, {
					resource_type: "image",
				});
				return result.secure_url;
			})
		);

		const response = await Product.create({
			name: name,
			description: description,
			price: Number(price),
			category: category,
			subCategory: subCategory,
			sizes: JSON.parse(sizes),
			bestSeller: bestSeller === "true" ? true : false,
			images: imagesUrl,
			date: Date.now(),
		});

		return res.status(201).json({
			success: true,
			message: "Product added successfully",
		});
	} catch (error) {
		console.log("Error in adding products");
		return res.status(500).json({
			success: false,
			message: "Error in adding products",
		});
	}
};

module.exports.listProducts = async (req, res) => {
	try {
		const response = await Product.find({});
		res.status(201).json({
			success: true,
			message: "Products listed successfully",
			products: response,
		});
	} catch (error) {
		console.log("Error in listing products");
		return res.status(500).json({
			success: false,
			message: "Error in listing products",
		});
	}
};

module.exports.removeProduct = async (req, res) => {
	try {
		const { id } = req.body;
		await Product.findByIdAndDelete(id);
		res.status(201).json({
			success: true,
			message: "Products removed successfully",
		});
	} catch (error) {
		console.log("Error in removing product");
		return res.status(500).json({
			success: false,
			message: "Error in removing product",
		});
	}
};

module.exports.singleProduct = async (req, res) => {
	try {
		const { id } = req.body;
		const response = await Product.findById(id);
		res.status(201).json({
			success: true,
			message: "Single Product fetched successfully",
			products: response,
		});
	} catch (error) {
		console.log("Error in fetching single product info");
		return res.status(500).json({
			success: false,
			message: "Error in fetching single product info",
		});
	}
};
