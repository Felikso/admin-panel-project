import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useNavigate, useParams } from 'react-router-dom'
import { customInfo, dashBoardData, contactMail } from '../utils/variables'
import SearchBox from '../components/SearchBox/SearchBox'
import React, {useState,useEffect} from 'react'
import toast from "react-hot-toast";

const NotAdminPage = () => {
	const { user, logout, checkAdmin } = useAuthStore();
	const { token } = useParams();
    const navigate = useNavigate();
//console.log(checkAdmin)
	const handleLogout = () => {
		logout();
        navigate('/')
      
	};


	const [list,setList] = useState([]);
  
	const { fetchMailList } = useAuthStore();
	
  
	const fetchList = async () => {
	  const response = await fetchMailList(token);
	 // const response = await axios.get(`${url}${urlList}`);
	console.log('useeffet');
	
	  if(response.data.success){
		setList(response.data.data)
		if(list.length>0){
			console.log(list)
		}
	
	  }else{
		toast.error('errorMessage')
	  }
	}
	
	useEffect(()=>{
  
	
	
		fetchList();
	
	  },[list.length])

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
				
		<SearchBox />
			
			</div>


	

		</div>//cardContent
	);
};
export default NotAdminPage;
