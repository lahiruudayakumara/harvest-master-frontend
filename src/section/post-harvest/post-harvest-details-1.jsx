import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { PostHarvestTypo } from "../../components/postHarvest/post-harvest-typo";
import FormDialog from "../../components/postHarvest/popup-form";
import { addPaddyStock, updatePaddyStock } from "../../api/postHarvestApi";
import { useDispatch, useSelector } from "react-redux";
import { setPaddyStocks } from "src/stores/slices/paddyStockSlice";
import { selectPostHarvest } from "src/stores/slices/postharvestPlanSlice";

export const Details1 = (props) => {

  console.log(props.planData);
  const dispatch = useDispatch();
  const { plandata} = useSelector(selectPostHarvest)
 
  
  const [paddyStock, setPaddyStock] = useState({
    postharvest_id: "null",
    ps_id: null,
    imagefile: null,
    price: "",
    amount: "",
    status: "active",
  });


  // passing the harvestId so that foreign key is supplied






  useEffect(() => {
    if (props.stock) {
      
      if (props.stock.image!=null) {
    
      
        setPaddyStock((prevState) => ({
          ...prevState,
          ps_id: props.stock.ps_id,
          imagefile: props.stock.image,
          price: props.stock.price,
          amount: props.stock.amount,
        }));

      }
    }

    else if(props.planData!=null) {
       console.log(props.stock);
       setPaddyStock((prevState) => ({
         ...prevState,
         postharvest_id: props.planData.fieldId,
       }));
        

    }
  }, [props.stock,props.planData]);

  const handleSubmit = async (e) => {
    try {

      if (paddyStock.ps_id !== null) {
        
        const res = await updatePaddyStock(paddyStock.ps_id, paddyStock);
        dispatch(setPaddyStocks(res));

      } else {
        const res = await addPaddyStock(props.planData.fieldId, paddyStock);
          
          dispatch(setPaddyStocks(res));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          height: 600,
          borderRadius: 4,
          bgcolor: "primary.main",
        }}
      >
        <Grid container spacing={2} position={"relative"}>
          <Grid item xs={12} flex flexDirection={"column"}>
            <Box display="flex" flexDirection={"column"} width={"100%"}>
              <Box
                marginTop={-2}
                height={"220px"}
                width={"100%"}
                className="postplanDetails"
                sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
              ></Box>
            </Box>
          </Grid>

          <Grid item xs={12} m={1.5}>
            {/* field details */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={"baseline"}
              p={1}
            >
              <Typography variant="h5" justifyContent={"center"}>
                PaddyField Details
              </Typography>
              <Box flex="0">
                <IconButton>
                  <Settings sx={{ fontSize: 32 }} />
                </IconButton>
              </Box>
            </Box>

            <>
              <PostHarvestTypo
                content={"Location : " + props.planData.location}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Type of paddy :" + props.planData.paddyVareity}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Fertilizer Type  :" + props.planData.fertilizerType}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Harvesting period : " + (plandata?.harvestDate? (plandata.harvestDate):" Loading...")}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Area of cultivation : " + props.planData.area}
              ></PostHarvestTypo>
            </>
          </Grid>


          {/* popup form */}
          <Grid
            item
            xs={12}
            justifyContent={"right"}
            style={{ position: "absolute", bottom: -50, left: 26 }}
          >
            <FormDialog
              formData={paddyStock}
              setformData={setPaddyStock}
              onSubmit={handleSubmit}
              title={
                paddyStock.ps_id === null ? "Add To Market" : "Update Stock"
              }
              pricelabel="Starting price"
            ></FormDialog>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
