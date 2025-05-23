import React, { useEffect, useState } from 'react';
import { fetchStations, updateStationQuota } from '../services/stationService';
import '../styles/AdminStations.css'; // Import the CSS file

const AdminStations = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [newQuota, setNewQuota] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStations = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getStations();
  }, []);

  const handleUpdateClick = (station) => {
    setSelectedStation(station);
    setNewQuota(station.Current_qatar || '');
  };

  const handleQuotaChange = (e) => {
    setNewQuota(e.target.value);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStation) return;
    
    try {
      await updateStationQuota(selectedStation.id, newQuota);
      const data = await fetchStations();
      setStations(data);
      setSelectedStation(null);
      setNewQuota('');
    } catch (err) {
      console.error(err);
      setError('Failed to update quota. Please try again.');
    }
  };

  const handleCancel = () => {
    setSelectedStation(null);
    setNewQuota('');
  };

  return (
    <div className="admin-stations-container">
      <h2 className="admin-stations-title">Registered Fuel Stations</h2>

      {error && <p className="admin-stations-error">{error}</p>}

      {loading ? (
        <div className="admin-stations-loading">Loading stations...</div>
      ) : stations.length > 0 ? (
        <table className="admin-stations-table">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Capacity</th>
              <th>Current Quota</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr key={index}>
                <td>{station.name}</td>
                <td>{station.location}</td>
                <td>{station.contact}</td>
                <td>{station.Capacity}</td>
                <td>{station.Current_qatar || 'N/A'}</td>
                <td>
                  <button 
                    className="admin-stations-button"
                    onClick={() => handleUpdateClick(station)}
                  >
                    Update Quota
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="admin-stations-empty">No stations found.</p>
      )}

      {selectedStation && (
        <div className="admin-stations-modal-overlay">
          <div className="admin-stations-modal-content">
            <h3 className="admin-stations-modal-title">
              Update Fuel Quota for {selectedStation.name}
            </h3>
            <form className="admin-stations-modal-form" onSubmit={handleUpdateSubmit}>
              <input
                type="number"
                className="admin-stations-modal-input"
                value={newQuota}
                onChange={handleQuotaChange}
                placeholder="Enter new quota"
                required
                min="0"
              />
              <div className="admin-stations-modal-buttons">
                <button 
                  type="button" 
                  className="admin-stations-button admin-stations-modal-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-stations-button admin-stations-modal-submit"
                >
                  Update Quota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStations;