import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Container = styled.div`
	${"" /* width: 100vw; */}
	height: 100vh;
	${"" /* background:url() */}
	display:flex;
	align-items: center;
	justify-content: center;
	${"" /* ${mobile({ width: "70vw",height:'70vh' })} */}
`;
const Wrapper = styled.div`
	padding: 20px;
	border-radius: 10px;
	width: 25%;
	min-width: 20rem;
	background-color: antiquewhite;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	${mobile({ width: "10%" })}
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
const Aggrement = styled.span`
	font-size: 12px;
	margin: 15px 0;
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
	padding: 10px 20px;
	margin-bottom: 10px;
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

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const handleCreateClick = (e) => {
		e.preventDefault();
		if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			alert("Please enter valid email address");
		} else if (password !== confirmPassword) {
			alert("Passwords doesn't match");
		} else {
			signIn(dispatch, { username, email, password });
		}
	};

	return (
		<>
			<Navbar />
			<Container>
				<Wrapper>
					<Title>CREATE AN ACCOUNT</Title>
					<Form>
						<Input
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Input
							placeholder="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Aggrement>
							By creating an account, I consent to the processing of my personal
							data in accordance with the <b>PRIVACY POLICY</b>
						</Aggrement>
						<Link className="Link" to="/login">
							<A>Already have an acount? Login </A>
						</Link>
						<Button
							onClick={(e) => handleCreateClick(e)}
							disabled={!username || !email || !password || !confirmPassword}
						>
							Create
						</Button>
					</Form>
				</Wrapper>
			</Container>
		</>
	);
};

export default Register;
