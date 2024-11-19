import React, { useState, useEffect } from 'react';
import './Item.css';
import { assets } from '@/assets/assets';

import { currency } from '@/utils/variables';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
const Item = ({ item }) => {
	const [itemQuantity, setItemQuantity] = useState(0);
	const { _id, name, image, description, price } = item; //destructuring of props

	const { addItemToCart } = useCartStore();

	const { cartItems } = useCartStore();

	const { decreaseQuantity } = useCartStore();

	const onDecreaseQuantity = () => {
		decreaseQuantity(item._id);
	};

	const onAddToCart = () => {
		addItemToCart(item);

		toast.success(`${item.name} już w koszyku!`);
	};

	useEffect(() => {
		const iq = cartItems.filter((item) => item._id === _id);
		setItemQuantity(iq[0]?.quantity);
	}, [cartItems]);

	return (
		<div className='item'>
			<div className='itemImageContainer'>
				<img
					src={
						item.img
							? item.img
							: import.meta.env.VITE_BACKEND_URL + '/images/' + image
					}
					alt={name}
					className='itemImage'
				/>
				{!itemQuantity /* !cartItems[_id] with that was error */ ? (
					<div className='animatedIcons'>
						<img
							className='add'
							onClick={onAddToCart}
							src={assets.add_icon_white}
							alt=''
						/>
					</div>
				) : (
					<div className='itemCounter'>
						<img
							onClick={onDecreaseQuantity}
							src={assets.remove_icon_red}
							alt='usuń'
						/>
						<p>{itemQuantity}</p>

						<img
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
				<p className='itemPrice'>
					{price} {currency}
				</p>
			</div>
		</div>
	);
};

export default Item;
