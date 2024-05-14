import { Box, Typography } from '@mui/material'
import Grid from "@mui/material/Grid";
import LogActivityTable from '../log-activity-table';
import { fetchLogActivity, selectLogActivity } from 'src/stores/slices/pendingOrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLogActivity } from 'src/api/logisticHandlerApi';

const plandata2 = {
    date: "2024-02-19",
    time: "10:00 AM",
    detail: "Delivered to the customer",
    cart_id: "CART-001",
}

const LogActivityView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getLogActivity().then((data) => {
            dispatch(fetchLogActivity(data));
        });
    }, [dispatch]);

    const rows = useSelector(selectLogActivity);

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