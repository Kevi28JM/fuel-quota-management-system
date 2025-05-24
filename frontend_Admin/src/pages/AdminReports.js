// AdminReports.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReports = () => {
  const [reports, setReports] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/reports');
      setReports(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>System Reports</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Vehicles</h3>
          <p style={styles.reportNumber}>{reports.totalVehicles || 0}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Fuel Stations</h3>
          <p style={styles.reportNumber}>{reports.totalStations || 0}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Fuel Dispensed (Litres)</h3>
          <p style={styles.reportNumber}>{reports.totalFuelDispensed || 0}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: 'auto',
    padding: '40px 20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
    minHeight: '80vh',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '40px',
    color: '#2d3748',
    letterSpacing: '1px',
  },
  error: {
    color: 'red',
    fontWeight: 600,
    marginBottom: '20px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  card: {
    background: 'white',
    padding: '40px 30px',
    borderRadius: '16px',
    width: '300px',
    minHeight: '200px',
    boxShadow: '0 4px 24px 0 rgba(60, 72, 88, 0.10)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e2e8f0',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '24px',
    letterSpacing: '0.5px',
  },
  reportNumber: {
    fontSize: '4.5rem', // Larger for emphasis
    fontWeight: 900,
    color: '#1d4ed8',
    margin: 0,
    letterSpacing: '2px',
    textShadow: '0 4px 16px rgba(37,99,235,0.12)',
    lineHeight: 1.1,
    marginTop: '10px',
    marginBottom: '10px',
  },
};

export default AdminReports;