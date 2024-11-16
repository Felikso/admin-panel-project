import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const {url, orderVerifyUrl, myOrdersUrl} = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        console.log(url+orderVerifyUrl,{success,orderId})
        const response = await axios.post(url+orderVerifyUrl,{success,orderId});


        if(response.data.success){
            navigate(myOrdersUrl)
        }else{
            navigate('/')
        }
    }

 /*    useEffect(()=>{
        verifyPayment();
    },[]) 
    if payment false - remove order from database
    */

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify