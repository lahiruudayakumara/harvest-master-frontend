import { Box, List } from '@mui/material'
import React from 'react'
import { PostHarvestListItem } from './post-harvest-list-item';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostPlans } from 'src/stores/slices/postPlanListSlice';

export const PlanView = ({sx }) => {
  
  const dispatch = useDispatch();
 const {postPlans } = useSelector(selectPostPlans);
  console.log(postPlans)
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
          {postPlans && postPlans.map((postplan) =>(
            < PostHarvestListItem key={postplan.fieldId} data={postplan}></PostHarvestListItem>
          ))}


        </List>
      </Box>
    </>
  );
}
