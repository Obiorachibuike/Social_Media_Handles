import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';
import "../styles/login.css"
import { login } from '../utils/ApiService'; // Import the login function
import { Circles } from 'react-loader-spinner'; // Import a spinner component

const Register = () => {
  const { setAuth,loginUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Basic email validation function
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email before proceeding
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(email,password) // Use the login function
      const { token } = response;
      console.log(response);
      

      // Store the JWT securely
      localStorage.setItem('jwtToken', token);
      setAuth(token); // Set the auth token in context

      toast.success('Login successful!');
      navigate('/'); // Redirect to the dashboard after successful login
    } catch (error) {
      // User-friendly error handling
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response) {
        // Customize error messages based on the status code
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login p-4 border border-gray-300 rounded-md form-cont">
      <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <div className="mb-2 auth-form-content">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
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
          />
        </div>
        <p>Already have an account?<Link to="/login">Login</Link></p>
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

export default Register;
