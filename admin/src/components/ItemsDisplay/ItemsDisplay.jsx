import React, { useState, useEffect } from 'react'
import './ItemsDisplay.css'
import Item from '../Item/Item'

import { allCategoriesName, customErrors, customInfo, itemsMainData } from '@/utils/variables.jsx'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import BackgroundAnimation from '../BackgroundAnimation/BackgroundAnimation'
import NetworkErrorText from '../NetworkErrorText/NetworkErrorText.jsx'
import toast from 'react-hot-toast'

const ItemsDisplay = ({category}) => {

    const { fetchItemsList, items_list, user } = useAuthStore();


    const [list,setList] = useState([]);

  
    
    const fetchList = async () => {
      const response = await fetchItemsList();
     // const response = await axios.get(`${url}${urlList}`);
      if(response){
        console.log('lista załadowana')
      }else{
        toast.error('errorMessage')
      }
    }

    useEffect(()=>{
      fetchList();
    },[])


    let dataLoading = true;
    let netErr = false
  return (
    <div className='itemsDisplay' id='itemsDisplay'>
        {netErr &&<NetworkErrorText />}
        <div className="itemsDisplayList">
          {/* dataLoading */ false ? <BackgroundAnimation /> :
            items_list.length>0 &&
                items_list.map((item,i) => {
                    if(category===allCategoriesName || category===item.category){
                    return <Item key={i} item={item} />
                    }
            })
            }
        </div>
    </div>
  )
}

export default ItemsDisplay