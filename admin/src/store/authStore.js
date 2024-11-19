import { create } from "zustand";
import axios from "axios";
import { pagesLinks, customErrors, api } from './authVar.js';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/auth" : "/api/auth";

const API_ITEMS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/items" : "/api/items";

const API_USERS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/user" : "/api/user";

const API_RABATS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/rabat" : "/api/rabat";

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
	fetchMailList: async (token) => {
		try {
			const response = await axios.get(`${API_USERS_URL}/emails`,	{ headers: { token: token } });
			return response
/* 			const response = await axios.get(`${API_USERS_URL}/emails`);
			return response */
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
	cartItems: {},
	setCartItems: (cartItems)=>set({cartItems}),
	userCartItems: {},
	setUserCartItems: async (cartItems,user,token) =>{
		set({ userCartItems: cartItems});
		if(user){ //login
			//console.log(user);
			//await axios.post(API_ITEMS_URL+'/remove',{itemId,userId},{headers:{token}})
		}
	},
	//publicPgaes
	addToCart: async (itemId, cartItems, setCartItems, userId, token) => {
		
		
		if (!cartItems[itemId]) {
			
			setCartItems(set((state) => ({ cartItems: state.cartItems, [itemId]: 1 })));
			console.log(cartItems);
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
			//await axios.post(API_ITEMS_URL+'/add',{itemId,userId} ,{ headers: { token: token } }) 
	},
	 removeFromCart: async  (itemId, setCartItems, userId, token) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
	
		   //await axios.post(API_ITEMS_URL+'/remove',{itemId,userId},{headers:{token}})
		   

   },
	 addToUserCart: async (_id, cartItems) => {
		try {

			//console.log(token);
			set({userCartItems: cartItems})
			//const userId = user._id;

	
		/* 	if(token){
				await axios.post(API_ITEMS_URL+api.add,{_id,userId},{headers:{token}}) 
				//toast.success(customInfo.itemAdded);
			} */
		} catch (error) {
			set({
				error: error.response
			});
			throw error;
		}
		
	},
	getTotalCartAmount: (userCartItems) => {
		let totalAmount = 0;
		for (const item in userCartItems) {
			if (userCartItems[item] > 0) {
				let itemInfo = items_list.find((product) => product._id === item);
				if(itemInfo){
					totalAmount += itemInfo.price * userCartItems[item];
				}

			}
		}
		return totalAmount;
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
	loadCartData: async (token) => {
		const response = await axios.post(url+getFromCartUrl,{},{headers:{token}})


		if(response.data.success){
			setCartItems(response.data.cartData);
			console.log(response.data)
			setDataLoading(!response.data.success)
		}


	}



	//API_RABATS_URL



	
}));
