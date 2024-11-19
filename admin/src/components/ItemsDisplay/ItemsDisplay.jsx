import React, { useContext, useEffect } from 'react'
import './ItemsDisplay.css'
import { StoreContext } from '@/context/StoreContext'
import Item from '../Item/Item'

import { allCategoriesName, customErrors, customInfo, itemsMainData } from '@/utils/variables.jsx'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import BackgroundAnimation from '../BackgroundAnimation/BackgroundAnimation'
import NetworkErrorText from '../NetworkErrorText/NetworkErrorText.jsx'

const ItemsDisplay = ({category}) => {

  
    //const {items_list, dataLoading, netErr} = useContext(StoreContext)
    let items_list = [];
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