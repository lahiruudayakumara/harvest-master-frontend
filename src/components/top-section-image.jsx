import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import React from "react";

export const TopImage = ({ classname, title1, title2, children }) => {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#F6C034",
      },
    },
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
    <Box
      className={classname}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="630px"
      backgroundSize="cover"
      backgroundPosition="center"
      color="black"
      marginTop="-80px"
      textAlign="center"
      flexDirection={"column"}
      marginBottom={"40px"}
    >
      <Typography
        style={{ color: "darkgreen", width: "50%", fontWeight: "550" ,marginBottom:"60px"}}
        variant="h3"
      >
        {title1}
      </Typography>
      <Typography
        style={{ color: "white", width: "50%", fontWeight: "550" ,marginBottom:"30px"}}
        variant="h3"
      >
        {title2}
      </Typography>

      {children}
      </Box>
    </ThemeProvider>
  );
};
