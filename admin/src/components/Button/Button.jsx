import React from 'react'
import './Button.css'

const  Button = ({color, text, animate, animateText}) => {

          let textToRender = animate ? (animateText ? animateText : text) : text;
  return (
  
    <button className={`btnHover color-${color}`}>
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