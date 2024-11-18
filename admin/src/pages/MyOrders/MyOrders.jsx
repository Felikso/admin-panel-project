import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import { userOrdersUrl, myOrdersData } from '../../utils/variables.jsx'
import { assets } from '../../assets/assets.js';
import axios from 'axios';

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+userOrdersUrl,{},{headers:{token}})
        setData(response.data.data);
    }

        //const dateStr = "2024-11-05T11:02:04.941+00:00";
        const convertDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
            return formattedDate;
        }



    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])
    
  return (
    <div className='myOrders'>
        <h2>{myOrdersData.title}</h2>
        <div className='container'>
        {
            data.map((item,i)=>(
                <div key={i} className="myOrdersOrder">
                    <img src={assets.parcel_icon} alt="" className="" />
                    <p>{item.items.map((it,x)=>{
                        console.log(it)
                        if(x === item.items.length-1){
                            return it.name+" x "+it.quantity
                        }else{
                            return it.name+" x "+it.quantity+", "
                        }
                    })}</p>
                    <p>{item.amount},00 PLN</p>
                    <p>items: {item.items.length}</p>
                    <div>
                    <p className='myOrdersDate'>{convertDate(item.date)}</p>
                    <p><span>&#x25cf;</span> <b>{item.status}</b></p>
                    </div>
                    <button onClick={fetchOrders}>track order</button>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default MyOrders