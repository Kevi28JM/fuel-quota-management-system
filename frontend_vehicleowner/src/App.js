import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page imports
import HomePage from './pages/HomePage';
import VehiclePortal from './pages/VehicleRegister';
import Login from './pages/login';
import Signup from './pages/signUp';
import VehicleOwnerHomepage from './pages/VehicleOwnerHomepage'; 
import VehicleRegisterForm from './pages/VehicleRegisterForm'; //  NEW
import ShowQRPage from './pages/ShowQRPage';//  NEW


// Component imports
import Navigation from './components/navigation';
import Footer from './components/Footer';

function App() {
  return (
     
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/vehicle" element={<VehiclePortal />} />
            <Route path="/vehicle/home" element={<VehicleOwnerHomepage />} />
            <Route path="/vehicle/register" element={<VehicleRegisterForm />} />
            <Route path="/vehicle/showqr" element={<ShowQRPage />} />
            {/* Redirect any unknown routes to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
     
  );
}

export default App;
