// VehicleRegisterForm.jsx
import React, { useState } from 'react';
import '../styles/VehicleRegister.css';
import { registerVehicle } from '../services/vehicleService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function VehicleRegisterForm() {
  const { user } = useAuth(); // get logged-in user
  const [form, setForm] = useState({
    plate: '', owner: '', model: '', chassi: '', engine: '', date: '', type: '', colour: '',
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  console.log('user from AuthContext:', user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('Sending vehicle registration:', {
  vehicleNumber: form.plate,
  chassisNumber: form.chassi,
  engineNumber: form.engine,
  ownerName: form.owner,
  registeredDate: form.date,
  vehicleType: form.type,
  color: form.colour,
  userId: user._id || user.id,
   });

      await registerVehicle({
        vehicleNumber: form.plate,
        chassisNumber: form.chassi,
        engineNumber: form.engine,
        ownerName: form.owner,
        registeredDate: form.date,
        vehicleType: form.type,
        color: form.colour,
        userId: user._id || user.id,//  this is the foreign key to vehicles table
      });
      alert('Vehicle registered successfully!');
      navigate('/vehicle/showqr', { state: { vehicleNumber: form.plate } });
    } catch (err) {
      alert(err.message || 'Vehicle registration failed');
    }
  };

  return (
    <div className="vehicle-register-page">
      <div className="vehicle-register-page-container">
        <h2 className="vehicle-register-title">Vehicle Registration</h2>
        <form onSubmit={handleSubmit} className="vehicle-register-form">
          {['Vehicle Number', 'Chassi Number', 'Engine Number', 'Owner Name', 'Registered Date', 'Vehicle Type', 'Colour'].map((label, idx) => (
            <div className="vehicle-register-form-group" key={idx}>
              <label className="vehicle-register-label">{label}</label>
              <input
                className="vehicle-register-input form-control"
                placeholder={label}
                type={label === 'Registered Date' ? 'date' : 'text'}
                required
                onChange={(e) => setForm({ ...form, [
                  ['plate','chassi','engine','owner','date','type','colour'][idx]
                ]: e.target.value })}
              />
            </div>
          ))}
          <button className="vehicle-register-btn btn btn-success" type="submit">
            Register Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleRegisterForm;
