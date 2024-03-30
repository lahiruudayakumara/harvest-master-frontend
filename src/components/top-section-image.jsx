import { Box, Typography } from "@mui/material";
import React from "react";

export const TopImage = ({ classname, title1,title2, children }) => {
  return (
    <Box
      className={classname}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="500px"
      backgroundSize="cover"
      backgroundPosition="center"
      color="black"
      marginTop="-80px"
      textAlign="center"
      flexDirection={"column"}
    >
      <Typography
        style={{ color: "darkgreen", width: "50%", fontWeight: "550" }}
        variant="h3"
      >
        {title1}
      </Typography>
      <Typography
        style={{ color: "white", width: "50%", fontWeight: "550" }}
        variant="h3"
      >
        {title2}
      </Typography>

      {children}
    </Box>
  );
};
