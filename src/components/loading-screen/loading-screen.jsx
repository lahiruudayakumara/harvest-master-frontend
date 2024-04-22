import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingScreen({ sx, ...other }) {
  return (
    <Box
      sx={{
        px: 5,
        width: '92%',
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        ...sx,
      }}
      {...other}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );
}

LoadingScreen.propTypes = {
  sx: PropTypes.object,
};
