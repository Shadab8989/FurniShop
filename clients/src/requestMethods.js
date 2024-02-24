import axios from "axios";

const BASE_URL = "https://furni-shop-api.vercel.app/api";

export const Request = axios.create({
	baseURL: BASE_URL,
});
