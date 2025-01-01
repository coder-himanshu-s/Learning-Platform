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
const appRouter = createBrowserRouter([
  {
      path:"/",
      element:<MainLayout/>,
      children:[
          {
              path:"/",
              element:(
              <>
                <HeroSection/>
                <Courses></Courses>
              </>
              ),
          },
          {
            path:"login",
            element:<Login></Login>
          },
          {
            path:"MyLearning",
            element:<MyLearning/>
          },
          {
            path:"Profile",
            element:<Profile/>
          }
      ]

  }
]);


function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
      

    </>
  )
}

export default App
