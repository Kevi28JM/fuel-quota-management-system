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
        const res = await axios.get(`http://localhost:5000/api/vehicle/by-owner/${user.id}`);
        if (Array.isArray(res.data)) {
          setVehicles(res.data);
        } else {
          setError('Invalid response format from server.');
        }
      } catch (err) {
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
      const res = await axios.get(`http://localhost:5000/api/vehicle/qr/${vehicleId}`);
      if (res.data?.qrCodeData) {
        setQrData(res.data.qrCodeData);
      } else {
        setError('QR code not found for selected vehicle.');
      }
    } catch (err) {
      setError('Could not fetch QR code for the selected vehicle.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Your Vehicle QR Code</h2>

      {error && <p style={styles.error}>{error}</p>}

      <select
        value={selectedVehicleId}
        onChange={handleVehicleChange}
        style={styles.select}
      >
        <option value="">-- Select a vehicle --</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.vehicleNumber || `Vehicle ${vehicle.id}`}
          </option>
        ))}
      </select>

      {qrData && (
        <div style={styles.card}>
          <img src={qrData} alt="Vehicle QR Code" style={styles.image} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px 20px',
    backgroundColor: '#fdfdfd',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '25px',
    fontSize: '1.8rem',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  error: {
    color: '#d9534f',
    marginBottom: '15px',
    fontWeight: '500',
  },
  card: {
    marginTop: '25px',
    padding: '20px',
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    display: 'inline-block',
  },
  image: {
    width: '256px',
    height: '256px',
  },
};

export default ShowQRPage;
