import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import pic from '/Users/dusha/Desktop/My/harvest-master-frontend/src/assets/images/rice.jpg'
import { Add, Remove } from '@mui/icons-material';

const Img = styled('img')({
  width:200,
  height:200,
  padding:10
});

const Info = styled('div')({
  flex: 3,
})

const Summary = styled('div')({
  flex: 1,
  margin:20,
})

const ProductDetail = styled('div')({
  flex:2,
  display:'flex',
  marginTop: 20,
})

const Detail = styled('div')({
  padding:20,
  display: 'flex',
  flexDirection:'column'
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
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between">
        <Info>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{boxShadow:3, borderRadius:'15px', marginTop:2, padding:0.25}}>
            <ProductDetail>
              <Img src={pic}/>
              <Detail>
                <ProductName> <h2>Red Nadu</h2> </ProductName>
              </Detail>
            </ProductDetail>
            <Price>
              <ProductAmount>
                <Add/>
                  <Amount> 2 </Amount>
                <Remove/>
              </ProductAmount>
              <ProductPrice> Rs 100</ProductPrice>
            </Price>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{boxShadow:3, borderRadius:'15px', marginTop:2, padding:0.25}}>
            <ProductDetail>
              <Img src={pic}/>
              <Detail>
                <ProductName> <h2>Red Nadu</h2> </ProductName>
              </Detail>
            </ProductDetail>
            <Price>
              <ProductAmount>
                <Add/>
                  <Amount> 2 </Amount>
                <Remove/>
              </ProductAmount>
              <ProductPrice> Rs 100</ProductPrice>
            </Price>
          </Grid>
        </Info>
        <Summary>
          {/* <Title> Order Summary </Title> */}
          {/* <Item>
            <Text></Text>
          </Item> */}
        </Summary>
      </Grid>
    </>
  );
}
    
export default CartItem