import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100">
      <div className="p-4 nav">
        <Link to="/dashboard" className="block p-2">Dashboard</Link>
        <Link to="/students" className="block p-2">Students</Link>
        <Link to="/teachers" className="block p-2">Teachers</Link>
        <Link to="/attendance" className="block p-2">Attendance</Link>
      </div>
    </div>
  );
}

export default Sidebar;
