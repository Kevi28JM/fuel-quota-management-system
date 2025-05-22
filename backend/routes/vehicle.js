const express = require('express');
const router = express.Router();
const { registerVehicle, fetchVehicles , getVehiclesByOwner , getQRCode } = require('../controller/vehicleController'); // Import fetchVehicles

// Register Vehicle Route
router.post('/register', registerVehicle);

// Fetch all vehicles
router.get('/vehicles', fetchVehicles);

// Get all vehicles by owner
router.get('/by-owner/:userId', getVehiclesByOwner);

// Get QR code for a specific vehicle
router.get('/qr/:vehicleID', getQRCode);

module.exports = router;




