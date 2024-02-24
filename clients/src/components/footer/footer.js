import { Link } from "react-router-dom";
import "./footer.css";
import { Facebook, Twitter, Instagram, Room, Phone, MailOutline } from "@mui/icons-material";

const Footer = () => {
	return (
		<>
			<hr />
			<div className="footer-container">
				<div className="footer-left-container">
					<h1>SK</h1>
					<p className="footer-description">
						Discover a curated collection of modern furniture for your home at
						FurniShop. Get quality, style, and comfort delivered to your
						doorstep.
					</p>
					<div className="footer-social-container">
						<div className="footer-social-icon facebook">
							<Facebook />
						</div>
						<div className="footer-social-icon instagram">
							<Instagram />
						</div>
						<div className="footer-social-icon twitter">
							<Twitter />
						</div>
					</div>
				</div>
				<div className="footer-center-container">
					<h3 className="footer-title">Useful Links</h3>
					<ul className="footer-list">
						<div className="footer-list-item">
							<Link to="/" className="Link">
								Home
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/cart" className="Link">
								Cart
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/products/Seating" className="Link">
								Seating
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/products/Tables" className="Link">
								Table
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/products/Storage" className="Link">
								Storage
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/products/Bedroom" className="Link">
								Bedroom
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/products/Outdoor" className="Link">
								Outdoor
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/orders" className="Link">
								Orders
							</Link>
						</div>
						<div className="footer-list-item">
							<Link to="/wishlist" className="Link">
								Wishlist
							</Link>
						</div>
					</ul>
				</div>
				<div className="footer-right-container">
					<h3 className="footer-title">Contact</h3>
					<div className="footer-contact-item">
						<Room style={{ marginRight: "10px" }} />
						123, ABC Street, Mumbai-400-001, Maharashtra, India.
					</div>
					<div className="footer-contact-item">
						<Phone style={{ marginRight: "10px" }} />
						+91 9999999999
					</div>
					<div className="footer-contact-item">
						<MailOutline style={{ marginRight: "10px" }} />
						furnishop.sk@gmail.com
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
