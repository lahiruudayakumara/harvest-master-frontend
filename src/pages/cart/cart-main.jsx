import React from 'react'
import { Helmet } from 'react-helmet'
import Cart from './Cart'


export const CartView = () => {
    return (
      <>
        <Helmet>
          <title>Cart</title>
        </Helmet>
            
        <Cart/>
      </>
  )
}