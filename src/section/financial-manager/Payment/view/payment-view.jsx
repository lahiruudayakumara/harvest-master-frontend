import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send';

import { NewPaymentForm } from '../new-payment-form';

import { useBoolean } from 'src/hooks/use-boolean';

const PaymentView = () => {

  const quickEdit = useBoolean();

  return (
    <Box flexGrow={1} >
      <Button
        onClick={quickEdit.onTrue}
        style={{ backgroundColor: '#2CA019'}}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Payment
      </Button>

      <NewPaymentForm open={quickEdit.value} onClose={quickEdit.onFalse}/>
      
      <Box 
        boxShadow={2} 
        marginTop={2}
        padding={2}
        borderRadius={2}
        minHeight='70vh'
        >
        <Typography
              variant="h6"
              marginBottom={1}
              style={{ color: "#07bc0c", fontWeight: "bolder" }}
            >
              Draft Payment
          </Typography>
      </Box>
    </Box>
  )
}

export default PaymentView
