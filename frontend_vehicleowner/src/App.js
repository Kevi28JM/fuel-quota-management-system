import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page imports
import HomePage from './pages/HomePage';
import VehiclePortal from './pages/VehicleRegister';
import Login from './pages/login';
import Signup from './pages/signUp';


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
            <Route path="/signup" element={<Signup />} />
            <Route path="/vehicle" element={<VehiclePortal />} />
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
