import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addStockBid } from "src/stores/slices/communityMarketSlice";

function PaddyStock({ key, data }) {


  const dispatch = useDispatch();

  const [bid, setBid] = useState({
    price: "",
    stockid: " ",
  });
  
  

  //bid data object to pass to the redux store
  function createBidData(price) {
    return {

      price: price,
      creationDate: currentDateToArray(),
    }
    
   
  };

  

  const handleSubmit = async (e) => {
    try {
      const res = await addBid(data.ps_id, bid);

      //create the bid data object
      const bidData = createBidData(bid.price);

      console.log(bidData);

      //add the bid to the redux store
      dispatch(addStockBid({stockId:data.ps_id, ...bidData}));

    } catch (error) {
      console.log(error);
    }
  };

  //retriving the current date
  function currentDateToArray() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-indexed
    const day = currentDate.getDate();

    return [year, month, day];
  }


  return (
    <>
      <Grid item xs={6} m={2}>
        <Card
          sx={{
            width: 320,
            height: 400,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
             
            },
          }}
          elevation={5}
        >
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
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                fontSize={22}
                fontFamily={"initial"}
                fontWeight={550}
                color={"#333333"}
              >
                {data.paddyVariety}
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
                data={data.bids}
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
