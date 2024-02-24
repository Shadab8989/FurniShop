import { Link } from "react-router-dom";
import "./categoryItem.css";

const CategoryItem = ({ category }) => {
	const title = category.title.split(" ")[0];
	return (
		<>
			<div className="categoryItem-container">
				<Link to={`/products/${title}`}>
					<img
						className="categoryItem-image"
						src={category.image}
						alt={category.title}
					/>
					<div className="categoryItem-info">
						<h1 className="categoryItem-title">{category.title}</h1>
						<button className="categoryItem-button">SHOP NOW</button>
					</div>
				</Link>
			</div>
		</>
	);
};

export default CategoryItem;
