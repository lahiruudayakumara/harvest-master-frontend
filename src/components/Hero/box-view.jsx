import React from "react";
import { Box, Button, Paper, Typography, ThemeProvider,createTheme } from "@mui/material";


export const BoxView = (props) => {
  const theme = createTheme({

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white", // Set the text color for buttons
            backgroundColor: "#2CA019", // Set the background color for buttons
            "&:hover": {
              backgroundColor: "#0F601F", // Change background color on hover
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#2CA019", // Set the color for icons
            "&:hover": {
              color: "#0F601F", // Change color on hover
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}> 
    <Paper style={{ width: "100%", height: "85%",marginBottom:"5px",padding:"10px"}} elevation={5} className={props.className}>
      <Box
       
        bgcolor="transparent"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        marginTop={5}
        flex={1}
        
        width="100%" // Set width to 100% to match parent
        height="80%" // Set height to 100% to match parent
      >
        <Box style={{ width: "100%" }} color={"white"} zIndex={5}>
          <Typography
            variant="h6"
            fontWeight={600}
            style={{ width: "100%", textAlign: "center", marginBottom: "10px" }}
            overflow={"hidden"}
          >
            {props.topic}
          </Typography>
          <Typography
            variant="body1"
            style={{ width: "100%", textAlign: "center" }}
            overflow={"hidden"}
          >
            {props.content}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={props.click}>
          {props.button}
        </Button>
      </Box>
    </Paper></ThemeProvider>
  );
};