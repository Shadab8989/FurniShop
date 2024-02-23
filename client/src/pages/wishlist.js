import styled from "styled-components";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "../components/productItem";

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

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	${"" /* text-decoration: underline; */}
	cursor: pointer;
	margin: 0px 10px;
	&:hover {
		color: teal;
		font-weight: 600;
	}
`;

const Products = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Wishlist = () => {
	const products = useSelector((state) => state.wishlist.products);
	const cartItems = useSelector((state) => state.cart.products);
	console.log(products);
	return (
		<>
			<Container>
				<Navbar />
				<Wrapper>
					<Title>Your WishList</Title>
					<Top>
						<Link to="/" className="Link">
							<TopButtom>Continue Shopping</TopButtom>
						</Link>
						<TopTexts>
							<TopText>
								<Link className="Link" to="/cart">
									Shopping Bag ({cartItems.length})
								</Link>
							</TopText>
						</TopTexts>
					</Top>
					{products.length === 0 && (
						<>
							<Title>No Items in the Wishlist</Title>
						</>
					)}
					{products && (
						<>
							<Products>
								{products.map((product) => (
									<ProductItem product={product} key={product._id} />
								))}
							</Products>
						</>
					)}
				</Wrapper>
				<Footer />
			</Container>
		</>
	);
};

export default Wishlist;
