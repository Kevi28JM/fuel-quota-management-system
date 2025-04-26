import { Link } from 'react-router-dom';

function AdminPortal() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Portal</h1>
      <p className="text-center mb-5">Welcome, Admin! Manage fuel stations, vehicles, and monitor fuel distribution.</p>

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4">
            <h5>View Registered Vehicles</h5>
            <Link className="btn btn-primary mt-3" to="/admin/vehicles">
              Manage Vehicles
            </Link>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4">
            <h5>View Fuel Stations</h5>
            <Link className="btn btn-success mt-3" to="/admin/stations">
              Manage Stations
            </Link>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4">
            <h5>Fuel Distribution Reports</h5>
            <Link className="btn btn-warning mt-3" to="/admin/reports">
              View Reports
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link className="btn btn-danger" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AdminPortal;
