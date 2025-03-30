import { School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DarkMode from "@/pages/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, Navigate, useNavigate } from "react-router";
import MyLearning from "@/pages/student/Mylearning";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async (req, res) => {
    await logoutUser();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "logout successful");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className=" max-w-7xl mx-auto hidden md:flex justify-between items-center gap-5 h-full">
        <div className="flex items-center gap-2 ">
          <School size={"30"} />
          <Link to={"/"}>
            <h1 className="hidden md:block font-extrabold text-2xl">
              E learning
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="Profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="MyLearning">My Learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.role === "instructor" && (
                      <>
                        <DropdownMenuItem>
                          <Link to={"/admin/dashboard"}>Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button onClick={() => navigate("/login")}>Sign Up</Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>
      </div>
      <div className=" md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E Learning</h1>
        <MobileNavBar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavBar = ({ user }) => {
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async (req, res) => {
    await logoutUser();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          {/* <Menu/> */}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flexrow items-center justify-between mt-2">
          <SheetTitle>E Learning</SheetTitle>
          <DarkMode></DarkMode>
        </SheetHeader>
        <Separator className="mt-2" />
        <nav className="flex flex-col space-y-4">
          <Link to='/myLearning'>
            My Learning
          </Link>
          <Link to='/Profile'>
            Edit Profile
          </Link>
          <Link onClick={logoutHandler}>Log Out</Link>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                DashBoard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
