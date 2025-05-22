// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomevehiclePage.css'; 

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container-vehicle-owner"> 
      <h2 className='heading-vehicle-owner'>Welcome, Vehicle Owner</h2>
      <p>Please choose an option:</p>
      <button className="button-vehicle-owner" onClick={() => navigate('/vehicle/register')}>
        Register a Vehicle
      </button>
      <button className="button-vehicle-owner" onClick={() => navigate('/vehicle/showqr')}>
        View QR Code
      </button>
    </div>
  );
}

export default HomePage;