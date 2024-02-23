import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";

const Container = styled.div`
	height: 50vh;
	background-color: #fcf5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Title = styled.h1`
	font-size: 4rem;
	margin-bottom: 20px;
`;
const Description = styled.div`
	font-size: 24px;
	font-weight: 300;
	margin-bottom: 20px;
	${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
	width: 40%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 1px solid teal;
	border-radius: 10px;
	${mobile({ width: "80%" })}
`;
const Input = styled.input`
	border-radius: 10px;
	border: none;
	flex: 10;
	padding-left: 20px;
	&:focus {
		outline: none;
	}
`;
const Button = styled.button`
	border-radius: 0 10px 10px 0;
	flex: 1;
	border: none;
	background-color: antiquewhite;
	cursor: pointer;
	transition: all 0.2s ease;
	&:hover {
		background-color: rgb(214, 181, 136);
	}
	&:disabled {
		cursor: not-allowed;
	}
`;
const Message = styled.p``;

const NewsLetter = () => {
	const [email, setEmail] = useState("");
	const [displayConformation, setDisplayConformation] = useState(false);
	const handleClick = () => {
		if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			setDisplayConformation(true);
		}
		setTimeout(() => {
			setDisplayConformation(false);
		}, 5000);
	};
	return (
		<>
			<Container>
				<Title>NewsLetter</Title>
				<Description>
					Get timely updates from your favorite products
				</Description>
				<InputContainer>
					<Input
						placeholder="Your Email"
						value={email}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button onClick={handleClick} disabled={email === ""}>
						<Send />
					</Button>
				</InputContainer>
				{displayConformation && (
					<Message>Successfully Subscribed to NewsLetter</Message>
				)}
			</Container>
		</>
	);
};

export default NewsLetter;
