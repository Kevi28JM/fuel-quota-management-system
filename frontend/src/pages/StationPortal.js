import { Link } from 'react-router-dom';

function StationPortal() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Fuel Station Portal</h1>
      <p className="text-center mb-5">
        Welcome! This portal allows fuel station owners to manage operations, check fuel balances, and track vehicle quotas.
      </p>

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4">
            <h5>Register Fuel Station</h5>
            <Link to="/station/register" className="btn btn-success mt-3">
              Register
            </Link>
          </div>
        </div>

       

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4">
            <h5>Fuel Pump Logs</h5>
            <Link to="/station/logs" className="btn btn-warning mt-3">
              View Logs
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default StationPortal;
