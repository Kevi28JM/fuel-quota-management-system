const express = require('express');
const router = express.Router();
const { registerVehicle , getVehiclesByOwner , getQRCode } = require('../controller/vehicleController');

// Register a new vehicle
router.post('/register', registerVehicle);

// Get all vehicles by owner
router.get('/by-owner/:userId', getVehiclesByOwner);

// Get QR code for a specific vehicle
router.get('/qr/:vehicleID', getQRCode);


module.exports = router;