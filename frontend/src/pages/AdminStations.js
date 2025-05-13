import React, { useEffect, useState } from 'react';
import { fetchStations } from '../services/stationService'; // Adjust the path if necessary

const AdminStations = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getStations = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getStations();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Registered Fuel Stations</h2>

      {error && <p style={styles.error}>{error}</p>}

      {stations.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Location</th>
              <th>Owner Name</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr key={index}>
                <td>{station.stationName}</td>
                <td>{station.location}</td>
                <td>{station.ownerName}</td>
                <td>{station.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stations found.</p>
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

export default AdminStations;