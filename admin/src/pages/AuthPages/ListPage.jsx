import React, { useState, useEffect } from 'react'
//import './List.css'
import axios from 'axios';
import { listData, urlList, url, urlImg, urlRemove, tableTitle, errorMessage } from '../../utils/variables'
import { toast } from 'react-toastify';

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

  useEffect(()=>{
    fetchList();
  },[])

  

  return (

    <>

<div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                {
                  tableTitle.map((item,i)=>(
                    <th key={i} scope="col" className="px-6 py-4">{item}</th>
                  ))
                }
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
        {list.map((item,i)=>(

                <div key={i} className="listTableFormat">
                  <img src={`${url}${urlImg}${item.image}`} alt=''/>
                  
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{item.name}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.price}</td>
                  <td  onClick={()=>removeItem(item._id)} className="whitespace-nowrap px-6 py-4">X</td>

                  </div>
                ))}


                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

   {/*  <div className='list add flexCol'>
      <p>{listData.title}</p>
      <div className="listTable">
        <div className="listTableFormat title">
          {
            tableTitle.map((item,i)=>(
              <b key={i}>{item}</b>
            ))
          }
        </div>
        {list.map((item,i)=>(

          <div key={i} className="listTableFormat">
            <img src={`${url}${urlImg}${item.image}`} alt=''/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removeItem(item._id)} className='cursor'>x</p>
            </div>
      ))}
      </div>
    </div> */}
    </>
  )
}

export default ListPage