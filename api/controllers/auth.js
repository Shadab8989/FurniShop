const User = require("../models/userModel");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const encryptedPassword = cryptoJs.AES.encrypt(
			password,
			process.env.PASS_SEC
		).toString();
		const newUser = await User.create({
			username: username,
			email: email,
			password: encryptedPassword,
		});

		const accessToken = jwt.sign(
			{ id: newUser._id, isAdmin: newUser.isAdmin },
			process.env.JWT_SEC,
			{ expiresIn: "3d" }
		);

		const { password: pass, ...userInfo } = newUser._doc;
		res.status(201).json({ ...userInfo, accessToken });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const login = async (req, res) => {
	const { username } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}
		const isMatch = user.comparePassword(req.body.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Password doesn't match" });
		}

		const accessToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SEC,
			{ expiresIn: "3d" }
		);

		const { password, ...userInfo } = user._doc;
		return res.status(200).json({ ...userInfo, accessToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
