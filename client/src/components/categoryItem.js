import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Button = styled.button`
	border: none;
	padding: 10px;
	background-color: white;
	color: grey;
	cursor: pointer;
	transition: all 0.5s ease;
	border-radius: 10px;
	font-weight: 700;
`;

const Container = styled.div`
	${"" /* flex: 1; */}
	margin: 0.5rem;
	height: 55vh;
	width: 20rem;
	position: relative;
	transition: all 1.5s ease;
	&:hover {
		transform: scale(1.05);
	}
	&:hover ${Button} {
		background-color: antiquewhite;
		color: black;
	}
`;
const Image = styled.img`
	${"" /* width: 100%; */}
	height: 100%;
	border-radius: 10px;
	width: 100%;
	object-fit: cover;
	${"" /* ${mobile({height:'30vh'})} */}
`;
const Info = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Title = styled.h1`
	text-align: center;
	color: white;
	margin-bottom: 20px;
`;

const CategoryItem = ({ category }) => {
	const title = category.title.split(' ')[0]
	return (
		<>
			<Container>
				<Link to={`/products/${title}`}>
					<Image src={category.image} />
					<Info>
						<Title>{category.title}</Title>
						<Button>SHOP NOW</Button>
					</Info>
				</Link>
			</Container>
		</>
	);
};

export default CategoryItem;
