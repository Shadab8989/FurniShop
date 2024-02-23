import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar";
import { addToOrders } from "../redux/slices/ordersSlice";
import { emptyTheCart } from "../redux/slices/cartSlice";
import { addProductToDbOrders } from "../redux/apiCalls";

const Container = styled.div`
	width: 80%;
	margin: 20px;
`;
const Summary = styled.div`
	border: 0.5px solid teal;
	border-radius: 10px;
	padding: 20px;
	height: fit-content;
`;
const SummaryTitle = styled.h1`
	font-weight: 200;
`;
const SummaryItem = styled.div`
	margin: 15px 0;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.span`
	width: 100%;
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border-radius: 10px;
	border: 1px solid teal;
	transition: all 0.3s ease;
	&:hover {
		background-color: teal;
		color: white;
	}
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
const Input = styled.input`
	width: 90%;
	border-radius: 10px;
	margin: 10px 0;
	padding: 8px;
	border: 1px solid teal;
	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	border-radius: 10px;
	padding: 10px 20px;
	margin-bottom: 10px;
	cursor: pointer;
	border: 1px solid teal;
	transition: all 0.3s ease;
	&:hover {
		background-color: teal;
		color: white;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;

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
			<Container>
				<Link className="Link" to="/">
					<Button>Continue Shopping</Button>
				</Link>
				<Summary>
					<SummaryTitle>Order Summary</SummaryTitle>
					<SummaryItem>
						<SummaryItemText>SubTotal:</SummaryItemText>
						<SummaryItemPrice>${totalPrice}</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Shipping:</SummaryItemText>
						<SummaryItemPrice>$3</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Shipping Discount:</SummaryItemText>
						<SummaryItemPrice>-$3</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem type="total">
						<SummaryItemText>Total:</SummaryItemText>
						<SummaryItemPrice>${totalPrice}</SummaryItemPrice>
					</SummaryItem>
						</Summary>
				<Form>
					<Input
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<Input
						placeholder="Contact"
						type="contact"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
					/>
					<Link className="Link" to="/ordercompleted">
						<Button
							disabled={!name || !address || !contact}
							onClick={handleOrderClick}
						>
							Order
						</Button>
					</Link>
				</Form>
			</Container>
		</>
	);
};

export default Checkout;
