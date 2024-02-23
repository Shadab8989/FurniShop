const User = require("../models/userModel");
const cryptoJs = require("crypto-js");

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
		res.status(201).json(newUser);
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
			return res.status(401).json({ message: "Password doesn't matches" });
		}
		return res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
