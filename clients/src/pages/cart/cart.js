import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
// import { Add, Remove } from "@material-ui/icons";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	decreaseProductQuantity,
	increaseProductQuantity,
	removeProductFromCart,
} from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeProductFromDbCart, updateAmount } from "../../redux/apiCalls";
import "./cart.css";

const Cart = () => {
	const products = useSelector((state) => state.cart.products);
	const totalPrice = useSelector((state) => state.cart.totalPrice);
	const user = useSelector((state) => state.user.currentUser);
	const wishlistProducts = useSelector((state) => state.wishlist.products);
	const dispatch = useDispatch();

	const handleAmountChange = (type, amount, product) => {
		if (type === "add") {
			dispatch(increaseProductQuantity(product));
			if (user) {
				updateAmount(user, { product: product, amount: amount + 1 });
			}
		} else {
			if (amount >= 2) {
				dispatch(decreaseProductQuantity(product));
				updateAmount(user, { product: product, amount: amount - 1 });
			}
		}
	};

	const handleRemoveFromCart = (product) => {
		dispatch(removeProductFromCart(product));
		if (user) {
			removeProductFromDbCart(user, product);
		}
	};
	return (
		<>
			<div className="cart-container">
				<Navbar />
				<div className="cart-wrapper">
					<h1 className="cart-title">Your Bag</h1>
					<div className="cart-top">
						<Link to="/" className="Link">
							<button className="cart-top-button">Continue Shopping</button>
						</Link>
						<div className="cart-top-texts">
							<span className="cart-top-text">
								<Link className="Link" to="/wishlist">
									Your Wishlist ({wishlistProducts.length})
								</Link>
							</span>
						</div>
					</div>
					<div className="cart-info">
						{products &&
							products.map((item) => (
								<>
									<div className="cart-product" key={item.product._id}>
										<Link className="Link" to={`/product/${item.product._id}`}>
											<div className="cart-product-detail">
												<img
													className="cart-image"
													src={item.product.image}
													alt={item.product.name}
												/>
												<div className="cart-details">
													<span className="cart-product-name">
														<b>{item.product.name}</b>
													</span>
													<span className="cart-product-id">
														<b>PRODUCT ID:</b>
														{item.product._id}
													</span>
												</div>
											</div>
										</Link>
										<div className="cart-price-detail">
											<div className="cart-amount-container">
												<AddOutlinedIcon
													style={{ cursor: "pointer" }}
													onClick={() =>
														handleAmountChange("add", item.amount, item.product)
													}
												/>
												<div className="cart-product-amount">{item.amount}</div>
												<RemoveOutlinedIcon
													style={{ cursor: "pointer" }}
													onClick={() =>
														handleAmountChange(
															"remove",
															item.amount,
															item.product
														)
													}
												/>
											</div>
											<div className="cart-product-price">
												${item.amount * item.product.price}
											</div>
										</div>
									</div>
									<button
										className="cart-top-button"
										onClick={() => handleRemoveFromCart(item.product)}
										style={{ marginBottom: "10px" }}
									>
										Remove From Cart
									</button>
									<hr className="cart-hr" />
								</>
							))}
					</div>

					{products.length !== 0 && (
						<div className="cart-bottom">
							<p className="cart-total">Total: ${totalPrice}</p>
							<Link to={user ? "/checkout" : "/login"}>
								<button
									className="cart-top-button"
									style={{ alignSelf: "flex-end" }}
									disabled={totalPrice === 0}
								>
									Checkout Now
								</button>
							</Link>
						</div>
					)}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Cart;
