import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bids: [],
};

export const bidSlice = createSlice({
  name: "bids",
  initialState,
    reducers: {
        setBidsList:(state, action) =>{
            
            state.bids = action.payload;
            
        },
        removeBid:(state, action)=> {
            
            state.bids = state.bids.filter(

                (bid)=>bid.bidid !== action.payload
            )
        }
  },
});


export const { setBidsList, removeBid } = bidSlice.actions;
export const selectBid = (state) => state.bids;
export default bidSlice.reducer;