import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import {
	brandData,
	formData,
	objMenu,
	pagesLinks,
	orders,
	logout
} from '../../utils/variables.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

import { useAuthStore } from '../../store/authStore.js'

const Navbar = ({ setShowLogin }) => {
	const [menu, setMenu] = useState('start');

	const { getTotalCartAmount,token,setToken,userName } = useContext(StoreContext);


    const { user, logout, checkAdmin } = useAuthStore();

	const navigate = useNavigate();
console.log(user)
	const userLogout = () => {
/* 		localStorage.removeItem('token')
		localStorage.removeItem('userName') */
		localStorage.removeItem('cartData') //clear cart
		setToken('');
		navigate('/')
	}

	return (
		<div className='navbar'>
			<Link to='/'>
				<img
					src={assets.logo}
					alt={`logo ${brandData.name}`}
					className='logo'
				/>
			</Link>
			<ul className='navbarMenu'>
				<Link
					to='/'
					className={menu === 'start' ? 'active' : ''}
					onClick={() => setMenu('start')}
				>
					start
				</Link>

				{Object.entries(objMenu).map(([item, i]) => (
					<a
						href={`/#${objMenu[item]}`}
						key={i}
						className={menu === item ? 'active' : ''}
						onClick={() => setMenu(item)}
					>
						{item}
					</a>
				))}
			</ul>
			<div className='navbarRight'>
				<img src={assets.search_icon} alt='' />
				<div className='navbarSearchIcon'>
					<Link to={`/${pagesLinks.cart}`}>
						<img src={assets.basket_icon} alt='' />
					</Link>
					<div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
				</div>
				{!token?<button
					onClick={() => {
						setShowLogin(true);
					}}
				>
					{formData.buttonText}
				</button> : 
				<div className="navProfile">
					<img src={assets.profile_icon} alt='' />
					<p>{user?.name}</p>
					<ul className="navProfileDropdown">
						<li onClick={()=>navigate(pagesLinks.myorders)}><img src={assets.bag_icon} alt={orders} />{orders}</li>
						<hr />
						<li onClick={userLogout}><img src={assets.logout_icon} alt={logout} />{logout}</li>
					</ul>
				</div>
				}
			</div>
		</div>
	);
};

export default Navbar;
