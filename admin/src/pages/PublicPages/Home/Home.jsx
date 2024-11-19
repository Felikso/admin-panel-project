import React, { useState } from 'react'
import './Home.css'
import Header from '@/components/Header/Header'
import ExploreMain from '@/components/ExploreMain/ExplorerMain'
import ItemsDisplay from '@/components/ItemsDisplay/ItemsDisplay'

import { allCategoriesName } from '@/utils/variables'
import AppDownload from '@/components/AppDownload/AppDownload'

const Home = () => {

    const [category, setCategory] = useState(allCategoriesName);
  return (
    <>
        <Header />
        <ExploreMain category={category} setCategory={setCategory} />
        <ItemsDisplay category={category} />
        <AppDownload />
    
    </>
  )
}

export default Home