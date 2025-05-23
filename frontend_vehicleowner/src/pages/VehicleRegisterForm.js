import React, { useState } from 'react';
import '../styles/VehicleRegister.css';
import { registerVehicle } from '../services/vehicleService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function VehicleRegisterForm() {
  const { user } = useAuth(); // get logged-in user
  const [form, setForm] = useState({
    plate: '',
    owner: '',
    model: '',
    chassi: '',
    engine: '',
    date: '',
    type: '',
    colour: '',
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
        userId: user._id || user.id, // this is the foreign key to vehicles table
      });
      alert('Vehicle registered successfully!');
      navigate('/vehicle/showqr', { state: { vehicleNumber: form.plate } });
    } catch (err) {
      alert(err.message || 'Vehicle registration failed');
    }
  };

  const formFields = [
    { label: 'Vehicle Number', field: 'plate', type: 'text' },
    { label: 'Chassi Number', field: 'chassi', type: 'text' },
    { label: 'Engine Number', field: 'engine', type: 'text' },
    { label: 'Owner Name', field: 'owner', type: 'text' },
    { label: 'Registered Date', field: 'date', type: 'date' },
    // Instead of an input, "Vehicle Type" will use a select (combo box)
    { label: 'Vehicle Type', field: 'type', type: 'select' },
    { label: 'Colour', field: 'colour', type: 'text' },
  ];

  return (
    <div className="vehicle-register-page">
      <div className="vehicle-register-page-container">
        <h2 className="vehicle-register-title">Vehicle Registration</h2>
        <form onSubmit={handleSubmit} className="vehicle-register-form">
          {formFields.map((item, idx) => (
            <div className="vehicle-register-form-group" key={idx}>
              <label className="vehicle-register-label">{item.label}</label>
              {item.type === 'select' ? (
                <select
                  className="vehicle-register-input form-control"
                  required
                  defaultValue=""
                  onChange={(e) => handleChange(item.field, e.target.value)}
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="Car">Car</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Three Wheeler">Three Wheeler</option>
                  <option value="Van">Van</option>
                </select>
              ) : (
                <input
                  className="vehicle-register-input form-control"
                  placeholder={item.label}
                  type={item.type}
                  required
                  onChange={(e) => handleChange(item.field, e.target.value)}
                />
              )}
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