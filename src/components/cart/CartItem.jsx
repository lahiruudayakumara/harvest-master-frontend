import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import pic from '../../assets/images/rice.jpg'
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import OrderSummary from './OrderSummary';

const Img = styled('img')({
  width:150,
  height:150,
  padding:10,
});

const Info = styled('div')({
  flex: 3,
})

const ProductDetail = styled('div')({
  flex:2,
  display:'flex',
  marginTop: 20,
})

const Detail = styled('div')({
  padding:20,
  display: 'flex',
  flexDirection:'column',
  justifyContent:'space-around'
})

const ProductName = styled('span')({

})

const Price = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center'

})

const ProductAmount = styled('div')({
  display:'flex',
  alignItems:'center',
  marginBottom: 20
})

const Amount = styled('div')({
  fontSize:30,
  margin:10
})

const ProductPrice = styled('div')({
  fontSize: 30,
  fontWeight:200
})

const CartItem = () => {
  
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    loadCartItem();
  }, []);

  const loadCartItem = async () => {
    const res = await axios.get("http://localhost:8091/api/harvestMaster/cart/1")
    console.log(res.data)
    setCartItem(res.data)
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between">
        <Info>
    
          {
            cartItem.map((cartItem) => (
              <Grid
                key={cartItem.cartItemId}
                container
                direction="row"
                justifyContent="space-between"
                sx={{boxShadow:3, borderRadius:'5px', marginTop:2, padding:0.25}}>

                <ProductDetail>
                  <Img src={pic}/>
                  <Detail>
                    <ProductName> <h3>{cartItem.inventory.product_Name}</h3> </ProductName>
                    
                  </Detail>
                </ProductDetail>
                <Price>
                  <ProductAmount>
                    <Add/>
                      <Amount sx={{fontSize:20}}> {cartItem.quantity} KG </Amount>
                    <Remove/>
                  </ProductAmount>
                  <ProductPrice sx={{fontSize:20}}> Rs {cartItem.unitPrice} </ProductPrice>
                </Price>

              </Grid>
            ))
          }
        
        </Info>
        <OrderSummary/>
      </Grid>
    </>
  );
}
    
export default CartItem