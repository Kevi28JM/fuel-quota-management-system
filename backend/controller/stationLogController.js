// controllers/stationLogController.js

const StationLog = require('../models/StationLog');

const getStationLogs = async (req, res) => {
  const stationId = req.params.stationId;

  try {
    const logs = await StationLog.getLogsByStationId(stationId);
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching station logs:', error);
    res.status(500).json({ message: 'Failed to fetch station logs.' });
  }
};

module.exports = { getStationLogs };
