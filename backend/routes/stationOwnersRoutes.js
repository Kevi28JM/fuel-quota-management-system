const express = require('express');
const router = express.Router();
const { getPendingStationOwners } = require('../controller/stationOwnerController');

// Get all pending station owners
router.get('/pending', getPendingStationOwners);

module.exports = router;