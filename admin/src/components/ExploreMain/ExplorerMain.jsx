import React from 'react'
import './ExploreMain.css'
import { main_list } from '../../assets/assets' 

import { allCategoriesName, itemsMainData } from '../../utils/variables'


const ExploreMain = ({category, setCategory}) => {
  return (
    <div className='exploreMain' id='exploreMain'>
      <h1>{itemsMainData.h1}</h1>
      <p className='exploreMainList'>{itemsMainData.p}</p>
      <div className='exploreMainList'>
        {
          main_list.map((item, i)=>(
            <div
            onClick={()=>setCategory(prev=>prev===item.main_name?allCategoriesName:item.main_name)} 
            key={i} 
            className='exploreMainListItem'>
              <img
              className={category===item.main_name?'active':''} 
              src={item.main_image} 
              alt={item.main_name} />
              <p>{item.main_name}</p>
            </div>
          ))
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMain