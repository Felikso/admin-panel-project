import React, { useState, useEffect } from 'react'
import ItemCard from '@/components/ItemCard/ItemCard'
import { useAuthStore } from '@/store/authStore';
import SearchBox from '@/components/SearchBox/SearchBox'
import './AuthPages.css'

const AddPage = () => {

  return (
    <div className='addPage'>
      <ItemCard add={'unique'} />
      <SearchBox />
    </div>
  )
}

export default AddPage