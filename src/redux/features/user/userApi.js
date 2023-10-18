import { homeTutorApi } from "@/redux/api/apiSlice";

const userApi = homeTutorApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login-user",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => `/users/profile`,
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation, useGetUserQuery } =
  userApi;
