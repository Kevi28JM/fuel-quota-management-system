const express = require('express');
const router = express.Router();
const { registerVehicle } = require('../controller/vehicleController');

// Register Vehicle Route
router.post('/register', registerVehicle);

module.exports = router;