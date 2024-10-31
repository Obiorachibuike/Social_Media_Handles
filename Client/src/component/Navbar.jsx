import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth()
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Dashboard</Link>
        </li>
        <li>
          <Link to="/program-control" className="text-white">Program Control</Link>
        </li>
        <li>
          <Link to="/country-operators" className="text-white">Country Operators</Link>
        </li>
        <li>
          {user ? <Link to="/login" className="text-white">Logout</Link> : <Link to="/login" className="text-white">Login</Link>}
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
