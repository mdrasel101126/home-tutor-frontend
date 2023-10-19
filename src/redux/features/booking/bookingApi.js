import { homeTutorApi } from "../../api/apiSlice";

const bookingApi = homeTutorApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteBooking"],
    }),
    postBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings/create-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addBooking"],
    }),
    getBookings: builder.query({
      query: () => "/bookings",
      providesTags: ["addBooking", "deleteBooking"],
    }),
  }),
});

export const {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  usePostBookingMutation,
} = bookingApi;
