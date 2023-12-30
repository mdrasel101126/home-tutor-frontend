import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegistration: build.mutation({
      query: (loginData) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userOwnProfile: build.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.booking],
    }),
    allUserByAdmin: build.query({
      query: (data) => ({
        url: `${USER_URL}/get-all-users`,
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes.user, tagTypes.booking],
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `${USER_URL}/single-user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.booking],
    }),
    updateUserByAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUsersOwnProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUsersProfileByAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changeRole: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-role/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userChangePassword: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PATCH",
        data: data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegistrationMutation,
  useUserOwnProfileQuery,
  useAllUserByAdminQuery,
  useUpdateUsersProfileByAdminMutation,
  useChangeRoleMutation,
  useUpdateUsersOwnProfileMutation,
  useUserChangePasswordMutation,
  useGetSingleUserQuery,
  useUpdateUserByAdminMutation,
} = userApi;
