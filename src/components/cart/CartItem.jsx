import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import pic from '../../assets/images/rice.jpg'
import { Add, Remove } from '@mui/icons-material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  padding:20,
  marginLeft:100,
  marginRight:0
  
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

const CheakoutButton = styled('button')({
  width:'100%',
  padding:10,
  backgroundColor:'black',
  color:'white',
  fontWeight:600
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
                <Button variant="outlined" startIcon={<DeleteIcon />}> Delete </Button>
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
                <Button variant="outlined" startIcon={<DeleteIcon />}> Delete </Button>
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
        <Summary sx={{border:1}}>
          <Title> Order Summary </Title>
          <Item>
            <Text> Sub Total </Text>
            <ItemPrice> Rs 100 </ItemPrice>
          </Item>
          <Item>
            <Text sx={{fontWeight:500, fontSize:24}}> Total </Text>
            <ItemPrice> Rs 100 </ItemPrice>
          </Item>
          <CheakoutButton>CHEAKOUT NOW</CheakoutButton>
        </Summary>
      </Grid>
    </>
  );
}
    
export default CartItem