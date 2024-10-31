import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../styles/Login.css'; // Import the CSS file for styling

function Login() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [images, setImages] = useState(null);
  const [error, setError] = useState(""); // State for error messages

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (!name.trim()) {
      setError("Full Name is required.");
      return;
    }

    if (!handle.trim()) {
      setError("Social Media Handle is required.");
      return;
    }

    // Regex for validating social media handle
    const handleRegex = /^@[A-Za-z0-9_.]{2,14}$/;
    if (!handleRegex.test(handle)) {
      setError("Social Media Handle must start with '@' and contain 2-14 valid characters.");
      return;
    }

    if (!images || images.length === 0) {
      setError("At least one image file is required.");
      return;
    }

    // Validate file types (optional)
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    for (let i = 0; i < images.length; i++) {
      if (!validTypes.includes(images[i].type)) {
        setError("Only image files (JPEG, PNG, GIF) are allowed.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("handle", handle);

    // Append each selected image file to the formData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    login(formData)
      .catch(err => setError("Login failed. Please try again.")); // Handle login errors
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Social Media Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="input-field"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="input-field"
          multiple
          accept="image/*"
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
