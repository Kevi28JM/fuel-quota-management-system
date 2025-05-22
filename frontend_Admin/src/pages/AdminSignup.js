import React, { useState } from 'react';
import '../styles/AdminSignup.css'; // Import the CSS file
import { adminSignup } from '../services/authServices'; // Import the service function

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    secretKey: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminSignup(formData); // Call the service function
      setSuccess('Signup successful!');
      setError('');
      console.log('Admin Signup Response:', response);
    } catch (err) {
      setError(err.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div className="admin-signup-page">
      <div className="admin-signup-container">
        <h2 className="admin-signup-title">Admin Signup</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="admin-signup-form">
          <div className="admin-form-group">
            <label htmlFor="username" className="admin-form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="admin-form-control"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="email" className="admin-form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="admin-form-control"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password" className="admin-form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="admin-form-control"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="secretKey" className="admin-form-label">Secret Key</label>
            <input
              type="password"
              id="secretKey"
              name="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
              required
              className="admin-form-control"
            />
          </div>
          <button type="submit" className="admin-btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;