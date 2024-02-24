import { categories } from "../../data";
import CategoryItem from "../categoryItem/categoryItem";
import "./categories.css";

function Categories() {
	return (
		<>
			<div className="categories-container">
				{categories.map((category) => (
					<CategoryItem category={category} key={category.id} />
				))}
			</div>
		</>
	);
}

export default Categories;
