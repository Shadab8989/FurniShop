import styled from "styled-components";
import Navbar from "../components/navbar";
import Products from "../components/products";
import NewsLetter from "../components/newsLetter";
import Footer from "../components/footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { categories } from "../data";
import { useState, useEffect } from "react";

const Container = styled.div``;
const Title = styled.h1`
	margin: 20px;
	font-size: 40px;
`;
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Filter = styled.div`
	margin: 20px;
	${mobile({ margin: "0 10px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({ margin: "10px 0px" })}
`;

const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
`;
const Option = styled.option`
	padding: 10px;
`;
const ProductsPage = () => {
	const location = useLocation().pathname.split("/");
	const categoryName = location[location.length - 1];
	console.log('categoryName',categoryName)
	const [subCategories, setSubCategories] = useState();
	const [category, setCategory] = useState("");
	const [subCategorySelected, setSubCategorySelected] = useState("All");
	const [sortValue, setSortValue] = useState("Rating");

	useEffect(() => {
		const categoryObject = categories.filter((item) =>
			item.title.startsWith(categoryName)
		);
		console.log('object',categoryObject)
		setCategory(categoryObject[0].title);
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
			<Container>
				<Navbar />
				<Title>{category}</Title>
				<FilterContainer>
					<Filter>
						<FilterText>Filter Products:</FilterText>
						<Select onChange={(e) => handleSubCategory(e)}>
							<Option disabled>Type</Option>
							<Option selected>All</Option>
							{subCategories &&
								subCategories.map((subCategory, index) => {
									return (
										<>
											<Option key={index}>{subCategory}</Option>
										</>
									);
								})}
						</Select>
					</Filter>
					<Filter>
						<FilterText>Sort By:</FilterText>
						<Select onChange={(e) => handleSortProducts(e)}>
							<Option selected>Rating</Option>
							<Option>Price: Low to High</Option>
							<Option>Price: High to Low</Option>
						</Select>
					</Filter>
				</FilterContainer>
				<Products
					category={category}
					subCategory={subCategorySelected}
					sort={sortValue}
				/>
				<NewsLetter />
				<Footer />
			</Container>
		</>
	);
};

export default ProductsPage;
