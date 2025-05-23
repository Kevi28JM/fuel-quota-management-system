const express = require("express");
const router = express.Router();
const stationController = require("../controller/stationController");


// Fetch all stations
router.get('/', stationController.fetchStations);

module.exports = router;
