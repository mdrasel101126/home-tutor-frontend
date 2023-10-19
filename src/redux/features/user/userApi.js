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
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateUser"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteUser"],
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
    getAllUser: builder.query({
      query: () => `/users`,
    }),
    providesTags: ["updateUser", "deleteUser"],
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
