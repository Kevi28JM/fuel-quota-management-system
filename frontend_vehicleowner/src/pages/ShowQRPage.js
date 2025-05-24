import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ShowQRPage.css'; 

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

  const handlePrint = () => {
    const printContent = document.getElementById('qr-code-container');
    if (printContent) {
      const WinPrint = window.open('', '', 'width=600,height=600');
      WinPrint.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  };

  const handleDownload = () => {
    if (!qrData) return;
    const link = document.createElement('a');
    link.href = qrData;
    link.download = 'qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-container">
      <h2 className="qr-heading">View Your Vehicle QR Code</h2>

      {error && <p className="qr-error">{error}</p>}

      <select
        value={selectedVehicleId}
        onChange={handleVehicleChange}
        className="qr-select"
      >
        <option value="">-- Select a vehicle --</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.vehicleNumber || `Vehicle ${vehicle.id}`}
          </option>
        ))}
      </select>

      {qrData && (
        <>
          <div className="qr-card" id="qr-code-container">
            <img src={qrData} alt="Vehicle QR Code" className="qr-image" />
          </div>
          <button onClick={handlePrint} className="qr-button" style={{ marginRight: '10px' }}>
            Print QR Code
          </button>
          <button onClick={handleDownload} className="qr-button">
            Download Image
          </button>
        </>
      )}
    </div>
  );
}

export default ShowQRPage;