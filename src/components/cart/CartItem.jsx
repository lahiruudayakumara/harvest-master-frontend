import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import pic from '../../assets/images/rice.jpg'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderSummary from './OrderSummary';
import { deleteCartItem } from 'src/api/cartApi';
import {useDispatch, useSelector} from 'react-redux'
import { addCartItem, addTotalAmount, getAllCartItems, getTotalAmount} from 'src/stores/slices/cartSlice';
import FormDialog from './Form';


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
})

const Detail = styled('div')({
  padding:20,
  display: 'flex',
  flexDirection:'column',
  justifyContent:'space-around'
})

const ProductName = styled('span')({
  color:'#000000'
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

const DeleteIconButton = styled(IconButton)({
  color:'#2CA019',
  marginRight:20,
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
})

const CartItem = () => {
  
  const dispatch = useDispatch();
  const cartItem = useSelector(getAllCartItems);
  const totalAmount = useSelector(getTotalAmount);
  
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    const responce = await axios.get("http://localhost:8091/api/harvestMaster/cart/1")
    console.log(responce.data)
    dispatch(addCartItem(responce.data))
    const total = calculateTotalAmount(responce.data);
    console.log(total)
    
    dispatch(addTotalAmount(total))
  }

  const deleteCartItem = async (cart_item_id) => {
    console.log(cart_item_id)
    const response = await axios.delete(`http://localhost:8091/api/harvestMaster/cart/${cart_item_id}`)
    console.log(response.status)
    const total = calculateTotalAmount(cartItem.filter((item) => item.cartItemId !== cart_item_id));

    dispatch(addTotalAmount(total))

    loadCartItems();
  }

  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.quantity * item.unitPrice;
      
    }
    console.log(total)
    return total;
  };

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
                   
                    <Amount sx={{fontSize:20}}> {cartItem.quantity} KG </Amount>
                    
                  </ProductAmount>
                  <ProductPrice sx={{fontSize:20}}> Rs {cartItem.unitPrice} </ProductPrice>
                </Price>
              <FormDialog id={cartItem.cartItemId} quantity={cartItem.quantity} price={cartItem.unitPrice} />
                <DeleteIconButton aria-label="delete" onClick={() => deleteCartItem(cartItem.cartItemId)}>
                  <DeleteIcon/>
                </DeleteIconButton>
              </Grid>
            ))
          }
        
        </Info>
          <OrderSummary totalAmount={totalAmount}/>
      </Grid>
    </>
  );
}
    
export default CartItem