import React, {  useState } from 'react';
import './AdminNavbar.css';
import { assets } from '../../assets/assets.js';
import { brandData, loginBtnText } from '../../utils/variables.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';
import { replacePolishLetters } from '../../utils/functions.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';
import { objMenu, objPages } from '../../utils/variables.jsx';

const AdminNavbar = () => {
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
			window.location.reload();
		
		}

	}

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
				<ul className={`navbarMenu ${activeClass}`}>
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
					{Object.entries(objPages).map(([item, i]) => (
						<a
							href={`${replacePolishLetters(objPages[item])}`}
							key={i}
							className={
								location.pathname === replacePolishLetters(objPages[item])
									? 'active'
									: ''
							}
							onClick={() => handleSetMenu(item)}
						>
							{objPages[item].replace('/', '')}
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
													navigate("/login");
													setOpenMenu();
													
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
								navigate("/");
							  }
						}}
						/>
						<p>{user? user.name : loginBtnText}</p>
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

export default AdminNavbar;
