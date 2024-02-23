const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: String,
			required: true,
		},
		subCategory: {
			type: String,
		},
		trending:{
			type:Boolean,
			default:false
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
        
        id: {
			type: Number,
			required: true,
		},
        Rating: {
			type: Number,
			required: true,
		},
		
		
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
