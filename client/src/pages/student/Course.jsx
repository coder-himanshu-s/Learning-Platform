import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray=800 bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          className="w-full h-36 object-cover rounded-t-lg"
          alt="Course"
        />
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold-text-lg truncate">
            Next.js Complete Course
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1>John Wticher</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2">
                Advance
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹499</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Course;
