import React from 'react'
import Navbar from '../component/NavBar'
import Sidebar from '../component/SideBar'
import { Outlet } from 'react-router-dom';

function UserLayout({children}) {
    console.log(children);
    
  return (
    <div>
        <div className="app_component flex">
            <div className="left-side-cont">
                <div className="left-side-content">
        <Sidebar />

                </div>
            </div>
            <div className="right-side-cont">
                <div className="right-side-content">
        <Navbar />

<Outlet />
        {children}

        </div>
        </div>
        </div>
        .
    </div>
  )
}

export default UserLayout