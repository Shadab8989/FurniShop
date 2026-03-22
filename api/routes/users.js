const express = require("express");
const router = express.Router();

const {
	updateUser,
	deleteUser,
	addToCart,
	UpdateProductAmount,
	removeFromCart,
	addToWishlist,
	removeFromWishlist,
	addToOrders,
} = require("../controllers/users");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");


//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//Add to cartProducts array.
router.patch("/addtocart/:id", verifyTokenAndAuthorization, addToCart);
//Remove from cartProducts array.
router.patch("/removefromcart/:id", verifyTokenAndAuthorization, removeFromCart);
//Update product amount
router.patch("/incrementamount/:id", verifyTokenAndAuthorization, UpdateProductAmount);
//Wishlist addition removal
router.patch("/addtowishlist/:id", verifyTokenAndAuthorization, addToWishlist);
router.patch("/removefromwishlist/:id", verifyTokenAndAuthorization, removeFromWishlist);
//Add to orders
router.patch("/addtoorders/:id", verifyTokenAndAuthorization, addToOrders);
module.exports = router;

