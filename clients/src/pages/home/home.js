import Navbar from "../../components/navbar/navbar";
import Categories from "../../components/categories/categories";
import Products from "../../components/products/products";
import NewsLetter from "../../components/newsLetter/newsLetter";
import Footer from "../../components/footer/footer";
import "./home.css";
const Home = () => {
	return (
		<>
			<Navbar />
			{/* <Slider /> */}
			<h3 className="heading">Categories</h3>
			<Categories />
			<h3 className="heading">Trending Products</h3>
			<Products />
			<NewsLetter />
			<Footer />
		</>
	);
};

export default Home;
