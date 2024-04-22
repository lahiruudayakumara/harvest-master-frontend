import React from "react";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

// eslint-disable-next-line react/prop-types
function FormHeader({ title, subTitle, onCancel }) {
  const handleCancelClick = () => {
    onCancel();
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          //   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ backgroundColor: "white" }}>
            <Box
              //   elevation={3}
              height={20}
              width={20}
              my={2.5}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={4}
              p={1.75}
              sx={{
                border: "2px solid white",
                borderRadius: "10%",
                backgroundColor: "white",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <AddToPhotosIcon sx={{ color: "green" }} />
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
              marginLeft: 30,
            }}
          >
            <Typography
              variant="h7"
              sx={{ color: "black", fontSize: "16px", fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Typography variant="p" sx={{ color: "gray", fontSize: "13px" }}>
              {subTitle}
            </Typography>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <IconButton onClick={handleCancelClick}>
            <CloseIcon
              sx={{
                color: "#EF9A9A",
                transition: "background-color 0.3s",
                "&:hover": {
                  color: "white",
                  backgroundColor: "red",
                },
              }}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default FormHeader;
