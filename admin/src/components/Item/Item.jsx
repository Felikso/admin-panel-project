import React, { useState, useEffect } from 'react';
import './Item.css';
import { assets } from '@/assets/assets';
import { StoreContext } from '@/context/StoreContext';
import { cartData, currency, customInfo } from '@/utils/variables';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
const Item = ({ item }) => {

	const [itemQuantity, setItemQuantity] = useState(0)
	const { _id, name, image, description, price } = item; //destructuring of props

	/*     const [itemCount,setItemCount] = useState(0) */
	const { setUserCartItems, userCartItems, user, addToCart, removeFromCart, setCartItems } = useAuthStore(); 

	const { addItemToCart, removeItemFromCart} = useCartStore();

	const { cartItems } = useCartStore();

	const { increaseQuantity, decreaseQuantity } = useCartStore();
const onIncreaseQuantity = (productId) => {
  increaseQuantity(productId);
};

const onDecreaseQuantity = () => {
  decreaseQuantity(item._id);
};

const onRemoveItem = () => {
	console.log(item);
	
  removeItemFromCart(item._id);
};

const onAddItem = (productId) => {

	  addItemToCart(productId);
  };
  

	const onAddToCart = () => {
		addItemToCart(item);
		
		toast.success(`${item.name} już w koszyku!`);
	  };

	//console.log(user);
	const handleCartItems = async (e) => {
		await setUserCartItems(cartItems,user);
		//await axios.post(API_ITEMS_URL+'/add',{_id,userId},{headers:{token}}) 
	};


	useEffect(() => {
		const iq = cartItems.filter(item => item._id === _id);
		setItemQuantity(iq[0]?.quantity)

	  }, [cartItems]);

	return (
		<div className='item'>
			<div className='itemImageContainer'>
				<img src={import.meta.env.VITE_BACKEND_URL+'/images/'+image} alt={name} className='itemImage' />
				{!itemQuantity ? ( /* !cartItems[_id] with that was error */
<div className='animatedIcons'>
					<img
						className='add'
						//onClick={() => {addToCart(_id,cartItems,setCartItems), console.log(_id);}}
						//onClick={()=>{setCartItems((prev) => ({ ...prev, [_id]: prev[_id] + 1 })),console.log(_id)}}
						onClick={onAddToCart}
						src={assets.add_icon_white}
						alt=''
					/>
					</div>
				) : (
					<div className='itemCounter'>
						<img
							//onClick={() => {removeFromCart(_id,setCartItems)}}
							onClick={onDecreaseQuantity}
							src={assets.remove_icon_red}
							alt='usuń'
						/>
						<p>{itemQuantity}</p>
						
						<img
							//onClick={() => {addToCart(_id,cartItems,setCartItems), console.log(_id);}}
							onClick={onAddToCart}
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
