import React from 'react'
import './Button.css'

const  Button = ({color, text='', animate, animateText, type='submit', onClick, icon, width, heigt, iconWidth, iconHeight, fc, allHeightWidth}) => {

          let textToRender = animate ? (animateText ? animateText : text) : text;
  return (
  
    <button 
    onClick={onClick}
    type={type}
    style={{color: fc, width: width ? width : allHeightWidth, height: heigt ? heigt : allHeightWidth}}
    className={`btnHover color-${color}`}>
      {icon&&
      <img 
      src={icon}
      style={{width: iconWidth? iconWidth : allHeightWidth, height: iconHeight ? iconHeight : allHeightWidth}}
      />}
       <div className={animate ? "waviy" : ''}>
        
        {
          textToRender.split('').map((item,i)=>(
            <span key={i} style={{'animationDelay': `calc(.2s *${i})`}}>{item}</span>
          ))
        }
  </div>
    </button>
  )
}

export default Button