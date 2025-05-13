const express = require('express');
const router = express.Router();
const { registerVehicle } = require('../controller/vehicleController');
const { getQRCode } = require('../controller/vehicleController');

// Register Vehicle Route
router.post('/register', registerVehicle);
router.get('/by-owner/:userId', getQRCode);

module.exports = router;