import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { updateQuantity, updateTotalAmount } from 'src/stores/slices/cartSlice';


const EditIconButton = styled(IconButton)({
    color:'#2CA019',
    marginRight:20,
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
})

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(props.quantity)
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responce = await axios.patch(`http://localhost:8091/api/harvestMaster/cart/${props.id}` ,{quantity})
    console.log(responce.data)
    dispatch(updateQuantity(responce.data))
    const total = props.price * (quantity - props.quantity);
    dispatch(updateTotalAmount(total))
    handleClose();
  }

  return (
    <React.Fragment>
      <EditIconButton title="Edit quantity" onClick={handleClickOpen}>
        <EditOutlinedIcon/>
      </EditIconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Change Quantity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new quantity for this item.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm Change</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}