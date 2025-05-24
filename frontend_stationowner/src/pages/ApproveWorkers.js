import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPendingWorkers, approveWorker, rejectWorker, removeWorker } from '../services/workersService';
import '../styles/ApproveWorkers.css';
import { useAuth } from '../context/AuthContext';

function ApproveWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { stationId } = useAuth();

  useEffect(() => {
    console.log("Station ID:", stationId); // ✅ Console the station ID when page loads
  }, [stationId]);

  useEffect(() => {
  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const data = await getPendingWorkers(stationId); // Pass stationId here
      console.log('Fetched Workers:', data);
      setWorkers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching workers');
    } finally {
      setLoading(false);
    }
  };

  if (stationId) {
    fetchWorkers();
  }
}, [stationId]); // re-fetch when stationId changes


  const handleApprove = async (workerId) => {
    try {
      await approveWorker(workerId);
      setWorkers(prev => prev.filter(worker => worker.id !== workerId));
      alert('Worker approved successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve worker');
    }
  };

  const handleReject = async (workerId) => {
    try {
      await rejectWorker(workerId);
      setWorkers(prev => prev.filter(worker => worker.id !== workerId));
      alert('Worker rejected successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject worker');
    }
  };

  const handleRemove = async (workerId) => {
    try {
      await removeWorker(workerId);
      setWorkers(prev => prev.filter(worker => worker.id !== workerId));
      alert('Worker removed successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove worker');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Manage Workers</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && workers.length === 0 && <p className="text-center">No pending workers for approval.</p>}
      {!loading && workers.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>NIC</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(worker => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.email}</td>
                <td>{worker.nic}</td>
                <td>{worker.status}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="btn btn-success mr-2" onClick={() => handleApprove(worker.id)}>Approve</button>
                  <button className="btn btn-warning mr-2" onClick={() => handleReject(worker.id)}>Reject</button>
                  <button className="btn btn-danger" onClick={() => handleRemove(worker.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-center mt-4">
        <Link to="/station/portal" className="btn btn-secondary">Back to Portal</Link>
      </div>
    </div>
  );
}

export default ApproveWorkers;
