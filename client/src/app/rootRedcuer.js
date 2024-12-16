import { combineReducers } from "@reduxjs/toolkit";
 
import authReduer from "../feutures/authSlice";
import { authApi } from "@/feutures/api/authApi";

const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    
    auth:authReduer
});
export default rootRedcuer;