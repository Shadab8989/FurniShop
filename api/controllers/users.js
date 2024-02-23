const cryptoJs = require("crypto-js");
const User = require("../models/userModel");

const updateUser = async (req, res) => {
	if (req.body.password) {
		req.body.password = cryptoJs.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString();
	}
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id, { new: true });
		if (!user) {
			return res.json({
				message: `User with id ${req.params.id} doesn't exist`,
			});
		}
		res
			.status(200)
			.json({ message: `User with id ${req.params.id} has been deleted` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const addToCart = async (req, res) => {
	const product = req.body;
	try {
		const updatedCart = await User.findByIdAndUpdate(
			req.params.id,
			{ $push: { cartItems: product } },
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const UpdateProductAmount = async (req, res) => {
	const product = req.body.product;
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const index = user.cartItems.findIndex(
			(item) => item.product._id === product._id
		);
		if (index === -1) {
			return res.status(404).json({
				product: product,
				user: user,
				cart: user.cartItems,
				message: "Product not found in the cart.",
			});
		}

		user.cartItems[index] = req.body;
		user.markModified(`cartItems[${index}]`);
		await user.save();
		const updatedUser = await User.findById(req.params.id);
		res.status(200).json({ UPDATEDUSER: updatedUser });
	} catch (err) {
		res.status(500).json({ message: "err.message" });
	}
};
const removeFromCart = async (req, res) => {
	const product = req.body;
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const updatedCart = user.cartItems.filter(
			(item) => item.product._id !== product._id
		);
		user.cartItems = updatedCart;
		user.markModified("cartItems");
		await user.save();
		const updatedUser = await User.findById(req.params.id);
		res.status(200).json({ UPDATEDUSER: updatedUser });
	} catch (err) {
		res.status(500).json({ message: "err.message" });
	}
};

const addToWishlist = async (req, res) => {
	const product = req.body;
	try {
		const updatedWishlist = await User.findByIdAndUpdate(
			req.params.id,
			{
				$push: { wishlistItems: product },
			},
			{ new: true }
		);
		res.status(200).json({ updatedWishlist: updatedWishlist });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const removeFromWishlist = async (req, res) => {
	const product = req.body;
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const updatedWishlist = user.wishlistItems.filter(
			(item) => item._id !== product._id
		);
		user.wishlistItems = updatedWishlist;
		user.markModified("wishlistItems");
		await user.save();
		const updatedUser = await User.findById(req.params.id);
		res.status(200).json({ UPDATEDUSER: updatedUser });
	} catch (err) {
		res.status(500).json({ message: "err.message" });
	}
};

const addToOrders = async (req, res) => {
	const order = req.body;
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		user.orderedItems.unshift(order);
		user.cartItems = [];
		user.markModified("orderedItems");
		user.markModified("cartItems");
		await user.save()
		const updatedUser = await User.findById(req.params.id);
		res.status(200).json({ UPDATEDUSER: updatedUser });
	} catch (err) {
		res.status(500).json({ message: "err.message" });
	}
	
};

module.exports = {
	updateUser,
	deleteUser,
	addToCart,
	UpdateProductAmount,
	removeFromCart,
	addToWishlist,
	removeFromWishlist,
	addToOrders,
};
