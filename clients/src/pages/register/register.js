import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/apiCalls";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./register.css";

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
			<div className="register-container">
				<div className="register-wrapper">
					<h1 className="register-title">CREATE AN ACCOUNT</h1>
					<form className="register-form">
						<input
							className="register-input"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							className="register-input"
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className="register-input"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							className="register-input"
							placeholder="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<span className="register-aggrement">
							By creating an account, I consent to the processing of my personal
							data in accordance with the <b>PRIVACY POLICY</b>
						</span>
						<Link className="Link" to="/login">
							<p className="register-p">Already have an acount? Login </p>
						</Link>
						<button
							className="register-button"
							onClick={(e) => handleCreateClick(e)}
							disabled={!username || !email || !password || !confirmPassword}
						>
							Create
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
