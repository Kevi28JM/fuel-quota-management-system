// StationScan.jsx

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const StationScan = () => {
  const [scannedData, setScannedData] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [litres, setLitres] = useState('');
  const [message, setMessage] = useState('');

  const handleScan = async (data) => {
    if (data && data !== scannedData) {
      setScannedData(data);

      try {
        const res = await axios.get(`http://localhost:5000/vehicle/${data}`);
        setVehicleData(res.data);
        setMessage('');
      } catch (error) {
        setMessage('Vehicle not found!');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setMessage('Error accessing camera');
  };

  const handleFuelSubmit = async () => {
    if (!litres) {
      setMessage('Please enter pumped litres.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/vehicle/pump/${scannedData}`, { litres: Number(litres) });
      setMessage('Fuel pumping recorded successfully.');
      setVehicleData(null);
      setScannedData('');
      setLitres('');
    } catch (error) {
      setMessage('Failed to record fuel pumping.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Scan Vehicle QR Code</h2>

      <div style={styles.qrBox}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result?.text);
            }

            if (!!error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      </div>

      {vehicleData && (
        <div style={styles.vehicleInfo}>
          <h3>Vehicle Details</h3>
          <p><strong>Plate Number:</strong> {vehicleData.plateNumber}</p>
          <p><strong>Available Fuel:</strong> {vehicleData.availableQuota} Litres</p>

          <input
            type="number"
            placeholder="Enter pumped litres"
            value={litres}
            onChange={(e) => setLitres(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleFuelSubmit} style={styles.button}>Submit Pumping</button>
        </div>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center'
  },
  qrBox: {
    marginBottom: '20px',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  vehicleInfo: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  input: {
    width: '80%',
    padding: '10px',
    marginTop: '10px'
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  message: {
    marginTop: '10px',
    color: 'red'
  }
};

export default StationScan;
