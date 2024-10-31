import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/login.css";
import { login } from '../utils/ApiService'; 
import { Circles } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const Login = () => {
  const { setAuth, loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      console.log(email,password)
      const response = await loginUser(email, password);
      console.log(response)
      
      const { token } = response; // Assuming response contains the token directly
      localStorage.setItem('jwtToken', token);
      setAuth(token);
      toast.success('Login successful!');
      navigate('/'); 
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      console.log(error)
      // Enhanced error logging and handling
      if (error.response) {
        // Log the full error response for debugging
        console.error('Backend Error Response:', error.response.data);

        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.response.status === 500) {
          errorMessage = error.response.data.message; // Use the message from the backend
        }
      } else {
        // If error.response is undefined, it may be a network error or another issue
        console.error('Error without response:', error);
      }

      toast.error(errorMessage);
      console.error('Login Error:', error); // Log the error for further debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login p-4 border border-gray-300 rounded-md form-cont">
      <form onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <div className="mb-2 auth-form-content">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
            disabled={loading} // Disable input when loading
          />
        </div>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        <div className="btn-cont">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? (
              <div className="flex items-center">
                <Circles height="20" width="20" color="#ffffff" ariaLabel="loading" />
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
