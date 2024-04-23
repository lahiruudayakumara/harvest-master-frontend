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
  marginTop: 100,
  marginBottom: 200
});


export default function WishList() {

  const [wishList, setWishList] = useState([])

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
        <h1> <center> My Wishlist </center> </h1>
        <TableContainer coponent={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell align="center"> Product Name </TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Stock Status</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {wishList.map((item) => (
                <TableRow
                  key={item.itemId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                    <DeleteIconButton aria-label="delete" onClick={() => deleteItem(item.itemId)}>
                      <DeleteIcon/>
                    </DeleteIconButton>
                    <img src={`data:image/png;base64,${item.inventoryDTO.image}`} 
                    width={100} height={100} alt='product image'
                    style={{ marginRight: '16px' }} />

                    {item.inventoryDTO.product_Name}
                  </TableCell>
                  
                  <TableCell align="center">{item.inventoryDTO.price}</TableCell>
                  <TableCell align="center">{item.inventoryDTO.packege_Type}</TableCell>
                  <TableCell align="center">{item.availability}</TableCell>
                  <TableCell align="center"> <Button onClick={() => handleClick(item)}> Add to Cart </Button> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ToastContainer/>
        </TableContainer>
      </Wrapper>
    </>
  );
}