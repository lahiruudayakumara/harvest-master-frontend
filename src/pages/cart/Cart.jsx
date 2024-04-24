import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Button, Grid } from '@mui/material';
import CartItem from '../../components/cart/CartItem';
import { NavBar } from '../../components/nav-bar';
import {useSelector} from 'react-redux'
import { getAllCartItems } from 'src/stores/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from "@mui/material/Badge";


const CartWrapper = styled('div')({
    padding: 20,
    marginTop: 100,
    marginBottom: 200,
});

const MyButton = styled(Button)({
    padding: 10,
    fontWeight:600,
    '&:hover': {
        backgroundColor: "#2CA019",
        color: "white",
    },
})

const Cart = () => {

    const cartItems = useSelector(getAllCartItems);

    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/inventory')
    }

    return (
        <>  
            
            <CartWrapper>
                <Typography variant='h4' align='center'>
                    <Box sx={{ fontWeight: 300, color:'#2CA019'}}> Your Cart
                        <Badge badgeContent={cartItems.length} color="error">
                            <LocalMallOutlinedIcon style={{ fontSize: 50}}/>
                        </Badge>
                    </Box>
                </Typography>
                <hr style={{color: '#2CA019', marginTop: 35}}/>
                <Grid   
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ padding: 5, pt:1 }}>

                    <MyButton variant="outlined" sx={{color:'#2CA019', borderColor: '#2CA019'}}
                        onClick={handleContinueShopping}>
                        CONTINUE SHOPPING
                    </MyButton>

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