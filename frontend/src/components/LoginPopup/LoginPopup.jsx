import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { cartItemsData, formData, addCartUrl } from '../../utils/variables'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken, cartItems} = useContext(StoreContext)

    const [currState,setCurrState] = useState(formData.loginState)
    const [data,setData] = useState({
        name:'',
        email:'',
        password:''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currState===formData.loginState){
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl,data);
        console.log(response);
        console.log(document.cookie)
        if(response.data.success){
            setToken(response.data.user.token)

            axios.post(url+addCartUrl,{itemId},{headers:{token}}) 



            setShowLogin(false)
 
        }else{
            alert(response.data.message)
        }
    }

  return (
    <div className='loginPopup' onClick={()=> setShowLogin(false)}>
        <form onSubmit={onLogin} className='loginPopupContainer' onClick={(e)=> {e.stopPropagation()}}>
            <div className='loginPopupTitle'>
                <h2>{currState===formData.loginState?formData.loginTitle:currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
            </div>
            <div className='loginPopupInputs'>
                {currState===formData.loginState?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder={formData.namePlaceholder} required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder={formData.emailPlaceholder} required />
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder={formData.passwordPlaceholder} required />
            </div>
            <button type='submit'>{currState===formData.signupState?formData.createAccount:formData.loginState}</button>
            <div className="loginPopupCondition">
                <input type="checkbox" required/> <p>{formData.policyAcceptQuestion}</p></div>
                {currState===formData.loginState?
                 <p>{formData.createNewAccountQuestion} <span onClick={()=>setCurrState(formData.signupState)}>{formData.clickHereToCreate}</span></p>:
                 <p>{formData.haveAccountQuestion} <span onClick={()=>setCurrState(formData.loginState)}>{formData.clickHereToLogin}</span></p>
                }
           
        </form>
    </div>
  )
}

export default LoginPopup