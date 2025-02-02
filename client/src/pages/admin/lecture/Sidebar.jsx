import { ChartBar, SquareLibrary } from "lucide-react"; // 'ChartNoAxesColumn' doesn't exist, using 'ChartBar' instead
import React from "react";
import { Link, Outlet } from "react-router-dom"; // Fix import from "react-router" to "react-router-dom"

const Sidebar = () => {
  return (
  
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen">
        <div className=" mt-16 space-y-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <ChartBar size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="/admin/course" className="flex items-center space-x-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
     
  
  );
};

export default Sidebar;
