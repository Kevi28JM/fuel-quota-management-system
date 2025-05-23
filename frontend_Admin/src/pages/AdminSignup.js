import React, { useState } from 'react';
import '../styles/AdminSignup.css';
import { adminSignup } from '../services/adminService';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim() || !formData.secretKey.trim()) {
      setError('All fields are required and must not be empty');
      setSuccess('');
      return;
    }

    if (!usernameRegex.test(formData.username)) {
      setError('Username must be at least 3 characters and contain only letters, numbers, or underscores');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await adminSignup(formData);
      setSuccess(response.message || 'Signup successful!');
      setError('');
      console.log('Admin Signup Response:', response);
    } catch (err) {
      setError(err.message || 'Signup failed');
      setSuccess('');
    } finally {
      setLoading(false);
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
            <label htmlFor="confirmPassword" className="admin-form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
