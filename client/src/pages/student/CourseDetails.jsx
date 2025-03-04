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
import React from "react";

const CourseDetails = () => {
  const purchasedCourse = false;
  return (
    <div className="mt-24">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg"> Course SubTitle</p>
          <p>
            Created By-{" "}
            <span className="text-[#C0C4FC] underline italic">Sharma</span>
          </p>
          <div className="flex items-center gap-2 text-md">
            <BadgeInfo size={16} />
            <p>Last updated: 02 03 2025</p>
          </div>
          <p>Students Enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">This is course Description</p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>Lecture Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3 space-y-5">
          <Card className="w-full">
            <CardContent className="p-4 flex flex-col ">
              <div className="w-full aspect-video h-36 bg-gray-300 rounded-lg">
                this is video React player video
              </div>
              <h1>Lecture Title</h1>
              <SelectSeparator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
             {
                purchasedCourse ? (
                  <Button className="w-full">Start Learning</Button>
                ) : (
                  <BuyCourseButton />
                )
             }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
