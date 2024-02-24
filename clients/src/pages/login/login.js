import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import Navbar from "../../components/navbar/navbar";
import "./login.css";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleLoginClick = (e) => {
		e.preventDefault();
		login(dispatch, { username, password });
	};
	return (
		<>
			<Navbar />
			<div className="login-container">
				<div className="login-wrapper">
					<h1 className="login-title">SIGN IN</h1>
					<form className="login-form">
						<input
							className="login-input"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							className="login-input"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="login-button"
							disabled={!username || !password}
							onClick={(e) => handleLoginClick(e)}
						>
							Login
						</button>
						{/* {error && <P>Something went wrong</P>} */}

						<Link className="Link" to="/register">
							<a className="login-a">Create a new Account</a>
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
