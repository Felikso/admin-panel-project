import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { cartData, cartItemsData, currency, pagesLinks } from '../../utils/variables';
import { useNavigate } from 'react-router-dom';

function Cart() {
	const { items, title, price, quantity, total, remove } = cartItemsData;

 



/* 	const removeFromCartHandler = () =>{


		JSON.stringify(cartItems)
	} */

	const navigate = useNavigate();

	// const [cartItems] = useContext(StoreContext)

	const { cartItems, items_list, removeFromCart, getTotalCartAmount, deliveryPrice, url, imgUrl } =
		useContext(StoreContext);

		useEffect(()=>{
/* 			if(Object.keys(cartItems).length === 0){
alert('empty')
			}else{
				localStorage.setItem('cartData',JSON.stringify(cartItems))
			} */

		},[cartItems])
	return (
		<div className='cart'>
			<div className='cartItems'>
				<div className='cartItemsTitle'>
					<p>{items}</p>
					<p>{title}</p>
					<p>{price}</p>
					<p>{quantity}</p>
					<p>{total}</p>
					<p>{remove}</p>
				</div>
				<br />
				<hr />
				{items_list.map((item, i) => {
					if (cartItems[item._id] > 0) {
						return (
							<div key={i}>
								<div  className='cartItemsTitle cartItemsItem'>
									<img src={url+imgUrl+item.image} alt={`zdjęcie ${item.name}`} />
									<p>{item.name}</p>
									<p>{item.price}{currency}</p>
									<p>{cartItems[item._id]}</p>
									<p>{item.price * cartItems[item._id]}{currency}</p>
									<p onClick={() => removeFromCart(item._id)
									} className='cross'>
										x
									</p>
								</div>
								<hr />
							</div>
						);
					}
				})}
			</div>

			<div className='cartBottom'>
				<div className='cartTotal'>
					<h2>{cartData.h2}</h2>
					<div>
						<div className='cartTotalDetails'>
							<p>{cartData.subtotal}</p>
							<p>{getTotalCartAmount()}</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
							<p>{cartData.delivery}</p>
							<p>{deliveryPrice}</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
						<b>{cartData.total}</b>
						<b>{getTotalCartAmount() + deliveryPrice}{currency}</b>
					</div>
					</div>
					<button onClick={()=>navigate(`/${pagesLinks.order}`)}>{cartData.checkout}</button>
				</div>

				<div className='cartPromocode'>
					<div>
						<p>{cartData.promocodeInfo}</p>
						<div className='cartPromocodeInput'>
							<input type='text' placeholder={cartData.promocodePlaceholder} />
							<button>{cartData.subbmitCodebtn}</button>
						</div>
					</div>
				</div>
			</div>
		</div> //cart
	);
}

export default Cart;
