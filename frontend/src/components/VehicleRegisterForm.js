import React from 'react';

import { useState } from 'react';
import API from '../services/api';
import { QRCodeSVG } from 'qrcode.react'; // <-- update import

function VehicleRegisterForm() {
  const [form, setForm] = useState({ plate: '', owner: '', model: '' });
  const [qr, setQr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/vehicle/register', form);
      setQr(res.data.qrCodeData); // Assume backend sends QR code value
      alert('Vehicle registered successfully!');
    } catch (err) {
      alert('Vehicle registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Vehicle Registration</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Plate No" onChange={(e) => setForm({ ...form, plate: e.target.value })} />
        <input className="form-control mb-2" placeholder="Owner Name" onChange={(e) => setForm({ ...form, owner: e.target.value })} />
        <input className="form-control mb-2" placeholder="Model" onChange={(e) => setForm({ ...form, model: e.target.value })} />
        <button className="btn btn-success" type="submit">Register Vehicle</button>
      </form>

      {qr && (
        <div className="mt-4">
          <h4>Your QR Code:</h4>
          <QRCodeSVG value={qr} size={256} /> 
        </div>
      )}
    </div>
  );
}

export default VehicleRegisterForm;