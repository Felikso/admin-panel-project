import React from 'react'
import './PopupPage.css'
import { assets } from '@/assets/assets'
import { footerLinks, formData } from '@/utils/variables'

const PopupPage = ({setShowPopupPage, showPopupPage}) => {

    const pageData = footerLinks[showPopupPage];


  return (
    <div className='popupPage' onClick={()=> setShowPopupPage(false)}>
        <div className='popupPageContainer' onClick={(e)=> {e.stopPropagation()}}>
        <img  src={pageData[2]} alt={pageData[0]} className='popupPageImg' />
            <div className='popupPageTitle'>
                <h2>{pageData[0]}</h2>
                <img onClick={()=>setShowPopupPage(false)} src={assets.cross_icon} alt='' />
            </div>
            <div className='popupPageContent'>
                <div dangerouslySetInnerHTML={{ __html: pageData[1] }} />
            </div>
        </div>
    </div>
  )
}

export default PopupPage