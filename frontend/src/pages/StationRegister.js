import React, { useState } from 'react';
import {registerStation} from '../services/stationService'; // Adjust the path as necessary

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

  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

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
    <div style={styles.container}>
      <h2>Fuel Station Registration</h2>
      {message && (
        <p style={message.includes('Error') ? styles.errorMessage : styles.successMessage}>{message}</p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Station Name"
          value={stationData.name}
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
          name="contact"
          placeholder="Contact Number"
          value={stationData.contact}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Station'}
        </button>
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
  successMessage: {
    color: 'green',
    marginBottom: '10px'
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px'
  }
};

export default StationRegister;
