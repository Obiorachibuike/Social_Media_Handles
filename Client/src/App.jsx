import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard.jsx';
import ProgramControl from './component/ProgramControl.jsx';
import CountryOperatorManagement from './component/CountryOperatorManagement.jsx';
import Login from './component/LoginPage.jsx';
import Navbar from './component/Navbar.jsx'; // Import the Navbar
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth
import PrivateRoute from './component/PrivateRoute.jsx'; // Import the PrivateRoute component
import Register from './component/Register.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes /> {/* Manage routes and Navbar here */}
      </Router>
    </AuthProvider>
  );
};

const AuthRoutes = () => {
  const { user } = useAuth(); // Get authToken from context
  //  console.log(authToken)
  return (
    <>
      {user && <Navbar />};
       {/* // Render Navbar only if authenticated */}
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} /> {/* Public route */}
          <Route path="/register" element={<Register />} /> {/* Public route */}
          {/* <Route path="/" element={<PrivateRoute component={Dashboard} />} /> */}
          <Route path="/program-control" element={<PrivateRoute component={ProgramControl} />} />
          <Route path="/country-operators" element={<PrivateRoute component={CountryOperatorManagement} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
