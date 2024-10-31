import React, { useState } from 'react';
import axios from 'axios';

const base_url = 'http://your_api_base_url_here'; // Replace with your actual API base URL

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role can be changed
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(`${base_url}/api/register`, {
        name,
        email,
        password,
        role,
        class: className, // Use className to avoid naming conflicts with the reserved word 'class'
      });
      
      setSuccess('Registration successful! Please log in.'); // Set success message
      setError(''); // Clear any previous errors
      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setRole('student');
      setClassName('');
      
    } catch (error) {
      console.error(error);
      setError('Error registering. Please try again later.'); // Set error message
      setSuccess(''); // Clear success message
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select 
            id="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required 
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="class">Class (optional):</label>
          <input 
            type="text" 
            id="class" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
