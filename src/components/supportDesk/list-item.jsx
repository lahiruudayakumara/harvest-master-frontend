import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Height } from "@mui/icons-material";
import axios from "axios";
import UpdateDialog from "./support-issue-popup";

function ListItem(props) {


 

  const handleRemove = () => {

    // Replace 'your-api-endpoint' with the actual endpoint provided by your API
    axios
      .delete(`http://localhost:8080/support/delete/${props.id}`)
      .then((response) => {
        // Handle successful removal (e.g., show a success message)
        console.log("Item removed successfully");
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Error removing item:", error);
      });
  };
  const handleUpdate = () => {

    // Replace 'your-api-endpoint' with the actual endpoint provided by your API
    axios
      .delete(`http://localhost:8080/support/delete/${props.id}`)
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
      elevation={15}
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
       <Box display={"flex"} gap={1}>
  <Typography variant="h5" sx={{ color: 'green' }}>Topic :</Typography>
  <Typography variant="body1"> {props.topic}</Typography>
</Box>

        <Box display={"flex"} pr={4} gap={1}>
          <Typography variant="h5" style={{ marginBottom: "25px" }} sx={{ color: 'green' }}>
            Description :
          </Typography>
          <Typography
            variant="body1"
            style={{ marginBottom: "15px", marginTop: "5px" }}
          >
            {props.description}
          </Typography>
        </Box>



{props.solution ? (
  <Box display={"flex"} pr={4} gap={1}>
    <Typography variant="h5" style={{ marginBottom: "25px" }} sx={{ color: 'green' }}>
      Solution :
    </Typography>
    <Typography
      variant="body1"
      style={{ marginBottom: "15px", marginTop: "5px" }}
    >
      {props.solution}
    </Typography>
  </Box>
) : <Box display={"flex"} pr={4} gap={1}>
<Typography variant="h5" style={{ marginBottom: "25px" }} sx={{ color: 'green' }}>
  Solution :
</Typography>
<Typography
  variant="body1"
  style={{ marginBottom: "15px", marginTop: "5px" }}
>
  Not answered yet
</Typography>
</Box>}


        <Box display={"flex"} pr={4} gap={1}>
          


{props.solution ? (
null
) :   <Box display={"flex"} gap={2}>
<UpdateDialog topic={props.topic} issue={props.description} id={props.id} />
                  <Button
                  variant="contained"
                  sx={{backgroundColor:"#008000"}}
                  
                  onClick={handleRemove}
                >
                  Remove
                </Button>
                </Box>}

        </Box>
      </Box>
    </Paper>
  );
}

export default ListItem;
