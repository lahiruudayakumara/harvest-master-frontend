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
import { Margin } from "@mui/icons-material";


function Productbox({ key, data }) {
  
  console.log(data);



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
                          <Button variant="contained">
                              Add to Cart
                          </Button>
              </Box>
        </Card>
      </Grid>
    </>
  );
}

export default Productbox;
