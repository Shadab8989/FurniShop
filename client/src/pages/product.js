import styled from "styled-components";
import Navbar from "../components/navbar";
import NewsLetter from "../components/newsLetter";
import Footer from "../components/footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	decreaseProductQuantity,
	increaseProductQuantity,
} from "../redux/slices/cartSlice";
import { addRemoveFromWishlist } from "../redux/slices/wishlistSlice";
import { addProductToDbCart, addRemoveFromDbWishlist } from "../redux/apiCalls";

const Container = styled.div``;
const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	flex-wrap: wrap;
	${mobile({
		padding: "10px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	})}
`;
const ImageContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
`;
const Image = styled.img`
	width: 80%;
	${"" /* height:80%; */}
	border-radius: 10px;
	${"" /* height:90vh; */}
	${"" /* object-fit:contain */}
`;
const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
	font-weight: 200;
`;
const Description = styled.p`
	margin: 20px 0px;
	text-align: justify;
`;
const Price = styled.span`
	font-weight: 100;
	font-size: 20px;
`;

const AddContainer = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	${"" /* justify-content: space-between; */}
	${mobile({ width: "100%" })}
`;

const Button = styled.button`
	padding: 10px;
	margin-left: 5px;
	border: 1px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	border-radius: 10px;
	transition: all 0.5s ease;

	&:hover {
		background-color: teal;
		color: white;
	}
`;

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
			<Container>
				<Navbar />
				{product && (
					<Wrapper>
						<ImageContainer>
							<Image src={product.image} />
						</ImageContainer>
						<InfoContainer>
							<Title>{product.name}</Title>
							<Description>{product.description}</Description>
							<Price>Price : $ {product.price}</Price>
							<AddContainer>
								<Button onClick={handleAddToWishlist}>ADD TO WISHLIST</Button>
								<Button onClick={handleAddToCartClick}>ADD TO CART</Button>
							</AddContainer>
						</InfoContainer>
					</Wrapper>
				)}
				<NewsLetter />
				<Footer />
			</Container>
		</>
	);
};

export default SingleProduct;
