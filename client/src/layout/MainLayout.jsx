import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/ui/navbar";
import Sidebar from "../pages/admin/lecture/Sidebar";

const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex">
      <Navbar />
      {isAdminRoute && <Sidebar />}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
