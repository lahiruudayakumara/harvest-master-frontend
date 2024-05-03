import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Height } from "@mui/icons-material";

function ListItem(props) {


  const handleRemove = () => {

    // Replace 'your-api-endpoint' with the actual endpoint provided by your API
    axios
      .delete(`http://localhost:8080/support/delete/${props.r_Id}`)
      .then((response) => {
        // Handle successful removal (e.g., show a success message)
        console.log("Item removed successfully");
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Error removing item:", error);
      });
  };
  return (
    <Paper
      style={{ width: "100%", borderRadius: "5px", marginBottom: "40px" }}
      elevation={3}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          width: "100%", // Ensure Box takes full width
          gap: 3,
          padding: 3,
        }}
        justifyContent={"space-between"}
        height={210}
        m={2}
      >
        <Typography variant="h6" style={{ marginBottom: "25px" }}>
          Topic : {props.topic}
        </Typography>

        <Box display={"flex"} pr={4} gap={1}>
          <Typography variant="h6" style={{ marginBottom: "25px" }}>
            Description:
          </Typography>
          <Typography
            variant="body1"
            style={{ marginBottom: "15px", marginTop: "5px" }}
          >
            {props.description}
          </Typography>
        </Box>
        <Box display={"flex"} pr={4} gap={1}>
          <Typography variant="h6" style={{ marginBottom: "25px" }}>
            Solution:
          </Typography>
          <Typography
            variant="body1"
            style={{ marginBottom: "15px", marginTop: "5px" }}
          >
            {props.solution}
          </Typography>
        </Box>

        <Box display={"flex"} pr={4} gap={1}>
          
          {/* <Button
            variant="contained"
            color="primary"
            style={{ alignSelf: "flex-start" }}
            onClick={handleRemove}
          >
            Remove
          </Button> */}
        </Box>
      </Box>
    </Paper>
  );
}

export default ListItem;
