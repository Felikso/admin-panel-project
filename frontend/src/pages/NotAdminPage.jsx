import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useNavigate } from 'react-router-dom'
import { customInfo, dashBoardData, contactMail } from '../utils/variables'

const NotAdminPage = () => {
	const { user, logout, checkAdmin } = useAuthStore();
    const navigate = useNavigate();
//console.log(checkAdmin)
	const handleLogout = () => {
		logout();
        navigate('/')
      
	};
	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>Cześć, {user?.name}</h2>
				{user?.isAdmin ? 
				<>
				<p>siemanko</p>
				<button
					onClick={handleLogout}
				>
					Logout
				</button>
				</>
				 : 
				 <>
				<p className='textError'>{customInfo.needPermissions}</p>
				<a href={`mailto:${contactMail}`}><span className='textTogradient'>kliknij</span>, żeby wysłać maila</a>
                <button
					onClick={handleLogout}
				>
				{user ?'wyloguj' : 'przejdź do strony logowania'}
				</button>
				</>
				}
				
		
			
			</div>


	

		</div>//cardContent
	);
};
export default NotAdminPage;
