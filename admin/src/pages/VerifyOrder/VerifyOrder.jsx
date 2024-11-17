import React, { useState } from 'react'
import './VerifyOrder.css'
import CodeVerifikator from '../../components/CodeVeryfikator/CodeVerifikator'

const VerifyOrder = () => {

  const [orderVerified, setOrderVerified] = useState(false)
  return (
    <>
        {orderVerified ? <p>zweryfikowane</p> : <div><CodeVerifikator setOrderVerified={setOrderVerified}/></div>}
        
    </>

  )
}

export default VerifyOrder