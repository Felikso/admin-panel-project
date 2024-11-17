import React, { useState, useEffect } from 'react'
//import './List.css'
import axios from 'axios';
import { listData, urlList, url, urlImg, urlRemove, tableTitle, errorMessage, urlUpdate } from '../../utils/variables'
import { toast } from 'react-toastify';

import './AuthPages.css'

const ListPage = () => {

  const [list,setList] = useState([]);

 
  const fetchList = async () => {
    const response = await axios.get(`${url}${urlList}`);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error(errorMessage)
    }
  }

  const removeItem = async(itemId) => {
    const response = await axios.post(`${url}${urlRemove}`,{id:itemId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.success);
    }else{
      toast.error(errorMessage)
    }
  }

  const updateItem = async(item) => {
    const response = await axios.post(`${url}${urlUpdate}`,{
      name: item.name,
      urlUpdate: item.urlUpdate,
      price: item.price,
      category: item.category,
      image: item.image
    });
    await fetchList();
    if(response.data.success){
      toast.success(response.data.success);
    }else{
      toast.error(errorMessage)
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  

  return (

    <>




      <div className="listTable">

{/*         <div className="listTableCard title">
          {
            tableTitle.map((item,i)=>(
              <b key={i}>{item}</b>
            ))
          }
        </div> */}

<div className="listTableCard">
{
            tableTitle.map((item,i)=>(
              <b key={i}>{item}</b>
            ))
          }

            </div>
        {list.map((item,i)=>(

          <div key={i} className="listTableCard">
            <img src={`${url}${urlImg}${item.image}`} alt=''/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <div className='actionBox'>
                        <p 
            							onClick={() => {
                            if (window.confirm('na pewno chcesz usunąć przedmiot?')) {
                              removeItem(item._id)
                            }
                          }}
                        className='cursor'>edit</p>
                                                <p 
            							onClick={() => {
                            if (window.confirm('na pewno chcesz usunąć przedmiot?')) {
                              removeItem(item._id)
                            }
                          }}
                        className='cursor'>x</p>
 
 
 </div>
            </div>
      ))}
      </div>
    
    </>
  )
}

export default ListPage