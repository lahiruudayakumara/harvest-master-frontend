import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";

export default function DeletePop(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    };
    
    const handleDelete = async () => {

        props.delete(props.id);
        setOpen(false);

     }

  return (
    <React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <Settings sx={{ fontSize: 32 }} />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
             
      >
        <DialogTitle id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent >
          <DialogContentText>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
