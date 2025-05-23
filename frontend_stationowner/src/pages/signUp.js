import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/stationOwnerServices';
import '../styles/Signup.css';

const TwoStepRegister = () => {
  const [step, setStep] = useState(1);
  const [ownerData, setOwnerData] = useState({
    name: '',
    nic: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [stationData, setStationData] = useState({
    name: '',
    location: '',
    contact: '',
    capacity: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    if (ownerData.password !== ownerData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    localStorage.setItem('ownerData', JSON.stringify(ownerData));
    setMessage({ text: 'Owner information saved successfully!', type: 'success' });
    setTimeout(() => setStep(2), 1500);
  };

  const handleStationSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ text: '', type: '' });

  try {
    const storedOwnerData = JSON.parse(localStorage.getItem('ownerData'));
    if (!storedOwnerData) {
      setMessage({ text: 'Missing owner data. Please complete step 1 first.', type: 'error' });
      setIsLoading(false);
      return;
    }

    // Combine both owner and station data
    const combinedData = {
      owner: {
        name: storedOwnerData.name,
        email: storedOwnerData.email,
        phone: storedOwnerData.phone,
        nic: storedOwnerData.nic,
        password: storedOwnerData.password,
      },
      station: {
        name: stationData.name,
        location: stationData.location,
        contact: stationData.contact,
        capacity: stationData.capacity || 0,
      }
    };

    // Send combined data to a single endpoint
    const response = await registerUser(combinedData);

    setMessage({
      text: `Registration successful! ${response.message || ''}`,
      type: 'success'
    });

    localStorage.removeItem('ownerData');
    setStep(3);
  } catch (err) {
    setMessage({
      text: err.message || 'Registration failed. Please try again.',
      type: 'error'
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleBack = () => {
    setStep(1);
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Owner Details</div>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Station Details</div>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Complete</div>
          </div>
        </div>

        {step === 1 && (
          <div className="signup-card">
            <h2>Create Your Account</h2>
            <p className="subtitle">First, let's set up your owner information</p>
            
            <form onSubmit={handleOwnerSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={ownerData.name}
                  onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nic">NIC Number</label>
                <input
                  id="nic"
                  type="text"
                  placeholder="123456789V"
                  value={ownerData.nic}
                  onChange={(e) => setOwnerData({ ...ownerData, nic: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={ownerData.email}
                  onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+94 77 123 4567"
                  value={ownerData.phone}
                  onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={ownerData.password}
                  onChange={(e) => setOwnerData({ ...ownerData, password: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={ownerData.confirmPassword}
                  onChange={(e) => setOwnerData({ ...ownerData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              
              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <button type="submit" className="primary-btn">
                Continue to Station Details
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="signup-card">
            <h2>Station Information</h2>
            <p className="subtitle">Now, tell us about your charging station</p>
            
            <form onSubmit={handleStationSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="stationName">Station Name</label>
                <input
                  id="stationName"
                  type="text"
                  placeholder="EcoCharge Central"
                  value={stationData.name}
                  onChange={(e) => setStationData({ ...stationData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  placeholder="123 Main St, Colombo"
                  value={stationData.location}
                  onChange={(e) => setStationData({ ...stationData, location: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
                <input
                  id="contact"
                  type="text"
                  placeholder="+94 11 234 5678"
                  value={stationData.contact}
                  onChange={(e) => setStationData({ ...stationData, contact: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="capacity">Fuel Capacity (Liters)</label>
                <input
                  id="capacity"
                  type="number"
                  placeholder="e.g. 10"
                  value={stationData.capacity}
                  onChange={(e) => setStationData({ ...stationData, capacity: e.target.value })}
                  required
                />
              </div>
              
              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <div className="button-group">
                <button type="button" onClick={handleBack} className="secondary-btn">
                  Back
                </button>
                <button type="submit" className="primary-btn" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="signup-card success-card">
            <div className="success-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2>Registration Complete!</h2>
            <p className="success-message">
              Your account and station have been successfully registered.
            </p>
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
            <Link to="/login" className="primary-btn">
              Proceed to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoStepRegister;