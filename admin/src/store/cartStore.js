import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { pagesLinks, customErrors, api } from './authVar.js';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/auth" : "/api/auth";

const API_ITEMS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/items" : "/api/items";

const API_USERS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/user" : "/api/user";

const API_RABATS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/rabat" : "/api/rabat";

axios.defaults.withCredentials = true;

export const useCartStore = create(
persist(
	(set,get) => ({


	
	cartItems: [],

	addItemToCart: (item) => {
		const itemExists = get().cartItems.find(
		  (cartItem) => cartItem._id === item._id
		);
		delete item.description;
		  delete item.category; 
		if (itemExists) {
		  if (typeof itemExists.quantity === "number") {
			itemExists.quantity++;
		  }
		  set({ cartItems: [...get().cartItems] });
		} else {
		  set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
		}
	  },
	
	  increaseQuantity: (productId) => {
		const itemExists = get().cartItems.find(
		  (cartItem) => cartItem._id === productId
		);
	
		if (itemExists) {
		  if (typeof itemExists.quantity === "number") {
			itemExists.quantity++;
		  }
	
		  set({ cartItems: [...get().cartItems] });
		}
	  },
	  decreaseQuantity: (productId) => {
		const itemExists = get().cartItems.find(
		  (cartItem) => cartItem._id === productId
		);
	
		if (itemExists) {
		  if (typeof itemExists.quantity === "number") {
			if (itemExists.quantity === 1) {
			  const updatedCartItems = get().cartItems.filter(
				(item) => item._id !== productId
			  );
			  set({ cartItems: updatedCartItems });
			} else {
			  itemExists.quantity--;
			  set({ cartItems: [...get().cartItems] });
			}
		  }
		}
	  },
	  removeItemFromCart: (productId) => {
		const itemExists = get().cartItems.find(
		  (cartItem) => cartItem._id === productId
		);
	
		if (itemExists) {
		  if (typeof itemExists.quantity === "number") {
			const updatedCartItems = get().cartItems.filter(
			  (item) => item._id !== productId
			);
			set({ cartItems: updatedCartItems });
		  }
		}
	  },
	  cartValues: 0,
	  totalPrice: () =>
		get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
	  getTotalCartAmount: (cartItems) => {
		let sumPrice = 0;
		cartItems.map(item=>{
			return sumPrice += item.price*item.quantity
		  })
		  set({ cartValues: sumPrice });
	/* 	const sum  = cartItems.reduce((accumulator, currentObject) => {
			return accumulator + currentObject.quantity;
		  }, 0); */

/* 		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = items_list.find((product) => product._id === item);
				if(itemInfo){
					totalAmount += itemInfo.price * cartItems[item];
				}

			}
		}
		return totalAmount; */
	},





	setCartItems: (cartItems)=>set({cartItems}),
    increment: (itemId) => {
        set((state)=>({cartItems: state.cartItems, [itemId]: prev[itemId] + 1 }))
    },
    decrement: (itemId) => {
        set((state)=>({cartItems: state.cartItems -1}))
    },






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



	
}),
{
  name: "cart-items",
}));
