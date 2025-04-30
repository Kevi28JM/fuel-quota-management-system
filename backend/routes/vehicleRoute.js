// vehicleRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Mongoose schema
const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  chassisNumber: String,
  engineNumber: String,
  ownerName: String,
  registeredDate: String,
  vehicleType: String,
  color: String
});

// Models (for reference and registered vehicles)
const ReferenceVehicle = mongoose.model('referenceVehicles', vehicleSchema);
const RegisteredVehicle = mongoose.model('registeredVehicles', vehicleSchema);

// Route: Register vehicle
router.post('/register-vehicle', async (req, res) => {
  try {
    const { vehicleNumber, chassisNumber, engineNumber, ownerName, registeredDate, vehicleType, color } = req.body;

    // Check if details match referenceVehicles
    const matchedVehicle = await ReferenceVehicle.findOne({
      vehicleNumber,
      chassisNumber,
      engineNumber,
      ownerName
    });

    if (!matchedVehicle) {
      return res.status(400).json({ message: 'Details do not match official records.' });
    }

    // Check if already registered
    const alreadyRegistered = await RegisteredVehicle.findOne({
      vehicleNumber,
      chassisNumber,
      engineNumber,
      ownerName
    });

    if (alreadyRegistered) {
      return res.status(409).json({ message: 'Vehicle is already registered.' });
    }

    // Save to registeredVehicles
    const newRegistration = new RegisteredVehicle({
      vehicleNumber,
      chassisNumber,
      engineNumber,
      ownerName,
      registeredDate,
      vehicleType,
      color
    });

    await newRegistration.save();

    res.status(200).json({ message: 'Vehicle registered successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
