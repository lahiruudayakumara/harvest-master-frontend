import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { PostHarvestTypo } from "../../components/postHarvest/post-harvest-typo";
import FormDialog from "../../components/postHarvest/popup-form";
import { addPaddyStock } from "../../api/postHarvestApi";

export const Details1 = ({ planData }) => {
  const [paddyStock, setPaddyStock] = useState({
    postharvest_id: "null",
    ps_id: " ",
    price: "",
    amount: "",
    status: "active",
  });

  // passing the harvestId so that foreign key is supplied
  useEffect(() => {
    console.log(planData);
    setPaddyStock((prevState) => ({
      ...prevState,
      postharvest_id: planData.fieldId,
    }));
  }, [planData]);

  const handleSubmit = async (e) => {
    try {
      const res = await addPaddyStock(planData.fieldId, paddyStock);
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
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
              width={"100%"}
              mt={1}
            >
              <Box height={"220px"} width={"90%"} className="postplanDetails"borderRadius={1.5}></Box>
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
                content={"Location : " + planData.location}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Type of paddy :" + planData.paddyVareity}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Fertilizer Type  :" + planData.fertilizerType}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Harvesting period : " + planData.harvestDate}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Area of cultivation :  : " + planData.area}
              ></PostHarvestTypo>
              <PostHarvestTypo
                content={"Harvest Split Method : " + planData.split}
              ></PostHarvestTypo>
            </>
          </Grid>
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
              title="Add To Community Market"
              pricelabel="Starting price"
            ></FormDialog>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
