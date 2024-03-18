import { Button, ListItem, ListItemText } from "@mui/material";
import React from "react";

export const PostHarvestListItem = ({ data ,sx}) => {
  return (
    <>
      <ListItem
        sx={{
          backgroundColor: "lightblue",
          borderRadius: 1,
          mb: 1.5,
          width: "100%",...sx
        }}
      >
        <ListItemText sx={{ width: "30%",}}>
          Field Name : {data.fieldName}
        </ListItemText>
        <ListItemText sx={{ width: "20%" }}>
          Harvest Date : {data.harvestdate}
        </ListItemText>
        <ListItemText sx={{ width: "30%",}}>
          City : {data.location}
        </ListItemText>
        <Button variant="contained" color="primary">
          View More
        </Button>
      </ListItem>
    </>
  );
};
