import { Box, Button, Typography } from "@mui/material";
import GppBadIcon from '@mui/icons-material/GppBad';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

const handleGoBack = () => {
  window.history.back();
};

const NotFoundView = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          height: '100vh',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <GppBadIcon sx={{ fontSize: 100, color: '#2CA019', marginBottom: 2 }} />
          <Typography variant="h4" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, the page you are looking for could not be found.
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
  );
};

export default NotFoundView;
