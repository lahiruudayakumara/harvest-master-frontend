import React from 'react'
import { Helmet } from 'react-helmet'
import { CommunityMarketView } from '../../section/community-market/community-market-view'
import { NavBar } from '../../components/nav-bar'
import { Inventory } from '@mui/icons-material'
import { Inventoryview } from 'src/section/Inventory product/Inventory-view'

export const ProductInventory = () => {
    return (
      <>
      <Helmet>
          <title>Inventory</title>
            </Helmet>
            
            <Inventoryview></Inventoryview>
      </>
  )
}
