const express = require("express");
const {
	addProduct,
	listProducts,
	removeProduct,
	singleProduct,
} = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middlewares");
const router = express.Router();

router.post(
	"/add",
	upload.fields([
		{ name: "image1", maxCount: 1 },
		{ name: "image2", maxCount: 1 },
		{ name: "image3", maxCount: 1 },
		{ name: "image4", maxCount: 1 },
	]),
	addProduct
);
router.get("/list", listProducts);
router.post("/remove", removeProduct);
router.post("/single-prod", singleProduct);

module.exports = router;
