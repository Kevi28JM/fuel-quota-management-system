const express = require('express');
const router = express.Router();
const { registerVehicle, fetchVehicles } = require('../controller/vehicleController'); // Import fetchVehicles

// Register Vehicle Route
router.post('/register', registerVehicle);

// Fetch all vehicles
router.get('/vehicles', fetchVehicles);

module.exports = router;