const express = require("express");
const router = require("express").Router();
const {
	createProduct,
	getAllProducts,
	getProduct,
} = require("../controllers/product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

//GET ALL PRODUCT (ANYBODY CAN SEE THIS)
router.get("/", getAllProducts);

//GET PRODUCT (ANYBODY CAN SEE THIS)
router.get("/:id", getProduct);

//CREATE PRODUCT (ADMIN ONLY)
router.post("/:id", verifyTokenAndAdmin, createProduct);

module.exports = router;

