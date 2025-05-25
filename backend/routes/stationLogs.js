
const express = require('express');
const router = express.Router();
const { getStationLogs } = require('../controller/stationLogController');

router.get('/logs/:stationId', getStationLogs);

module.exports = router;
