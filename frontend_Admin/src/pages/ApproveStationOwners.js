import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getPendingStationOwners, 
  approveStationOwner, 
  rejectStationOwner, 
  removeStationOwner 
} from '../services/stationOwnerService';
import '../styles/ApproveStationOwners.css';

function ApproveStationOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingOwners = async () => {
    try {
      const data = await getPendingStationOwners();
      setOwners(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching pending station owners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOwners();
  }, []);

  const handleApprove = async (ownerId) => {
    try {
      await approveStationOwner(ownerId);
      setOwners(prev => prev.filter(owner => owner.id !== ownerId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve station owner');
    }
  };

  const handleReject = async (ownerId) => {
    try {
      await rejectStationOwner(ownerId);
      setOwners(prev => prev.filter(owner => owner.id !== ownerId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject station owner');
    }
  };

  const handleRemove = async (ownerId) => {
    try {
      await removeStationOwner(ownerId);
      setOwners(prev => prev.filter(owner => owner.id !== ownerId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove station owner');
    }
  };

  return (
    <div className="approve-station-owners-container">
      <h1 className="title">Manage Station Owners</h1>
      {loading && <p>Loading pending station owners...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && owners.length === 0 && <p>No pending station owners for approval.</p>}
      {!loading && owners.length > 0 && (
        <table className="owners-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>NIC Number</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map(owner => (
              <tr key={owner.id}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.phoneNumber}</td>
                <td>{owner.nicNumber}</td>
                <td style={{ textAlign: "center" }}>{owner.status}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="btn btn-success" onClick={() => handleApprove(owner.id)}>
                    Approve
                  </button>
                  <button className="btn btn-warning" onClick={() => handleReject(owner.id)}>
                    Reject
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRemove(owner.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="back-link mt-4">
        <Link to="/admin" className="btn btn-secondary">
          Back to Admin Portal
        </Link>
      </div>
    </div>
  );
}

export default ApproveStationOwners;