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
      const res = await axios.get('http://localhost:5000/admin/reports');
      setReports(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>System Reports</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Vehicles</h3>
          <p>{reports.totalVehicles || 0}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Fuel Stations</h3>
          <p>{reports.totalStations || 0}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Fuel Dispensed (Litres)</h3>
          <p>{reports.totalFuelDispensed || 0}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: '20px',
    margin: '10px',
    borderRadius: '10px',
    width: '250px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  },
};

export default AdminReports;
