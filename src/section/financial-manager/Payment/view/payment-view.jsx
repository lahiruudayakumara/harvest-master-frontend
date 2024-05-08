import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DraftPaymentTable from '../draft-payment-table'

import { NewPaymentForm } from '../new-payment-form';

import { useBoolean } from 'src/hooks/use-boolean';

const PaymentView = () => {

  const quickEdit = useBoolean();

  return (
    <Box flexGrow={1} >
      <Button
        onClick={quickEdit.onTrue}
        style={{ backgroundColor: '#2CA019' }}
        variant="contained"
      >
        Payment 
        <SendRoundedIcon />
      </Button>

      <NewPaymentForm open={quickEdit.value} onClose={quickEdit.onFalse} />

      <Typography
        variant="h6"
        marginY={2}
        style={{ color: "#07bc0c", fontWeight: "bolder" }}
      >
        Draft Payment
      </Typography>

      <DraftPaymentTable />
    </Box>
  )
}

export default PaymentView
