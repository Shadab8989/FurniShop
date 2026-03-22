import ProductItem from "../productItem/productItem";
import { useState, useEffect } from "react";
import { Request } from "../../requestMethods";
import "./products.css";

const Products = ({ category, subCategory, sort }) => {
	const [productsList, setProductsList] = useState([]);


	useEffect(() => {
		const getProducts = async () => {
			try {
				var res;
				if (!category) {
					const fetchData = await Request.get("/products");
					const filtered = fetchData.data.allProducts.filter(
						(product) => product.trending === true
					);
					setProductsList(filtered);
				} else {
					if (subCategory === "All") {
						res = await Request.get(`/products?category=${category}`);
					} else {
						res = await Request.get(
							`/products?category=${category}&subCategory=${subCategory}`
						);
					}

					setProductsList(res.data.allProducts);
				}
				setProductsList((prevVal) =>
					[...prevVal].sort((a, b) => b.Rating - a.Rating)
				);
			} catch (err) {
				console.error(err.message);
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
