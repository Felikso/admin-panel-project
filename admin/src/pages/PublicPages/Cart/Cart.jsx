import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '@/context/StoreContext';
import { cartData, cartItemsData, currency, pagesLinks, customErrors, customInfo } from '@/utils/variables';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button'
import toast from 'react-hot-toast';

import { assets } from '@/assets/assets';
import NetworkErrorText from '@/components/NetworkErrorText/NetworkErrorText';
import BackgroundAnimation  from '@/components/BackgroundAnimation/BackgroundAnimation'
import { useAuthStore } from '@/store/authStore';

function Cart() {
	const { items, name, price, quantity, total, remove } = cartItemsData;

	const { verifyRabatCode, user } = useAuthStore();

	const navigate = useNavigate();
	

	const { cartItems, items_list, removeFromCart, getTotalCartAmount, deliveryPrice, url, imgUrl,  dataLoading, netErr } =
		useContext(StoreContext);

		const [data, setData] = useState('');
		const [rabat, setRabat] = useState(user?.rabat?.rabatValue ? user?.rabat?.rabatValue : 0)

		const onChangeHandler = (e) => {
			const name = e.target.name;
			const value = e.target.value;
			setData((data) => ({ ...data, [name]: value }));
		};

		const handleSetRabat = async (e) => {
			e.preventDefault();

			if (window.confirm('Czy na pewno chcesz wykorzystać swój kod rabatowy?')){
				if(!user){
					toast.error('musisz byc zalogowany, żeby wykorzystać swój kod rabatowy')
				}
				try {
					 const response = await verifyRabatCode(data.rabatCode, user.email );
					 console.log(response);
					 
					 
					 if(response.success){
		
						if(response.data.rabatValue){
							setRabat(response.data.rabatValue)
						}else{
							setRabat(0)
						}
						toast.success('kod rabatowy zaakceptowany')
						//window.location.reload();
					 }else{
						toast.error('podany nieprawidłowy kod rabatowy')
					 }
	
				} catch (error) {
					console.log(error);
					toast.error(error?.response?.data?.message)
				}
			}

			
			
		}

		let disabled = rabat ? 'disabled' : '';
	return (
		<div className='cart'>
			        {netErr &&<NetworkErrorText />}
			          {/* dataLoading */ false ? <BackgroundAnimation /> :
					  <>
			<div className='cartItems'>
				<div className='cartItemsTitle'>
					<p></p>
					<p>{name}</p>
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
							
								<div key={i} className='cartItemsTitle cartItemsItem'>
									<img src={url+imgUrl+item.image} alt={`zdjęcie ${item.name}`} />
									<p>{item.name}</p>
									<p>{item.price}{currency}</p>
									<p>{cartItems[item._id]}</p>
									<p>{item.price * cartItems[item._id]}{currency}</p>
									<img className='cross' src={assets.rabish_icon} alt='usuń' onClick={() =>{
														if (window.confirm('Czy na pewno chcesz usunąć ten przedmiot?')) {
														 	removeFromCart(item._id)}}}
														 />
								 
								 
								</div>
							
						);
					}
				})}
			</div>

			<div className='cartBottom'>
				<div className='cartTotal'>
					<h2>{cartData.h2}</h2>
					<div className='cartTotalDetails'>
						<p>{rabat?cartData.beforeRabat:cartData.subtotal}</p>
						<span style={rabat?{color: 'red', textDecoration: 'line-through'}:{}}>
						<p style={{color: 'black'}}>{getTotalCartAmount()}{currency}</p>
						</span>
					</div>
					<div className={`cartTotalDetails ${rabat?'':'displayNone'}`}>
						<b>{rabat?cartData.rabat+' ( '+rabat*100+'% ) ':cartData.total}</b>
						<b>{(getTotalCartAmount()-getTotalCartAmount()*rabat).toFixed(2)}{currency}</b>
					</div>
					<div>
						<hr />
						<div className='cartTotalDetails'>
							<p>{cartData.delivery}</p>
							<p>{deliveryPrice}{currency}</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
						<b>{cartData.total}</b>
						<b style={{color: 'green'}}>{(getTotalCartAmount()-getTotalCartAmount()*rabat+ deliveryPrice).toFixed(2) }{currency}</b>
					</div>

					</div>
				
					<Button color={0} onClick={()=>{
				
						if(getTotalCartAmount()==0){
							toast.error(customInfo.emptyCart)
						}else{
							navigate(`/${pagesLinks.order}`)
						}

					}} text={cartData.checkout} 
						/>
				</div>

				<div className='cartPromocode'>
					<div>
						{rabat ? <p>{cartData.promocodeUsed}</p> : <p>{cartData.promocodeInfo}</p>}
						<form  className='cartPromocodeInput'>
							{rabat?<></>:<input className={`${disabled}`} onChange={onChangeHandler} name='rabatCode' type='text' placeholder={cartData.promocodePlaceholder} />}
							<button className={`${disabled}`}  onClick={(e)=>handleSetRabat(e)}  type='submit' >{rabat?user.rabat.rabatCode:cartData.subbmitCodebtn}</button>
						</form>
					</div>
				</div>
			</div>
			</>
				}
		</div> //cart
	);
}

export default Cart;
