import { PropTypes } from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { deletePayment } from 'src/api/financialManagerApi';
import { deleteDraftPayment } from 'src/stores/slices/paymentSlice';
import { useDispatch } from 'react-redux';

function RefundRejectMsgBox({open, onClose, deleteId}) {
    const dispatch = useDispatch();

  const confirmDeleteHandler = () => {
    deletePayment(deleteId)
    .then((response) => {
        dispatch(deleteDraftPayment(deleteId));
    })
    .catch((error) => {
        console.error('Error deleting draft payment:', error);
    });
    onClose();
  }
  return (

    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Delete Draft Payment</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this Draft Payment?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={confirmDeleteHandler}
          style={{ color: "#FF0000" }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>


  )
}

export default DraftPaymentDeleteMsgBox;

DraftPaymentDeleteMsgBox.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    deleteId: PropTypes.number,
};
