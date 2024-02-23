const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => {
			console.log("Server listening on port 5000....");
		});
	} catch (error) {
		console.log(error);
	}
};

start();
