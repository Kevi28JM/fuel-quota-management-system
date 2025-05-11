import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Correct import
import API from '../services/api'; // Ensure the API service path is correct
import '../styles/VehicleRegister.css'; // Add a CSS file for styling

function VehicleRegisterForm() {
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
  const [qr, setQr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/vehicle/register', form); // Ensure the backend endpoint is correct
      setQr(res.data.qrCodeData); // Assume backend sends QR code data
      alert('Vehicle registered successfully!');
    } catch (err) {
      alert('Vehicle registration failed');
    }
  };

  return (
    <div className="vehicle-register-page">
    <div className="vehicle-register-page-container">
      <h2 className="vehicle-register-title">Vehicle Registration</h2>
      <form onSubmit={handleSubmit} className="vehicle-register-form">
        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Vehicle Number</label>
          <input
            className="vehicle-register-input form-control"
            placeholder="Vehicle Number"
            onChange={(e) => setForm({ ...form, plate: e.target.value })}
          />
        </div>

        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Chassi Number</label>
          <input
            className="vehicle-register-input form-control"
            placeholder="Chassi Number"
            onChange={(e) => setForm({ ...form, chassi: e.target.value })}
          />
        </div>

        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Engine Number</label>
          <input
            className="vehicle-register-input form-control"
            placeholder="Engine Number"
            onChange={(e) => setForm({ ...form, engine: e.target.value })}
          />
        </div>

        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Owner Name</label>
          <input
            className="vehicle-register-input form-control"
            placeholder="Owner Name"
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
          />
        </div>

        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Registered Date</label>
          <input
            className="vehicle-register-input form-control"
            type="date"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Vehicle Type</label>
          <input
            className="vehicle-register-input form-control"
            placeholder="Vehicle Type"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
        </div>

        <div className="vehicle-register-form-group">
          <label className="vehicle-register-label">Colour</label>
          <input
            className="vehicle-register-input form-control"
            placeholder="Colour"
            onChange={(e) => setForm({ ...form, colour: e.target.value })}
          />
        </div>

        <button className="vehicle-register-btn btn btn-success" type="submit">
          Register Vehicle
        </button>
      </form>

      {qr && (
        <div className="vehicle-register-qr">
          <h4>Your QR Code:</h4>
          <QRCodeSVG value={qr} size={256} />
        </div>
      )}
    </div>
    </div>
  );
}

export default VehicleRegisterForm;