import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { cartData, placeOrderData, quantityItems, orderPlaceUrl, headerData } from '../../utils/variables';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount, deliveryPrice, token, items_list, cartItems, url} = useContext(StoreContext);

  const [data,setData] = useState({
	firstName:'',
	lastName:'',
	email:'',
	street:'',
	state:'',
	city:'',
	zipCode:'',
	country:'',
	phone:''
  })

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
	const name = e.target.name;
	const value = e.target.value;
	setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (e) => {
	e.preventDefault();
	let orderItems = [];
	items_list.map((item)=>{
		if(cartItems[item._id]>0){
			let itemInfo = item;
			itemInfo[quantityItems] = cartItems[item._id];
			orderItems.push(itemInfo)
		}
	})
	let orderData = {
		address:data,
		items:orderItems,
		amount:getTotalCartAmount()+deliveryPrice,
	}
	let response = await axios.post(url+orderPlaceUrl,orderData,{headers:{token}});


/* 	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [strongPassword, setStrongPassword] = useState(false) */


	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate(pagesLinks.verifyEmail);
		} catch (error) {
			console.log(error);
		}
	};
	const {session_url} = response.data;
	if(response.data.success){

		if(session_url){
			window.location.replace(session_url)
		}else{
			alert('musisz się zalogować, żeby dokonac płatności')
		}

	}else if(response.data.success&&orderData){
		window.location.replace(session_url)
	}
	else{
		alert('musisz się zalogować, żeby dokonac płatności')
	}
	
  }
	return (
		<form onSubmit={placeOrder}  className='placeOrder'>
			<div className='placeOrderLeft'>
				<p className='title'>{placeOrderData.title}</p>
				<div className='multiFiled'>
					<input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder={placeOrderData.firstName} />
					<input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder={placeOrderData.lastName} />
				</div>
				<input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder={placeOrderData.email} />
				<div className='multiFiled'>
					<input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder={placeOrderData.street} />
					<input required name='numberStreet' onChange={onChangeHandler} value={data.numberStreet} type='text' placeholder={placeOrderData.numberStreet} />
				</div>
        <div className='multiFiled'>
					<input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder={placeOrderData.city} />
					<input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type='text' placeholder={placeOrderData.zipCode} />
				</div>
{/*         <div className='multiFiled'>
					<input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder={placeOrderData.state} />
					<input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder={placeOrderData.country} />
				</div> */}
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder={placeOrderData.phone} />
			</div>
			<div className='placeOrderRight'>
      <div className='cartTotal'>
					<h2>{placeOrderData.h2}</h2>
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
						<b>{getTotalCartAmount() + deliveryPrice}</b>
					</div>
          </div>
					<button type='submit'>{placeOrderData.checkout}</button>
				</div>
      </div>
		</form>
	);
};

export default PlaceOrder;
