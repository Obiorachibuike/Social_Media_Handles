import React from 'react'
import Navbar from '../component/NavBar'

import AdminNavbar from '../component/AdminNavbar'
import { Outlet } from 'react-router-dom';
import AdminBar from './AdminBar';

function AdminLayout({children}) {
    console.log(children);
    
  return (
    <div>
        <div className="app_component flex">
            <div className="left-side-cont">
                <div className="left-side-content">
        <AdminBar />

                </div>
            </div>
            <div className="right-side-cont">
                <div className="right-side-content">
        <AdminNavbar />

<Outlet />
        {children}

        </div>
        </div>
        </div>
        .
    </div>
  )
}

export default AdminLayout