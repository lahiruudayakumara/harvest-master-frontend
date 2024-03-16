import { Box, Typography } from "@mui/material";
import React from "react";

export const TopImage = ({ image, title }) => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("postharvest_form_hero.png")',
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="300px"
      src="./postharvest_form_hero.png"
      backgroundSize="cover"
      backgroundPosition="center"
      color="black"
      textAlign="center"
      
    >
      <Typography style={{ color: "black" }} variant="h2">
        {title}
      </Typography>
    </Box>
  );
};
