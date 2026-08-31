import axios from "axios";
//#region src/api/client.ts
var API_URL = "https://api.aquacityonline.shop/api";
var ApiClient = class {
	client;
	constructor() {
		this.client = axios.create({
			baseURL: API_URL,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			withCredentials: true
		});
		this.setupInterceptors();
	}
	setupInterceptors() {
		this.client.interceptors.request.use((config) => {
			const token = localStorage.getItem("admin_token");
			if (token) config.headers.Authorization = `Bearer ${token}`;
			console.log("API Request:", {
				url: config.url,
				method: config.method,
				data: config.data,
				headers: config.headers
			});
			return config;
		}, (error) => {
			console.error("Request interceptor error:", error);
			return Promise.reject(error);
		});
		this.client.interceptors.response.use((response) => {
			console.log("API Response:", {
				url: response.config.url,
				status: response.status,
				data: response.data
			});
			return response;
		}, (error) => {
			console.error("API Error:", {
				url: error.config?.url,
				status: error.response?.status,
				data: error.response?.data,
				message: error.message
			});
			if (error.response?.status === 401) {
				localStorage.removeItem("admin_token");
				localStorage.removeItem("admin_data");
				window.location.href = "/login";
			}
			return Promise.reject(error);
		});
	}
	getClient() {
		return this.client;
	}
};
var apiClient = new ApiClient().getClient();
//#endregion
export { apiClient as t };
