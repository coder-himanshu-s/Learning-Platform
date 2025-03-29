import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import Course from "../Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfiePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isSuccess,
      isError,
      error,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData.message || "Profile Updated");
    }
    if (isError) {
      console.log(error);
      toast.error(error.message || "Failed to update User ");
    }
  }, [error, updateUserData, isSuccess, isError]);
  // console.log(data);
  const enrolledCourses = [1, 2, 3, 4];
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfiePhoto(file);
  };

  // console.log(` this is photourl ${data.user.photoUrl}`)
  // console.log(data);
  const updateUserHandler = async () => {
    //  console.log(name, profilePhoto);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const user = data && data.user;
  // console.log('from profilw')
  console.log(user);
  return (
    <div className="max-w-4xl mx-auto px-4 my-20">
      <h1 className="font-bold text-2xl text-center md:text-left">
        {" "}
        This is my profile{" "}
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32  mb-4 rounded-full">
            {/* src="https://github.com/shadcn.png"  */}
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-799 dark:text-gray-300">
                {user.name}
              </span>
            </h1>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-799 dark:text-gray-300">
                {user.email}
              </span>
            </h1>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-799 dark:text-gray-300">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make Changes to your profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gird-cols-4 items-center gap-4">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  ></input>
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <label>Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="col-span-3"
                  ></input>
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="fonr-medium text-lg">Courses you are enrolled in</h1>
        <div className="grid grid-cols-1 dm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledCourses.length === 0 ? (
            <p>You have not enrolled in any courses</p>
          ) : (
            user.enrolledCourses.map((course) => <Course key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
