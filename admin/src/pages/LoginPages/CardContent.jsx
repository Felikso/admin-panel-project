import React from 'react';
import {  panelPath } from '../../utils/variables.jsx'


const CardTitle = ({children, title, location}) => {
    console.log(location);
    
  return (

    <div className='formBox'>
        <h2 className='title textTogradient'>
            {title}
        </h2>
        {children}
    </div>

  )
}

const CardFooter = ({children, title, location}) => {
    console.log(location);
    
  return (

<>
{location.pathname.includes(panelPath) && <p>panel administracyjny</p>} 
</>
       

  )
}

const CardContent = ({children, title, location}) => {
    return (
        <div className='cardContent'>
          <CardTitle location={location} title={title}> {children} </CardTitle>
          <CardFooter location={location} title={title}> {children} </CardFooter>
          </div>

    )
  }

export  { CardContent }