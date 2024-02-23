import styled from "styled-components";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	decreaseProductQuantity,
	increaseProductQuantity,
	removeProductFromCart,
} from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeProductFromDbCart, updateAmount } from "../redux/apiCalls";

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

const Info = styled.div`
	flex: 3;
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
	${mobile({ flexDirection: "column" })}
`;
const Image = styled.img`
	width: 200px;
	border-radius: 10px;
`;
const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	${"" /* ${mobile({ flexDirection: "row" })} */}
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;
const ProductAmount = styled.div`
	font-size: 15px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
	font-size: 25px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

const Bottom = styled.div`
	margin: 10px;
	display: flex;
	${mobile({ flexDirection: "column" })}
`;

const Total = styled.p`
	font-size: 30px;
	width: 30%;
`;

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
			<Container>
				<Navbar />
				<Wrapper>
					<Title>Your Bag</Title>
					<Top>
						<Link to="/" className="Link">
							<TopButtom>Continue Shopping</TopButtom>
						</Link>
						<TopTexts>
							<TopText>
								<Link className="Link" to="/wishlist">
									Your Wishlist ({wishlistProducts.length})
								</Link>
							</TopText>
						</TopTexts>
					</Top>
					<Info>
						{products &&
							products.map((item) => (
								<>
									<Product key={item.product._id}>
										<Link className="Link" to={`/product/${item.product._id}`}>
											<ProductDetail>
												<Image src={item.product.image} />
												<Details>
													<ProductName>
														<b>{item.product.name}</b>
													</ProductName>
													<ProductId>
														<b>PRODUCT ID:</b>
														{item.product._id}
													</ProductId>
												</Details>
											</ProductDetail>
										</Link>
										<PriceDetail>
											<ProductAmountContainer>
												<Add
													style={{ cursor: "pointer" }}
													onClick={() =>
														handleAmountChange("add", item.amount, item.product)
													}
												/>
												<ProductAmount>{item.amount}</ProductAmount>
												<Remove
													style={{ cursor: "pointer" }}
													onClick={() =>
														handleAmountChange(
															"remove",
															item.amount,
															item.product
														)
													}
												/>
											</ProductAmountContainer>
											<ProductPrice>
												${item.amount * item.product.price}
											</ProductPrice>
										</PriceDetail>
									</Product>
									<TopButtom
										onClick={() => handleRemoveFromCart(item.product)}
										style={{ marginBottom: "10px" }}
									>
										Remove From Cart
									</TopButtom>
									<Hr />
								</>
							))}
					</Info>

					{products.length !== 0 && (
						<Bottom>
							<Total>Total: ${totalPrice}</Total>
							<Link to={user ? "/checkout" : "/login"}>
								<TopButtom
									style={{ alignSelf: "flex-end" }}
									disabled={totalPrice === 0}
								>
									Checkout Now
								</TopButtom>
							</Link>
						</Bottom>
					)}
				</Wrapper>
				<Footer />
			</Container>
		</>
	);
};

export default Cart;
