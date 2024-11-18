import { createContext, useEffect, useState } from 'react';
import { items_list } from '../assets/assets';
import { url, itemsUrl, imgUrl, addCartUrl, removeFromCartUrl, getFromCartUrl, orderVerifyUrl, myOrdersUrl } from '../utils/variables'
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	//const [cartItems, setCartItems] = useState({});

	const [cartItems, setCartItems] = useState(() => {
		let obj = {};
		if(localStorage.getItem('cartData')!=='undefined'){
			obj = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : {};
		}
		return obj;
	  });
	
	  // Update localStorage whenever the state changes
	  useEffect(() => {
		localStorage.setItem('cartData', JSON.stringify(cartItems));
		//let itemId = '6728fa0733263301f953d82a'
		// axios.post(url+addCartUrl,{itemId},{headers:{token}}) 
	  }, [cartItems]);



	const [token,setToken] = useState('');

	const [userName, setUserName] = useState('Gość');

	const [items_list,setItemsList] = useState([]);

	const addToCart = async (itemId) => {
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
		if(token){
			await axios.post(url+addCartUrl,{itemId},{headers:{token}}) 
		}
		
	};

	const removeFromCart = async (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if(token){
			await axios.post(url+removeFromCartUrl,{itemId},{headers:{token}})
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = items_list?.find((product) => product._id === item);
				if(itemInfo){
					totalAmount += itemInfo.price * cartItems[item];
				}

			}
		}
		return totalAmount;
	};

	const fetchItemsList = async () => {
		const response = await axios.get(url+itemsUrl)
		setItemsList(response.data.data)
	}

	const loadCartData = async (token) => {
		const response = await axios.post(url+getFromCartUrl,{},{headers:{token}})
		//console.log(response.data)

		if(response.data.success){
			setCartItems(response.data.cartData);
		}


	}

	useEffect(()=>{
		//localStorage.setItem('cartData',(localStorage.getItem('cartData')))
/* 		if(localStorage.getItem('cartData')){
			const mergedObj = Object.assign({}, cartItems, localStorage.getItem('cartData'));
			setCartItems(mergedObj);
		} */
		//setCartItems(JSON.stringify(localStorage.getItem('cartData')))
		async function loadData() {
/* 			await fetchItemsList();
			if(localStorage.getItem('token')){
				setToken(localStorage.getItem('token'));
				setUserName(localStorage.getItem('userName'));
				
			

				await loadCartData(localStorage.getItem('token'));
			} */
		}
		loadData()
	},[])





/* 	items_list.forEach(item=>{
		delete item._id
		item.image = item.image.replace('/src/assets/', '')
	})
	console.log(JSON.stringify(items_list)) */
	const deliveryPrice = getTotalCartAmount()===0?0:8;

	const contextValue = {
		items_list,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		deliveryPrice,
		url,
		token,
		setToken,
		imgUrl,
		orderVerifyUrl,
		myOrdersUrl,
		userName,
		setUserName
	};
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
