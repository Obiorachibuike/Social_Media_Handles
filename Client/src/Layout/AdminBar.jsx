import React from 'react'
import { Link } from 'react-router-dom'

function AdminBar() {
  return (
    <div>
       <div className="w-64 h-screen bg-gray-100">
      <div className="p-4 nav">
        <Link to="/admin/dashboard" className="block p-2">Dashboard</Link>
        <Link to="/admin/students" className="block p-2">Students</Link>
        <Link to="/admin/teachers" className="block p-2">Teachers</Link>
        <Link to="/admin/attendance" className="block p-2">Attendance</Link>
      </div>
    </div>
    </div>
  )
}

export default AdminBar