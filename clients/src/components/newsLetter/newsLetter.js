import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import "./newsLetter.css";

const NewsLetter = () => {
	const [email, setEmail] = useState("");
	const [displayConformation, setDisplayConformation] = useState(false);
	const [displayMessage, setDisplayMessage] = useState("");
	const handleClick = () => {
		if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			setDisplayConformation(true);
			setDisplayMessage("Successfully Subscribed to NewsLetter")
			setEmail("");
		} else {
			setDisplayMessage("Please Enter Valid Email Address")
		}
		setTimeout(() => {
			setDisplayConformation(false);
		}, 5000);
	};
	return (
		<>
			<div className="newsLetter-container">
				<h1 className="newsLetter-title">NewsLetter</h1>
				<div className="newsLetter-dexcription">
					Get timely updates from your favorite products
				</div>
				<div className="newsLetter-input-container">
					<input
						className="newsLetter-input"
						placeholder="Your Email"
						value={email}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						className="newsLetter-button"
						onClick={handleClick}
						disabled={email === ""}
					>
						<SendIcon />
					</button>
				</div>
				{displayConformation && <p>{displayMessage}</p>}
			</div>
		</>
	);
};

export default NewsLetter;
