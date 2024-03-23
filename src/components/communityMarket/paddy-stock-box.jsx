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
import FormDialog from "../postHarvest/popup-form";
import FormBid from "./add-bid-form";
import { addBid } from "../../api/communitymarket";

function PaddyStock({ key, data }) {
  const [bid, setBid] = useState({
    price: "",
    stockid: " ",
  });

  console.log(data);

  const handleSubmit = async (e) => {
    try {
      const res = await addBid(data.ps_id, bid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid item xs={6} m={4}>
        <Card sx={{ width: 320, height: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              
              sx={{
                backgroundImage: `url(data:image/png;base64,${data.imageBase64})`, // Setting the background image of stock
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <CardContent sx={{ marginBottom: "10px" }}>
              <Typography gutterBottom variant="h5" component="div">
                {data.paddyVareity}
              </Typography>

              {/* Additional Typography fields */}
              <Typography variant="body2" color="text.secondary">
                Location : {data.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock Amount : {data.amount} Kg
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Starting Price : Rs. {data.price}
              </Typography>
            </CardContent>

            <Box ml={2} mb={4}>
              <FormBid
                formData={bid}
                setformData={setBid}
                onSubmit={handleSubmit}
                title="Place Your Bid"
                pricelabel="Enter  your bid amount:"
                paddystockid={data.ps_id}
              ></FormBid>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default PaddyStock;
