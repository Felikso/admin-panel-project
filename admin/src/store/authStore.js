import { create } from "zustand";
import axios from "axios";
import { pagesLinks, customErrors, api } from './authVar.js';

const beUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = import.meta.env.MODE === "development" ? beUrl+"/api/auth" : "/api/auth";

const API_ITEMS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/items" : "/api/items";

const API_USERS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/user" : "/api/user";

const API_RABATS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/rabat" : "/api/rabat";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	checkAdmin: true,
	netErr: false,
	beUrl: import.meta.env.VITE_BACKEND_URL,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.signup}`, { email, password, name });
	
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			console.log(error.response)
			set({ error:  customErrors.signup || error.response.data.message, isLoading: false });
			throw error;
		}
	},
	login: async (email, password, checkAdmin) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}${pagesLinks.login}`, { email, password, checkAdmin });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
				checkAdmin: true//response.data.user.isAdmin
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
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
/* 			const admin = await response.data.user.isAdmin;
			return admin */
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
	//API_RABATS_URL



	
}));
