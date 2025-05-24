import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '../services/vehicleService';
import '../styles/AdminVehicles.css';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch vehicles');
      } finally {
        setIsLoading(false);
      }
    };

    getVehicles();
  }, []);

  if (isLoading) {
    return <div className="admin-vehicles-container">Loading...</div>;
  }

  return (
    <div className="admin-vehicles-container">
      <h2>Registered Vehicles</h2>

      {error && <p className="admin-vehicles-error">{error}</p>}

      {vehicles.length > 0 ? (
        <table className="admin-vehicles-table">
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Chassis Number</th>
              <th>Engine Number</th>
              <th>Owner Name</th>
              <th>Registered Date</th>
              <th>Vehicle Type</th>
              <th>Vehicle Colour</th>
              <th>Fuel Quota (Litres)</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicleNumber}>
                <td>{vehicle.vehicleNumber}</td>
                <td>{vehicle.chassisNumber}</td>
                <td>{vehicle.engineNumber}</td>
                <td>{vehicle.ownerName}</td>
                <td>{vehicle.registeredDate}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.quota}</td>
                <td>
                  {vehicle.qrCode && (
                    <img 
                      src={vehicle.qrCode} 
                      alt="QR Code" 
                      className="admin-vehicles-qr-code" 
                    />
                  )}
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

export default AdminVehicles;