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

const BidItem = ({ buyer, bid, onDelete }) => {
  return (
    <ListItem>
      <ListItemText primary={buyer} sx={{ width: "55%" }} />
      <ListItemText primary={bid} sx={{ width: "24%" }} />
      <ListItemIcon>
        <IconButton onClick={onDelete}>
          <ArrowCircleRightRounded  sx={{ fontSize: 32 }}/>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default BidItem;
