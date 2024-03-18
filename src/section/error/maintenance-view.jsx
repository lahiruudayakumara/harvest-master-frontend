import { Box, Typography } from "@mui/material"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MaintenanceView = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        height: '70vh',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <ErrorOutlineIcon sx={{ fontSize: 100, color: '#2CA019', marginBottom: 2 }} />
        <Typography variant="h4" gutterBottom>
          This page is currently undergoing maintenance
        </Typography>
        <Typography variant="body1" gutterBottom>
          We are working to improve your experience. We apologize for any inconvenience caused.
        </Typography>
        <Typography variant="body1">
          Please check back later.
        </Typography>
      </Box>
    </Box>
  )
}

export default MaintenanceView