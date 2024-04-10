import { Box, Typography } from '@mui/material'
import Grid from "@mui/material/Grid";
import PendingOrderTable from '../pending-order-table'
import PendingPaymentVerifyTable from '../pending-payment-verify'

const PendingOrderView = () => {

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            marginBottom={1}
            style={{ color: "#07bc0c", fontWeight: "bolder" }}
          >
            Pending Orders
          </Typography>
          <PendingOrderTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            marginBottom={1}
            style={{ color: "#07bc0c", fontWeight: "bolder" }}
          >
            Pending Payment Verify
          </Typography>
          <PendingPaymentVerifyTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default PendingOrderView