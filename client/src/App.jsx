import { RouterProvider } from 'react-router';
import './App.css'
import Navbar from './components/ui/navbar';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import HeroSection from './pages/student/HeroSection';
import { createBrowserRouter } from 'react-router';
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/Mylearning';
import Profile from './pages/student/Profile';
import Sidebar from './pages/admin/lecture/Sidebar';
import Dashboard from './pages/admin/lecture/Dashboard';
import CourseTable from './pages/admin/course/CourseTable';
import AddCourse from './pages/admin/course/AddCourse';
import EditCourse from './pages/admin/course/EditCourse';
import CreateLecture from './pages/admin/lecture/CreateLecture';
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
            element: <AddCourse/>,
          },
          {
            path:"course/edit/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/edit/:courseId/lecture",
            element:<CreateLecture/>
          }
        ],
      },
    ],
  },
]);



function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
