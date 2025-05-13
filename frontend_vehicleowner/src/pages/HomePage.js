import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="jumbotron">
          <h1 className="title">Fuel Quota Management System</h1>
          <p className="subtitle">
            Efficiently manage and track fuel quotas with our comprehensive system.
          </p>
          <hr className="divider" />
          <p className="description">
            Our system helps you monitor fuel usage, set quotas, and generate reports
            to optimize your fuel consumption and reduce costs.
          </p>
          <div className="button-group">
            <Link to="/login" className="btn primary">
              Log In
            </Link>
            <Link to="/signup" className="btn secondary">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Quota Management</h5>
                <p className="card-text">
                  Set and adjust fuel quotas for different vehicles or departments.
                </p>
              </div>
            </div>
          </div>
          <div className="feature">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Usage Tracking</h5>
                <p className="card-text">
                  Monitor fuel consumption patterns with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;