import React, { useState } from 'react';
import { registerStation } from '../services/stationService'; // Adjust the path as necessary
import '../styles/StationRegister.css';

const StationRegister = () => {
  const [stationData, setStationData] = useState({
    name: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setStationData({ ...stationData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone); // Fixed the regex syntax

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validatePhoneNumber(stationData.contact)) {
      setMessage('Please enter a valid contact number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerStation(stationData);
      setMessage(res.message);
      setStationData({
        name: '',
        location: '',
        contact: ''
      });
    } catch (err) {
      setMessage(err.message || 'Error registering station');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stationRegister-page">
    <div className="container-stationRegister">
      <h2>Fuel Station Registration</h2>
      {message && (
        <p className={message.includes('Error') ? 'errorMessage' : 'successMessage'}>{message}</p>
      )}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Station Name"
          value={stationData.name}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={stationData.location}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={stationData.contact}
          onChange={handleChange}
          className="input"
          required
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Station'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default StationRegister;