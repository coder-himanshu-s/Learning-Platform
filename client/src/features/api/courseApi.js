import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "course",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    creatorCourse: builder.query({
      query: () => ({
        url: "/creator-course",
        method: "GET",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    editCourse: builder.mutation({
      query: ({formData,courseId}) => ({
        url: `/course/${courseId}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useCreatorCourseQuery,
  useEditCourseMutation,
} = courseApi;
