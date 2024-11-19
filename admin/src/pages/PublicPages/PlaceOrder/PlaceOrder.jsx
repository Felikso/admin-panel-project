import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import {
	cartData,
	placeOrderData,
	quantityItems,
	orderPlaceUrl,
	customInfo,
} from '@/utils/variables';

import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast';

import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { pagesLinks } from '@/store/authVar';
import NetworkErrorText from '@/components/NetworkErrorText/NetworkErrorText'

const PlaceOrder = () => {

	const token = '7437735'
	const { user, isAuthenticated, netErr, beUrl } = useAuthStore();

	const { cartItems, decreaseQuantity } = useCartStore();

	const sumPrice = useCartStore((state) => state.totalPrice());

	const deliveryPrice = sumPrice === 0 ? 0 : 8;

	const [data, setData] = useState(
		user?.address
			? user.address
			: {
					firstName: '',
					lastName: '',
					email: '',
					street: '',
					state: '',
					city: '',
					zipCode: '',
					country: '',
					phone: '',
			  }
	);

	const [saveAddress, setSaveAddress] = useState(false);

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const placeOrder = async (e) => {
		e.preventDefault();

		if(isAuthenticated) {
			if (user.address !== data) {
				if (window.confirm('Czy chcesz zaktualizować dane adresowe?')) {
					setSaveAddress(true);
					toast.success(customInfo.addressUpdated);
				}
			} else {
				if (window.confirm('Czy na pewno chcez złożyć zamówienie?')) {
					toast.success(customInfo.accpetPlaceOrder);
				} else {
					toast.error(customInfo.cancelPlaceOrder);
					return;
				}
			}
		}else{
			if(window.confirm('Czy na pewno chcez złożyć zamówienie bez zakładania konta?')){
			}else {
				toast.error(customInfo.cancelPlaceOrder);
				return;
			}
		}


/* 		let orderItems = [];
		items_list.map((item) => {
			if (cartItems[item._id] > 0) {
				let itemInfo = item;
				itemInfo[quantityItems] = cartItems[item._id];
				orderItems.push(itemInfo);
			}
		}); */
		let orderData = {
			address: data,
			items: cartItems,
			amount: (sumPrice - rabatAmount + deliveryPrice).toFixed(2),
			rabat: rabatValue,
			saveAddress: saveAddress,
		};
		let response = await axios.post(beUrl + orderPlaceUrl, orderData, {
			headers: { token },
		});
		console.log(response);
		
		//const { session_url } = response.data;
		if (response.data.success) {
			if(!isAuthenticated) {
				localStorage.removeItem('cartData') //clear cartn 
				toast.success(
					customInfo.unauthenticatedAccpetPlaceOrder,
					{
					  duration: 6000,
					}
				  );
				  navigate('/')
				  //window.location.reload();

				  
			}
			localStorage.removeItem('cartData') //clear cartn 
			navigate('/')
			//window.location.reload();
			//navigate(pagesLinks.orders);
			/* if (session_url) {
				//window.location.replace(session_url);
			} else {
				alert('musisz się zalogować, żeby dokonac płatności');
			} */
		} /* else if (response.data.success && orderData) {
			window.location.replace(session_url);
		} */ /* else {
			alert('musisz się zalogować, żeby dokonac płatności :((');
		} */

		
	};

	
	const navigate = useNavigate();

	const rabatValue = user?.rabat ? user.rabat.rabatValue : 0;

	const rabatAmount = user?.rabat ? sumPrice*rabatValue : 0;
	return (
		<form onSubmit={placeOrder} className='placeOrder'>
			<div className='placeOrderLeft'>
				{netErr && <NetworkErrorText />}
				<p className='title'>{placeOrderData.title}</p>
				<div className='multiFiled'>
					<input
						required
						className='input'
						name='firstName'
						onChange={onChangeHandler}
						value={data.firstName}
						type='text'
						placeholder={placeOrderData.firstName}
					/>
					<input
						required
						className='input'
						name='lastName'
						onChange={onChangeHandler}
						value={data.lastName}
						type='text'
						placeholder={placeOrderData.lastName}
					/>
				</div>
				<input
					required
					className='input'
					name='email'
					onChange={onChangeHandler}
					value={data.email}
					type='email'
					placeholder={placeOrderData.email}
				/>
				<div className='multiFiled'>
					<input
						required
						className='input'
						name='street'
						onChange={onChangeHandler}
						value={data.street}
						type='text'
						placeholder={placeOrderData.street}
					/>
					<input
						required
						className='input'
						name='numberStreet'
						onChange={onChangeHandler}
						value={data.numberStreet}
						type='text'
						placeholder={placeOrderData.numberStreet}
					/>
				</div>
				<div className='multiFiled'>
					<input
						required
						className='input'
						name='city'
						onChange={onChangeHandler}
						value={data.city}
						type='text'
						placeholder={placeOrderData.city}
					/>
					<input
						required
						className='input'
						name='zipCode'
						onChange={onChangeHandler}
						value={data.zipCode}
						type='text'
						placeholder={placeOrderData.zipCode}
					/>
				</div>
				{/*         <div className='multiFiled'>
					<Input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder={placeOrderData.state} />
					<Input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder={placeOrderData.country} />
				</div> */}
				<input
					required
					className='input'
					name='phone'
					onChange={onChangeHandler}
					value={data.phone}
					type='text'
					placeholder={placeOrderData.phone}
				/>
			</div>
			<div className='placeOrderRight'>
				<div className='cartTotal'>
					<h2>{placeOrderData.h2}</h2>
					<div>
						<div className='cartTotalDetails'>
							<p>{cartData.subtotal}</p>
							<p>{(sumPrice - rabatAmount).toFixed(2)}</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
							<p>{cartData.delivery}</p>
							<p>{deliveryPrice}</p>
						</div>
						<hr />
						<div className='cartTotalDetails'>
							<b>{cartData.total}</b>
							<b>{(sumPrice - rabatAmount + deliveryPrice).toFixed(2)}</b>
						</div>
					</div>
					<Button type={'submit'} color={0} text={placeOrderData.checkout} />
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
