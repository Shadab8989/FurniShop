import axios from "axios";

const BASE_URL = "https://furni-shop-api.vercel.app/api";

export const Request = axios.create({
	baseURL: BASE_URL,
});

Request.interceptors.request.use(
	(config) => {
		const persistRoot = localStorage.getItem("persist:root");
		if (persistRoot) {
			const root = JSON.parse(persistRoot);
			const userData = JSON.parse(root.user);
			if (userData.currentUser?.accessToken) {
				config.headers.Authorization = `Bearer ${userData.currentUser.accessToken}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
