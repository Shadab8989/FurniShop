// import { Badge } from "@material-ui/core";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import "./navbar.css";
import { ShoppingCartOutlined } from "@mui/icons-material";

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const handleLogout = () => {
		logout(dispatch);
	};
	return (
		<div className="navbar-container">
			<div className="navbar-wrapper">
				<div className="navbar-left-container">
					<h1 className="navbar-logo">
						<Link to="/" className="Link">
							SK
						</Link>
					</h1>
				</div>

				<div className="navbar-right-container">
					{!user && (
						<>
							<Link className="Link" to="/register">
								<div className="navbar-menu-item">Register</div>
							</Link>
							<Link className="Link" to="/login">
								<div className="navbar-menu-item">Login</div>
							</Link>
						</>
					)}
					{user && (
						<>
							<div className="navbar-menu-item">{user.username}</div>
							<div className="Link navbar-menu-item" onClick={handleLogout}>
								Logout
							</div>
						</>
					)}
					<Link className="Link" to="/wishlist">
						<div className="navbar-menu-item">Wishlist</div>
					</Link>
					<Link className="Link" to="/orders">
						<div className="navbar-menu-item">Orders</div>
					</Link>
					<Link to="/cart">
						<div className="navbar-menu-item">
							<Badge
								style={{ margin: "15px" }}
								badgeContent={quantity}
								color="primary"
							>
								<ShoppingCartOutlined color="action" />
							</Badge>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
