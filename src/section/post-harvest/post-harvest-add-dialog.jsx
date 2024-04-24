import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PostHarvestForm } from "./post-harvest-form";
import { Box, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

export default function PostAddDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ffab00",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#e39e00",
            color: "white",
          },
        }}
        onClick={handleClickOpen}
      >
        Plan Harvest
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      maxWidth="md"
      >
        <DialogTitle>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <IconButton>
              <CloseRounded onClick={handleClose} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent >
          <PostHarvestForm />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
