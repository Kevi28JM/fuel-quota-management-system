const express = require("express");
const router = express.Router();
const stationController = require("../controller/stationController");

// Register Station Route
router.post("/register", stationController.registerStation);

// Fetch all stations
router.get('/', stationController.fetchStations);

module.exports = router;
