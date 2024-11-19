import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { formatDate } from "@/utils/date";
import { customInfo, dashBoardData, contactMail } from '@/utils/variables'

const DashboardPage = () => {
	const { user, logout, checkAdmin } = useAuthStore();
//console.log(checkAdmin)
	const handleLogout = () => {
		logout();
	};
	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>{dashBoardData.title}{user.name}</h2>
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
				</>
				}
				
		
			
			</div>


	

		</div>//cardContent
	);
};
export default DashboardPage;
