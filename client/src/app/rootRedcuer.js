import { combineReducers } from "@reduxjs/toolkit";

import authReduer from "../feutures/authSlice";
import { authApi } from "@/feutures/api/authApi";
import { courseApi } from "@/feutures/api/courseApi";

const rootRedcuer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,

  auth: authReduer,
});
export default rootRedcuer;
