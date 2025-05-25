import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStationLogs } from '../services/stationLogService';
import '../styles/stationLogs.css'; 

const StationLogs = () => {
  const { stationId } = useAuth();
  const [logs, setLogs] = useState([]);
  const [currentQuota, setCurrentQuota] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (stationId) {
      fetchLogs(stationId);
    }
  }, [stationId]);

  const fetchLogs = async (id) => {
    setIsLoading(true);
    try {
      const res = await getStationLogs(id);
      setLogs(res);
      if (res.length > 0 && res[0].currentQuota !== undefined) {
        setCurrentQuota(res[0].currentQuota);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch logs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="station-logs-container">
      <div className="station-logs-header">
        <h2 className="station-logs-title">Fuel Dispensing Logs</h2>
        <p className="station-logs-subtitle">Track all fuel transactions at your station</p>
      </div>

      {currentQuota !== null && (
        <div className="quota-display">
          <span className="quota-label">Remaining Monthly Quota:</span>
          <span className="quota-value">{currentQuota} Litres</span>
        </div>
      )}

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading logs...</p>
        </div>
      ) : logs.length > 0 ? (
        <div className="logs-table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th className="table-header vehicle-col">Vehicle Plate</th>
                <th className="table-header amount-col">Dispensed (L)</th>
                <th className="table-header operator-col">Operator</th>
                <th className="table-header date-col">Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="table-data vehicle-data">{log.vehicleNumber}</td>
                  <td className="table-data amount-data">{log.amount} L</td>
                  <td className="table-data operator-data">{log.operatorName}</td>
                  <td className="table-data date-data">{new Date(log.transaction_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-logs-message">
          <p>No dispensing logs found for this station.</p>
        </div>
      )}
    </div>
  );
};

export default StationLogs;