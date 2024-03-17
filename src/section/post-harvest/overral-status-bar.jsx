import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export const OverallStatus = ({ status }) => {
  return (
    <>
      <List
        sx={{
          width: "75%",
          margin: "0 auto",
        }}
      >
        <ListItem
          sx={{
            backgroundColor: "lightgray",
            borderRadius: 1,
            mb: 1.5,
            height: 100,
            textAlign: "center",
          }}
          style={{ fontWeight: "bold" }}
        >
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>DISTRICTS</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>{status}</ListItemText>
            <ListItemText>ACTIVE FIELDS</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>HECTARES</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>RICE VARIETIES</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>Expected HARVEST (Kg)</ListItemText>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
