import React from "react";
import { Link } from "react-router-dom";
import "./order.css";

const Order = ({ order }) => {
	const cartItems = order.cartItems;
	return (
		<>
			<div className="order-container">
				{cartItems &&
					cartItems.map((item) => (
						<>
							<Link className="Link" to={`/product/${item.product._id}`}>
								<h3 className="order-name">{item.product.name}</h3>
								<img
									className="order-container"
									src={item.product.image}
									alt={item.product.name}
								/>
							</Link>
							<p className="order-text">Quantity: {item.amount}</p>
							<p className="order-text">
								Subtotal: ${item.product.price * item.amount}
							</p>
							<hr />
						</>
					))}
				<p className="order-total">Total : ${order.totalPrice}</p>
			</div>
		</>
	);
};

export default Order;
