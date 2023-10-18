import { configureStore } from "@reduxjs/toolkit";
import { homeTutorApi } from "./api/apiSlice";
import tutorReducer from "./features/tutor/tutorSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    tutor: tutorReducer,
    user: userReducer,
    [homeTutorApi.reducerPath]: homeTutorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeTutorApi.middleware),
});
