import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedback";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    getFeedbacks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${FEEDBACK_URL}`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.feedback],
    }),
  }),
});

export const { useGetFeedbacksQuery, usePostFeedbackMutation } = feedbackApi;
