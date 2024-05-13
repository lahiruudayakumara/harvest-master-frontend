import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import Badge from "@mui/material/Badge";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';



const DeleteIconButton = styled(IconButton)({
    color:'#2CA019',
    marginRight:20,
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
})

const Wrapper = styled('div')({
  padding: 20,
  marginTop: 80,
  marginBottom: 200
});


export default function WishList() {

  const [wishList, setWishList] = useState([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    
    try{
      const responce = await axios.get('http://localhost:8091/api/harvestMaster/wishlist/1')
      console.log(responce.data)
      setWishList(responce.data)
    } catch(error) {
      console.log(error)
    }
  }

  const handleClick = async (item) => {
    const requestData = {
        quantity: item.inventoryDTO.packege_Type,
        unitPrice: item.inventoryDTO.price,
        inventory: {
          pid: item.inventoryDTO.pid
        },
        buyer: {
          cusId: item.buyer.cusId
        }
    };
    
      // Send data to the server
    const response = await axios.post('http://localhost:8091/api/harvestMaster/cart', requestData)
      
    toast.success('Item add to cart successfully!')
    console.log(response.data)
    await axios.delete(`http://localhost:8091/api/harvestMaster/wishlist/${item.itemId}`)
      
    loadItems()
  }

  const deleteItem = async (id) => {
    console.log(id)
    try{
      const response = await axios.delete(`http://localhost:8091/api/harvestMaster/wishlist/${id}`)
      console.log(response.status)

      if(response.status === 200){
        setOpenDeleteDialog(false); // Close the dialog after successful deletion
        loadItems()
        toast.success('Item removed from Wish List!')
      }
    }catch(err){
      console.error(err);
      toast.error('An error occurred while removing the item Please try again')
    }

  }

  return (
    <>
      <Wrapper>
      <center>
          <Badge>
            <FavoriteBorderOutlinedIcon style={{ fontSize: 50}}/>
          </Badge>
          <h1 style={{marginBottom: 25}}> My Wishlist </h1>
        </center>
        <TableContainer component={Paper} style={{ marginBottom: "10px" }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow> 

                <TableCell align="center" style={{ backgroundColor: 'white', fontSize: 16 }}><b> Product Name </b> </TableCell>
                <TableCell align="center" style={{ backgroundColor: 'white', fontSize: 16 }}><b>Unit Price</b></TableCell>
                <TableCell align="center" style={{ backgroundColor: 'white', fontSize: 16 }}><b>Package Type</b></TableCell>
                <TableCell align="center" style={{ backgroundColor: 'white', fontSize: 16 }}><b>Stock Status</b></TableCell>
                <TableCell align="center" style={{ backgroundColor: 'white', fontSize: 16 }}><b>Action</b></TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {wishList.map((item) => (
                <>
                <TableRow
                  key={item.itemId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center',
                    backgroundColor: 'white', fontSize: 18 }}>
                    <DeleteIconButton aria-label="delete" onClick={() => setOpenDeleteDialog(true)}>
                      <DeleteIcon/>
                    </DeleteIconButton>
                    <img src={`data:image/png;base64,${item.inventoryDTO.image}`} 
                    width={100} height={100} alt='product image'
                    style={{ marginRight: '16px' }} />

                    {item.inventoryDTO.product_Name}
                  </TableCell>
                  
                  <TableCell align="center" sx={{fontSize: 20}}>Rs {item.inventoryDTO.price}</TableCell>
                  <TableCell align="center" sx={{fontSize: 20}}>{item.inventoryDTO.packege_Type} KG</TableCell>
                  <TableCell align="center" sx={{fontSize: 20}}>{item.availability}</TableCell>
                  <TableCell align="center" >
                    <Button
                    sx={{
                      backgroundColor:'#2CA019',
                      color:'white',
                      fontWeight:600,
                      '&:hover': {
                        color: "#2CA019",
                        borderColor: "#2CA019"
                      },
                    }} 
                    onClick={() => handleClick(item)}> Add to Cart </Button> </TableCell>
                </TableRow>
                <hr/>

                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete this item?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={() => deleteItem(item.itemId)} color="error">Delete</Button>
                  </DialogActions>
                </Dialog>

                </>
              ))}
            </TableBody>
          </Table>
          <ToastContainer/>
        </TableContainer>
      </Wrapper>
    </>
  );
}