import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Loader, Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({
      courseTitle,
      category,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 mt-16">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, addd some basic course details for your new course
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit ea
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <br></br>
          <input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="html">HTML & CSS</SelectItem>
                <SelectItem value="js">JavaScript</SelectItem>
                <SelectItem value="react">React.js</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="express">Express.js</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="ml">Machine Learning</SelectItem>
                <SelectItem value="dl">Deep Learning</SelectItem>
                <SelectItem value="ds">Data Science</SelectItem>
                <SelectItem value="r">R Programming</SelectItem>
                <SelectItem value="sql">SQL & Databases</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="golang">Golang</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="linux">Linux Administration</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="security">Cybersecurity</SelectItem>
                <SelectItem value="docker">Docker & Kubernetes</SelectItem>
                <SelectItem value="cloud">Cloud Computing</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
                <SelectItem value="dsalgo">
                  Data Structures & Algorithms
                </SelectItem>
                <SelectItem value="blockchain">
                  Blockchain Development
                </SelectItem>
                <SelectItem value="game">Game Development</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={() => navigate(`/admin/course`)}>Back</Button>
          <Button
            className="ml-2"
            disabled={isLoading}
            onClick={createCourseHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
