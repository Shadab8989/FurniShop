const Product = require("../models/productModel");
const User = require("../models/userModel");

const createProduct = async (req, res) => {
	const userId = req.params.id;
	const user = await User.findById(userId);
	if (!user.isAdmin) {
		return res
			.status(500)
			.json({ message: "You are not authorized to create new product." });
	}
	try {
		const newProduct = await Product.create(req.body);
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getAllProducts = async (req, res) => {
	const latest = req.query.new;
	const { category, subCategory } = req.query;
	const queryObject = {};
	try {
		if (category) {
			queryObject.category = category;
		}
		if (subCategory) {
			queryObject.subCategory = subCategory;
		}

		const allProducts =
			latest === "true"
				? await Product.find(queryObject).sort({ createdAt: -1 })
				: await Product.find(queryObject);

		res.status(200).json({ productsCount: allProducts.length, allProducts });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	createProduct,
	getAllProducts,
	getProduct,
};
