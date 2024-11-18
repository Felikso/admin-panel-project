import React, { useContext } from 'react'
import './ItemsDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Item from '../Item/Item'

import { allCategoriesName } from '../../utils/variables'

const ItemsDisplay = ({category}) => {

    const {items_list} = useContext(StoreContext)

  return (
    <div className='ItemsDisplay' id='ItemsDisplay'>
        <h2>wybierz swoje itemy.</h2>
        <div className="itemsDisplayList">
            {items_list &&
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