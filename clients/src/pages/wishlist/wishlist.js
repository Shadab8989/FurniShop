import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "../../components/productItem/productItem";
import "./wishlist.css";

const Wishlist = () => {
	const products = useSelector((state) => state.wishlist.products);
	const cartItems = useSelector((state) => state.cart.products);
	console.log(products);
	return (
		<>
			<div className="wishlist-container">
				<Navbar />
				<div className="wishlist-wrapper">
					<h1 className="wishlist-title">Your WishList</h1>
					<div className="wishlist-top">
						<Link to="/" className="Link">
							<button className="wishlist-top-button">Continue Shopping</button>
						</Link>
						<div className="wishlist-top-texts">
							<span className="wishlist-top-text">
								<Link className="Link" to="/cart">
									Shopping Bag ({cartItems.length})
								</Link>
							</span>
						</div>
					</div>
					{products.length === 0 && (
						<>
							<h1 className="wishlist-title">No Items in the Wishlist</h1>
						</>
					)}
					{products && (
						<>
							<div className="wishlist-products">
								{products.map((product) => (
									<ProductItem product={product} key={product._id} />
								))}
							</div>
						</>
					)}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Wishlist;
