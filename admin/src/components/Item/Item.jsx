import React, { useState, useEffect } from 'react';
import './Item.css';
import { assets } from '@/assets/assets';
import { StoreContext } from '@/context/StoreContext';
import { cartData, currency, customInfo } from '@/utils/variables';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const Item = ({ item }) => {
	const { _id, name, image, description, price } = item; //destructuring of props

	/*     const [itemCount,setItemCount] = useState(0) */
	const { setUserCartItems, user, addToCart, removeFromCart } = useAuthStore(); 
	//console.log(user);
	
	//const { /* cartItems, */ /* addToCart, */ /* removeFromCart, */ } = useContext(StoreContext);
	//cart data

	const API_ITEMS_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api/items" : "/api/items";
	const [cartItems, setCartItems] = useState(() => {
		let obj = {};
		if(localStorage.getItem('cartData')!=='undefined'){
			obj = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : {};
		}
		return obj;
	  });

	  const handleCartItems = async (e) => {
		await setUserCartItems(cartItems);
		//await axios.post(API_ITEMS_URL+'/add',{_id,userId},{headers:{token}}) 
	};


/* 	  const addToCart = async (itemId, userId) => {
		
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
		toast.success(customInfo.itemAdded);
		if(token){
			await axios.post(API_ITEMS_URL+'/add',{itemId,userId},{headers:{token}}) 
			
		}
		
	}; */

/* 	const removeFromCart = async (itemId,userId) => {
		 setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		toast.error(customInfo.itemRemoved);
		if(token){
			await axios.post(API_ITEMS_URL+'/remove',{itemId,userId},{headers:{token}})
			
		}
	}; */
	//cart data


	useEffect(() => {
		handleCartItems();
		localStorage.setItem('cartData', JSON.stringify(cartItems));

	  }, [cartItems]);
//console.log('iteem');

/* 	useEffect(()=>{
		
			if(Object.keys(cartItems).length === 0){

			}else{
				localStorage.setItem('cartData',JSON.stringify(cartItems))
			}


	},[cartItems]) */

	return (
		<div className='item'>
			<div className='itemImageContainer'>
				<img src={import.meta.env.VITE_BACKEND_URL+'/images/'+image} alt={name} className='itemImage' />
				{!cartItems[_id] ? ( /* !cartItems[_id] with that was error */
<div className='animatedIcons'>
					<img
						className='add'
						onClick={() => {addToCart(_id,cartItems,setCartItems), console.log(_id);}}
						src={assets.add_icon_white}
						alt=''
					/>
					</div>
				) : (
					<div className='itemCounter'>
						<img
							onClick={() => {removeFromCart(_id,setCartItems)}}
							src={assets.remove_icon_red}
							alt='usuń'
						/>
						<p>{cartItems[_id]}</p>
						
						<img
							onClick={() => {addToCart(_id,cartItems,setCartItems), console.log(_id);}}
							src={assets.add_icon_green}
							alt='dodaj'
						/>
					</div>
				)}
				{/*                             {!itemCount
                    ?<img className='add' onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_white} alt="" />
                    :<div className='itemCounter'>
                        <img onClick={()=>setItemCount(prev=>prev-1)} src={assets.remove_icon_red} alt='usuń' />
                        <p>{itemCount}</p>
                        <img onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_green} alt='dodaj' />
                    </div>
                } */}
			</div>
			<div className='itemInfo'>
				<div className='itemNameRating'>
					<p>{name}</p>
					<img src={assets.rating_stars} alt='ocena' />
				</div>
				<p className='itemDesc'>{description}</p>
				<p className='itemPrice'>{price} {currency}</p>
			</div>
		</div>
	);
};

export default Item;
