import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <div className="mt-8 space-y-4">
        <Link to="/students" className="block p-4 bg-gray-200">Manage Students</Link>
        <Link to="/teachers" className="block p-4 bg-gray-200">Manage Teachers</Link>
        <Link to="/attendance" className="block p-4 bg-gray-200">Manage Attendance</Link>
      </div>
    </div>
  );
}

export default UserDashboard;
