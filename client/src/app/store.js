import { configureStore } from '@reduxjs/toolkit';

import authReducer from "../feutures/authSlice";
import rootRedcuer from './rootRedcuer';
import { authApi } from '@/feutures/api/authApi';
export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
});
