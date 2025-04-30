import React from 'react';

import { useState } from 'react';
import API from '../services/api';
import { QRCodeSVG } from 'qrcode.react'; // <-- update import

function VehicleRegisterForm() {
  const [form, setForm] = useState({ plate: '', owner: '', model: '', chassi: '', engine: '', date: '', type: '', colour: '' });
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
      <div className="mb-2">
            <label>Vehicle Number</label>
            <input className="form-control" placeholder="Vehicle Number" onChange={(e) => setForm({ ...form, plate: e.target.value })} />
          </div>

          <div className="mb-2">
            <label>Chassi Number</label>
            <input className="form-control" placeholder="Chassi Number" onChange={(e) => setForm({ ...form, chassi: e.target.value })} />
          </div>

          <div className="mb-2">
            <label>Engine Number</label>
            <input className="form-control" placeholder="Engine Number" onChange={(e) => setForm({ ...form, engine: e.target.value })} />
          </div>

          <div className="mb-2">
            <label>Owner Name</label>
            <input className="form-control" placeholder="Owner Name" onChange={(e) => setForm({ ...form, owner: e.target.value })} />
          </div>

          <div className="mb-2">
            <label>Registered Date</label>
            <input className="form-control" placeholder="Registered Date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>

          <div className="mb-2">
            <label>Vehicle Type</label>
            <input className="form-control" placeholder="Vehicle Type" onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </div>

          <div className="mb-2">
            <label>Colour</label>
            <input className="form-control" placeholder="Colour" onChange={(e) => setForm({ ...form, colour: e.target.value })} />
          </div>

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