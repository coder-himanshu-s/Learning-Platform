import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useLazyPublishCourseQuery,
  
} from "@/features/api/courseApi";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const {
    data: courseByIdData,
    isLoading: courseByIdIsLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: course.courseThumbnail,
      });
    }
  }, [courseByIdData]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, isError }] =
    useEditCourseMutation();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (e) => {
    setInput({ ...input, category: e.target.value });
  };
  const selectCourseLevel = (e) => {
    setInput({ ...input, courseLevel: e.target.value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const [publishCourse, {}] = useLazyPublishCourseQuery();
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse( {courseId, query: action} );
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Updated Successfully");
      refetch();
      navigate("/admin/course");
    }
    if (isError) {
      toast.error(data?.message || "Failed to update course");
    }
  }, [isSuccess, isError]);

  if (courseByIdIsLoading) {
    return <Loader2 className="h-4 w-4 animate-spin">Please Wait</Loader2>;
  }
  return (
    <div>
      <Card className="mt-4">
        <CardHeader className="flex flex-row justify-between ">
          <div className="flex-col">
            <CardTitle>Basic Course Details</CardTitle>
            <CardDescription>
              Make changes to your course here.Click save when you are done.
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Button
              disabled={courseByIdData?.course.lectures.length === 0}
              variant="outline"
              onClick={() =>
                publishStatusHandler(
                  courseByIdData?.course.isPublished ? "false" : "true"
                )
              }
            >
              {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
            </Button>
            <Button>Remove Course </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label className="">Title</Label>
              <Input
                type="text"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="Ex.Developer"
                name="courseTitle"
              />
            </div>
            <div>
              <Label className="">SubTitle</Label>
              <Input
                type="text"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Ex. AI Engineer"
                name="subTitle"
              />
            </div>
            <div>
              <Label className="">Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, category: value })
                  }
                  value={input.category}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
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
                      <SelectItem value="linux">
                        Linux Administration
                      </SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="security">Cybersecurity</SelectItem>
                      <SelectItem value="docker">
                        Docker & Kubettnetes
                      </SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel></SelectLabel>
                      <SelectItem value="ai">
                        Artificial Intelligence
                      </SelectItem>
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
                <Label>Coure Level</Label>
                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, courseLevel: value })
                  }
                  value={input.courseLevel}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price </Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="199"
                  className="fit"
                />
              </div>
            </div>
            <div>
              <Label>Course THumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit"
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Course Thumbnail"
                  className="w-20 h-20"
                />
              )}
            </div>
            <div>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/course")}
              >
                Cancel
              </Button>
              <Button onClick={updateCourseHandler} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin">
                      Please Wait
                    </Loader2>
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
