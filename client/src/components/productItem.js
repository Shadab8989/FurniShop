import {
	FavoriteBorderOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	addProductToCart,
} from "../redux/slices/cartSlice";
import { useState } from "react";
import { addRemoveFromWishlist } from "../redux/slices/wishlistSlice";
import { addProductToDbCart, addRemoveFromDbWishlist } from "../redux/apiCalls";

const Icons = styled.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 3;
	display: flex;
	${"" /* flex-direction:column; */}
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`;

const Name = styled.div`
	position: absolute;
	top: 10px;
	z-index: 4;
	color: antiquewhite;
	font-weight: 700;
`;

const Rating = styled.div`
	position: absolute;
	bottom: 10px;
	z-index: 4;
	right: 10px;
	color: antiquewhite;
	font-weight: 700;
`;
const Price = styled.div`
	position: absolute;
	bottom: 10px;
	z-index: 4;
	left: 10px;
	color: antiquewhite;
	font-weight: 700;
`;
const Container = styled.div`
	${"" /* flex: 1; */}
	margin: 5px;
	min-width: 280px;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;
	&:hover ${Icons} {
		opacity: 1;
	}
	${
		"" /* &:hover ${Name} {
		opacity: 0;
	}
	&:hover ${Rating} {
		opacity: 0;
	}
	&:hover ${Price} {
		opacity: 0;
	} */
	}
`;
const Circle = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`;

const Image = styled.img`
	height: 100%;
	border-radius: 10px;
	z-index: 2;
	width: 20rem;
`;

const Icon = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;
	transition: all 0.5s ease;

	&:hover {
		background-color: #e9f5f5;
		transform: scale(1.2);
	}
`;
const ProductItem = ({ product }) => {
	const user = useSelector((state) => state.user.currentUser);
	const productsInCart = useSelector((state) => state.cart.products);
	const productsInWishlist = useSelector((state) => state.wishlist.products);

	const dispatch = useDispatch();

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
				<Circle />
				<Image src={product.image} />
				<Name>{product.name}</Name>
				<Icons>
					<Icon onClick={handleAddToCartClick}>
						<ShoppingCartOutlined />
					</Icon>
					<Link className="Link" to={`/product/${product._id}`}>
						<Icon>
							<SearchOutlined />
						</Icon>
					</Link>
					<Icon onClick={handleAddToWishlist}>
						<FavoriteBorderOutlined />
					</Icon>
				</Icons>
				<Price>Price: ${product.price}</Price>
				<Rating>Rating: {product.Rating} / 5</Rating>
			</Container>
		</>
	);
};

export default ProductItem;
