// AdminVehicles.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch vehicles.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registered Vehicles</h2>

      {error && <p style={styles.error}>{error}</p>}

      {vehicles.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Owner Name</th>
              <th>Fuel Quota (Litres)</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.vehicleNumber}</td>
                <td>{vehicle.ownerName}</td>
                <td>{vehicle.fuelQuota}</td>
                <td>
                  <img src={vehicle.qrCodeUrl} alt="QR Code" width="80" height="80" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vehicles found.</p>
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

export default AdminVehicles;
