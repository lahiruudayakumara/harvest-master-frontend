import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export const OverallStatus = () => {
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
            <ListItemText>testw</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>testw</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>testw</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>testw</ListItemText>
          </ListItemText>
          <ListItemText>
            <ListItemText>testw</ListItemText>
            <ListItemText>testw</ListItemText>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
