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
import React, { useState } from "react";
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
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const isPublished = false;
  const isLoading = false;
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
            <Button variant="outline" className="mr-2">
              {isPublished ? "Unpublish" : "Publish"}
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
                placeholder="Ex. Developer"
                name="CourseTitle"
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
                <Select>
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
                        Docker & Kubernetes
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
                <Select>
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
              <Input type="file" accept="image/*" className="w-fit" />
            </div>
            <div>
              <Button variant="outline" >Cancel</Button>
              <Button>
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
