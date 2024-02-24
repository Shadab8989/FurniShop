import Navbar from "../../components/navbar/navbar";
import NewsLetter from "../../components/newsLetter/newsLetter";
import Footer from "../../components/footer/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/slices/cartSlice";
import { addRemoveFromWishlist } from "../../redux/slices/wishlistSlice";
import {
	addProductToDbCart,
	addRemoveFromDbWishlist,
} from "../../redux/apiCalls";

import "./product.css";

const SingleProduct = () => {
	const [product, setProduct] = useState(null);
	const location = useLocation().pathname.split("/");
	const productId = location[location.length - 1];
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const productsInCart = useSelector((state) => state.cart.products);
	const productsInWishlist = useSelector((state) => state.wishlist.products);
	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5000/api/products/${productId}`
				);
				setProduct(res.data);
			} catch (err) {
				console.log(err.message);
			}
		};
		getProduct();
	}, [productId]);

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
			<div className="product-page-container">
				<Navbar />
				{product && (
					<div className="product-page-wrapper">
						<div className="product-page-image-container">
							<img
								className="product-page-image"
								src={product.image}
								alt={product.name}
							/>
						</div>
						<div className="product-page-info-container">
							<h1 className="product-page-title">{product.name}</h1>
							<p className="product-page-description">{product.description}</p>
							<span className="product-page-price">
								Price : $ {product.price}
							</span>
							<div className="product-page-add-container">
								<button
									className="product-page-button"
									onClick={handleAddToWishlist}
								>
									ADD TO WISHLIST
								</button>
								<button
									className="product-page-button"
									onClick={handleAddToCartClick}
								>
									ADD TO CART
								</button>
							</div>
						</div>
					</div>
				)}
				<NewsLetter />
				<Footer />
			</div>
		</>
	);
};

export default SingleProduct;
