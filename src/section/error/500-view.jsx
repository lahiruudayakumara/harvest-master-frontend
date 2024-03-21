import { Box, Typography } from "@mui/material"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

const View500 = () => {
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
          <ReportProblemIcon sx={{ fontSize: 100, color: '#2CA019', marginBottom: 2 }} />
          <Typography variant="h4" gutterBottom>
            500 - Internal Server Error
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, something went wrong on our end.
          </Typography>
          <Typography variant="body1">
            Please check back later.
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

export default View500
