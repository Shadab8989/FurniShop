import styled from "styled-components";
import { ShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
	height: 60px;
	background-color: antiquewhite;
	color: black;
	${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
	display: flex;
	padding: 10px 20px;
	justify-content: space-between;
	align-items: center;
	${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;


const Logo = styled.h1`
	font-weight: bold;
	text-align: center;
	${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
	flex: 2;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ flex: "2", justifyContent: "center" })}
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const handleLogout = () => {
		logout(dispatch);
	};
	return (
		<Container>
			<Wrapper>
				<Left>
					<Logo>
						<Link to="/" className="Link">
							SK
						</Link>
					</Logo>
					
				</Left>
				
				<Right>
					{!user && (
						<>
							<Link className="Link" to="/register">
								<MenuItem>Register</MenuItem>
							</Link>
							<Link className="Link" to="/login">
								<MenuItem>Login</MenuItem>
							</Link>
						</>
					)}
					{user && (
						<>
							<MenuItem>{user.username}</MenuItem>
							<MenuItem className="Link" onClick={handleLogout}>Logout</MenuItem>
						</>
					)}
					<Link className="Link" to="/wishlist">
						<MenuItem>Wishlist</MenuItem>
					</Link>
					<Link className="Link" to="/orders">
						<MenuItem>Orders</MenuItem>
					</Link>
					<Link to="/cart">
						<MenuItem>
							<Badge
								style={{ margin: "15px" }}
								badgeContent={quantity}
								color="primary"
							>
								<ShoppingCart color="action" />
							</Badge>
						</MenuItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
