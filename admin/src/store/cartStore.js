import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

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
	  cartValues: 0,
	  totalPrice: () =>
		get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
	  getTotalCartAmount: (cartItems) => {
		let sumPrice = 0;
		cartItems.map(item=>{
			return sumPrice += item.price*item.quantity
		  })
		  set({ cartValues: sumPrice });
	},
	
}),
{
  name: "cartItems",
}));
