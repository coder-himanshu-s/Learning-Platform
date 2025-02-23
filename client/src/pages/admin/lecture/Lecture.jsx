import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`/admin/course/edit/${courseId}/lecture/${lecture._id}`);
  };
  return (
    <div className=" mt-5 flex items-center justify-between bg-[#F7F9FA] dark:bf-[#1F1F1F] px-4 rounded my-5">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture-{index+1}: {lecture.lectureTitle}
      </h1>
      <Edit
        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-800"
        size={20}
        onClick={goToUpdateLecture}
      ></Edit>
    </div>
  );
};

export default Lecture;
