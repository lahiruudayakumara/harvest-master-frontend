import { Box, List } from '@mui/material'
import React from 'react'
import { PostHarvestListItem } from './post-harvest-list-item';

export const PlanView = ({ allPlans,sx }) => {
  

  console.log(allPlans)
  return (
    <>
      <Box
        mt={4}
        sx={{
          width: "75%", 
          margin: "0 auto", 
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          ...sx
        }}
      >
        {/* mapping post harvest plans in to list items */}
        <List >
          {allPlans && allPlans.map((postplan) =>(
            < PostHarvestListItem key={postplan.fieldId} data={postplan}></PostHarvestListItem>
          ))}


        </List>
      </Box>
    </>
  );
}
