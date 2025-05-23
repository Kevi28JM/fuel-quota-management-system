import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Updated import to use the correct services file
import { registerUser } from '../services/vehicleOwnerServices';
import '../styles/Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNIC] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; 
  const nicRegex = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/; // Sri Lankan NIC format
  const passwordRegex = /^.{6,}$/; 

  if (!fullName.trim() || !email || !nic || !password || !confirmPassword) {
    setMessage('Please fill in all required fields.');
    return;
  }

  if (!emailRegex.test(email)) {
    setMessage('Invalid email format.');
    return;
  }

  if (phone && !phoneRegex.test(phone)) {
    setMessage('Phone number must be 10 digits.');
    return;
  }

  if (!nicRegex.test(nic)) {
    setMessage('Invalid NIC format.');
    return;
  }

  if (!passwordRegex.test(password)) {
    setMessage('Password must be at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    setMessage('Passwords do not match.');
    return;
  }

  const role = 'vehicleOwner';
  const userData = { fullName, email, phone, nic, password, role };

  try {
    setLoading(true);
    const response = await registerUser(userData);
    setMessage(response.message || 'Registered successfully!');
  } catch (error) {
    setMessage(error.message || 'Registration failed.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h4>Sign Up - Vehicle Owner</h4>
          </div>
          <div className="signup-body">
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-form-group">
                <label htmlFor="fullName" className="signup-form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="signup-form-control"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                <label htmlFor="nic" className="signup-form-label">
                  NIC Number
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
              <button type="submit" className="signup-btn" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <div className="signup-footer">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
              {message && <div className="signup-message">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;