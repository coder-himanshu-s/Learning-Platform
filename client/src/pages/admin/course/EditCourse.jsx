import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import CourseTab from "./CourseTab";

const EditCourse = () => {
  const navigate = useNavigate();
  const params = useParams();
   const {courseId} = params;
  // console.log(courseId);
  return (
    <div className="flex-1 mt-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add detail regarding course</h1>
        <Link>
          <Button onClick={() => navigate(`/admin/course/edit/${courseId}/lecture`)} variant="outline" className="text-sm hover:bg-gray-400">Go to lectures page</Button>
        </Link>
      </div>
      <CourseTab>
      
      </CourseTab>
    </div>
  );
};

export default EditCourse;
