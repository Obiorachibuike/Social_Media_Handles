import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="w-full p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between">
        <h1>School Management System</h1>
        <button onClick={logout} className="p-2 bg-red-500">Logout</button>
      </div>
    </div>
  );
}

export default AdminNavbar;
