import { createContext, useEffect, useState } from 'react';
import { items_list } from '../assets/assets';
import { url, itemsUrl, imgUrl, addCartUrl, removeFromCartUrl, getFromCartUrl, orderVerifyUrl, myOrdersUrl, customInfo, customErrors } from '../utils/variables'
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

	const { user, isAuthenticated } = useAuthStore();

	const [cartItems, setCartItems] = useState(() => {
		let obj = {};
		if(localStorage.getItem('cartData')!=='undefined'){
			obj = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : {};
		}
		return obj;
	  });

	  const [dataLoading,setDataLoading] = useState(isAuthenticated) //if dosent auth, default load items, else wait for user cart for render
	  
	
	  // Update localStorage whenever the state changes
	  useEffect(() => {
		localStorage.setItem('cartData', JSON.stringify(cartItems));

	  }, [cartItems]);


	const [token,setToken] = useState('');

	const [userName, setUserName] = useState('Gość');

	const [items_list,setItemsList] = useState([]);

	const [netErr, setNetErr] = useState(false)

	const addToCart = async (itemId, userId) => {
		
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
		if(token){
			await axios.post(url+addCartUrl,{itemId,userId},{headers:{token}}) 
			toast.success(customInfo.itemAdded);
		}
		
	};

	const removeFromCart = async (itemId,userId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if(token){
			await axios.post(url+removeFromCartUrl,{itemId,userId},{headers:{token}})
			toast.error(customInfo.itemRemoved);
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = items_list.find((product) => product._id === item);
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


		if(response.data.success){
			setCartItems(response.data.cartData);
			console.log(response.data)
			setDataLoading(!response.data.success)
		}


	}

	if(!isAuthenticated){
		console.log('cleaning time');
		localStorage.removeItem('token')
		//localStorage.removeItem('cartData') //clear cart
		//setDataLoading(!dataLoading)
	}


/* 	if (localStorage.getItem('token') !== null) {
	
	} else {
		console.log('pierwszy render');
		console.log(user);
		
		if(user){
			localStorage.setItem('token',user.token)
			console.log(user);
			
		}	
	} */
	useEffect(()=>{
		async function loadData() {
			try {
				if(user){
					localStorage.setItem('token',user.token)
				}
				await fetchItemsList();
	
	
				if(localStorage.getItem('token')){
					
					setToken(localStorage.getItem('token'));
	
	
					await loadCartData(localStorage.getItem('token'));
				}
			} catch (error) {
				toast.success(customInfo.tryRefresh)
				toast.error(customErrors.network)
				setNetErr(true)
			}
			
		}
		loadData()
	},[user])

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
		setUserName,
		dataLoading,
		netErr
	};
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
