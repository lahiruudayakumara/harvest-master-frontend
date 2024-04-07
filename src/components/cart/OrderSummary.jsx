import { styled } from '@mui/material/styles';

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

const OrderSummary = () => {
    return (
        <>
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
        </>
    );
}

export default OrderSummary