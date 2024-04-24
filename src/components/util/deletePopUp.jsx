import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

export const DeletePopUp = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onDelete = async () => {
    try {
      await props.handleDelete(props.id);
      window.history.back();
    } catch (error) {
      console.error("Error deleting plan", error);
    }
  };

  return (
    <div>
      <React.Fragment>
        <Button variant="contained" color="error" onClick={handleOpenDialog}>
          Remove Plan
        </Button>

        {/* remove dialog box */}
        <Dialog open={handleOpenDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>{props.title}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button color="error" onClick={onDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};
