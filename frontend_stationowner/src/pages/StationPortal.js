import { Link } from 'react-router-dom';
import "../styles/StationPortal.css";

function StationPortal() {
  return (
    <div className="station-portal">
    <div className="station-portal-container">
      <h1 className="station-portal-title">Fuel Station Portal</h1>
      <p className="station-portal-description">
        Welcome! This portal allows fuel station owners to manage operations, check fuel balances, and track vehicle quotas.
      </p>

      <div className="station-portal-cards">
        <div className="portal-card">
          <div className="portal-card-content">
            <h5 className="portal-card-title">Fuel Pump Logs</h5>
            <Link to="/station/logs" className="portal-btn portal-btn-warning">
              View Logs
            </Link>
          </div>
        </div>
        
        <div className="portal-card">
          <div className="portal-card-content">
            <h5 className="portal-card-title">Approve Workers</h5>
            <Link to="/approve/workers" className="portal-btn portal-btn-info">
              Approve
            </Link>
          </div>
        </div>
      </div>

      <div className="portal-footer">
        <Link to="/" className="portal-btn portal-btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
    </div>
  );
}

export default StationPortal;