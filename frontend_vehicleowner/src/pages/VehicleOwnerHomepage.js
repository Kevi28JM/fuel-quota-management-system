// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Welcome, Vehicle Owner</h2>
      <p>Please choose an option:</p>
      <button style={styles.button} onClick={() => navigate('/vehicle/register')}>
        Register a Vehicle
      </button>
      <button style={styles.button} onClick={() => navigate('/vehicle/showqr')}>
        View QR Code
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default HomePage;

