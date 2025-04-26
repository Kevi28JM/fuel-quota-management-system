import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Fuel Quota Management System</h1>
      <p className="mb-5">Manage your fuel quotas efficiently and easily.</p>

      <div className="d-grid gap-3 col-6 mx-auto">
        <Link className="btn btn-primary btn-lg" to="/vehicle">
          Vehicle Owner Portal
        </Link>

        <Link className="btn btn-success btn-lg" to="/station">
          Fuel Station Portal
        </Link>

        <Link className="btn btn-warning btn-lg" to="/admin">
          Admin Portal
        </Link>

        <Link className="btn btn-info btn-lg" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
