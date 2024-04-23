import React from 'react'
import { Helmet } from 'react-helmet'
import WishList from 'src/components/cart/WishList'


export const WishListView = () => {
    return (
      <>
        <Helmet>
          <title>Wish List</title>
        </Helmet>
            
        <WishList/>
      </>
  )
}