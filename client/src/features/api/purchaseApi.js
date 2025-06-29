import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API =import.meta.env.VITE_API_URL || "http://localhost:8080";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${COURSE_PURCHASE_API}`,
    credentials: "include",  // ✅ This allows cookies (sessions) to be sent
  }),
  endpoints: (builder) => ({
    getCourseDetailsWithStatus: builder.query({
      query: (courseId) => `/api/course/${courseId}/detail-complete`,
    }),

    getAllPurchasedCourse: builder.query({
      query: () => `/api/course/allPurchased`,
    }),
  }),
});

export const {
  useGetCourseDetailsWithStatusQuery,
  useGetAllPurchasedCourseQuery,
} = purchaseApi;
