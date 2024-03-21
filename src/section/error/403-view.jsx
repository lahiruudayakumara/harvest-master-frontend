import { Box, Typography } from "@mui/material"
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

const View403 = () => {
  return (
    <>
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
          <BlockIcon sx={{ fontSize: 100, color: '#2CA019', marginBottom: 2 }} />
          <Typography variant="h4" gutterBottom>
            403 - Forbidden
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, you don't have permission to access this page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#2CA019", marginTop: "25px" }}
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Back
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default View403
