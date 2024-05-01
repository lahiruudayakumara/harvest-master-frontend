import { red } from "@mui/material/colors"
import { createSlice } from "@reduxjs/toolkit";





const initialState = {
    district: 'Any',
    loading: false,
    error: null,
}

export const mapSlice = createSlice({

    name: 'map',
    initialState,
    reducers: {
        setDistrict: (state, action) => {
            state.district = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }






})


export const { setDistrict, setLoading, setError } = mapSlice.actions;
export default mapSlice.reducer;
export const  selectMap = (state) => state.map;