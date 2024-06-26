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
import { deleteCartItemApi, loadCartItemsApi } from 'src/api/cartApi';
import {useDispatch, useSelector} from 'react-redux'
import { addCartItem, addTotalAmount, getAllCartItems, getTotalAmount} from 'src/stores/slices/cartSlice';
import FormDialog from './Form';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    
    try{
      loadCartItemsApi().then((response) => {
        dispatch(addCartItem(response))
        console.log(response)
        const total = calculateTotalAmount(response)
        // console.log(total)

        dispatch(addTotalAmount(total))
      })

    } catch(error) {
      console.log(error)
    }
  }

  const deleteCartItem = async (cart_item_id) => {
    console.log(cart_item_id)
    try{
      const response = await deleteCartItemApi(cart_item_id)
      console.log(response.status)

      if(response.status === 200){

        const total = calculateTotalAmount(cartItem.filter((item) => item.cartItemId !== cart_item_id));
        dispatch(addTotalAmount(total))
        setOpenDeleteDialog(null); // Close the dialog after successful deletion
        loadCartItems();
        
        toast.success('Item removed from cart!')
      }
    }catch(err){
      console.error(err);
      toast.error('An error occurred while removing the item. Please try again')
    }

  }
  
  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.quantity * item.unitPrice;
      
    }
    // console.log(total)
    return total;
  };

  const handleOpenDeleteDialog = (cartItemId) => {
    setOpenDeleteDialog(cartItemId);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(null);
  };

  // Filtering function
  const filteredCartItems = cartItem.filter((item) =>
    item.inventoryDTO.product_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between">
        <Info>

        <TextField
            variant="outlined"
            margin="normal"
            placeholder="Search product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'green' },
                '&:hover fieldset': { borderColor: 'green' },
                '&.Mui-focused fieldset': { borderColor: 'green' },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={{ color: 'green' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
    
          {
            filteredCartItems.map((cartItem) => (
              <Grid
                key={cartItem.cartItemId}
                container
                direction="row"
                justifyContent="space-between"
                sx={{boxShadow:3, borderRadius:'5px', marginTop:2, padding:0.25}}>
               
                <ProductDetail>
                <Img src={`data:image/png;base64,${cartItem.inventoryDTO.image}`} alt="Product Image" />
                  <Detail>

                    <ProductName> <h3>{cartItem.inventoryDTO.product_Name}</h3> </ProductName>
                    Package Type : {cartItem.inventoryDTO.packege_Type} KG<br/><br/>
                    Total Price  : {cartItem.quantity * cartItem.unitPrice}
                  </Detail>
                </ProductDetail>
                <Price>
                  <ProductAmount>
                   
                    <Amount sx={{fontSize:20}}> Quantity : {cartItem.quantity} </Amount>
                    
                  </ProductAmount>
                  <ProductPrice sx={{fontSize:20}}> Rs {cartItem.unitPrice} </ProductPrice>
                  {/* {cartItem.inventoryDTO.quantity === 0 && <div style={{color: 'red'}}>
                    Unavailable</div>} */}
                </Price>
              <FormDialog id={cartItem.cartItemId} quantity={cartItem.quantity} price={cartItem.unitPrice} />
                <DeleteIconButton aria-label="delete" onClick={() => handleOpenDeleteDialog(cartItem.cartItemId)}>
                  <DeleteIcon/>
                </DeleteIconButton>
                
                <Dialog open={openDeleteDialog === cartItem.cartItemId} onClose={handleCloseDeleteDialog}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete this item?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={() => deleteCartItem(cartItem.cartItemId)} color="error">Delete</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            ))
          }
        
        </Info>
          <OrderSummary totalAmount={totalAmount}/>
      </Grid>
      <ToastContainer/>
    </>
  );
}
    
export default CartItem