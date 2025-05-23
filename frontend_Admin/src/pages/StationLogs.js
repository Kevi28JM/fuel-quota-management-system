import React, { useEffect, useState } from 'react';
import { fetchStations, updateStationQuota } from '../services/stationService'; // Adjust the path if necessary

const AdminStations = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [newQuota, setNewQuota] = useState('');

  useEffect(() => {
    getStations();
  }, []);

  const getStations = async () => {
    try {
      const data = await fetchStations();
      setStations(data);
    } catch (err) {
      setError(err.message);
    }
  };

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
      // Call the service function for updating station quota
      await updateStationQuota(selectedStation.id, newQuota);
      // Refresh the stations list after update
      getStations();
      setSelectedStation(null);
      setNewQuota('');
    } catch (err) {
      console.error(err);
      setError('Failed to update quota.');
    }
  };

  const handleCancel = () => {
    setSelectedStation(null);
    setNewQuota('');
  };

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
                <td>{station.owner_id}</td>
                <td>{station.contact}</td>
                <td>{station.capacity}</td>
                <td>{station.Current_qatar}</td>
                <td>
                  <button onClick={() => handleUpdateClick(station)}>
                    Update Quota
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stations found.</p>
      )}

      {selectedStation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Update Quota for {selectedStation.name}</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="number"
                value={newQuota}
                onChange={handleQuotaChange}
                placeholder="Enter new quota"
                required
              />
              <div style={styles.modalButtons}>
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
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
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    minWidth: '300px',
  },
  modalButtons: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default AdminStations;