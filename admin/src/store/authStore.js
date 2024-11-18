import { create } from "zustand";
import axios from "axios";
import { pagesLinks, customErrors } from "./authVar.js";

const API_URL = import.meta.env.MODE === "development" ? "https://admin-panel-project-w7s5.onrender.com/api/auth" : "/api/auth";

const API_ITEMS_URL = import.meta.env.MODE === "development" ? "https://admin-panel-project-w7s5.onrender.com/api/items" : "/api/items";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	verifyOrder: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`https://admin-panel-project-w7s5.onrender.com/api/order/list`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || customErrors.verifyOrder, isLoading: false });
			throw error;
		}
	},

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.signup}`, { email, password, name });
			/* console.log(`${API_URL}${pagesLinks.signup}`) */
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || customErrors.signup, isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.login}`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || customErrors.loginin, isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}${pagesLinks.logout}`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: customErrors.logout, isLoading: false });
			throw error;
		}
	},
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.verifyEmail}`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || customErrors.verifyEmail, isLoading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}${pagesLinks.checkAuth}`);

			console.log(user)
			console.log('user');
			
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.forgotPass}`, { email });
			console.log(response.data.message);
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			console.log(error);
			set({
				isLoading: false,
				error: error.response.data.message || customErrors.resetPassMail,
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.resetPass}/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || customErrors.resetPass,
			});
			throw error;
		}
	},
	fetchAuthList: async () => {
		try {
			const response = await axios.get(`${API_ITEMS_URL}/list`);
			return response
		} catch (error) {
			set({
				error: error.response.data
			});
			throw error;
		}
	},
	removeAuthItem: async (itemId) => {
		try {
			const response = await axios.post(`${API_ITEMS_URL}/remove`,{id:itemId});
			set({ message: response.data.message });
			return response 
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},
	updateAuthItem: async (itemId,formData) => {
		try {

			let activity = itemId?'update':'add';
			const response = await axios.post(`${API_ITEMS_URL}/${activity}`,formData);
			//const response = await axios.post(`${url}${newUrl}`, formData);
			set({ message: response.data.message });
			return response
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},



	
}));
