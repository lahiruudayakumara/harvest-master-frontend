import { Box, Grid, Typography } from '@mui/material'
import CallMadeIcon from '@mui/icons-material/CallMade';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

const AcountViewBox = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container marginTop={1} spacing={2}>

                <Grid item xs={12} md={4}>
                    <Box padding={2} boxShadow={2} borderRadius={2}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#07bc0c' }}>
                            <CallMadeIcon fontSize="small" />
                            <Typography variant="h6" style={{ marginLeft: '8px', fontSize: '16px', fontWeight: 'bold' }}>Send</Typography>
                        </div>
                        <Typography variant="h6" marginY={2} style={{ color: '#FFAB00', fontWeight: 'bold', fontSize: '18px' }} >Rs. 245,000.00</Typography>
                        <Typography variant="h6" style={{ fontSize: '12px' }}>This Month</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box padding={2} boxShadow={2} borderRadius={2}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#07bc0c' }}>
                            <CallReceivedIcon fontSize="small" />
                            <Typography variant="h6" style={{ marginLeft: '8px', fontSize: '16px', fontWeight: 'bold' }}>Receive</Typography>
                        </div>
                        <Typography variant="h6" marginY={2} style={{ color: '#FFAB00', fontWeight: 'bold', fontSize: '18px' }} >Rs. 825,000.00</Typography>
                        <Typography variant="h6" style={{ fontSize: '12px' }}>This Month</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Box padding={2} boxShadow={2} borderRadius={2}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#07bc0c' }}>
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="h6" style={{ marginLeft: '8px', fontSize: '16px', fontWeight: 'bold' }}>Waiting</Typography>
                        </div>
                        <Typography variant="h6" marginY={2} style={{ color: '#FFAB00', fontWeight: 'bold', fontSize: '18px' }} >Rs. 125,000.00</Typography>
                        <Typography variant="h6" style={{ fontSize: '12px' }}>This Month</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Box padding={2} boxShadow={2} borderRadius={2}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#07bc0c' }}>
                            <InfoIcon fontSize="small" />
                            <Typography variant="h6" style={{ marginLeft: '8px', fontSize: '16px', fontWeight: 'bold' }}>Failed</Typography>
                        </div>
                        <Typography variant="h6" marginY={2} style={{ color: '#FFAB00', fontWeight: 'bold', fontSize: '18px' }} >Rs. 0.00</Typography>
                        <Typography variant="h6" style={{ fontSize: '12px' }}>This Month</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}

export default AcountViewBox