import { Box } from '@mui/material'
import ManageOrderTable from '../manage-order-table'

const ManageOrderView = () => {
  return (
    <Box flexGrow={1} >
        <ManageOrderTable />
    </Box>
  )
}

export default ManageOrderView