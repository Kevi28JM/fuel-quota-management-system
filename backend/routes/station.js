const express = require("express");
const router = express.Router();
const stationController = require("../controller/stationController");

// Register Station Route
router.post("/register", stationController.registerStation);

module.exports = router;
