// StationLogs.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/station/logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch logs.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Fuel Pumping Logs</h2>

      {error && <p style={styles.error}>{error}</p>}

      {logs.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Vehicle Plate</th>
              <th>Pumped Litres</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.vehiclePlate}</td>
                <td>{log.pumpedLitres} L</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No logs found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default StationLogs;
