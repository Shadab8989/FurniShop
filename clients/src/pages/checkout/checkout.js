import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { addToOrders } from "../../redux/slices/ordersSlice";
import { emptyTheCart } from "../../redux/slices/cartSlice";
import { addProductToDbOrders } from "../../redux/apiCalls";
import "./checkout.css";

const Checkout = () => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState("");
	const user = useSelector((state) => state.user.currentUser);
	const cartItems = useSelector((state) => state.cart.products);
	const totalPrice = useSelector((state) => state.cart.totalPrice);
	const dispatch = useDispatch();

	function getOrderTime() {
		const dateObj = new Date();
		const date = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const year = dateObj.getFullYear();

		const completeDate = `${date}/${month}/${year}`;
		var hours = dateObj.getHours();
		var minutes = dateObj.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + ampm;
		return `${strTime} ${completeDate}`;
	}
	const orderTime = getOrderTime();
	const handleOrderClick = () => {
		dispatch(addToOrders({ cartItems, totalPrice, orderTime }));
		if (user) {
			addProductToDbOrders(user, { cartItems, totalPrice, orderTime });
		}
		dispatch(emptyTheCart());
	};

	return (
		<>
			<Navbar />
			<div className="checkout-container">
				<Link className="Link" to="/">
					<button className="checkout-button">Continue Shopping</button>
				</Link>
				<div className="checkout-summary">
					<h1 className="checkout-summary-title">Order Summary</h1>
					<div className="checkout-summary-item">
						<span className="checkout-summary-item-text">SubTotal:</span>
						<span className="checkout-summary-item-price">${totalPrice}</span>
					</div>
					<div className="checkout-summary-item">
						<span className="checkout-summary-item-text">Shipping:</span>
						<span className="checkout-summary-item-price">$3</span>
					</div>
					<div className="checkout-summary-item">
						<span className="checkout-summary-item-text">
							Shipping Discount:
						</span>
						<span className="checkout-summary-item-price">-$3</span>
					</div>
					<div
						className="checkout-summary-item"
						style={{ fontWeight: "500", fontSize: "24px" }}
					>
						<span className="checkout-summary-item-text">Total:</span>
						<span className="checkout-summary-item-span">${totalPrice}</span>
					</div>
				</div>
				<form className="checkout-form">
					<input
						className="checkout-input"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className="checkout-input"
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<input
						className="checkout-input"
						placeholder="Contact"
						type="contact"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
					/>
					<Link className="Link" to="/ordercompleted">
						<button
							className="checkout-button"
							disabled={!name || !address || !contact}
							onClick={handleOrderClick}
						>
							Order
						</button>
					</Link>
				</form>
			</div>
		</>
	);
};

export default Checkout;
