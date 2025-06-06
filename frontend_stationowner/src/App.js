import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page imports
import HomePage from './pages/HomePage';
import StationPortal from './pages/StationPortal';
import Login from './pages/login';
import Signup from './pages/signUp';
import StationLogs from './pages/StationLogs';
import ApproveWorkers from './pages/ApproveWorkers';
import { AuthProvider } from './context/AuthContext';

// Component imports
import Navigation from './components/navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router><AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/station" element={<StationPortal />} />
            <Route path="/station/logs" element={<StationLogs />} />
            <Route path="/station/portal" element={<StationPortal />} />
            <Route path="/approve/workers" element={<ApproveWorkers />} />
            {/* Redirect any unknown routes to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider></Router>
  );
}

export default App;
