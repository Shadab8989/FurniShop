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



//UPDATE USER
router.put("/:id", updateUser);

//DELETE USER

router.delete("/:id", deleteUser);

//Add to cartProducts array.
router.patch("/addtocart/:id", addToCart);
//Remove from cartProducts array.
router.patch("/removefromcart/:id", removeFromCart);
//Update product amount
router.patch("/incrementamount/:id", UpdateProductAmount);
//Wishlist addition removal
router.patch("/addtowishlist/:id", addToWishlist);
router.patch("/removefromwishlist/:id", removeFromWishlist);
//Add to orders
router.patch("/addtoorders/:id", addToOrders);
module.exports = router;
