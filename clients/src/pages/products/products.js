import Navbar from "../../components/navbar/navbar";
import Products from "../../components/products/products";
import NewsLetter from "../../components/newsLetter/newsLetter";
import Footer from "../../components/footer/footer";
import { useLocation } from "react-router-dom";
import { categories } from "../../data";
import { useState, useEffect } from "react";
import "./products.css";

const ProductsPage = () => {
	const [categoryName, setCategoryName] = useState(null);

	console.log("categoryName", categoryName);
	const [subCategories, setSubCategories] = useState();
	const [category, setCategory] = useState("");
	const [subCategorySelected, setSubCategorySelected] = useState("All");
	const [sortValue, setSortValue] = useState("Rating");

	const location = useLocation().pathname.split("/");
	useEffect(() => {
		setCategoryName(location[location.length - 1]);
	}, [location]);
	useEffect(() => {
		const categoryObject = categories.filter(
			(item) => item.title === categoryName
		);
		console.log("object", categoryObject);
		setCategory(categoryObject[0].title);
		setSortValue("Rating");
		setSubCategories(categoryObject[0].subCategory);
	}, [categoryName]);
	const handleSubCategory = (e) => {
		console.log(e.target.value);
		setSubCategorySelected(e.target.value);
	};
	const handleSortProducts = (e) => {
		setSortValue(e.target.value);
	};

	return (
		<>
			<div className="products-page-container">
				<Navbar />
				<h1 className="products-page-title">{category}</h1>
				<div className="products-page-filter-container">
					<div className="products-page-filter">
						<span className="products-page-filter-text">Filter Products:</span>
						<select
							className="products-page-select"
							onChange={(e) => handleSubCategory(e)}
						>
							<option className="products-page-option" disabled>
								Type
							</option>
							<option className="products-page-option" selected>
								All
							</option>
							{subCategories &&
								subCategories.map((subCategory, index) => {
									return (
										<>
											<option className="products-page-option" key={index}>
												{subCategory}
											</option>
										</>
									);
								})}
						</select>
					</div>
					<div className="products-page-filter">
						<span className="products-page-filter-text">Sort By:</span>
						<select
							className="products-page-select"
							onChange={(e) => handleSortProducts(e)}
						>
							<option className="products-page-option" selected>
								Rating
							</option>
							<option className="products-page-option">
								Price: Low to High
							</option>
							<option className="products-page-option">
								Price: High to Low
							</option>
						</select>
					</div>
				</div>
				<Products
					category={category}
					subCategory={subCategorySelected}
					sort={sortValue}
				/>
				<NewsLetter />
				<Footer />
			</div>
		</>
	);
};

export default ProductsPage;
