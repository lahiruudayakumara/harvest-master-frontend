import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Button, Grid } from '@mui/material';
import CartItem from '../../components/cart/CartItem';

const CartWrapper = styled('div')({
    padding: 20,
});

const MyButton = styled(Button)({
    padding: 10,
    fontWeight:600,
})
  


const Cart = () => {
    return (
        <>
            <CartWrapper>
                <Typography variant='h3' align='center'>
                    <Box sx={{ fontWeight: 300}}> Shopping Cart</Box>
                </Typography>
                <Grid   
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ padding: 5 }}>

                    <MyButton variant="outlined">CONTINUE SHOPPING</MyButton>
                    <MyButton variant="contained">CHECKOUT NOW</MyButton>

                    <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">

                        <CartItem/>
                    </Grid>

                </Grid>
            </CartWrapper>
        </>
    );
}

export default Cart