const express = require('express');
const router = express.Router();
const fuelTransactionController = require('../controller/fuelTransactionController');

// Get fuel quota for a vehicle
router.get('/quota/:vehicleId', fuelTransactionController.getFuelQuota);

// Update fuel quota and record transaction
router.post('/update', fuelTransactionController.updateFuelQuota);

// Get transaction history for a vehicle
router.get('/history/:vehicleId', fuelTransactionController.getTransactionHistory);

module.exports = router;