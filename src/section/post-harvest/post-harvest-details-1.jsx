import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { PostHarvestTypo } from "../../components/postHarvest/post-harvest-typo";
import FormDialog from "../../components/postHarvest/popup-form";
import { addPaddyStock, deletePostHarvestPlan, updatePaddyStock } from "../../api/postHarvestApi";
import { useDispatch, useSelector } from "react-redux";
import { setPaddyStocks } from "src/stores/slices/paddyStockSlice";
import { selectPostHarvest } from "src/stores/slices/postharvestPlanSlice";
import DeletePop from "src/components/util/delete-popup";
import PostUpdateDialog from "./post-harvest-update-dialog";

export const Details1 = (props) => {


  
  console.log(props.planData);
  console.log("prop audit id",props.auditId);
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



  const deletePlan = async (id) => { 

    console.log("delete plan",id);
    const response = await deletePostHarvestPlan(id);
    if (response.status === 200) {
      window.history.back();
    }
  
  }


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
        const res = await addPaddyStock(props.auditId, paddyStock);
          
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
                height={"270px"}
                width={"100%"}
                className="postplanDetails"
                sx={{
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  backgroundImage: props.stock.image
                    ? `url("data:image/jpeg;base64,${props.stock.image}")`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
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
              mt={-2}
              mb={2}
            >
              <Typography variant="h5" justifyContent={"center"}>
                PaddyField Details
              </Typography>
              <Box flex="0" display={"flex"}>
                <PostUpdateDialog
                  updatedata={props.planData}
                ></PostUpdateDialog>
                <DeletePop
                  id={props.planData.fieldId}
                  delete={deletePlan}
                  title={"Delete Plan"}
                  text={
                    "Are you sure you want to delete this plan? This action would remove the paddystock if available and also any bids related to that."
                  }
                ></DeletePop>
              </Box>
            </Box>

            <>
              <div className="general-info">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Location</strong>
                      </td>
                      <td>{props.planData.location}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Field Area (Acres)</strong>
                      </td>
                      <td>{props.planData.area}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Rice Variety:</strong>
                      </td>
                      <td>{props.planData.paddyVareity}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Fertilizer</strong>
                      </td>
                      <td>{props.planData.fertilizerType}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Planting Date:</strong>
                      </td>
                      <td>
                        {plandata.harvestDate === null
                          ? "Not Planted Yet"
                          : plandata.harvestDate}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          </Grid>

          {/* popup form */}
          <Grid
            mt={5}
            item
            xs={12}
            justifyContent={"right"}
            style={{ position: "absolute", bottom: -50, left: 26, width: 1000 }}
          >
            <FormDialog
              formData={paddyStock}
              setformData={setPaddyStock}
              onSubmit={handleSubmit}
              variety={plandata.paddyVareity}
              fert={plandata.fertilizerType}
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
