import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ApproveWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        // Use an environment variable for API base URL as per Azure best practices.
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/workers/pending`);
        setWorkers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching workers');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const handleApprove = async (workerId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/workers/approve`, { id: workerId });
      // Remove approved worker from UI list.
      setWorkers(prev => prev.filter(worker => worker.id !== workerId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve worker');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Approve Workers</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && workers.length === 0 && <p className="text-center">No pending workers for approval.</p>}
      <div className="row">
        {workers.map(worker => (
          <div className="col-md-4 mb-4" key={worker.id}>
            <div className="card shadow-sm p-3">
              <h5>{worker.name}</h5>
              <p>{worker.email}</p>
              <button className="btn btn-success" onClick={() => handleApprove(worker.id)}>
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/station/portal" className="btn btn-secondary">
          Back to Portal
        </Link>
      </div>
    </div>
  );
}

export default ApproveWorkers;