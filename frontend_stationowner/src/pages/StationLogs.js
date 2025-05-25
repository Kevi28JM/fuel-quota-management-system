import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assumes stationId is available from here
import { getStationLogs } from '../services/stationLogService'; 

const StationLogs = () => {
  const { stationId } = useAuth(); // Correct: stationId directly available
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (stationId) {
      fetchLogs(stationId);
    }
  }, [stationId]); // Watch for changes in stationId

  const fetchLogs = async (id) => {
    try {
      const res = await getStationLogs(id); 
      setLogs(res);
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
              <th>Operator</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.vehicleNumber}</td>
                <td>{log.amount} L</td>
                <td>{log.operatorName}</td>
                <td>{new Date(log.transaction_date).toLocaleString()}</td>
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
    maxWidth: '900px',
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
};

export default StationLogs;
