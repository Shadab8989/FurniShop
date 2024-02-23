const mongoose = require("mongoose");
const cryptoJs = require("crypto-js");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Name is required"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please fill a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		cartItems: {
			type: Array,
			default: [],
		},
		wishlistItems: {
			type: Array,
			default: [],
		},
		orderedItems: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
	const decyrptedPassword = cryptoJs.AES.decrypt(
		this.password,
		process.env.PASS_SEC
	).toString(cryptoJs.enc.Utf8);

	return password === decyrptedPassword;
};
module.exports = mongoose.model("User", userSchema);
