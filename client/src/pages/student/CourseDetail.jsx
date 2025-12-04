import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;
  console.log(purchased);

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          {course?.subTitle && (
            <p className="text-base md:text-lg text-gray-200">{course.subTitle}</p>
          )}
          <p>
            Created By{' '}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name || "Unknown"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>
              Last updated{' '}
              {course?.updatedAt
                ? new Date(course.updatedAt).toLocaleDateString()
                : course?.createdAt
                ? new Date(course.createdAt).toLocaleDateString()
                : '—'}
            </p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white mb-3">Description</h1>
            <div
              className="text-sm text-gray-800 dark:text-gray-100 description-content font-medium"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Course Content</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.length ? (
                course.lectures.map((lecture, idx) => (
                  <div key={lecture._id || idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span>
                      <PlayCircle size={14} />
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm muted">No lectures yet</p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                {course?.lectures && course.lectures.length > 0 && course.lectures[0].videoUrl ? (
                  <ReactPlayer
                    width="100%"
                    height={"100%"}
                    url={course.lectures[0].videoUrl}
                    controls={true}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">No preview available</div>
                )}
              </div>
              <h1 className="text-gray-900 dark:text-white">{course?.lectures && course.lectures[0] ? course.lectures[0].lectureTitle : 'Lecture preview'}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
