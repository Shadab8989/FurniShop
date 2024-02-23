import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./categoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
	display: flex;
	padding: 20px;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	${mobile({ flexDirection: "column", padding: "0" })}
`;
function Categories() {
	return (
		<>
			<Container>
				{categories.map((category) => (
					<CategoryItem category={category} key={category.id} />
				))}
			</Container>
		</>
	);
}

export default Categories;
