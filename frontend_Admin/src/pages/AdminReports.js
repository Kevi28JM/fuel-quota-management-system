import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminReports.css';

const AdminReports = () => {
  const [reports, setReports] = useState({});
  const [stationData, setStationData] = useState([]);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/reports', {
        params: { start: startDate, end: endDate },
      });
      setReports(res.data);
      setStationData(res.data.stationWise);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  }, []);

  return (
    <div className="admin-reports-container">
      <div className="admin-reports-header">
        <h1 className="admin-reports-main-title">Fuel Quota Management System</h1>
      </div>

      <div className="reports-control-panel">
        <h3 className="control-panel-title">Generate Custom Report</h3>
        <div className="date-filters">
          <div className="date-input-group">
            <label htmlFor="startDate" className="date-label">From:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="date-input-group">
            <label htmlFor="endDate" className="date-label">To:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input"
            />
          </div>
          <button
            onClick={fetchReports}
            className="generate-report-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-alert">
          <span className="error-icon">!</span>
          {error}
        </div>
      )}

      <div className="summary-cards-container">
        <div className="summary-card">
          <div className="card-icon">🚗</div>
          <h3 className="card-title">Vehicles Served</h3>
          <p className="card-value">{reports.totalVehicles || 0}</p>
          <p className="card-description">Total vehicles that received fuel</p>
        </div>
        <div className="summary-card accent-card">
          <div className="card-icon">⛽</div>
          <h3 className="card-title">Fuel Dispensed</h3>
          <p className="card-value">{reports.totalFuelDispensed || 0} L</p>
          <p className="card-description">Total litres distributed</p>
        </div>
        <div className="summary-card">
          <div className="card-icon">🏭</div>
          <h3 className="card-title">Active Stations</h3>
          <p className="card-value">{stationData.length || 0}</p>
          <p className="card-description">Stations with activity</p>
        </div>
      </div>

      <div className="station-breakdown-section">
        <h3 className="breakdown-title">
          <span className="title-icon">📊</span>
          Station-wise Fuel Distribution
        </h3>
        <div className="table-container">
          <table className="station-breakdown-table">
            <thead>
              <tr>
                <th className="table-header">Station Name</th>
                <th className="table-header">Location</th>
                <th className="table-header">Fuel Dispensed (L)</th>
                <th className="table-header">Vehicles Served</th>
              </tr>
            </thead>
            <tbody>
              {stationData.length > 0 ? (
                stationData.map((station, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td className="table-data">{station.stationName}</td>
                    <td className="table-data">{station.location || 'N/A'}</td>
                    <td className="table-data highlight-data">{station.totalDispensed}</td>
                    <td className="table-data">{station.vehicleCount || 0}</td>
                  </tr>
                ))
              ) : (
                <tr className="no-data-row">
                  <td colSpan="4" className="no-data-message">
                    No station data available for the selected period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;