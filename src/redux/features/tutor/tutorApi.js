import { homeTutorApi } from "../../api/apiSlice";

const tutorApi = homeTutorApi.injectEndpoints({
  endpoints: (builder) => ({
    updateTutor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tutors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateTutor"],
    }),
    loginTutor: builder.mutation({
      query: (data) => ({
        url: "/tutors/login-tutor",
        method: "POST",
        body: data,
      }),
    }),
    deleteTutor: builder.mutation({
      query: (id) => ({
        url: `/tutors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteTutor"],
    }),
    postTutor: builder.mutation({
      query: (data) => ({
        url: "/tutors/create-tutor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addTutor"],
    }),
    getTutors: builder.query({
      query: ({ searchTerm, preferedClasses, page, limit }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (preferedClasses) params.append("preferedClasses", preferedClasses);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return `/tutors/?${params.toString()}`;
      },
      providesTags: ["reviews", "addTutor", "deleteTutor", "updateTutor"],
    }),
    getSingleTutor: builder.query({
      query: (id) => `/tutors/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetTutorsQuery,
  useGetSingleTutorQuery,
  usePostTutorMutation,
  useUpdateTutorMutation,
  useDeleteTutorMutation,
  useLoginTutorMutation,
} = tutorApi;
