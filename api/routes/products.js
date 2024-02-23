const express = require("express");
const router = express.Router();
const {
	createProduct,
	getAllProducts,
	getProduct,
} = require("../controllers/product");

//GET ALL PRODUCT (ANYBODY CAN SEE THIS)
router.get("/", getAllProducts);

//GET PRODUCT (ANYBODY CAN SEE THIS)

router.post('/:id',createProduct)
router.get("/:id", getProduct);

module.exports = router;
