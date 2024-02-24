import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "../../components/productItem/productItem";
import Order from "../../components/order/order";
import "./orders.css";

const Orders = () => {
	const orders = useSelector((state) => state.orders.ordersArray);
	console.log(orders);
	return (
		<>
			<Navbar />
			<div className="orders-container">
				<div className="orders-wrapper">
					<h1 className="orders-title">Your Orders</h1>
					<div className="orders-top">
						<Link to="/" className="Link">
							<button className="orders-top-button">Continue Shopping</button>
						</Link>
					</div>
					{orders.length === 0 && (
						<>
							<h1 className="orders-title">No Orders Yet</h1>
						</>
					)}
					{orders && (
						<>
							<div className="orders-products">
								{orders.map((order) => (
									<div className="orders-order-container">
										Ordered on : {order.orderTime}
										<Order order={order} />
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Orders;
