// StationRegister.js

import React, { useState } from 'react';
import axios from 'axios';

const StationRegister = () => {
  const [stationData, setStationData] = useState({
    stationName: '',
    ownerName: '',
    licenseNumber: '',
    location: '',
    contactNumber: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStationData({ ...stationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/station/register', stationData);
      setMessage(res.data.message);
      setStationData({
        stationName: '',
        ownerName: '',
        licenseNumber: '',
        location: '',
        contactNumber: ''
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Error registering station');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Fuel Station Registration</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="stationName"
          placeholder="Station Name"
          value={stationData.stationName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={stationData.ownerName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={stationData.licenseNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={stationData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={stationData.contactNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Register Station</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    background: '#fff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  message: {
    color: 'green',
    marginBottom: '10px'
  }
};

export default StationRegister;
