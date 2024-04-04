import { Box, Typography } from '@mui/material'
import Grid from "@mui/material/Grid";
import LogActivityTable from '../log-activity-table';

const LogActivityView = () => {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container marginTop={1} spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h6"
                        marginBottom={1}
                        style={{ color: "#07bc0c", fontWeight: "bolder" }}
                    >
                        Log Activity
                    </Typography>
                    <LogActivityTable />
                </Grid>
            </Grid>
        </Box>
    )
}

export default LogActivityView