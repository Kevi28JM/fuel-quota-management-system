import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authServices'; // Adjust path if needed
import '../styles/Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token, user, redirectPath } = await loginUser(email, password);

      // Save token to localStorage (or cookies)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the role-based portal
      navigate(redirectPath);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h4>Login - Station Owner</h4>
          </div>
          <div className="login-body">
            {error && <div className="login-alert">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email" className="login-form-label">Email address</label>
                <input
                  type="email"
                  className="login-form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label htmlFor="password" className="login-form-label">Password</label>
                <input
                  type="password"
                  className="login-form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;