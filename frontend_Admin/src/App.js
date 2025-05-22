import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page imports
import HomePage from './pages/HomePage';
import StationPortal from './pages/StationPortal';
import AdminPortal from './pages/AdminPortal';
import Login from './pages/login';
import StationLogs from './pages/StationLogs';
import AdminStations from './pages/AdminStations';
import AdminReports from './pages/AdminReports';
import AdminVehicles from './pages/AdminVehicles';
import AdminSignup from './pages/AdminSignup';
import ApproveStationOwners from './pages/ApproveStationOwners';

// Component imports
import Navigation from './components/navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/station" element={<StationPortal />} />
            <Route path="/station/logs" element={<StationLogs />} />
            <Route path="/station/portal" element={<StationPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/admin/vehicles" element={<AdminVehicles />} />
            <Route path="/admin/stations" element={<AdminStations />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/approve/station-owners" element={<ApproveStationOwners />} />
            {/* Redirect any unknown routes to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
