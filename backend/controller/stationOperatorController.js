// controllers/stationOperatorController.js
const { createStationOperator } = require('../models/stationOperatorModel');

const registerStationOperator = async (req, res) => {
  const { name, nic, username, email, password, station } = req.body;

  if (!name || !nic || !username || !email || !password || !station) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const results = await createStationOperator(req.body);
    console.log("Saving stationOperator done, sending response...");
    return res.status(200).json({ message: 'Station Operator registered successfully!' });
  } catch (err) {
    console.error('Error saving stationOperator:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

module.exports = { registerStationOperator };
