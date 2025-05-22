import { Link } from 'react-router-dom';
import '../styles/AdminPortal.css'; // Import the external CSS file

function AdminPortal() {
  return (
    <div className="admin-portal-page">
    <div className="admin-portal-container mt-5">
      <h1 className="admin-portal-title text-center mb-4">Admin Portal</h1>
      <p className="admin-portal-subtitle text-center mb-5">
        Welcome, Admin! Manage fuel stations, vehicles, and monitor fuel distribution.
      </p>

      <div className="admin-portal-row row text-center">
        <div className="admin-portal-col col-md-4 mb-4">
          <div className="admin-portal-card card shadow-sm p-4">
            <h5 className="admin-portal-card-title">View Registered Vehicles</h5>
            <Link className="admin-portal-btn btn btn-primary mt-3" to="/admin/vehicles">
              Manage Vehicles
            </Link>
          </div>
        </div>

        <div className="admin-portal-col col-md-4 mb-4">
          <div className="admin-portal-card card shadow-sm p-4">
            <h5 className="admin-portal-card-title">View Fuel Stations</h5>
            <Link className="admin-portal-btn btn btn-success mt-3" to="/admin/stations">
              Manage Stations
            </Link>
          </div>
        </div>

        <div className="admin-portal-col col-md-4 mb-4">
          <div className="admin-portal-card card shadow-sm p-4">
            <h5 className="admin-portal-card-title">Fuel Distribution Reports</h5>
            <Link className="admin-portal-btn btn btn-warning mt-3" to="/admin/reports">
              View Reports
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-portal-footer text-center mt-4">
        <Link className="admin-portal-back-btn btn btn-danger" to="/">
          Back to Home
        </Link>
      </div>
    </div>
    </div>
  );
}

export default AdminPortal;