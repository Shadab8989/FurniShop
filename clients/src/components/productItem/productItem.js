import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { addRemoveFromWishlist } from "../../redux/slices/wishlistSlice";
import {
	addProductToDbCart,
	addRemoveFromDbWishlist,
} from "../../redux/apiCalls";
import "./productItem.css";

const ProductItem = ({ product }) => {
	const user = useSelector((state) => state.user.currentUser);
	const productsInCart = useSelector((state) => state.cart.products);
	const productsInWishlist = useSelector((state) => state.wishlist.products);

	const dispatch = useDispatch();

	const handleAddToCartClick = () => {
		dispatch(addProductToCart(product));
		if (user) {
			addProductToDbCart(productsInCart, user, { product: product, amount: 1 });
		}
	};

	const handleAddToWishlist = () => {
		dispatch(addRemoveFromWishlist(product));
		if (user) {
			addRemoveFromDbWishlist(productsInWishlist, user, product);
		}
	};
	return (
		<>
			<div className="productItem-container">
				<div className="productItem-circle"></div>
				<img
					className="productItem-image"
					src={product.image}
					alt={product.name}
				/>
				<div className="productItem-name">{product.name}</div>
				<div className="productItem-icons">
					<div className="productItem-icon" onClick={handleAddToCartClick}>
						<ShoppingCartOutlinedIcon />
					</div>
					<Link className="Link" to={`/product/${product._id}`}>
						<div className="productItem-icon">
							<SearchOutlinedIcon />
						</div>
					</Link>
					<div className="productItem-icon" onClick={handleAddToWishlist}>
						<FavoriteBorderOutlinedIcon />
					</div>
				</div>
				<div className="productItem-price">Price: ${product.price}</div>
				<div className="productItem-rating">Rating: {product.Rating} / 5</div>
			</div>
		</>
	);
};

export default ProductItem;
