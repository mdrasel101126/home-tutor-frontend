import { configureStore } from "@reduxjs/toolkit";
import { homeTutorApi } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";
import filterReducer from "./features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    [homeTutorApi.reducerPath]: homeTutorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeTutorApi.middleware),
});
