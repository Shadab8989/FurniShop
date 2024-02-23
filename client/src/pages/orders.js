import styled from "styled-components";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "../components/productItem";
import Order from "../components/order";

const Container = styled.div``;
const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopButtom = styled.button`
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
	&:disabled {
		cursor: not-allowed;
	}
`;

const Products = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-wrap: wrap;
`;

const OrderContainer = styled.div`
	border: 2px solid teal;
	width: 50%;
	margin-bottom: 20px;
	padding: 50px;
	width: fit-content;
`;

const Orders = () => {
	const orders = useSelector((state) => state.orders.ordersArray);
	console.log(orders);
	return (
		<>
			<Navbar />
			<Container>
				<Wrapper>
					<Title>Your Orders</Title>
					<Top>
						<Link to="/" className="Link">
							<TopButtom>Continue Shopping</TopButtom>
						</Link>
					</Top>
					{orders.length === 0 && (
						<>
							<Title>No Orders Yet</Title>
						</>
					)}
					{orders && (
						<>
							<Products>
								{orders.map((order) => (
									<OrderContainer>
										Ordered on : {order.orderTime}
										<Order order={order} />
									</OrderContainer>
								))}
							</Products>
						</>
					)}
				</Wrapper>
			</Container>
			<Footer />
		</>
	);
};

export default Orders;
