import { create } from "zustand";
import axios from "axios";

const beUrl = import.meta.env.VITE_BACKEND_URL;

const API_ITEMS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/items" : "/api/items";

const API_USERS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/user" : "/api/user";

const API_RABATS_URL = import.meta.env.MODE === "development" ? beUrl+"/api/rabat" : "/api/rabat";

axios.defaults.withCredentials = true;

export const useItemStore = create((set) => ({
	beUrl: import.meta.env.VITE_BACKEND_URL,

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
			set({ message: response.data.message });
			return response
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
	},
	fetchMailList: async (token) => {
		try {
			const response = await axios.get(`${API_USERS_URL}/emails`,	{ headers: { token: token } });
			return response
		} catch (error) {
			set({
				error: error.response.data
			});
			throw error;
		}
	},

	setRabat: async (rabatValue, emailArr, token) => {	
		try {
			const response = await axios.post(`${API_RABATS_URL}/set`,	{ rabatValue: rabatValue, emailArr:emailArr  }, { headers: { token: token } });
			set({ message: response.data.message, rabatCode: response.data.rabatCode });
			return response
		} catch (error) {
			set({
				error: error.response.data
			});
			throw error;
		}
	},
	items_list: [],
	fetchItemsList: async () => {
		try {
			const response = await axios.get(`${API_ITEMS_URL}/list`);
			set({
				items_list: response.data.data
			});
		} catch (error) {
			set({
				error: error.response.data,
				netErr: true
			});
			throw error;
		}
	},


	
}));
