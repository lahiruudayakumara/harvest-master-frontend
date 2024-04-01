import { Box } from '@mui/material'
import PendingOrderTable from '../pending-order-table'

const PendingOrderView = () => {
  return (
    <Box flexGrow={1} >
      <PendingOrderTable />
    </Box>
  )
}

export default PendingOrderView