import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useBoolean } from 'src/hooks/use-boolean';
import RefundViewTable from '../refund-table';

const PaymentView = () => {

  const quickEdit = useBoolean();

  return (
    <Box flexGrow={1} >
      <RefundViewTable />
    </Box>
  )
}

export default PaymentView
