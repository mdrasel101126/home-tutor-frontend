import { homeTutorApi } from "@/redux/api/apiSlice";

const userApi = homeTutorApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "users/create-customer",
        method: "POST",
        body: data,
      }),
    }),
    createTutor: builder.mutation({
      query: (data) => ({
        url: "users/create-tutor",
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
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => `/auth/profile`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
    providesTags: ["updateUser", "deleteUser"],
  }),
});

export const {
  useCreateCustomerMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateTutorMutation,
} = userApi;
