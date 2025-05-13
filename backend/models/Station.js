const express = require("express");
const router = express.Router();
const { fetchStations } = require("../controller/stationController"); // Import fetchStations

// Fetch all stations
router.get('/stations', fetchStations);

module.exports = router;