import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import {
  ArrowCircleRightRounded,
  ArrowForwardIosTwoTone,
  ArrowForwardRounded,
  Delete,
} from "@mui/icons-material";
import FormBid from "../communityMarket/add-bid-form";
import FormBidAccept from "./post-harvest-bid-accept";

const BidItem = (props) => {

  const { bidData } = props;
  

  return (
    <ListItem>
      <ListItemText primary={bidData.buyer_name} sx={{ width: "55%" }} />
      <ListItemText primary={bidData.price} sx={{ width: "24%" }} /> 
      <ListItemIcon>
              
              <FormBidAccept
               
          data={bidData}
          
               
                title="Place Your Bid"
                pricelabel="Enter  your bid amount:"
                
              ></FormBidAccept> 
      </ListItemIcon>
    </ListItem>
  );
};

export default BidItem;
