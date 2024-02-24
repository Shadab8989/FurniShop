import { useSelector } from "react-redux";
import "./App.css";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SingleProduct from "./pages/product/product";
import ProductsPage from "./pages/products/products";
import Register from "./pages/register/register";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Wishlist from "./pages/wishlist/wishlist";
import OrderSuccess from "./pages/orderSuccess/orderSuccess";
import Orders from "./pages/orders/orders";
function App() {
	const user = useSelector((state) => state.user.currentUser);
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products/:category" element={<ProductsPage />} />
					<Route path="/product/:id" element={<SingleProduct />} />
					<Route
						path="/register"
						element={user ? <Navigate to="/" replace /> : <Register />}
					/>
					<Route
						path="/login"
						element={user ? <Navigate to="/" replace /> : <Login />}
					/>
					<Route path="/cart" element={<Cart />} />
					<Route path="/wishlist" element={<Wishlist />} />
					<Route path="/checkout" element={user ? <Checkout /> : <Home />} />
					<Route path="/orders" element={<Orders />} />
					<Route
						path="/ordercompleted"
						element={user ? <OrderSuccess /> : <Home />}
					/>
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
