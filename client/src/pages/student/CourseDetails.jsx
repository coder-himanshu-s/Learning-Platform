import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/ui/BuyCourseButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi.js";

const CourseDetails = () => {
  const [purchasedCourse, setPurchasedCourse] = useState(false);
  const { courseId } = useParams();
  const { data, isSuccess, isLoading, error } = useGetCourseDetailsWithStatusQuery(courseId);
  const course = data?.course;
  const purchased = data?.purchased;
  const updatedAt = course?.updatedAt;
  const navigate = useNavigate();
  const date = new Date(updatedAt);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  console.log(`from details page`);
  console.log(data);

  const handleContinueCourse = ()=>{
        if( purchased){
          navigate(`/course-progress/${courseId}`)
        }
  }

  return (
    <div className="mt-24">
      {/* Course Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle || "Course Title"}</h1>
          <p className="text-base md:text-lg">{course?.subTitle || "Course SubTitle"}</p>
          <p>
            Created By -{" "}
            <span className="text-[#C0C4FC] underline italic">{course?.creator?.name}</span>
          </p>
          <div className="flex items-center gap-2 text-md">
            <BadgeInfo size={16} />
            <p>Last updated: {formattedDate}</p>
          </div>
          <p>Students Enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section - Course Description */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">{course?.description || "This is course Description"}</p>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course?.lectures?.length || 0} Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {course?.lectures?.map((lecture, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{purchased ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
                  <p>{lecture?.lectureTitle || "Lecture Title"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Video and Purchase */}
        <div className="w-full lg:w-1/3 space-y-5">
          <Card className="w-full">
            <CardContent className="p-4 flex flex-col space-y-4">
              {/* Video Section */}
              <div className="w-full aspect-video bg-gray-300 rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" src={course?.lectures[0]?.videoUrl} controls></video>
              </div>

              {/* Title and Price Section */}
              <div className="flex flex-col items-center space-y-2">
                <h1 className="text-md font-medium text-center">{course?.lectures[0]?.lectureTitle || "Lecture Title"}</h1>
                <SelectSeparator className="my-2" />
                <h1 className="text-lg md:text-xl font-semibold text-center">{course?.coursePrice}</h1>
              </div>
            </CardContent>

            {/* Purchase Button */}
            <CardFooter className="flex justify-between p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">Start Learning</Button>
              ) : (
                <BuyCourseButton setPurchasedCourse={setPurchasedCourse} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
