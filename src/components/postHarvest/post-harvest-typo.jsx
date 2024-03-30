import { Typography } from '@mui/material';
import React from 'react'

export const PostHarvestTypo = ({content}) => {
    return (
      <>
        <Typography
          variant="body1"
          component="div"
          style={{
           
            
            marginLeft: "15px",
              marginRight: "15px",
            marginBottom:"5px"
          }}
        >
          {content}
        </Typography>
      </>
    );
}
