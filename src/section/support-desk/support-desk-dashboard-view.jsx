import React from 'react'
import SupportTableView from './support-table'
import { Grid, Paper } from '@mui/material'

const SupportDeskDashboard = () => {
  return (
<>


<Grid container style={{ height: '87vh' }}>
      <Grid item xs={12} style={{ height: '25%', width: '100%' }}>
        <Grid container style={{ height: '100%', width: '100%' }}>
          <Grid item xs={4} style={{ height: '100%', width: '100%' }}>
          <Paper elevation={3} sx={{width:"95%",height:"90%"}}>

          </Paper>
          </Grid>
          <Grid item xs={4} style={{ height: '100%', width: '100%' }}>
          <Paper elevation={3} sx={{width:"95%",height:"90%"}}>

</Paper>
          </Grid>
          <Grid item xs={4} style={{ height: '100%', width: '100%' }}>
          <Paper elevation={3} sx={{width:"95%",height:"90%"}}>

</Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ height: '74%', width: '100%',marginTop:1 }}>
        <Grid container style={{ height: '100%', width: '100%' }}>
          <Grid item xs={8} sx={{paddingRight:2.5}}>
           <SupportTableView ></SupportTableView>
          </Grid>
          <Grid item xs={4} >
           <Paper elevation={3} sx={{width:"95%",height:"100%"}}></Paper>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>


</>
  )
}

export default SupportDeskDashboard
