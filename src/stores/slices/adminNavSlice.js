import { createSlice } from '@reduxjs/toolkit';

export const adminNavSlice = createSlice({
    name: 'nav',
    initialState: {
        displayName: 'Dashboard'
    },

    reducers: {
        navClick: (state, action) => {
            state.displayName = action.payload.displayName;
        }
    }
});

export const { navClick } = adminNavSlice.actions;

export const selectNav = (state) => state.nav;

export default adminNavSlice.reducer;