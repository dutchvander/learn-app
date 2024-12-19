import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootRedcuer";
import { authApi } from "@/feutures/api/authApi";
import { courseApi } from "@/feutures/api/courseApi";
export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
