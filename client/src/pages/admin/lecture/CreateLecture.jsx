import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const CreateLecture = () => {
  const params = useParams();
  const { courseId } = params;
  const [lectureTitle, setLectureTitle] = useState("");
  const isLoading = false;
  const navigate = useNavigate();
  const createLectureHandler = async()=>{
    
  }
  return (
    <div className="flex-1 mx-10 mt-16">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add lectures to your course.</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit ea
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <br></br>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div>
          <Button onClick={() => navigate(`/admin/course/edit/${courseId}`)}>
            Back to Course
          </Button>
          <Button
            className="ml-2"
            disabled={isLoading}
            onClick={createLectureHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
