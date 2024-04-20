import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  plandata: {
    area: "",
    farmer: "",
    fertilizerType: "",
    fieldId: "",
    fieldName: "",
    harvestDate: "",
    location: "",
    ownership: "",
    paddyVareity: "",
    plantedDate: "",
    regNo: "",
    

  
    split: "",
    status: null,
    type: "",
    zip: "",
  }
};


const postHarvestSlice = createSlice({
  name: "postHarvest",
  initialState,
  reducers: {
    updatePostHarvest(state, action) {
      return {
        ...state,
        plandata: {
          ...state.plandata,
          ...action.payload,
        },
      };
    },
    resetPostHarvest(state) {
      return initialState;
    },
    
  },
});

export const { updatePostHarvest, resetPostHarvest} = postHarvestSlice.actions;
export const selectPostHarvest = (state) => state.postHarvest;
export default postHarvestSlice.reducer;
