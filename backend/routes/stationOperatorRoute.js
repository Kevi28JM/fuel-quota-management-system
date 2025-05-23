const express = require('express');
const router = express.Router();
const stationOperatorController = require('../controller/stationOperatorController');

// Register new station operator
router.post('/', stationOperatorController.registerStationOperator);

// Login station operator
router.post('/login', stationOperatorController.loginStationOperator);

module.exports = router;