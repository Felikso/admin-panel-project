import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const navigate = useNavigate();

    const verifyPayment = async () => {
  /*       console.log(url+orderVerifyUrl,{success,orderId})
        const response = await axios.post(url+orderVerifyUrl,{success,orderId});


        if(response.data.success){
            navigate(myOrdersUrl)
        }else{
            navigate('/')
        } */
    }



  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify