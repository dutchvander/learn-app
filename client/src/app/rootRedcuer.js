import { combineReducers } from "@reduxjs/toolkit";

import authReduer from "../feutures/authSlice";
import { authApi } from "@/feutures/api/authApi";
import { courseApi } from "@/feutures/api/courseApi";
import { purchaseApi } from "@/feutures/api/purchaseApi";
import { courseProgressApi } from "@/feutures/api/courseProgressApi";

const rootRedcuer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,

  auth: authReduer,
});
export default rootRedcuer;
