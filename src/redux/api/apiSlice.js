import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const homeTutorApi = createApi({
  reducerPath: "homeTutorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.accessToken;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "reviews",
    "addTutor",
    "deleteTutor",
    "updateTutor",
    "addBooking",
    "deleteBooking",
  ],
  endpoints: () => ({}),
});
