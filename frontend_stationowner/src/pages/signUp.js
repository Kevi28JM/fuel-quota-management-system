import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/stationOwnerServices'; // Ensure the path is correct
import '../styles/Signup.css'; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // Build registration data according to the station_owner table schema
    const userData = {
      ownerName: name,
      email,
      phone,
      nic,
      password
    };

    try {
      const response = await registerUser(userData);
      setMessage(response.message || 'Registered successfully!');
    } catch (error) {
      setMessage(error.message || 'Registration failed.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h4>Sign Up - Station Owner</h4>
          </div>
          <div className="signup-body">
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-form-group">
                <label htmlFor="name" className="signup-form-label">
                  Owner Name
                </label>
                <input
                  type="text"
                  className="signup-form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="nic" className="signup-form-label">
                  NIC
                </label>
                <input
                  type="text"
                  className="signup-form-control"
                  id="nic"
                  value={nic}
                  onChange={(e) => setNIC(e.target.value)}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="email" className="signup-form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="signup-form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="phone" className="signup-form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="signup-form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="password" className="signup-form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="signup-form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="confirmPassword" className="signup-form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="signup-form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
            <div className="signup-footer">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
              <div className="signup-message">{message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;