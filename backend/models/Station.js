const express = require("express");
const router = express.Router();
const { fetchStations ,registerStation } = require("../controller/stationController"); // Import fetchStations

// Fetch all stations
router.get('/stations', fetchStations);
router.post("/register", registerStation);

module.exports = router;