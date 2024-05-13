import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Margin } from "@mui/icons-material";
import { addToCartApi } from "src/api/cartApi";


function Productbox({ key, data }) {
  
  console.log(data);
  
  const handleAddToCart = async () => {
   
    const requestData = {
      quantity: 1,
      unitPrice: data.price,
      inventory: {
        pid: data.pid
      },
      buyer: {
        cusId: 1
      }
    };
  
    // Send data to the server
    try{
        addToCartApi(requestData)
        .then((response) => {
          console.log(response)
        })

        toast.success('Item add to cart successfully!')

    } catch (err){
        console.log("Error add to cart:",err)
        toast.error('Error add to cart')
    }
    
  };
  
  const handleWishlist = async () => {
   
    const requestData = {
      availability: "IN_STOCK",
      inventory: {
        pid: data.pid
      },
      buyer: {
        cusId: 1
      }
    };
  
    // Send data to the server
    try{
      const response = await axios.post('http://localhost:8091/api/harvestMaster/wishlist', requestData)
      console.log(response.data)
    } catch(err){
      console.log("error adding to cart", err)
    }
    
    
    toast.success('Item add to wish list successfully!')
    
  };

  return (
    <>
      <Grid item xs={6} m={4}>
        <Card sx={{ width: 320, height: 400 }} elevation={5}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              sx={{
                backgroundImage: `url(data:image/png;base64,${data.image})`, // Setting the background image of stock
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <CardContent sx={{ marginBottom: "10px" }}>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                fontSize={22}
                fontFamily={"initial"}
                fontWeight={550}
                color={"#333333"}
              >
               {data.product_Name}
              </Typography>

              {/* Additional Typography fields */}

              <Typography variant="body2" color="text.secondary">
                Description : {data.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Package Type(KG) : {data.packege_Type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
               Price RS : {data.price}
              </Typography>
            </CardContent>
                      
            
                  </CardActionArea>
                  <Box pl={2}>
                          <Button variant="contained" onClick={handleAddToCart}>
                              Add to Cart
                          </Button>
                          <Button sx={{marginLeft: 2}} variant="contained" onClick={handleWishlist}>
                              WishList
                          </Button>
              </Box>
        </Card>
      </Grid>
      <ToastContainer/>
    </>
  );
}

export default Productbox;
