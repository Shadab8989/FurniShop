import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import "./orderSuccess.css";

const OrderSuccess = () => {
	return (
		<>
			<Navbar />
			<Link to="/" className="Link">
				<button className="order-success-button">Continue Shopping</button>
			</Link>

			<p className="order-success-p">
				Order is Successful <DoneOutlinedIcon style={{ fontSize: "40px" }} />
			</p>
		</>
	);
};

export default OrderSuccess;
