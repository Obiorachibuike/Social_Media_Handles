import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component:Component}) => {
  const { user,} = useAuth; // Admin check in AuthContext
       console.log(Component);
      //  console.log(user);
       
  return user  ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
