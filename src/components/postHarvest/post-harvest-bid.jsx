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
    <>
      <tr style={{ height:"65px" }}>
        <td style={{ textAlign: "center" }}>{bidData.buyer_name}</td>
        <td style={{ textAlign: "center" }}>{bidData.price}</td>{" "}
        <td style={{ textAlign: "center" }}>
          <FormBidAccept
            data={bidData}
            title="Place Your Bid"
            pricelabel="Enter  your bid amount:"
          ></FormBidAccept>
        </td>
      </tr>
    </>
  );
};

export default BidItem;
