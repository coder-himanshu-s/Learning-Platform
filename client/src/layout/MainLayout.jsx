import Navbar from '@/components/ui/navbar'
import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet>

        </Outlet>
      </div>
    </div>
  )
}

export default MainLayout