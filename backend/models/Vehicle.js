const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleNumber: { type: String, unique: true },
  fuelQuota: { type: Number, default: 50 },
  qrCode: String
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
