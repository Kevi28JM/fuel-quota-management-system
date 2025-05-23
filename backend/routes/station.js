const express = require("express");
const router = express.Router();
const stationController = require("../controller/stationController");

// Fetch all stations
router.get('/', stationController.fetchStations);

// Update station quota
router.put('/updateQuota/:stationId', stationController.updateStationQuota);

module.exports = router;
