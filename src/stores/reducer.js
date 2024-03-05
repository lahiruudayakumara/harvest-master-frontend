// store.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const Reducer = combineReducers({
    auth: authReducer,
});

export default Reducer;

