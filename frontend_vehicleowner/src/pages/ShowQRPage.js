// ShowQRPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation } from 'react-router-dom';

function ShowQRPage() {
  const { user } = useAuth();
  const [qrList, setQrList] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [qrData, setQrData] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const vehicleNumber = location.state?.vehicleNumber;

   useEffect(() => {
    const fetchQR = async () => {
      if (!user?.id) return;

  try {
      const res = await axios.get(`http://localhost:5001/api/vehicle/by-owner/${user.id}`);
      console.log('API Response:', res.data);

      if (res.data?.qrCodeData) {
        setQrList([res.data]); // wrap single object in array to keep code consistent
      } else {
        setError('No QR code found for your vehicle.');
      }
    } catch (err) {
      console.error('Failed to load QR code:', err);
      setError('Could not fetch your QR code.');
    }
  };

  fetchQR();
}, [user?.id]);

  return (
    <div style={styles.container}>
      <h2>Your Vehicle QR Codes</h2>

      {error && <p style={styles.error}>{error}</p>}

      {qrList.length > 0 ? (
        qrList.map((item, index) => (
          <div key={index} style={styles.card}>
            <p><strong>Vehicle:</strong> {item.vehicleNumber}</p>
            <img src={item.qrCodeData} alt={`QR for ${item.vehicleNumber}`} style={{ width: 256, height: 256 }} />
          </div>
        ))
      ) : (
        !error && <p>Loading QR codes...</p>
      )}
    </div>
  );
}

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
  card: {
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

export default ShowQRPage;
