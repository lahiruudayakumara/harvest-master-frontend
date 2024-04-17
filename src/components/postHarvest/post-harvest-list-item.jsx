import { Button, ListItem, ListItemText } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectPostPlans, updateSelectedFieldid } from "src/stores/slices/postPlanListSlice";
import convertToStandardDate from "src/utilities/dateConversions";

export const PostHarvestListItem = ({ data, sx }) => {
  const dispatch = useDispatch();

  const handleFieldId = useCallback((fieldId) => { 

    dispatch(updateSelectedFieldid(fieldId));
  
  },[dispatch])



  return (
    <>
      <ListItem
        sx={{
          backgroundColor: "lightblue",
          borderRadius: 1,
          mb: 1.5,
          width: "100%",...sx
        }}
      >
        <ListItemText sx={{ width: "30%",}}>
          Field Name : {data.fieldName}
        </ListItemText>
        <ListItemText sx={{ width: "20%" }}>
          Harvest Date : {convertToStandardDate(data.plantedDate)}
        </ListItemText>
        <ListItemText sx={{ width: "30%",}}>
          City : {data.location}
        </ListItemText>
        <Link to={`/postharvestdetail/${data.fieldId}`}  ><Button variant="contained" color="primary" >
          View More
        </Button></Link>
      </ListItem>
    </>
  );
};
