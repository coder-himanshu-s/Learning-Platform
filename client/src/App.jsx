import { RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/Mylearning";
import Profile from "./pages/student/Profile";
import Dashboard from "./pages/admin/lecture/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetails from "./pages/student/CourseDetails";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "MyLearning",
        element: <MyLearning />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "course/search",
        element: <SearchPage />,
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "course-progress/:courseId",
        element: <CourseProgress />,
      },
      {
        path: "admin",
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/edit/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/edit/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/edit/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
