import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import styled from "styled-components";
import { Done } from "@material-ui/icons";

const Container = styled.div`
	position: relative;
`;
const Buttom = styled.button`
	margin: 20px;
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

const P = styled.p`
	margin: 50px auto;
	text-align:center;
	width: 80%;
	font-size: 40px;
`;

const OrderSuccess = () => {
	return (
		<>
			<Navbar />
			<Link to="/" className="Link">
				<Buttom>Continue Shopping</Buttom>
			</Link>
			
			<P>Order is Successful <Done style={{fontSize:"40px"}}/></P>
		</>
	);
};

export default OrderSuccess;
