// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login } from "../utils/ApiService";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Check localStorage for existing token on initial render
    return localStorage.getItem("jwtToken") || null;
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    login();
    if (authToken) {
      localStorage.setItem("jwtToken", authToken);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [authToken]);

  const loginUser = async (email, password) => {
    
  
    const response = await login({ email, password });
    console.log(email,password)
    if (response.success == false ) {
      console.log(response.message);
      return response.message
    }else{
      
      setUser(response.data);
      console.log(response);
      console.log(response.data);
      return response.data;
    }
    }

  const logout = async () => {
    setUser(null);
  };

  const setAuth = (token) => {
    setAuthToken(token);
  };

  const clearAuth = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setAuth, clearAuth, loginUser, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext for use in other components
export { AuthContext };
