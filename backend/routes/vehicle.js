const express = require('express');
const Vehicle = require('../models/Vehicle');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Register Vehicle
router.post('/register', protect, async (req, res) => {
  const { vehicleNumber } = req.body;
  try {
    const qrCode = `QR_${vehicleNumber}_${Date.now()}`;
    const newVehicle = await Vehicle.create({ owner: req.user.id, vehicleNumber, qrCode });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: 'Vehicle Registration Failed', error });
  }
});

// Get all Vehicles
router.get('/', protect, async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('owner', 'name email');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
