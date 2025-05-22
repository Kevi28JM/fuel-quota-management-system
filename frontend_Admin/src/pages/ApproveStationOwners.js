import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ApproveStationOwners.css';

function ApproveStationOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingOwners = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/station-owners/pending`
        );
        setOwners(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching pending station owners');
      } finally {
        setLoading(false);
      }
    };
    fetchPendingOwners();
  }, []);

  const handleApprove = async (ownerId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/station-owners/approve`, { id: ownerId });
      setOwners(prev => prev.filter(owner => owner.id !== ownerId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve station owner');
    }
  };

  return (
    <div className="approve-station-owners-container">
      <h1 className="title">Approve Station Owners</h1>
      {loading && <p>Loading pending station owners...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && owners.length === 0 && <p>No pending station owners for approval.</p>}
      <div className="owners-list">
        {owners.map(owner => (
          <div key={owner.id} className="owner-card card shadow-sm p-3 mb-3">
            <h5>{owner.name}</h5>
            <p>Email: {owner.email}</p>
            {/* Additional owner info can be displayed here */}
            <button className="btn btn-success" onClick={() => handleApprove(owner.id)}>
              Approve
            </button>
          </div>
        ))}
      </div>
      <div className="back-link mt-4">
        <Link to="/admin" className="btn btn-secondary">
          Back to Admin Portal
        </Link>
      </div>
    </div>
  );
}

export default ApproveStationOwners;