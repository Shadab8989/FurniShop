import Navbar from "../components/navbar";
import Slider from "../components/slider";
import Categories from "../components/categories";
import Products from "../components/products";
import NewsLetter from "../components/newsLetter";
import Footer from "../components/footer";
import styled from "styled-components";
const Home = () => {
	const Heading = styled.h3`
		margin: 20px 0 0 30px;
	`;
	return (
		<>
			<Navbar />
			{/* <Slider /> */}
			<Heading>Categories</Heading>
			<Categories />
			<Heading>Trending Products</Heading>
			<Products />
			<NewsLetter />
			<Footer />
		</>
	);
};

export default Home;
