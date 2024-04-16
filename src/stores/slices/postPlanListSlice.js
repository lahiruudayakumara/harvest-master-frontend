import { createSlice } from "@reduxjs/toolkit";




const initialState = {

    postPlans: [],
    selectedFieldid:null

}


export const postPlanListSlice = createSlice({

    name: 'postPlanList',
    initialState,
    reducers: {
        setPostPlans: (state, action) => {
            state.postPlans = action.payload;
        },
        addPostPlan: (state, action) => {
            state.postPlans.push(action.payload);
        },
        updatePostPlan: (state, action) => {
            const index = state.postPlans.findIndex((postPlan) => postPlan.id === action.payload.id);
            if (index !== -1) {
                state.postPlans[index] = action.payload;
            }
        },
        updateSelectedFieldid: (state, action) => {
            state.selectedFieldid = action.payload;
        },
        removePostPlan: (state, action) => {
            state.postPlans = state.postPlans.filter((postPlan) => postPlan.id !== action.payload);
        },
    },



})

export const { setPostPlans, addPostPlan, updatePostPlan, removePostPlan,updateSelectedFieldid } = postPlanListSlice.actions;
export const selectPostPlans = (state) => state.postPlanList;
export default postPlanListSlice.reducer;
