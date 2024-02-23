import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	width: 80%;
	${"" /* border: 2px solid teal; */}
	padding: 20px;
`;

const Image = styled.img`
	width: 200px;
	height: 200px;
`;

const Name = styled.h3`
	margin: 10px 0;
`;
const Text = styled.p`
	margin: 10px;
`;
const Total = styled.p`
	margin-top: 20px;
	font-weight: 700;
	font-size: 20px;
`;

const Hr = styled.hr``;
const Order = ({ order }) => {
	const cartItems = order.cartItems;
	return (
		<>
			<Container>
				{cartItems &&
					cartItems.map((item) => (
						<>
							<Link className="Link" to={`/product/${item.product._id}`}>
								<Name>{item.product.name}</Name>
								<Image src={item.product.image} />{" "}
							</Link>
							<Text>Quantity: {item.amount}</Text>
							<Text>Subtotal: ${item.product.price * item.amount}</Text>
							<Hr />
						</>
					))}
				<Total>Total : ${order.totalPrice}</Total>
			</Container>
		</>
	);
};

export default Order;
