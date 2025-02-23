import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div>
      <div className="flex items-center justify-between mt-20 mb-5">
        <div className="flex items-center">
          <Link to={`/admin/course/edit/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl ml-2">Update your lecture</h1>
        </div>
      </div>
      <LectureTab></LectureTab>
    </div>
  );
};

export default EditLecture;
