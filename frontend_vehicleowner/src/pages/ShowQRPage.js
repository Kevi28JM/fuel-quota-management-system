import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function ShowQRPage() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [qrData, setQrData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(`http://localhost:5001/api/vehicle/by-owner/${user.id}`);
        if (Array.isArray(res.data)) {
          setVehicles(res.data);
        } else {
          console.error('Expected an array but got:', res.data);
          setVehicles([]);
          setError('Invalid response format from server.');
        }
      } catch (err) {
        console.error('Failed to load vehicles:', err);
        setVehicles([]);
        setError('Could not fetch your vehicles.');
      }
    };

    fetchVehicles();
  }, [user?.id]);

  const handleVehicleChange = async (e) => {
    const vehicleId = e.target.value;
    setSelectedVehicleId(vehicleId);
    setQrData('');
    setError('');

    if (!vehicleId) return;

    try {
      const res = await axios.get(`http://localhost:5001/api/vehicle/qr/${vehicleId}`);
      if (res.data?.qrCodeData) {
        setQrData(res.data.qrCodeData);
      } else {
        setError('QR code not found for selected vehicle.');
      }
    } catch (err) {
      console.error('Failed to fetch QR code:', err);
      setError('Could not fetch QR code for the selected vehicle.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Your Vehicle QR Code</h2>

      {error && <p style={styles.error}>{error}</p>}

      <select value={selectedVehicleId} onChange={handleVehicleChange} style={styles.select}>
        <option value="">-- Select a vehicle --</option>
        {Array.isArray(vehicles) && vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.vehicleNumber || `Vehicle ${vehicle.id}`}
          </option>
        ))}
      </select>

      {qrData && (
        <div style={styles.card}>
          <img src={qrData} alt="Vehicle QR Code" style={{ width: 256, height: 256 }} />
        </div>
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
  select: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
  },
  card: {
    border: '1px solid #ccc',
    padding: '15px',
    marginTop: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

export default ShowQRPage;
