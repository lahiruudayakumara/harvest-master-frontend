import { Grid, Typography, Box} from '@mui/material'
import React from 'react'

const Faq = () => {
  return (
    <><Box
    style={{ width: "80%", marginTop: "25px", marginBottom: "25px" }}
  >
    <Typography variant="h5" gutterBottom>
      Topic
    </Typography>

    <Grid container spacing={2} p={3}>
      {/* First Grid Item */}
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>FAQ 1</Typography>
          </Grid>
          {/* Repeat for Text Area 2, 3, and 4 */}
        </Grid>
      </Grid>

      {/* Second Grid Item */}
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>FAQ 1</Typography>
          </Grid>
          {/* Repeat for Text Area 6, 7, and 8 */}
        </Grid>
      </Grid>
    </Grid>
  </Box></>
  )
}

export default Faq
