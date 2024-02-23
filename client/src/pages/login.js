import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import Navbar from "../components/navbar";

const Container = styled.div`
	${'' /* width: 100vw; */}
	height: 100vh;
	${"" /* background:url() */}
	display:flex;
	align-items: center;
	justify-content: center;
`;
const Wrapper = styled.div`
	padding: 20px;
	width: 25%;
	min-width: 20rem;
	background-color: antiquewhite;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 10px;
	${"" /* ${mobile({ width: "75%" })} */}
`;
const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Input = styled.input`
	flex: 1;
	width: 15rem;
	border-radius: 10px;
	margin: 10px;
	padding: 8px;
	border: 1px solid teal;
	&:focus {
		outline: none;
	}
`;

const A = styled.a`
	cursor: pointer;
	margin: 5px 0;
	font-size: 12px;
	text-decoration: underline;
	&:hover {
		color: teal;
		font-weight: 700;
	}
`;

const Button = styled.button`
	border-radius: 10px;
	padding: 5px 10px;
	cursor: pointer;
	border: 1px solid teal;
	transition: all 0.3s ease;
	&:hover {
		background-color: teal;
		color: white;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;

const P = styled.p`
	color: red;
`;
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { error } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleLoginClick = (e) => {
		e.preventDefault();
		login(dispatch, { username, password });
	};
	return (
		<>
		<Navbar />
			<Container>
				<Wrapper>
					<Title>SIGN IN</Title>
					<Form>
						<Input
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							disabled={!username || !password}
							onClick={(e) => handleLoginClick(e)}
						>
							Login
						</Button>
						{/* {error && <P>Something went wrong</P>} */}
						
						<Link className="Link" to="/register">
							<A>Create a new Account</A>
						</Link>
					</Form>
				</Wrapper>
			</Container>
		</>
	);
};

export default Login;
