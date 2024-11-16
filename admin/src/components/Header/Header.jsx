import React from 'react'
import './Header.css'
import { headerData, objMenu } from '../../utils/variables';
import Button from '../Button/Button';

console.log(`/#${objMenu['menu']}`)
const Header = () => {
  return (
    <div className='header'>
        <div className='headerContents'>
          <div className='headerContentsBox title'>
            <h2>{headerData.headerH2}</h2>
            <p >{headerData.headerP}</p>
            
            <a  href={`/#${objMenu['menu']}`}><Button text={headerData.headetBtn} color='0' /></a>
            </div>
        </div>
        </div>
  )
}

export default Header