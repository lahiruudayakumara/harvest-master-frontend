

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 auditData:{}
};

const postharvestAuditSlice = createSlice({
  name: "postHarvestAudit",
  initialState,
  reducers: {
    setAuditDataValues(state, action) {
     state.auditData = action.payload;
        },
      
    
  },
});

export const { setAuditDataValues } = postharvestAuditSlice.actions;
export const selectPostHarvestAudit = (state) => state.postHarvestAudit;
export default postharvestAuditSlice.reducer;
