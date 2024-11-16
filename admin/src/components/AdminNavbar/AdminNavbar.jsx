import React, { useContext, useState } from 'react';
import './AdminNavbar.css';
import { assets } from '../../assets/assets.js';
import { brandData, formData, authList, panelPath } from '../../utils/variables.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { replacePolishLetters } from '../../utils/functions.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';

const AdminNavbar = () => {
	const { user, logout } = useAuthStore();

	const [menu, setMenu] = useState('start');
	const [openMenu, setOpenMenu] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const location = useLocation();
	//console.log(replacePolishLetters('źźąsjkadka   sdsad '))
	let activeClass = openMenu ? 'activeMenu' : '';

	const handleChange = () => {
		setTimeout(setIsHovered(false), 2000);
	};

	return (
		<>
			<Link to='/'>
				<img
					src={assets.logo}
					alt={`logo ${brandData?.name}`}
					className='logo'
				/>
			</Link>
			<div className='navbar'>
				<ul className={`navbarMenu ${activeClass}`}>
					{Object.entries(authList).map(([item, i]) => (
						<a
							href={`${panelPath}${replacePolishLetters(authList[item])}`}
							key={i}
							className={
								location.pathname === replacePolishLetters(authList[item])
									? 'active'
									: ''
							}
							onClick={() => setMenu(item)}
						>
							{authList[item].replace('/', '')}
						</a>
					))}
					<div className='navLogout'>
						<img
							src={assets.logo}
							alt={`logo ${brandData?.name}`}
							className='logoMenu'
						/>
						<img
							src={assets.logout_icon}
							alt='wyloguj'
							onClick={() => {
								if (window.confirm('wylogowujesz się?')) {
									logout();
								}
							}}
						/>
					</div>
				</ul>
				<div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={handleChange}
					className='navbarRight'
				>
					<div className='navProfile'>
						<img src={assets.profile_image} alt='' className='profile' />
						<p>{user?.name}</p>
					</div>
					<a className={`logOutImg ${isHovered ? 'hoverImg' : ''}`}>
						<img
							src={assets.logout_icon}
							alt=''
							onClick={() => {
								if (window.confirm('wylogowujesz się?')) {
									logout();
								}
							}}
						/>
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
