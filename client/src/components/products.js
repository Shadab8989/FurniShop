import styled from "styled-components";
import ProductItem from "./productItem";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

const Products = ({ category, subCategory, sort }) => {
	const [productsList, setProductsList] = useState([]);
	console.log(subCategory);

	useEffect(() => {
		const getProducts = async () => {
			try {
				var res;
				if (!category) {
					const fetchData = await axios.get(
						`http://localhost:5000/api/products`
					);
					const filtered = fetchData.data.allProducts.filter(
						(product) => product.trending===true
					);
					res = filtered;
					setProductsList(res)
				} else {
					if (subCategory === "All") {
						res = await axios.get(
							`http://localhost:5000/api/products?category=${category}`
						);
					} else {
						res = await axios.get(
							`http://localhost:5000/api/products?category=${category}&subCategory=${subCategory}`
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
			<Container>
				{productsList &&
					productsList.map((product) => (
						<ProductItem product={product} key={product.id} />
					))}
			</Container>
		</>
	);
};

export default Products;
