import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">Fuel Quota Management System</h1>
        <p className="lead">
          Efficiently manage and track fuel quotas with our comprehensive system.
        </p>
        <hr className="my-4" />
        <p>
          Our system helps you monitor fuel usage, set quotas, and generate reports
          to optimize your fuel consumption and reduce costs.
        </p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-3">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-outline-primary">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Quota Management</h5>
              <p className="card-text">
                Set and adjust fuel quotas for different vehicles or departments.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Usage Tracking</h5>
              <p className="card-text">
                Monitor fuel consumption patterns with detailed analytics.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Report Generation</h5>
              <p className="card-text">
                Generate comprehensive reports for better decision making.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;