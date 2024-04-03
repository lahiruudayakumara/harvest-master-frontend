import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import pic from '../../assets/images/rice.jpg'
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Img = styled('img')({
  width:150,
  height:150,
  padding:10,
});

const Info = styled('div')({
  flex: 3,
})

const Summary = styled('div')({
  flex: 1,
  margin:20,
  padding:20,
  marginLeft:100,
  marginRight:0,
  height: '100%',
  position:'sticky',
  top:10,
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

const Title = styled('h1')({
  fontWeight:200,
})

const Item = styled('div')({
  marginTop:30,
  marginBottom: 30,
  marginLeft:0,
  marginRight:0,
  display:'flex',
  justifyContent:'space-between'
})

const ItemPrice = styled('span')({

})

const Text = styled('span')({

})

const CheckoutButton = styled('button')({
  width:'100%',
  padding:10,
  backgroundColor:'#2CA019',
  color:'white',
  fontWeight:600,
  cursor:'pointer',
  border: 0,
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
        <Summary sx={{boxShadow:4, borderRadius:'2px'}}>
          <Title > Order Summary </Title>
          <Item>
            <Text> Sub Total </Text>
            <ItemPrice> Rs 100 </ItemPrice>
          </Item>
          <Item>
            <Text sx={{fontWeight:500, fontSize:24}}> Total </Text>
            <ItemPrice sx={{fontWeight:500, fontSize:24}}> Rs 100 </ItemPrice>
          </Item>
          <CheckoutButton> CHECKOUT NOW </CheckoutButton>
        </Summary>
      </Grid>
    </>
  );
}
    
export default CartItem