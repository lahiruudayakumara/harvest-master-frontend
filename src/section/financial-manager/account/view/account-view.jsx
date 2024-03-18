import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, TableCell, TableRow, Typography } from '@mui/material';
import TranstractionTable from '../transtraction-table';
import AcountViewBox from '../acount-view-box';
import ActivityTable from '../activity-table';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#07bc0c',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: 'bold'
}));

const AccountView = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Item>
              <Typography variant="h6" style={{ color: '#1F7012', fontWeight: 'bolder' }}>Total Balance</Typography>
              <Typography variant="h4" marginY={3} style={{ color: '#FFAB00', fontWeight: 'bold' }} >Rs. 105,989.86</Typography>
              <Box>
                <Typography variant="body1" fontWeight={"bold"}>1234 1254 1452 4526</Typography>
                <Typography variant="body1" fontWeight={"bold"}>Harvest Master (Pyt) Ltd.</Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">Calender</Typography>
          </Grid>
        </Grid>

        <AcountViewBox />

        <Grid container marginTop={1} spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" marginBottom={1} style={{ color: '#07bc0c', fontWeight: 'bolder' }}>Recent Transtraction</Typography>
            <TranstractionTable />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" marginBottom={1} style={{ color: '#07bc0c', fontWeight: 'bolder' }}>Activity</Typography>
            <ActivityTable />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AccountView