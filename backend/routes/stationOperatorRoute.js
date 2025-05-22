const express = require('express');
const router = express.Router();
const { registerStationOperator } = require('../controller/stationOperatorController');

router.post('/', registerStationOperator);

module.exports = router;