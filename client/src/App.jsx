import { RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
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
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ui/ProtectedRoutes";
import Sidebar from "./pages/admin/lecture/Sidebar";
import PurchaseCourseProtectedRoute from "./components/ui/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ui/ThemeProvider";
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
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        children: [
          {
            path: "dashboard",
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: "course",
            element: (
              <AdminRoute>
                <CourseTable />
              </AdminRoute>
            ),
          },
          {
            path: "course/create",
            element: (
              <AdminRoute>
                <AddCourse />
              </AdminRoute>
            ),
          },
          {
            path: "course/edit/:courseId",
            element: (
              <AdminRoute>
                <EditCourse />
              </AdminRoute>
            ),
          },
          {
            path: "course/edit/:courseId/lecture",
            element: (
              <AdminRoute>
                <CreateLecture />
              </AdminRoute>
            ),
          },
          {
            path: "course/edit/:courseId/lecture/:lectureId",
            element: (
              <AdminRoute>
                <EditLecture />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;
