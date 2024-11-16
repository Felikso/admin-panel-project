import React, { useContext, useEffect } from 'react';
import './Item.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { cartData, currency } from '../../utils/variables';

const Item = ({ item }) => {
	const { _id, name, image, description, price } = item; //destructuring of props

	/*     const [itemCount,setItemCount] = useState(0) */
	const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

	const handleAddItem = () =>{
		console.log()
	}

	useEffect(()=>{
		
			if(Object.keys(cartItems).length === 0){

			}else{
				localStorage.setItem('cartData',JSON.stringify(cartItems))
			}


	},[cartItems])

	return (
		<div className='item'>
			<div className='itemImageContainer'>
				<img src={url+'/images/'+image} alt={name} className='itemImage' />
				{!cartItems[_id] ? ( /* !cartItems[_id] with that was error */
<div className='animatedIcons'>
					<img
						className='add'
						onClick={() => {addToCart(_id), console.log(_id);}}
						src={assets.add_icon_white}
						alt=''
					/>
					</div>
				) : (
					<div className='itemCounter'>
						<img
							onClick={() => removeFromCart(_id)}
							src={assets.remove_icon_red}
							alt='usuń'
						/>
						<p>{cartItems[_id]}</p>
						
						<img
							onClick={() => {addToCart(_id), console.log(_id);}}
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
