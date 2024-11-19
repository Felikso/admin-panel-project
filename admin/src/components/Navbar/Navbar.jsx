import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '@/assets/assets.js';
import { brandData, formData, authList, loginBtnText, objMenu, objPages } from '@/utils/variables.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';
import { replacePolishLetters } from '@/utils/functions.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';

const Navbar = () => {
	const { user, logout, isAuthenticated } = useAuthStore();

	const [menu, setMenu] = useState('start');
	const [openMenu, setOpenMenu] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const location = useLocation();

	const navigate = useNavigate();
	let activeClass = openMenu ? 'activeMenu' : '';

	const handleChange = () => {
		setTimeout(setIsHovered(false), 2000);
	};

	const handleSetMenu = (item) => {
		setMenu(item);
		setOpenMenu(!openMenu)

	}

	const handleLogout = () =>{
		if (window.confirm('wylogowujesz się?')) {
			logout();
			localStorage.removeItem('token')
			localStorage.removeItem('cartData') //clear cart
			setOpenMenu(!openMenu)
			navigate('/')
			//window.location.reload();
		
		}

	}

	useEffect(() => {
		for (let key in authList) {
			authList[key] = '/panel'+authList[key]
			}
	
	},[]);


	
	const renderMenuList = user?.isAdmin ?  {...authList, ...objPages} : objPages;
	
	console.log('nav');

	return (
		<>
			<Link to='/'>
				<img
					src={assets.logo}
					alt={`logo ${brandData.name}`}
					className='logo'
				
				/>
			</Link>
			<div className='navbar'>
				<ul className={`navbarMenu ${activeClass}`} /* style={{flexDirection: 'row-reverse'}} */>

					{Object.entries(renderMenuList).map(([item, i]) => (
						<a
							href={`${replacePolishLetters(renderMenuList[item])}`}
							key={i}
							className={
								location.pathname === replacePolishLetters(renderMenuList[item])
									? 'active'
									: ''
							}
							onClick={() => handleSetMenu(item)}
						>
							{renderMenuList[item].replace('/', '').replace('panel/', '')}
						</a>
					))}
									{Object.entries(objMenu).map(([item, i]) => (
					<a
						href={`/#${objMenu[item]}`}
						key={i}
						className={menu === item ? 'active' : ''}
						onClick={() => handleSetMenu(item)}
					>
						{item}
					</a>
				))}
					<div className='navLogout'
		 
					>
						<img
							src={assets.logo}
							alt={`logo ${brandData.name}`}
							className='logoMenu'
							onClick={() => {
								setOpenMenu();
								navigate("/");
							}}
						/>
						{isAuthenticated?
												<img
												src={assets.logout_icon}
												alt='wyloguj'
												onClick={handleLogout}
											/>
											:
												<img
												src={assets.login_icon}
												alt='zaloguj'
												onClick={() => {
													setOpenMenu();
													navigate("/login");
													
												}}
											/>
						}

					</div>
				</ul>
				<div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={handleChange}
					className='navbarRight'
				>
					<div 
					className='navProfile'
					onClick={() => {
						setOpenMenu();
						navigate("/");
					}}
					>
						<img 
						src={assets.profile_image} 
						alt='' 
						className='profile' 
						onClick={()=>{
							var width = window.innerWidth
							if(width <= 750) {
								if(user){
									handleLogout()
								}else{
									navigate("/")
								}
							  }
						}}
						/>
						<p>{user ? user.name : loginBtnText}</p>
					</div>
					<a className={`logOutImg ${isHovered ? 'hoverImg' : ''}`} >
					{isAuthenticated?
												<img
												src={assets.logout_icon}
												alt='wyloguj'
												onClick={handleLogout}
											/>
											:
												<img
												src={assets.login_icon}
												alt='zaloguj'
												onClick={() => {
													navigate("/login");
												}}
											/>
						}
					</a>
				</div>
				<BurgerMenu
					variant={'arrow1'}
					setOpenMenu={setOpenMenu}
					openMenu={openMenu}
				/>
			</div>
		</>
	);
};

export default Navbar;
