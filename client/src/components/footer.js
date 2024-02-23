import {
	Facebook,
	Instagram,
	MailOutline,
	Phone,
	Room,
	Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
	display: flex;
	${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const Hr = styled.hr`
	background-color: grey;
	border: none;
	height: 0.5px;
`;
const Left = styled.div`
	flex: 1;
	width: 30%;
	display: flex;
	flex-direction: column;
	padding: 20px;
	${mobile({ width: "90%" })}
`;

const Logo = styled.h1``;

const Description = styled.p`
	margin: 20px 0px;
	text-align:justify;
`;

const SocialContainer = styled.div`
	display: flex;
`;

const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid white;
	color: white;
	background-color: #${(props) => props.bg};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	cursor: pointer;
	&:hover {
		background-color: white;
		color: #${(props) => props.bg};
		border: 2px solid #${(props) => props.bg};
	}
`;

const Center = styled.div`
	flex: 1;
	padding: 15px;
	${mobile({ display: "none" })}
`;

const Title = styled.h3`
	margin-bottom: 20px;
`;

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`;

const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;
	cursor: pointer;
	&:hover {
		color: teal;
		font-weight: 700;
	}
`;

const Right = styled.div`
	flex: 1;
	padding: 20px;
`;

const ContactItem = styled.div`
	margin-bottom: 10px;
	display: flex;
	${"" /* justify-content:center; */}
	align-items:center
`;

const Footer = () => {
	return (
		<>
			<Hr />
			<Container>
				<Left>
					<Logo>SK</Logo>
					<Description>
						Discover a curated collection of modern furniture for your home at
						FurniShop. Get quality, style, and comfort delivered to your
						doorstep.
					</Description>
					<SocialContainer>
						<SocialIcon bg="3B5999">
							<Facebook />
						</SocialIcon>
						<SocialIcon bg="E4406f">
							<Instagram />
						</SocialIcon>
						<SocialIcon bg="55ACEE">
							<Twitter />
						</SocialIcon>
					</SocialContainer>
				</Left>
				<Center>
					<Title>Useful Links</Title>
					<List>
						<ListItem>
							<Link to="/" className="Link">
								Home
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/cart" className="Link">
								Cart
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/products/Seating" className="Link">
								Seating
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/products/Tables" className="Link">
								Table
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/products/Storage" className="Link">
								Storage
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/products/Bedroom" className="Link">
								Bedroom
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/products/Outdoor" className="Link">
								Outdoor
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/orders" className="Link">
								Orders
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/wishlist" className="Link">
								Wishlist
							</Link>
						</ListItem>
					</List>
				</Center>
				<Right>
					<Title>Contact</Title>
					<ContactItem>
						<Room style={{ marginRight: "10px" }} />
						123, ABC Street, Mumbai-400-001, Maharashtra, India.
					</ContactItem>
					<ContactItem>
						<Phone style={{ marginRight: "10px" }} />
						+91 9999999999
					</ContactItem>
					<ContactItem>
						<MailOutline style={{ marginRight: "10px" }} />
						furnishop.sk@gmail.com
					</ContactItem>
				</Right>
			</Container>
		</>
	);
};

export default Footer;
