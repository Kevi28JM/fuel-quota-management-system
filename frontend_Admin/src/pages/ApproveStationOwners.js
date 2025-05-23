import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPendingStationOwners, approveStationOwner, rejectStationOwner, removeStationOwner } from '../services/stationOwnerService';
import '../styles/ApproveStationOwners.css';

function ApproveStationOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   const fetchPendingOwners = async () => {
    try {
      const data = await getPendingStationOwners();
      console.log('Fetched Owners:', data);
      setOwners(data || []);
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
      <th>Owner Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>NIC Number</th>
      <th>Status</th>
      <th>Station Name</th>
      <th>Location</th>
      <th>Capacity</th>
      <th style={{ textAlign: "center" }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {owners.map(owner => (
  <tr key={owner.ID}>
    <td>{owner.OwnerName}</td>
    <td>{owner.Email}</td>
    <td>{owner.Phone}</td>
    <td>{owner.NIC}</td>
    <td style={{ textAlign: "center" }}>{owner.Status}</td>
    <td>{owner.StationName}</td>
    <td>{owner.Location}</td>
    <td>{owner.Capacity}</td>
    <td style={{ textAlign: "center" }}>
      <button className="btn btn-success" onClick={() => handleApprove(owner.ID)}>
        Approve
      </button>
      <button className="btn btn-warning" onClick={() => handleReject(owner.ID)}>
        Reject
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