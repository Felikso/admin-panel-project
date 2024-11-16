import React from 'react'
import './Header.css'
import { headerData, objMenu } from '../../utils/variables';

console.log(`/#${objMenu['menu']}`)
const Header = () => {
  return (
    <div className='header'>
        <div className='headerContents'>
            <h2>{headerData.headerH2}</h2>
            <p>{headerData.headerP}</p>
            <a href={`/#${objMenu['menu']}`}>{headerData.headetBtn}</a>
        </div>
        </div>
  )
}

export default Header