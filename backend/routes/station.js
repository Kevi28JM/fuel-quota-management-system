const express = require('express');
const Station = require('../models/Station');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Register Station
router.post('/register', protect, async (req, res) => {
  const { stationName, location } = req.body;
  try {
    const newStation = await Station.create({ owner: req.user.id, stationName, location });
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ message: 'Station Registration Failed', error });
  }
});

// Get all Stations
router.get('/', protect, async (req, res) => {
  try {
    const stations = await Station.find().populate('owner', 'name email');
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
