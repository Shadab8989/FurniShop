import ProductItem from "../productItem/productItem";
import { useState, useEffect } from "react";
import axios from "axios";
import "./products.css";

const Products = ({ category, subCategory, sort }) => {
	const [productsList, setProductsList] = useState([]);
	console.log(subCategory);

	useEffect(() => {
		const getProducts = async () => {
			try {
				var res;
				if (!category) {
					const fetchData = await axios.get(
						`https://furni-shop-api.vercel.app/api/products`
					);
					const filtered = fetchData.data.allProducts.filter(
						(product) => product.trending === true
					);
					res = filtered;
					setProductsList(res);
				} else {
					if (subCategory === "All") {
						res = await axios.get(
							`https://furni-shop-api.vercel.app/api/products?category=${category}`
						);
					} else {
						res = await axios.get(
							`https://furni-shop-api.vercel.app/api/products?category=${category}&subCategory=${subCategory}`
						);
					}

					setProductsList(res.data.allProducts);
				}
				setProductsList((prevVal) =>
					[...prevVal].sort((a, b) => b.Rating - a.Rating)
				);
			} catch (err) {
				console.log("error is", err.message);
			}
		};
		getProducts();
	}, [category, subCategory]);

	useEffect(() => {
		if (sort === "Price: Low to High") {
			setProductsList((prevVal) =>
				[...prevVal].sort((a, b) => a.price - b.price)
			);
		} else if (sort === "Price: High to Low") {
			setProductsList((prevVal) =>
				[...prevVal].sort((a, b) => b.price - a.price)
			);
		} else if (sort === "Rating") {
			setProductsList((prevVal) =>
				[...prevVal].sort((a, b) => b.Rating - a.Rating)
			);
		}
	}, [sort]);
	return (
		<>
			<div className="products-container">
				{productsList &&
					productsList.map((product) => (
						<ProductItem product={product} key={product.id} />
					))}
			</div>
		</>
	);
};

export default Products;
