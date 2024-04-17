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
    relatedAudit: {
      auditId: "",
      fuel: 0,
      harvesting_expense: 0,
      income: 0,
      no_bags: 0,
      num_harvesting: 0,
      quality_value: 0,
      transport_expense: 0,
      weight: 0,
    },

  
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
    setharvestAuditValues(state, action) {
      const { value } = action.payload;
      state.plandata.relatedAudit = value;
    },
  },
});

export const { updatePostHarvest, resetPostHarvest,setharvestAuditValues } = postHarvestSlice.actions;
export const selectPostHarvest = (state) => state.postHarvest;
export default postHarvestSlice.reducer;
